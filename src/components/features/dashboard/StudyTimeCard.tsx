"use client";

import { useSessions } from "@/hooks/use-sessions";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { formatMinutes } from "@/lib/format-time";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import dynamic from "next/dynamic";

const WeeklyBarChart = dynamic(
  () =>
    import("./WeeklyBarChart").then((mod) => mod.WeeklyBarChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-40">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    ),
  }
);

interface ChartData {
  name: string;
  minutes: number;
}

export function StudyTimeCard() {
  const { totalTime, breakdown, isLoading } = useSessions();

  const chartData: ChartData[] =
    breakdown?.map((w) => ({
      name: w.weekTitle,
      minutes: w.minutes,
    })) ?? [];

  return (
    <GlassCard glow glowColor="violet" className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/10 p-2">
          <Clock className="size-5 text-violet-400" />
        </div>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">
            Total Time Studied
          </h2>
          {isLoading ? (
            <div className="mt-1 flex items-baseline gap-2">
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          ) : (
            <div className="flex items-baseline gap-1">
              <motion.span
                className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {formatMinutes(totalTime?.totalMinutes ?? 0)}
              </motion.span>
              {(totalTime?.sessionCount ?? 0) > 0 && (
                <span className="text-xs text-muted-foreground">
                  across {totalTime!.sessionCount} session
                  {totalTime!.sessionCount !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="h-40 space-y-2">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>
      ) : chartData.length > 0 ? (
        <WeeklyBarChart data={chartData} />
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No study sessions logged yet"
          className="h-40 py-0"
        />
      )}
    </GlassCard>
  );
}
