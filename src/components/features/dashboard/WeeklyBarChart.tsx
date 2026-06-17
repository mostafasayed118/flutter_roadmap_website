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
  const maxMinutes = data.reduce((max, d) => Math.max(max, d.minutes), 1);

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height={160} minWidth={0}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
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
            {data.map((d, idx) => (
              <Cell
                key={idx}
                fill={`oklch(0.65 0.22 285 / ${0.4 + (maxMinutes > 0 ? d.minutes / maxMinutes : 0) * 0.6})`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
