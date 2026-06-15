"use client";

import { useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";

export default function SkillsPage() {
  const userId = useUserId();
  const skills = useQuery(api.skills.getSkills, { userId });
  const initSkills = useMutation(api.skills.initSkills);
  const toggleSkill = useMutation(api.skills.toggleSkill);

  const initAttempted = useRef(false);

  useEffect(() => {
    if (skills !== undefined && skills.length === 0 && !initAttempted.current) {
      initAttempted.current = true;
      initSkills({ userId }).catch((err) => {
        console.error("Failed to initialize skills:", err);
        initAttempted.current = false;
      });
    }
  }, [skills, initSkills, userId]);

  if (!skills) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-64 mt-1 animate-pulse rounded bg-white/5" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-white/5" />
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
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Skills Checklist
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your mastery across all Flutter development skills
          </p>
        </div>

        <GlassCard glow glowColor="violet" className="p-4">
          <div className="flex items-center justify-between text-sm mb-2">
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
                toggleSkill({ userId, category: category.category, itemIndex })
              }
            />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}
