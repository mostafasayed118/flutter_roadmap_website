"use client";

import { useMemo } from "react";
import { useSessions } from "@/hooks/use-sessions";
import { useRoadmap } from "@/hooks/use-progress";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { formatMinutes } from "@/lib/format-time";
import { EditSessionDialog } from "./EditSessionDialog";
import { DeleteSessionDialog } from "./DeleteSessionDialog";
import { Clock, Calendar, FileText } from "lucide-react";
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

  const weekNameMap = useMemo(() => buildWeekNameMap(roadmap), [roadmap]);

  if (!sessions) {
    return (
      <GlassCard className="p-5">
        <h2 className="mb-3 text-lg font-semibold">Recent Sessions</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
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
          icon={Clock}
          title="No sessions logged yet"
          description='Click "Log Session" to get started'
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <h2 className="mb-3 text-lg font-semibold">Recent Sessions</h2>
      <div className="space-y-2">
        {sessions.slice(0, 10).map((session, idx) => {
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
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
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
    </GlassCard>
  );
}
