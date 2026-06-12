"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkillsPage() {
  const userId = useUserId();
  const skills = useQuery(api.skills.getSkills, { userId });
  const initSkills = useMutation(api.skills.initSkills);
  const toggleSkill = useMutation(api.skills.toggleSkill);

  useEffect(() => {
    if (skills !== undefined && skills.length === 0) {
      initSkills({ userId });
    }
  }, [skills, initSkills, userId]);

  if (!skills) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  const allItems = skills.flatMap((c) => c.items);
  const totalItems = allItems.length;
  const doneItems = allItems.filter((i) => i.completed).length;
  const overallPercentage = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Skills Checklist</h1>
        <p className="text-sm text-muted-foreground">
          Track your mastery across all Flutter development skills
        </p>
      </div>

      <div className="rounded-lg border p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Overall Skills Mastery</span>
          <span className="text-muted-foreground tabular-nums">
            {doneItems}/{totalItems} ({overallPercentage}%)
          </span>
        </div>
        <Progress value={overallPercentage} className="h-2.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category) => (
          <SkillCategoryCard
            key={category._id}
            category={category.category}
            items={category.items}
            onToggle={(itemIndex) =>
              toggleSkill({ userId, category: category.category, itemIndex })
            }
          />
        ))}
      </div>
    </div>
  );
}
