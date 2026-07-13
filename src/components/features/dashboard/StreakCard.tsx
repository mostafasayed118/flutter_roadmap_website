"use client";

import { Flame, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useStreak } from "@/hooks/use-streak";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StreakCard() {
  const { currentStreak, longestStreak } = useStreak();

  return (
    <GlassCard
      glow={currentStreak > 0}
      glowColor="violet"
      className="p-4"
    >
      <div className="flex items-start gap-3">
        <motion.div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            currentStreak > 0
              ? "bg-orange-500/15 text-orange-400"
              : "bg-white/5 text-muted-foreground"
          )}
          animate={
            currentStreak > 0
              ? { scale: [1, 1.05, 1] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame className="size-5" />
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">Study Streak</p>
          <p className="text-2xl font-bold tabular-nums">
            {currentStreak}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              day{currentStreak !== 1 ? "s" : ""}
            </span>
          </p>
        </div>
      </div>
      {longestStreak > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Trophy className="size-3 text-amber-400" />
          <span>
            Best: {longestStreak} day{longestStreak !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
