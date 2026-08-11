"use client";

import { useMemo } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { useStreak } from "@/hooks/use-streak";
import { GlassCard } from "@/components/ui/glass-card";
import { formatMinutes } from "@/lib/format-time";
import {
  Calendar,
  BookOpen,
  Code,
  Clock,
  Flame,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export function WeeklyReview() {
  const { stats } = useProgress();
  const { sessions } = useSessions();
  const { currentStreak, longestStreak } = useStreak();

  const weeklyStats = useMemo(() => {
    if (!sessions) return null;

    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weekSessions = sessions.filter(
      (s) => new Date(s.date) >= weekStart
    );

    const totalMinutes = weekSessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );

    const topicsCompleted = stats?.completedTopics ?? 0;
    const projectsCompleted = stats?.completedProjects ?? 0;
    const overallPercentage = stats?.overallPercentage ?? 0;

    const dailyBreakdown = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dayStr = date.toDateString();
      const dayMinutes = weekSessions
        .filter((s) => new Date(s.date).toDateString() === dayStr)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        minutes: dayMinutes,
      };
    });

    return {
      totalMinutes,
      sessionCount: weekSessions.length,
      topicsCompleted,
      projectsCompleted,
      overallPercentage,
      dailyBreakdown,
      averageSessionMinutes:
        weekSessions.length > 0
          ? Math.round(totalMinutes / weekSessions.length)
          : 0,
    };
  }, [sessions, stats]);

  if (!weeklyStats) return null;

  const maxDailyMinutes = Math.max(
    ...weeklyStats.dailyBreakdown.map((d) => d.minutes),
    1
  );

  return (
    <GlassCard className="p-6">
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="size-5 text-violet-400" />
        <h2 className="text-lg font-semibold">Weekly Review</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/30 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Clock className="size-4 text-blue-400" />
            <span className="text-xs text-muted-foreground">Study Time</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {formatMinutes(weeklyStats.totalMinutes)}
          </p>
          <p className="text-xs text-muted-foreground">
            {weeklyStats.sessionCount} sessions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-border/50 bg-card/30 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="size-4 text-emerald-400" />
            <span className="text-xs text-muted-foreground">Topics</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {weeklyStats.topicsCompleted}
          </p>
          <p className="text-xs text-muted-foreground">completed</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/30 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Code className="size-4 text-amber-400" />
            <span className="text-xs text-muted-foreground">Projects</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {weeklyStats.projectsCompleted}
          </p>
          <p className="text-xs text-muted-foreground">built</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-border/50 bg-card/30 p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <Flame className="size-4 text-orange-400" />
            <span className="text-xs text-muted-foreground">Streak</span>
          </div>
          <p className="text-2xl font-bold tabular-nums">
            {currentStreak}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              days
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            best: {longestStreak}
          </p>
        </motion.div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Daily Activity
          </span>
          <span className="text-xs text-muted-foreground">
            Avg: {formatMinutes(weeklyStats.averageSessionMinutes)}/session
          </span>
        </div>
        <div className="flex items-end gap-1 h-20">
          {weeklyStats.dailyBreakdown.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ height: 0 }}
              animate={{
                height: `${(day.minutes / maxDailyMinutes) * 100}%`,
              }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
              className="flex-1 rounded-t bg-violet-500/50 min-h-[2px]"
              title={`${day.day}: ${formatMinutes(day.minutes)}`}
            />
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {weeklyStats.dailyBreakdown.map((day) => (
            <div
              key={day.day}
              className="flex-1 text-center text-[9px] text-muted-foreground"
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      {weeklyStats.overallPercentage > 0 && (
        <div className="mt-6 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-violet-400" />
            <span className="text-sm font-medium">Overall Progress</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${weeklyStats.overallPercentage}%` }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
              />
            </div>
            <span className="text-sm font-bold tabular-nums">
              {weeklyStats.overallPercentage}%
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
