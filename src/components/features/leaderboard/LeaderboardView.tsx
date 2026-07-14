"use client";

import { Medal, TrendingUp, Clock, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { AnimatedPage } from "@/components/layout/AnimatedPage";

export function LeaderboardView() {
  const { entries, userRank } = useLeaderboard();

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            See how you rank against other learners
          </p>
        </div>

        {userRank && userRank.rank && (
          <GlassCard glow glowColor="violet" className="p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                  <Medal className="size-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <p className="text-3xl font-bold">
                    #{userRank.rank}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      of {userRank.total}
                    </span>
                  </p>
                </div>
              </div>
              <div className="sm:ml-auto sm:text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-violet-400">
                  {userRank.progress}%
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Top Learners</h3>
          </div>

          {entries.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No leaderboard data yet. Start studying to appear here!
            </p>
          ) : (
            <div className="space-y-2">
              {entries.map((entry, i) => (
                <div
                  key={entry.userId}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0
                        ? "bg-amber-500/15 text-amber-400"
                        : i === 1
                          ? "bg-gray-300/15 text-gray-300"
                          : i === 2
                            ? "bg-orange-500/15 text-orange-400"
                            : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {entry.displayName}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="size-3" />
                        {entry.progress}%
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {entry.totalHours}h
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-muted/50 sm:w-20">
                    <div
                      className="h-full rounded-full bg-violet-500/60"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </AnimatedPage>
  );
}
