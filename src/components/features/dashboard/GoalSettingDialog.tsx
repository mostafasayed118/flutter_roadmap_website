"use client";

import { useState } from "react";
import { Target, Pencil } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWeeklyGoal } from "@/hooks/use-goals";
import { cn } from "@/lib/utils";

interface GoalSettingDialogProps {
  weekNumber: number;
  completedTopics: number;
  completedHours: number;
}

export function GoalSettingDialog({
  weekNumber,
  completedTopics,
  completedHours,
}: GoalSettingDialogProps) {
  const { goal, setGoal } = useWeeklyGoal(weekNumber);
  const [open, setOpen] = useState(false);
  const [targetHours, setTargetHours] = useState(goal?.targetHours ?? 5);
  const [targetTopics, setTargetTopics] = useState(goal?.targetTopics ?? 3);

  const handleSave = () => {
    setGoal?.(targetHours, targetTopics);
    setOpen(false);
  };

  const hoursProgress = goal
    ? Math.min(100, Math.round((completedHours / goal.targetHours) * 100))
    : 0;
  const topicsProgress = goal
    ? Math.min(100, Math.round((completedTopics / goal.targetTopics) * 100))
    : 0;
  const goalMet = !!(goal && hoursProgress >= 100 && topicsProgress >= 100);

  return (
    <GlassCard
      glow={goalMet}
      glowColor="emerald"
      className="p-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg",
              goalMet
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-white/5 text-muted-foreground"
            )}
          >
            <Target className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Weekly Goal</p>
            {goal ? (
              <div className="mt-1 space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-violet-500/60 transition-all"
                      style={{ width: `${hoursProgress}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {completedHours.toFixed(1)}/{goal.targetHours}h
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-cyan-500/60 transition-all"
                      style={{ width: `${topicsProgress}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-muted-foreground">
                    {completedTopics}/{goal.targetTopics} topics
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-sm text-muted-foreground">
                No goal set
              </p>
            )}
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Set goal" />
            }
          >
            <Pencil className="size-3.5" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Set Weekly Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Target Hours</label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={targetHours}
                  onChange={(e) => setTargetHours(Number(e.target.value))}
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Topics</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={targetTopics}
                  onChange={(e) => setTargetTopics(Number(e.target.value))}
                  className="mt-1 h-9 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                />
              </div>
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600"
              >
                Save Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </GlassCard>
  );
}
