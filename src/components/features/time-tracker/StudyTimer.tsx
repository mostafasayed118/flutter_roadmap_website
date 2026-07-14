"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Timer,
  Coffee,
  Settings2,
  Volume2,
  VolumeOff,
  Bell,
  BellOff,
} from "lucide-react";
import { toast } from "sonner";
import { useStudyTimerContext } from "./StudyTimerProvider";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverPositioner,
  PopoverPopup,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  type SoundType,
  getNotificationPermission,
  requestNotificationPermission,
} from "@/lib/timer-notifications";

// ── Types ──────────────────────────────────────────────────────

type TimerMode = "focus" | "break" | "custom";

interface PomodoroPreset {
  label: string;
  mode: TimerMode;
  durationMs: number;
}

// ── Constants ──────────────────────────────────────────────────

const POMODORO_PRESETS: PomodoroPreset[] = [
  { label: "25min Focus", mode: "focus", durationMs: 25 * 60 * 1000 },
  { label: "5min Break", mode: "break", durationMs: 5 * 60 * 1000 },
];

const STORAGE_KEY_MODE = "flutter-roadmap-timer-mode";

// ── Helpers ────────────────────────────────────────────────────

function formatDisplay(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function loadMode(): TimerMode {
  if (typeof window === "undefined") return "custom";
  try {
    return (localStorage.getItem(STORAGE_KEY_MODE) as TimerMode) || "custom";
  } catch {
    return "custom";
  }
}

function saveMode(mode: TimerMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_MODE, mode);
}

// ── Digit Component (memoized) ─────────────────────────────────

const Digit = memo(function Digit({ value }: { value: string }) {
  return (
    <span className="inline-block w-[0.65em] text-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
});

// ── Separator ──────────────────────────────────────────────────

const Separator = memo(function Separator() {
  return (
    <span className="mx-1 text-2xl text-muted-foreground/40 sm:text-3xl">
      :
    </span>
  );
});

// ── Timer Display ──────────────────────────────────────────────

function TimerDisplay({
  time,
  isRunning,
}: {
  time: number;
  isRunning: boolean;
}) {
  const display = formatDisplay(time);
  const digits = display.split("");

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Timer: ${display}`}
      className="flex items-center justify-center"
    >
      <span
        className={cn(
          "font-mono text-5xl font-bold tracking-wider tabular-nums sm:text-6xl",
          isRunning
            ? "bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
            : "text-foreground"
        )}
      >
        {digits.map((char, i) =>
          char === ":" ? (
            <Separator key={`sep-${i}`} />
          ) : (
            <Digit key={`pos-${i}-${i}`} value={char} />
          )
        )}
      </span>
    </div>
  );
}

// ── Status Indicator ───────────────────────────────────────────

function StatusIndicator({
  isRunning,
  isPaused,
}: {
  isRunning: boolean;
  isPaused: boolean;
}) {
  const label = isRunning ? "Focus Mode" : isPaused ? "Paused" : "Ready";
  const dotColor = isRunning
    ? "bg-emerald-400"
    : isPaused
      ? "bg-amber-400"
      : "bg-muted-foreground/30";

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="relative flex size-2">
        {isRunning && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={cn("relative inline-flex size-2 rounded-full", dotColor)} />
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

// ── Preset Toggle ──────────────────────────────────────────────

function PresetToggle({
  activeMode,
  onSelect,
  disabled,
}: {
  activeMode: TimerMode;
  onSelect: (mode: TimerMode, durationMs: number) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {POMODORO_PRESETS.map((preset) => (
        <button
          key={preset.mode}
          onClick={() => onSelect(preset.mode, preset.durationMs)}
          disabled={disabled}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
            activeMode === preset.mode
              ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30"
              : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {preset.mode === "focus" ? (
            <Timer className="mr-1 inline-block size-3" />
          ) : (
            <Coffee className="mr-1 inline-block size-3" />
          )}
          {preset.label}
        </button>
      ))}
      <button
        onClick={() => onSelect("custom", 0)}
        disabled={disabled}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
          activeMode === "custom"
            ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30"
            : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        Custom
      </button>
    </div>
  );
}

// ── Countdown Display ──────────────────────────────────────────

function CountdownDisplay({
  remainingMs,
  totalMs,
}: {
  remainingMs: number;
  totalMs: number;
}) {
  const progress = totalMs > 0 ? ((totalMs - remainingMs) / totalMs) * 100 : 0;

  return (
    <div className="mt-3 text-center">
      <div className="mx-auto mb-2 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-muted/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {formatDisplay(remainingMs)} remaining
      </p>
    </div>
  );
}

// ── Timer Settings Popover ─────────────────────────────────────

function TimerSettingsPopover() {
  const { notificationSettings, updateNotificationSettings } =
    useStudyTimerContext();
  const { soundEnabled, notificationsEnabled } = notificationSettings;

  const [notifPermission, setNotifPermission] = useState(() =>
    getNotificationPermission()
  );
  const notifDenied = notifPermission === "denied";
  const notifNotRequested = notifPermission === "default";

  const handleSoundToggle = useCallback(
    (checked: boolean) => {
      updateNotificationSettings({
        ...notificationSettings,
        soundEnabled: checked,
      });
    },
    [notificationSettings, updateNotificationSettings]
  );

  const handleNotificationToggle = useCallback(
    async (checked: boolean) => {
      if (checked && notifNotRequested) {
        const result = await requestNotificationPermission();
        setNotifPermission(result);
        if (result === "denied") {
          toast.error("Notification permission denied in browser settings");
          return;
        }
      }
      updateNotificationSettings({
        ...notificationSettings,
        notificationsEnabled: checked,
      });
    },
    [notificationSettings, updateNotificationSettings, notifNotRequested]
  );

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Timer settings"
            className="text-muted-foreground hover:text-foreground"
          />
        }
      >
        <Settings2 className="size-4" />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner side="bottom" align="end">
          <PopoverPopup>
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                Timer Settings
              </p>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="timer-sound-toggle"
                  className="flex items-center gap-2 text-sm"
                >
                  {soundEnabled ? (
                    <Volume2 className="size-4 text-muted-foreground" />
                  ) : (
                    <VolumeOff className="size-4 text-muted-foreground" />
                  )}
                  Sound
                </label>
                <Switch
                  id="timer-sound-toggle"
                  checked={soundEnabled}
                  onCheckedChange={handleSoundToggle}
                  aria-label="Toggle timer sound"
                />
              </div>

              {/* Notification Toggle */}
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="timer-notif-toggle"
                  className="flex items-center gap-2 text-sm"
                >
                  {notificationsEnabled && !notifDenied ? (
                    <Bell className="size-4 text-muted-foreground" />
                  ) : (
                    <BellOff className="size-4 text-muted-foreground" />
                  )}
                  Notifications
                </label>
                <Switch
                  id="timer-notif-toggle"
                  checked={notificationsEnabled && !notifDenied}
                  disabled={notifDenied}
                  onCheckedChange={handleNotificationToggle}
                  aria-label="Toggle browser notifications"
                />
              </div>

              {notifDenied && (
                <p className="text-xs text-muted-foreground/80">
                  Blocked in browser settings
                </p>
              )}
            </div>
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}

// ── Main StudyTimer Component ──────────────────────────────────

interface StudyTimerProps {
  onStop?: () => void;
}

export function StudyTimer({ onStop }: StudyTimerProps) {
  const timer = useStudyTimerContext();
  const [mode, setMode] = useState<TimerMode>(loadMode);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);
  const countdownDurationRef = useRef<number>(0);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasNotifiedRef = useRef(false);

  // Clear countdown interval on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, []);

  // Stop countdown interval when timer stops or pauses
  useEffect(() => {
    if (!timer.isRunning && countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, [timer.isRunning]);

  // Auto-stop when countdown reaches zero — fire notification ONCE
  useEffect(() => {
    if (countdownRemaining === null || countdownRemaining > 0) return;

    // Countdown expired — clear it regardless of running state
    setCountdownRemaining(null);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (timer.isRunning) {
      if (!hasNotifiedRef.current) {
        hasNotifiedRef.current = true;
        const notifType: SoundType = mode === "break" ? "break-complete" : "focus-complete";
        timer.triggerNotification(notifType);
      }
      timer.stop();
    }
  }, [countdownRemaining, timer.isRunning, timer.stop, timer.triggerNotification, mode]);

  const startCountdown = useCallback((durationMs: number) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    const durationSec = Math.ceil(durationMs / 1000);
    setCountdownRemaining(durationSec);
    countdownDurationRef.current = durationSec;
    countdownIntervalRef.current = setInterval(() => {
      setCountdownRemaining((prev) => {
        if (prev === null || prev <= 0) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownRemaining(null);
  }, []);

  const handlePresetSelect = useCallback(
    (presetMode: TimerMode, durationMs: number) => {
      setMode(presetMode);
      saveMode(presetMode);
      hasNotifiedRef.current = false;
      if (timer.isRunning) timer.stop();
      if (timer.isPaused) timer.reset();
      clearCountdown();
      if (durationMs > 0) {
        startCountdown(durationMs);
        timer.start();
      }
    },
    [timer, startCountdown, clearCountdown]
  );

  const handleStart = useCallback(() => {
    hasNotifiedRef.current = false;
    if (mode !== "custom") {
      const preset = POMODORO_PRESETS.find((p) => p.mode === mode);
      if (preset) {
        startCountdown(preset.durationMs);
      }
    }
    timer.start();
  }, [timer, mode, startCountdown]);

  const handleStop = useCallback(() => {
    clearCountdown();
    if (onStop) {
      onStop();
    } else {
      timer.stop();
      toast.info("Timer stopped — save your session?");
    }
  }, [timer, onStop, clearCountdown]);

  const handleReset = useCallback(() => {
    timer.reset();
    clearCountdown();
  }, [timer, clearCountdown]);

  const glowColor = timer.isRunning
    ? "emerald"
    : timer.isPaused
      ? "blue"
      : "violet";

  return (
    <GlassCard glow glowColor={glowColor} className="p-5 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Study Timer
        </h3>
        <div className="flex items-center gap-1">
          <StatusIndicator
            isRunning={timer.isRunning}
            isPaused={timer.isPaused}
          />
          <TimerSettingsPopover />
        </div>
      </div>

      {/* Timer Display */}
      <div className="mb-5">
        <TimerDisplay time={timer.time} isRunning={timer.isRunning} />
      </div>

      {/* Countdown Progress (Pomodoro only) */}
      {countdownRemaining !== null && countdownRemaining > 0 && (
        <CountdownDisplay
          remainingMs={countdownRemaining * 1000}
          totalMs={countdownDurationRef.current * 1000}
        />
      )}

      {/* Preset Toggle */}
      <div className="mb-5 mt-4">
        <PresetToggle
          activeMode={mode}
          onSelect={handlePresetSelect}
          disabled={timer.isRunning}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Start */}
        {!timer.isRunning && !timer.isPaused && (
          <Button
            onClick={handleStart}
            aria-label="Start timer"
            className="bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] transition-all duration-200"
          >
            <Play className="size-4" />
            Start
          </Button>
        )}

        {/* Pause */}
        {timer.isRunning && (
          <Button
            onClick={timer.pause}
            aria-label="Pause timer"
            variant="outline"
            className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:scale-[1.02] transition-all duration-200"
          >
            <Pause className="size-4" />
            Pause
          </Button>
        )}

        {/* Resume */}
        {timer.isPaused && (
          <Button
            onClick={timer.resume}
            aria-label="Resume timer"
            className="bg-blue-600 text-white hover:bg-blue-500 hover:scale-[1.02] transition-all duration-200"
          >
            <Play className="size-4" />
            Resume
          </Button>
        )}

        {/* Stop */}
        {(timer.isRunning || timer.isPaused) && (
          <Button
            onClick={handleStop}
            aria-label="Stop timer"
            variant="outline"
            className="border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:scale-[1.02] transition-all duration-200"
          >
            <Square className="size-4" />
            Stop
          </Button>
        )}

        {/* Reset */}
        {!timer.isRunning && timer.time > 0 && (
          <Button
            onClick={handleReset}
            aria-label="Reset timer"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:scale-[1.02] transition-all duration-200"
          >
            <RotateCcw className="size-4" />
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
