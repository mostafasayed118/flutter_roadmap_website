"use client";

import { useSkills } from "@/hooks/use-skills";
import { SkillCategoryCard } from "@/components/features/skills/SkillCategoryCard";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { CheckSquare } from "lucide-react";

export default function SkillsPage() {
  const { skills, isLoading, toggleSkill, userId } = useSkills();

  if (isLoading || !skills) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-56 rounded-md" />
          <Skeleton className="mt-1 h-4 w-64 rounded-md" />
        </div>
        <GlassCard className="p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <Skeleton className="h-4 w-36 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </GlassCard>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <GlassCard key={i} className="p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-3 w-10 rounded-md" />
              </div>
              <Skeleton className="mb-3 h-1.5 w-full rounded-full" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-3 px-2 py-1.5">
                    <Skeleton className="size-4 shrink-0 rounded" />
                    <Skeleton className="h-3.5 flex-1 rounded-md" />
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  const allItems = skills.flatMap((c) => c.items);
  const totalItems = allItems.length;

  if (totalItems === 0) {
    return (
      <AnimatedPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Skills Checklist
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your mastery across all Flutter development skills
            </p>
          </div>
          <GlassCard className="p-12">
            <EmptyState
              icon={CheckSquare}
              title="No skills found"
              description="Skills will appear here once they are initialized. Try refreshing the page."
            />
          </GlassCard>
        </div>
      </AnimatedPage>
    );
  }

  const doneItems = allItems.filter((i) => i.completed).length;
  const overallPercentage =
    totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Skills Checklist
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your mastery across all Flutter development skills
          </p>
        </div>

        <GlassCard glow glowColor="violet" className="p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Overall Skills Mastery</span>
            <span className="text-muted-foreground tabular-nums">
              {doneItems}/{totalItems} ({overallPercentage}%)
            </span>
          </div>
          <GradientProgress value={overallPercentage} height="h-2.5" />
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <SkillCategoryCard
              key={category._id}
              category={category.category}
              items={category.items}
              onToggle={(itemIndex) =>
                toggleSkill({
                  userId,
                  category: category.category,
                  itemIndex,
                })
              }
            />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
