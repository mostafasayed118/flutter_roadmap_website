"use client";

import Link from "next/link";
import { Play, Pause, Square } from "lucide-react";
import { useStudyTimerContext } from "./StudyTimerProvider";
import { cn } from "@/lib/utils";
import { formatTimerDisplay } from "@/lib/format-time";

interface MiniTimerProps {
  onStop?: () => void;
}

export function MiniTimer({ onStop }: MiniTimerProps) {
  const { time, isRunning, isPaused, start, pause, resume, stop } =
    useStudyTimerContext();

  const hasTime = time > 0;

  const handleToggle = () => {
    if (isRunning) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      start();
    }
  };

  const handleStop = () => {
    if (onStop) {
      onStop();
    } else {
      stop();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-sm tabular-nums transition-all duration-200",
          isRunning
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            : hasTime
              ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
              : "border-border bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        )}
        aria-label={`Timer: ${formatTimerDisplay(time)}. Go to dashboard.`}
      >
        {/* Pulsing dot */}
        <span className="relative flex size-1.5">
          {isRunning && (
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          )}
          <span
            className={cn(
              "relative inline-flex size-1.5 rounded-full",
              isRunning
                ? "bg-emerald-400"
                : isPaused
                  ? "bg-amber-400"
                  : "bg-muted-foreground/30"
            )}
          />
        </span>
        {formatTimerDisplay(time)}
      </Link>

      {hasTime && (
        <>
          <button
            onClick={handleToggle}
            aria-label={isRunning ? "Pause timer" : "Resume timer"}
            className={cn(
              "flex size-7 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-[1.02]",
              isRunning
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            )}
          >
            {isRunning ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </button>
          {(isRunning || isPaused) && (
            <button
              onClick={handleStop}
              aria-label="Stop timer"
              className="flex size-7 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 transition-all duration-200 hover:bg-rose-500/20 hover:scale-[1.02]"
            >
              <Square className="size-3.5" />
            </button>
          )}
        </>
      )}
    </div>
  );
}
