"use client";

import { useProgress } from "@/hooks/use-progress";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { motion } from "framer-motion";
import { LogSessionDialog } from "@/components/features/time-tracker/LogSessionDialog";
import { Flame, MapPin, Trophy } from "lucide-react";

export function TopNavbar() {
  const { stats } = useProgress();

  const percentage = stats?.overallPercentage ?? 0;

  return (
    <>
      <div className="relative z-10">
        <GradientProgress value={percentage} height="h-[3px]" />
      </div>
      <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-white/5 bg-white/[0.02] px-3 backdrop-blur-lg sm:gap-3 sm:px-4">
        <SidebarTrigger
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle sidebar navigation"
        />
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
          <div className="flex max-w-xs flex-1 items-center gap-2 sm:max-w-md">
            <GradientProgress
              value={percentage}
              height="h-1.5"
              className="flex-1"
            />
            <motion.span
              className="min-w-[3ch] font-mono text-sm tabular-nums text-muted-foreground"
              key={percentage}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {percentage}%
            </motion.span>
          </div>
        </div>
        {stats?.currentPhase && (
          <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            <MapPin className="size-4 text-emerald-400" />
            <span className="max-w-[280px] truncate">
              Phase {stats.currentPhase.order}: {stats.currentPhase.title}
              {stats.currentWeek ? ` — ${stats.currentWeek.title}` : ""}
            </span>
          </div>
        )}
        {percentage > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`hidden items-center gap-1.5 rounded-full border px-2 py-1 lg:flex ${
              percentage === 100
                ? "border-emerald-500/20 bg-emerald-500/10"
                : "border-violet-500/20 bg-violet-500/10"
            }`}
          >
            <Trophy
              className={`size-3 ${percentage === 100 ? "text-emerald-400" : "text-violet-400"}`}
            />
            <span
              className={`text-xs font-medium ${percentage === 100 ? "text-emerald-300" : "text-violet-300"}`}
            >
              {percentage === 100
                ? "Complete!"
                : `Week ${stats?.currentWeekNumber ?? 1}`}
            </span>
          </motion.div>
        )}
        <div className="hidden sm:block">
          <LogSessionDialog />
        </div>
      </header>
    </>
  );
}
