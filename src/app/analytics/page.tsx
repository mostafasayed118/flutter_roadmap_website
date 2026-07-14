"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { StudyTimeCard } from "@/components/features/dashboard/StudyTimeCard";
import { SessionList } from "@/components/features/time-tracker/SessionList";
import { DocsSuggestions } from "@/components/features/dashboard/DocsSuggestions";
import { GoalSettingDialog } from "@/components/features/dashboard/GoalSettingDialog";
import { BadgeShowcase } from "@/components/features/dashboard/BadgeShowcase";
import { ProgressChart } from "@/components/features/dashboard/ProgressChart";
import { ExportProgress } from "@/components/features/dashboard/ExportProgress";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, List, Target, Trophy, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  const { stats, isLoading } = useProgress();
  const [activeTab, setActiveTab] = useState("overview");

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
          <ExportProgress />
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
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <StudyTimeCard />
              <DocsSuggestions currentWeek={stats.currentWeekNumber} />
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="mt-6">
            <SessionList />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GlassCard className="p-6">
              <GoalSettingDialog
                weekNumber={stats.currentWeekNumber ?? 1}
                completedTopics={stats.completedTopics}
                completedHours={0}
              />
            </GlassCard>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <BadgeShowcase />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressChart weeklyData={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
