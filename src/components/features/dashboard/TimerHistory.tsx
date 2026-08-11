"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { formatTimerDisplay } from "@/lib/format-time";
import { Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerSession {
  id: string;
  date: string;
  durationMs: number;
  mode: string;
  completed: boolean;
}

const STORAGE_KEY = "flutter-roadmap-timer-history";

function loadHistory(): TimerSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: TimerSession[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function TimerHistory() {
  const [history, setHistory] = useState<TimerSession[]>([]);

  // Client-only init: reads the session history from localStorage. Lazy
  // state init would diverge from the server-rendered default.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadHistory());
  }, []);

  const clearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  const deleteSession = (id: string) => {
    const newHistory = history.filter((s) => s.id !== id);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const totalDuration = history.reduce((sum, s) => sum + s.durationMs, 0);

  if (history.length === 0) {
    return (
      <GlassCard className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Timer History</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-4">
          No timer sessions yet. Start a timer to see your history here.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-violet-400" />
          <h3 className="text-sm font-semibold">Timer History</h3>
        </div>
        <button
          onClick={clearHistory}
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <p className="text-lg font-bold tabular-nums">{history.length}</p>
          <p className="text-xs text-muted-foreground">Sessions</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-2 text-center">
          <p className="text-lg font-bold tabular-nums">
            {formatTimerDisplay(totalDuration)}
          </p>
          <p className="text-xs text-muted-foreground">Total Time</p>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {history.slice(0, 10).map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card/30 p-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`size-2 rounded-full ${
                    session.completed ? "bg-emerald-400" : "bg-amber-400"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium">
                    {formatTimerDisplay(session.durationMs)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(session.date).toLocaleDateString()} · {session.mode}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteSession(session.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {history.length > 10 && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Showing 10 of {history.length} sessions
        </p>
      )}
    </GlassCard>
  );
}

export function addTimerSession(durationMs: number, mode: string, completed: boolean) {
  const history = loadHistory();
  const newSession: TimerSession = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    durationMs,
    mode,
    completed,
  };
  history.unshift(newSession);
  // Keep only last 100 sessions
  if (history.length > 100) history.pop();
  saveHistory(history);
}
