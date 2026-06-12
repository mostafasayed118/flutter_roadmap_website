"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { OverallProgressCard } from "@/components/dashboard/OverallProgressCard";
import { QuickStatsGrid } from "@/components/dashboard/QuickStatsGrid";
import { NextStepsCard } from "@/components/dashboard/NextStepsCard";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { motion } from "framer-motion";
import { fireBigCelebration } from "@/lib/confetti";
import { useEffect, useRef } from "react";

export default function DashboardPage() {
  const userId = useUserId();
  const stats = useQuery(api.progress.getOverallStats, { userId });
  const wasRef = useRef(0);

  useEffect(() => {
    if (stats && stats.overallPercentage === 100 && wasRef.current < 100) {
      fireBigCelebration();
    }
    if (stats) wasRef.current = stats.overallPercentage;
  }, [stats]);

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-64 mt-1 animate-pulse rounded bg-white/5" />
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="h-48 animate-pulse rounded-xl bg-white/5" />
          {[1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const currentPhaseLabel = stats.currentPhase
    ? `Phase ${stats.currentPhase.order}: ${stats.currentPhase.title}`
    : null;

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your Flutter learning journey across 34 weeks
            {stats.currentWeekNumber
              ? ` · Currently on Week ${stats.currentWeekNumber}`
              : ""}
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
    </AnimatedPage>
  );
}
