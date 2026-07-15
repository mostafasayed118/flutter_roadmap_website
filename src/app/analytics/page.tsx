"use client";

import { useState, useMemo } from "react";
import { useProgress, useRoadmap } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { StudyTimeCard } from "@/components/features/dashboard/StudyTimeCard";
import { WeeklyReview } from "@/components/features/dashboard/WeeklyReview";
import { StudyReminders } from "@/components/features/dashboard/StudyReminders";
import { DailyChallenges } from "@/components/features/dashboard/DailyChallenges";
import { TimerHistory } from "@/components/features/dashboard/TimerHistory";
import { ThemeCustomizer } from "@/components/features/dashboard/ThemeCustomizer";
import { AchievementShowcase } from "@/components/features/dashboard/AchievementShowcase";
import { SessionList } from "@/components/features/time-tracker/SessionList";
import { DocsSuggestions } from "@/components/features/dashboard/DocsSuggestions";
import { GoalSettingDialog } from "@/components/features/dashboard/GoalSettingDialog";
import { BadgeShowcase } from "@/components/features/dashboard/BadgeShowcase";
import { ProgressChart } from "@/components/features/dashboard/ProgressChart";
import { StudyHeatmap } from "@/components/features/dashboard/StudyHeatmap";
import { ExportProgress } from "@/components/features/dashboard/ExportProgress";
import { ExportPDF } from "@/components/features/dashboard/ExportPDF";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, List, Target, Trophy, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { stats, isLoading: statsLoading } = useProgress();
  const { roadmap, isLoading: roadmapLoading } = useRoadmap();
  const { sessions } = useSessions();
  const [activeTab, setActiveTab] = useState("overview");

  const isLoading = statsLoading || roadmapLoading;

  const weeklyData = useMemo(() => {
    if (!roadmap) return [];
    const data: { week: number; topics: number; projects: number }[] = [];
    let weekNumber = 1;
    for (const phase of roadmap) {
      for (const week of phase.weeks) {
        data.push({
          week: weekNumber,
          topics: week.progress.completedTopics.length,
          projects: week.progress.completedProjects.length,
        });
        weekNumber++;
      }
    }
    return data;
  }, [roadmap]);

  const heatmapSessions = useMemo(() => {
    if (!sessions) return [];
    return sessions.map((s) => ({
      date: new Date(s._creationTime).toISOString(),
      durationMs: s.durationMinutes * 60 * 1000,
    }));
  }, [sessions]);

  const completedHours = useMemo(() => {
    if (!sessions) return 0;
    const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
    return totalMinutes / 60;
  }, [sessions]);

  if (isLoading || !stats) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <GlassCard className="p-6"><Skeleton className="h-48" /></GlassCard>
          <GlassCard className="p-6"><Skeleton className="h-48" /></GlassCard>
        </div>
      </div>
    );
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Analytics
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <ExportPDF />
            <ExportProgress />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-11">
            <TabsTrigger value="overview" className="gap-2">
              <Clock className="size-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="gap-2">
              <List className="size-4" />
              <span className="hidden sm:inline">Sessions</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="gap-2">
              <Target className="size-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="gap-2">
              <Trophy className="size-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <BarChart3 className="size-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="space-y-4">
              <WeeklyReview />
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <StudyHeatmap sessions={heatmapSessions} />
                <DailyChallenges />
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <StudyTimeCard />
                <StudyReminders />
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <ThemeCustomizer />
                <DocsSuggestions currentWeek={stats.currentWeekNumber} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="mt-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <TimerHistory />
              <SessionList />
            </div>
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GlassCard className="p-6">
              <GoalSettingDialog
                weekNumber={stats.currentWeekNumber ?? 1}
                completedTopics={stats.completedTopics}
                completedHours={completedHours}
              />
            </GlassCard>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <AchievementShowcase />
              <BadgeShowcase />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressChart weeklyData={weeklyData} />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
