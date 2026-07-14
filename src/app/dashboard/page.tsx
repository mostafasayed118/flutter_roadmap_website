"use client";

import { useState, useCallback } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useStudyTimerContext } from "@/components/features/time-tracker/StudyTimerProvider";
import { StudyTimer } from "@/components/features/time-tracker/StudyTimer";
import { SaveSessionDialog } from "@/components/features/time-tracker/SaveSessionDialog";
import { OverallProgressCard } from "@/components/features/dashboard/OverallProgressCard";
import { QuickStatsGrid } from "@/components/features/dashboard/QuickStatsGrid";
import { NextStepsCard } from "@/components/features/dashboard/NextStepsCard";
import { StreakCard } from "@/components/features/dashboard/StreakCard";
import { ShareProgress } from "@/components/features/dashboard/ShareProgress";
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

  useBadgeEvaluator();

  useEffect(() => {
    if (stats && stats.overallPercentage === 100 && wasRef.current < 100) {
      fireBigCelebration();
    }
    if (stats) wasRef.current = stats.overallPercentage;
  }, [stats]);

  const originalStop = timer.stop;
  const interceptedStop = useCallback(() => {
    const elapsed = timer.time;
    originalStop();
    if (elapsed > 60000) {
      setSavedDuration(elapsed);
      setSaveOpen(true);
    }
  }, [timer.time, originalStop]);

  useEffect(() => {
    const handleSaveEvent = () => interceptedStop();
    window.addEventListener("flutter-path:save-session", handleSaveEvent);
    return () => window.removeEventListener("flutter-path:save-session", handleSaveEvent);
  }, [interceptedStop]);

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-32 rounded-full" />
            </div>
          </GlassCard>
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} className="p-4">
              <Skeleton className="h-16 w-full" />
            </GlassCard>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <GlassCard className="p-4"><Skeleton className="h-24" /></GlassCard>
          <div className="lg:col-span-2"><GlassCard className="p-6"><Skeleton className="h-32" /></GlassCard></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <ShareProgress />
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <OverallProgressCard percentage={stats.overallPercentage} />
          <StreakCard />
          <div className="sm:col-span-2 lg:col-span-2">
            <QuickStatsGrid
              completedTopics={stats.completedTopics}
              totalTopics={stats.totalTopics}
              completedProjects={stats.completedProjects}
              totalProjects={stats.totalProjects}
              currentPhaseLabel={stats.currentPhase ? `Phase ${stats.currentPhase.order}: ${stats.currentPhase.title}` : null}
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <StudyTimer onStop={interceptedStop} />
          <div className="lg:col-span-2">
            <NextStepsCard items={stats.nextItems} />
          </div>
        </div>
      </div>

      <SaveSessionDialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        durationMs={savedDuration}
        onSaved={() => { setSaveOpen(false); timer.reset(); }}
      />
    </AnimatedPage>
  );
}
