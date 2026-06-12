"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { OverallProgressCard } from "@/components/dashboard/OverallProgressCard";
import { QuickStatsGrid } from "@/components/dashboard/QuickStatsGrid";
import { NextStepsCard } from "@/components/dashboard/NextStepsCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const userId = useUserId();
  const stats = useQuery(api.progress.getOverallStats, { userId });

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <Skeleton className="h-48" />
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  const currentPhaseLabel = stats.currentPhase
    ? `Phase ${stats.currentPhase.order}: ${stats.currentPhase.title}`
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your Flutter learning journey across 34 weeks
          {stats.currentWeekNumber ? ` · Currently on Week ${stats.currentWeekNumber}` : ""}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <OverallProgressCard percentage={stats.overallPercentage} />
        <div className="sm:col-span-2">
          <QuickStatsGrid
            completedTopics={stats.completedTopics}
            totalTopics={stats.totalTopics}
            completedProjects={stats.completedProjects}
            totalProjects={stats.totalProjects}
            currentPhaseLabel={currentPhaseLabel}
          />
        </div>
      </div>

      <NextStepsCard items={stats.nextItems} isLoading={false} />
    </div>
  );
}
