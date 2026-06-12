"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { motion } from "framer-motion";
import { Flame, MapPin, Trophy } from "lucide-react";

export function TopNavbar() {
  const userId = useUserId();
  const stats = useQuery(api.progress.getOverallStats, { userId });

  const percentage = stats?.overallPercentage ?? 0;

  return (
    <>
      <div className="relative z-10">
        <GradientProgress value={percentage} height="h-[3px]" />
      </div>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-white/5 px-4 bg-white/[0.02] backdrop-blur-lg sticky top-0 z-50">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="flex flex-1 items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="relative">
              <Flame className="size-4 text-violet-400" />
              {percentage > 0 && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="size-4 text-violet-400" />
                </motion.div>
              )}
            </div>
            <span className="hidden sm:inline">Progress</span>
          </div>
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <GradientProgress value={percentage} height="h-1.5" className="flex-1" />
            <motion.span
              className="text-sm font-mono tabular-nums text-muted-foreground min-w-[3ch]"
              key={percentage}
              initial={{ scale: 1.1, color: "oklch(0.65 0.22 285)" }}
              animate={{ scale: 1, color: "oklch(0.6 0 0)" }}
              transition={{ duration: 0.5 }}
            >
              {percentage}%
            </motion.span>
          </div>
        </div>
        {stats?.currentPhase && (
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-emerald-400" />
            <span className="truncate max-w-[280px]">
              Phase {stats.currentPhase.order}: {stats.currentPhase.title}
              {stats.currentWeek ? ` — ${stats.currentWeek.title}` : ""}
            </span>
          </div>
        )}
        {percentage > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20"
          >
            <Trophy className="size-3 text-violet-400" />
            <span className="text-xs font-medium text-violet-300">
              Week {stats?.currentWeekNumber ?? 1}
            </span>
          </motion.div>
        )}
      </header>
    </>
  );
}
