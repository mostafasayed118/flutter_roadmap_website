"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StudyHeatmapProps {
  sessions: { date: string; durationMs: number }[];
}

export function StudyHeatmap({ sessions }: StudyHeatmapProps) {
  const heatmapData = useMemo(() => {
    const now = new Date();
    const weeks: { date: Date; count: number; duration: number }[][] = [];
    const sessionMap = new Map<string, number>();

    for (const session of sessions) {
      const date = new Date(session.date).toDateString();
      sessionMap.set(date, (sessionMap.get(date) || 0) + session.durationMs);
    }

    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 83);

    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    let currentWeek: { date: Date; count: number; duration: number }[] = [];
    for (let i = 0; i < 84; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toDateString();
      const duration = sessionMap.get(dateStr) || 0;
      const count = duration > 0 ? Math.ceil(duration / (25 * 60 * 1000)) : 0;

      currentWeek.push({ date, count, duration });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [sessions]);

  const totalMinutes = useMemo(() => {
    return sessions.reduce((sum, s) => sum + s.durationMs, 0) / (60 * 1000);
  }, [sessions]);

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-muted/30";
    if (count === 1) return "bg-violet-500/30";
    if (count === 2) return "bg-violet-500/50";
    if (count === 3) return "bg-violet-500/70";
    return "bg-violet-500";
  };

  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="size-4 text-orange-400" />
          <h3 className="text-sm font-semibold">Study Activity</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {Math.round(totalMinutes / 60)}h total
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          <div className="flex flex-col gap-1 pr-2">
            {dayLabels.map((label, i) => (
              <div key={i} className="h-3 w-8 text-[9px] text-muted-foreground">
                {label}
              </div>
            ))}
          </div>

          {heatmapData.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: (weekIdx * 7 + dayIdx) * 0.002 }}
                  className={`h-3 w-3 rounded-sm ${getIntensity(day.count)} transition-colors hover:ring-1 hover:ring-violet-400/50`}
                  title={`${day.date.toLocaleDateString()}: ${day.count > 0 ? formatDuration(day.duration) : "No study"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1">
        <span className="text-[9px] text-muted-foreground">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2.5 w-2.5 rounded-sm ${
              level === 0
                ? "bg-muted/30"
                : level === 1
                ? "bg-violet-500/30"
                : level === 2
                ? "bg-violet-500/50"
                : level === 3
                ? "bg-violet-500/70"
                : "bg-violet-500"
            }`}
          />
        ))}
        <span className="text-[9px] text-muted-foreground">More</span>
      </div>
    </GlassCard>
  );
}
