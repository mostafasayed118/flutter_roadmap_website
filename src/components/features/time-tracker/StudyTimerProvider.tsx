"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useStudyTimer, type StudyTimerApi } from "@/hooks/use-study-timer";

const StudyTimerContext = createContext<StudyTimerApi | null>(null);

export function useStudyTimerContext(): StudyTimerApi {
  const ctx = useContext(StudyTimerContext);
  if (!ctx) {
    throw new Error(
      "useStudyTimerContext must be used within a <StudyTimerProvider>"
    );
  }
  return ctx;
}

export function StudyTimerProvider({ children }: { children: ReactNode }) {
  const timer = useStudyTimer();

  const value = useMemo<StudyTimerApi>(
    () => ({
      time: timer.time,
      isRunning: timer.isRunning,
      isPaused: timer.isPaused,
      notificationSettings: timer.notificationSettings,
      start: timer.start,
      pause: timer.pause,
      resume: timer.resume,
      stop: timer.stop,
      reset: timer.reset,
      triggerNotification: timer.triggerNotification,
      updateNotificationSettings: timer.updateNotificationSettings,
    }),
    [
      timer.time,
      timer.isRunning,
      timer.isPaused,
      timer.notificationSettings,
      timer.start,
      timer.pause,
      timer.resume,
      timer.stop,
      timer.reset,
      timer.triggerNotification,
      timer.updateNotificationSettings,
    ]
  );

  return (
    <StudyTimerContext.Provider value={value}>
      {children}
    </StudyTimerContext.Provider>
  );
}
