"use client";

import { formatMinutes } from "@/lib/format-time";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ChartData {
  name: string;
  minutes: number;
}

interface WeeklyBarChartProps {
  data: ChartData[];
}

export function WeeklyBarChart({ data }: WeeklyBarChartProps) {
  if (data.length === 0) return null;

  const maxMinutes = data.reduce((max, d) => Math.max(max, d.minutes), 1);

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height={160} minWidth={0}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${Math.round(v / 60)}h`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "hsl(var(--popover-foreground))",
            }}
            formatter={(value) => [formatMinutes(Number(value)), "Time"]}
          />
          <Bar dataKey="minutes" radius={[4, 4, 0, 0]} barSize={48} maxBarSize={64}>
            {data.map((d, idx) => (
              <Cell
                key={idx}
                fill={`hsl(263 70% ${50 + (maxMinutes > 0 ? d.minutes / maxMinutes : 0) * 20}%)`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
