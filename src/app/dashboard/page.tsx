"use client";

import { useState, useCallback } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useStudyTimerContext } from "@/components/features/time-tracker/StudyTimerProvider";
import { StudyTimer } from "@/components/features/time-tracker/StudyTimer";
import { SaveSessionDialog } from "@/components/features/time-tracker/SaveSessionDialog";
import { OverallProgressCard } from "@/components/features/dashboard/OverallProgressCard";
import { QuickStatsGrid } from "@/components/features/dashboard/QuickStatsGrid";
import { NextStepsCard } from "@/components/features/dashboard/NextStepsCard";
import { StudyTimeCard } from "@/components/features/dashboard/StudyTimeCard";
import { SessionList } from "@/components/features/time-tracker/SessionList";
import { DocsSuggestions } from "@/components/features/dashboard/DocsSuggestions";
import { StreakCard } from "@/components/features/dashboard/StreakCard";
import { GoalSettingDialog } from "@/components/features/dashboard/GoalSettingDialog";
import { BadgeShowcase } from "@/components/features/dashboard/BadgeShowcase";
import { ProgressChart } from "@/components/features/dashboard/ProgressChart";
import { ExportProgress } from "@/components/features/dashboard/ExportProgress";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { fireBigCelebration } from "@/lib/confetti";
import { useBadgeEvaluator } from "@/hooks/use-badge-evaluator";
import { useEffect, useRef } from "react";

export default function DashboardPage() {
  const { stats, isLoading } = useProgress();
  const wasRef = useRef(0);
  const [saveOpen, setSaveOpen] = useState(false);
  const [savedDuration, setSavedDuration] = useState(0);
  const timer = useStudyTimerContext();

  // Auto-evaluate and unlock badges when data changes
  useBadgeEvaluator();

  useEffect(() => {
    if (stats && stats.overallPercentage === 100 && wasRef.current < 100) {
      fireBigCelebration();
    }
    if (stats) wasRef.current = stats.overallPercentage;
  }, [stats]);

  // Intercept timer stop to open save dialog
  const originalStop = timer.stop;
  const interceptedStop = useCallback(() => {
    const elapsed = timer.time;
    originalStop();
    if (elapsed > 60000) {
      // Only show dialog if >1 minute
      setSavedDuration(elapsed);
      setSaveOpen(true);
    }
  }, [timer.time, originalStop]);

  // Listen for keyboard shortcut save event
  useEffect(() => {
    const handleSaveEvent = () => {
      interceptedStop();
    };
    window.addEventListener("flutter-path:save-session", handleSaveEvent);
    return () =>
      window.removeEventListener("flutter-path:save-session", handleSaveEvent);
  }, [interceptedStop]);

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="mt-1 h-4 w-64 rounded-md" />
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="size-40 rounded-full" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </GlassCard>
          <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="size-9 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-24 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        <GlassCard className="p-6">
          <Skeleton className="mb-4 h-5 w-28 rounded-md" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border/50 bg-card/30 p-3"
              >
                <Skeleton className="mt-0.5 size-4 shrink-0 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-md" />
                </div>
                <Skeleton className="h-5 w-14 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          <GlassCard className="p-5">
            <Skeleton className="mb-4 h-5 w-36 rounded-md" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </GlassCard>
          <GlassCard className="p-5">
            <Skeleton className="mb-3 h-5 w-32 rounded-md" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3"
                >
                  <Skeleton className="size-9 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-3 w-32 rounded-md" />
                  </div>
                  <Skeleton className="h-3 w-16 shrink-0 rounded-md" />
                </div>
              ))}
            </div>
          </GlassCard>
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your Flutter learning journey across 34 weeks
              {stats.currentWeekNumber
                ? ` · Currently on Week ${stats.currentWeekNumber}`
                : ""}
            </p>
          </div>
          <ExportProgress />
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <OverallProgressCard percentage={stats.overallPercentage} />
          <StreakCard />
          <GoalSettingDialog
            weekNumber={stats.currentWeekNumber ?? 1}
            completedTopics={stats.completedTopics}
            completedHours={0}
          />
          <div className="sm:col-span-2 lg:col-span-1">
            <QuickStatsGrid
              completedTopics={stats.completedTopics}
              totalTopics={stats.totalTopics}
              completedProjects={stats.completedProjects}
              totalProjects={stats.totalProjects}
              currentPhaseLabel={currentPhaseLabel}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <StudyTimer onStop={interceptedStop} />
          </div>
          <div className="lg:col-span-2">
            <NextStepsCard items={stats.nextItems} />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <StudyTimeCard />
          <SessionList />
          <DocsSuggestions currentWeek={stats.currentWeekNumber} />
        </div>

        {/* TODO: Wire ProgressChart to per-week topic/project completion data */}
        <ProgressChart weeklyData={[]} />

        <BadgeShowcase />
      </div>

      <SaveSessionDialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        durationMs={savedDuration}
        onSaved={() => {
          setSaveOpen(false);
          timer.reset();
        }}
      />
    </AnimatedPage>
  );
}
