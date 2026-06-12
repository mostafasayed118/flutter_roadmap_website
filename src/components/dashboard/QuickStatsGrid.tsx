"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, MapPin } from "lucide-react";

interface QuickStatsGridProps {
  completedTopics: number;
  totalTopics: number;
  completedProjects: number;
  totalProjects: number;
  currentPhaseLabel: string | null;
}

export function QuickStatsGrid({
  completedTopics,
  totalTopics,
  completedProjects,
  totalProjects,
  currentPhaseLabel,
}: QuickStatsGridProps) {
  const stats = [
    {
      title: "Topics Completed",
      value: `${completedTopics} / ${totalTopics}`,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Projects Built",
      value: `${completedProjects} / ${totalProjects}`,
      icon: Code,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Current Focus",
      value: currentPhaseLabel ?? "Not started",
      icon: MapPin,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-950",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <Icon className={`size-5 ${stat.color}`} />
              </div>
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
