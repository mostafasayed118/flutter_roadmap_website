"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp } from "lucide-react";

interface ProgressChartProps {
  weeklyData: { week: number; topics: number; projects: number }[];
}

export function ProgressChart({ weeklyData }: ProgressChartProps) {
  const chartData = useMemo(() => {
    let cumTopics = 0;
    let cumProjects = 0;
    return weeklyData.map((d) => {
      cumTopics += d.topics;
      cumProjects += d.projects;
      return {
        week: `W${d.week}`,
        topics: cumTopics,
        projects: cumProjects,
        total: cumTopics + cumProjects,
      };
    });
  }, [weeklyData]);

  if (chartData.length === 0) return null;

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="size-4 text-emerald-400" />
        <h3 className="text-sm font-semibold">Progress Over Time</h3>
      </div>

      <div className="h-40 sm:h-48" role="img" aria-label="Progress chart showing topics and projects completed over time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                fontSize: "12px",
                backdropFilter: "blur(8px)",
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 2, stroke: "#8b5cf6" }}
              name="Total Items"
            />
            <Line
              type="monotone"
              dataKey="topics"
              stroke="#06b6d4"
              strokeWidth={1.5}
              dot={{ fill: "#06b6d4", r: 2, strokeWidth: 0 }}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#06b6d4" }}
              name="Topics"
            />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#f59e0b"
              strokeWidth={1.5}
              dot={{ fill: "#f59e0b", r: 2, strokeWidth: 0 }}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "#f59e0b" }}
              name="Projects"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground" role="list" aria-label="Chart legend">
        <span className="flex items-center gap-1" role="listitem">
          <span className="size-2 rounded-full bg-violet-500" aria-hidden="true" /> Total
        </span>
        <span className="flex items-center gap-1" role="listitem">
          <span className="size-2 rounded-full bg-cyan-500" aria-hidden="true" /> Topics
        </span>
        <span className="flex items-center gap-1" role="listitem">
          <span className="size-2 rounded-full bg-amber-500" aria-hidden="true" /> Projects
        </span>
      </div>
    </GlassCard>
  );
}
