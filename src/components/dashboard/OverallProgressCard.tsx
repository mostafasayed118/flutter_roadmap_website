"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OverallProgressCardProps {
  percentage: number;
}

export function OverallProgressCard({ percentage }: OverallProgressCardProps) {
  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const color = percentage === 100 ? "#22c55e" : percentage > 50 ? "#3b82f6" : "#f59e0b";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Overall Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <div className="relative size-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={65}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill={color} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold tabular-nums">{percentage}%</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {percentage === 100
            ? "All items completed!"
            : `${100 - percentage}% remaining to complete`}
        </p>
      </CardContent>
    </Card>
  );
}
