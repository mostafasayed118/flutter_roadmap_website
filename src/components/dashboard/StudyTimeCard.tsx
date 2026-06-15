"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { formatMinutes } from "@/lib/format-time";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function StudyTimeCard() {
  const userId = useUserId();
  const totalTime = useQuery(api.timeTracker.getUserTotalTime, { userId });
  const breakdown = useQuery(api.timeTracker.getWeeklyTimeBreakdown, { userId });

  const chartData =
    breakdown?.map((w) => ({
      name: w.weekTitle,
      minutes: w.minutes,
    })) ?? [];

  const maxMinutes = chartData.reduce((max, d) => Math.max(max, d.minutes), 1);

  return (
    <GlassCard glow glowColor="violet" className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg p-2 bg-violet-500/10 border border-violet-500/20">
          <Clock className="size-5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Total Time Studied</h2>
          <div className="flex items-baseline gap-1">
            <motion.span
              className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {totalTime
                ? formatMinutes(totalTime.totalMinutes)
                : "0m"}
            </motion.span>
            {totalTime && totalTime.sessionCount > 0 && (
              <span className="text-xs text-muted-foreground">
                across {totalTime.sessionCount} session{totalTime.sessionCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${Math.round(v / 60)}h`}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.14 0.005 280)",
                  border: "1px solid oklch(0.22 0.005 280)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value) => [formatMinutes(Number(value)), "Time"]}
              />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {chartData.map((_, idx) => (
                  <Cell
                    key={idx}
                    fill={`oklch(0.65 0.22 285 / ${0.4 + (chartData[idx]!.minutes / maxMinutes) * 0.6})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-40 flex flex-col items-center justify-center text-muted-foreground">
          <BookOpen className="size-8 mb-2 opacity-30" />
          <p className="text-xs">No study sessions logged yet</p>
        </div>
      )}
    </GlassCard>
  );
}
