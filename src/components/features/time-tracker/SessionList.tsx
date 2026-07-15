"use client";

import { useMemo, useState } from "react";
import { useSessions } from "@/hooks/use-sessions";
import { useRoadmap } from "@/hooks/use-progress";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { formatMinutes } from "@/lib/format-time";
import { EditSessionDialog } from "./EditSessionDialog";
import { DeleteSessionDialog } from "./DeleteSessionDialog";
import { Calendar, Clock, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

function buildWeekNameMap(
  roadmap: ReturnType<typeof useRoadmap>["roadmap"]
): Map<string, string> {
  if (!roadmap) return new Map();
  const map = new Map<string, string>();
  for (const phase of roadmap) {
    for (const week of phase.weeks) {
      map.set(week._id, `Week ${week.order}: ${week.title}`);
    }
  }
  return map;
}

export function SessionList() {
  const { sessions } = useSessions();
  const { roadmap } = useRoadmap();
  const [showCount, setShowCount] = useState(10);

  const weekNameMap = useMemo(() => buildWeekNameMap(roadmap), [roadmap]);
  const visibleSessions = useMemo(() => sessions?.slice(0, showCount) ?? [], [sessions, showCount]);
  const hasMore = sessions ? sessions.length > showCount : false;

  if (!sessions) {
    return (
      <GlassCard className="p-5">
        <h2 className="mb-3 text-lg font-semibold">Recent Sessions</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3"
            >
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-3 w-32 rounded-md" />
              </div>
              <Skeleton className="h-3 w-16 shrink-0 rounded-md" />
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  if (sessions.length === 0) {
    return (
      <GlassCard className="p-5">
        <h2 className="mb-3 text-lg font-semibold">Recent Sessions</h2>
        <EmptyState
          icon={Calendar}
          title="No study sessions yet"
          description="Start the timer above to track your progress."
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <h2 className="mb-3 text-lg font-semibold">Recent Sessions</h2>
      <div className="space-y-2">
        {visibleSessions.map((session, idx) => {
          const date = new Date(session.date);
          const dateStr = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const timeStr = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const weekName = session.weekId
            ? weekNameMap.get(session.weekId) ?? "Unknown week"
            : null;

          return (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:bg-card/50"
            >
              <div className="shrink-0 rounded-lg border border-violet-500/20 bg-violet-500/10 p-2">
                <Clock className="size-4 text-violet-400" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">
                    {formatMinutes(session.durationMinutes)}
                  </span>
                  {weekName && (
                    <span className="truncate text-xs text-violet-400">
                      {weekName}
                    </span>
                  )}
                </div>
                {session.notes && (
                  <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <FileText className="size-3 shrink-0" />
                    {session.notes}
                  </p>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span>{dateStr}</span>
                <span>{timeStr}</span>
              </div>

              <div className="flex shrink-0 items-center">
                <EditSessionDialog
                  sessionId={session._id}
                  initialDuration={session.durationMinutes}
                  initialDate={session.date}
                  initialNotes={session.notes}
                />
                <DeleteSessionDialog
                  sessionId={session._id}
                  sessionLabel={`${formatMinutes(session.durationMinutes)} — ${dateStr} ${timeStr}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full"
          onClick={() => setShowCount((prev) => prev + 10)}
        >
          <ChevronDown className="mr-2 size-4" />
          Show More ({sessions!.length - showCount} remaining)
        </Button>
      )}
    </GlassCard>
  );
}
