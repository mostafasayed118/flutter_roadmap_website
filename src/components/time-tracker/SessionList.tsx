"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { GlassCard } from "@/components/ui/glass-card";
import { formatMinutes } from "@/lib/format-time";
import { EditSessionDialog } from "./EditSessionDialog";
import { DeleteSessionDialog } from "./DeleteSessionDialog";
import { Clock, Calendar, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function SessionList() {
  const userId = useUserId();
  const sessions = useQuery(api.timeTracker.getUserSessions, { userId });

  if (!sessions) {
    return (
      <GlassCard className="p-5">
        <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      </GlassCard>
    );
  }

  if (sessions.length === 0) {
    return (
      <GlassCard className="p-5">
        <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Clock className="size-8 mb-2 opacity-30" />
          <p className="text-sm">No sessions logged yet</p>
          <p className="text-xs mt-1">Click "Log Session" to get started</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <h2 className="text-lg font-semibold mb-3">Recent Sessions</h2>
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

          return (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-colors"
            >
              <div className="rounded-lg p-2 bg-violet-500/10 border border-violet-500/20 shrink-0">
                <Clock className="size-4 text-violet-400" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums">
                    {formatMinutes(session.durationMinutes)}
                  </span>
                  {session.weekId && (
                    <span className="text-xs text-muted-foreground truncate">
                      linked to week
                    </span>
                  )}
                </div>
                {session.notes && (
                  <p className="text-xs text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                    <FileText className="size-3 shrink-0" />
                    {session.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span>{dateStr}</span>
                <span>{timeStr}</span>
              </div>

              <div className="flex items-center shrink-0">
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
