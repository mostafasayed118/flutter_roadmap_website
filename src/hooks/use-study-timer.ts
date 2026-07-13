"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import {
  type SoundType,
  type NotificationSettings,
  loadNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  resumeAudioContext,
  triggerTimerAlert,
} from "@/lib/timer-notifications";

export interface TimerState {
  isRunning: boolean;
  accumulatedMs: number;
  startTimestamp: number | null;
  displayMs: number;
}

export interface StudyTimerApi {
  time: number;
  isRunning: boolean;
  isPaused: boolean;
  notificationSettings: NotificationSettings;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
  triggerNotification: (type: SoundType) => void;
  updateNotificationSettings: (settings: NotificationSettings) => void;
}

const STORAGE_KEY = "flutter-roadmap-study-timer";

interface PersistedTimer {
  accumulatedMs: number;
  startTimestamp: number | null;
  isRunning: boolean;
}

function loadTimer(): PersistedTimer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedTimer;
  } catch {
    return null;
  }
}

function saveTimer(data: PersistedTimer | null): void {
  if (typeof window === "undefined") return;
  if (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function computeDisplayMs(accumulatedMs: number, startTimestamp: number | null): number {
  if (startTimestamp !== null) {
    return accumulatedMs + (Date.now() - startTimestamp);
  }
  return accumulatedMs;
}

export function useStudyTimer(): StudyTimerApi {
  const [state, setState] = useState<TimerState>({
    isRunning: false,
    accumulatedMs: 0,
    startTimestamp: null,
    displayMs: 0,
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(loadNotificationSettings);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const permissionRequestedRef = useRef(false);

  const persist = useCallback((s: TimerState) => {
    saveTimer({
      accumulatedMs: s.accumulatedMs,
      startTimestamp: s.startTimestamp,
      isRunning: s.isRunning,
    });
  }, []);

  const startTick = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      const s = stateRef.current;
      if (s.startTimestamp === null) return;
      const displayMs = computeDisplayMs(s.accumulatedMs, s.startTimestamp);
      setState((prev) => ({ ...prev, displayMs }));
    }, 100);
  }, []);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTick();
    const now = Date.now();
    const next: TimerState = {
      isRunning: true,
      accumulatedMs: 0,
      startTimestamp: now,
      displayMs: 0,
    };
    setState(next);
    persist(next);
    startTick();

    // Request notification permission on first start (user gesture context)
    if (!permissionRequestedRef.current) {
      permissionRequestedRef.current = true;
      resumeAudioContext();
      requestNotificationPermission();
    }
  }, [clearTick, persist, startTick]);

  const pause = useCallback(() => {
    const s = stateRef.current;
    const elapsed = computeDisplayMs(s.accumulatedMs, s.startTimestamp);
    clearTick();
    const next: TimerState = {
      isRunning: false,
      accumulatedMs: elapsed,
      startTimestamp: null,
      displayMs: elapsed,
    };
    setState(next);
    persist(next);
  }, [clearTick, persist]);

  const resume = useCallback(() => {
    const s = stateRef.current;
    clearTick();
    const now = Date.now();
    const next: TimerState = {
      ...s,
      isRunning: true,
      startTimestamp: now,
    };
    setState(next);
    persist(next);
    startTick();
  }, [clearTick, persist, startTick]);

  const stop = useCallback(() => {
    const s = stateRef.current;
    const elapsed = computeDisplayMs(s.accumulatedMs, s.startTimestamp);
    clearTick();
    const next: TimerState = {
      isRunning: false,
      accumulatedMs: 0,
      startTimestamp: null,
      displayMs: elapsed,
    };
    setState(next);
    saveTimer(null);
  }, [clearTick]);

  const reset = useCallback(() => {
    clearTick();
    const next: TimerState = {
      isRunning: false,
      accumulatedMs: 0,
      startTimestamp: null,
      displayMs: 0,
    };
    setState(next);
    saveTimer(null);
  }, [clearTick]);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = loadTimer();
    if (!saved) return;

    const now = Date.now();

    if (saved.isRunning && saved.startTimestamp !== null) {
      const elapsed = saved.accumulatedMs + (now - saved.startTimestamp);
      const next: TimerState = {
        isRunning: true,
        accumulatedMs: saved.accumulatedMs,
        startTimestamp: now,
        displayMs: elapsed,
      };
      setState(next);
      persist(next);
      startTick();
    } else if (saved.accumulatedMs > 0) {
      const next: TimerState = {
        isRunning: false,
        accumulatedMs: saved.accumulatedMs,
        startTimestamp: null,
        displayMs: saved.accumulatedMs,
      };
      setState(next);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup interval on unmount
  useEffect(() => {
    return () => clearTick();
  }, [clearTick]);

  // Handle tab visibility changes — force recalculation on reveal
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const s = stateRef.current;
      if (s.startTimestamp === null) return;
      const displayMs = computeDisplayMs(s.accumulatedMs, s.startTimestamp);
      setState((prev) => ({ ...prev, displayMs }));
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const triggerNotification = useCallback(
    (type: SoundType) => {
      triggerTimerAlert(type, notificationSettings);
    },
    [notificationSettings]
  );

  const updateNotificationSettings = useCallback(
    (settings: NotificationSettings) => {
      setNotificationSettings(settings);
      saveNotificationSettings(settings);
    },
    []
  );

  return useMemo<StudyTimerApi>(
    () => ({
      time: state.displayMs,
      isRunning: state.isRunning,
      isPaused: !state.isRunning && state.displayMs > 0,
      notificationSettings,
      start,
      pause,
      resume,
      stop,
      reset,
      triggerNotification,
      updateNotificationSettings,
    }),
    [
      state.displayMs,
      state.isRunning,
      notificationSettings,
      start,
      pause,
      resume,
      stop,
      reset,
      triggerNotification,
      updateNotificationSettings,
    ]
  );
}

export function formatTimerDisplay(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
