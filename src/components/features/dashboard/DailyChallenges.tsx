"use client";

import { useState, useEffect, useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useProgress } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { CheckCircle2, Circle, Zap, Target, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  completed: boolean;
  progress: number;
  target: number;
}

export function DailyChallenges() {
  const { stats } = useProgress();
  const { sessions } = useSessions();
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Client-only init: restores today's challenge state from localStorage.
  // Lazy state init would diverge from the server-rendered default.
  useEffect(() => {
    const stored = localStorage.getItem("flutter-roadmap-daily-challenges");
    const today = new Date().toDateString();
    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompletedChallenges(new Set(data.completed));
      }
    }
  }, []);

  const challenges = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySessions = sessions?.filter((s) => {
      const sessionDate = new Date(s.date);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime();
    }) || [];

    const totalMinutesToday = todaySessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0
    );

    const allChallenges: Challenge[] = [
      {
        id: "study-30min",
        title: "Study for 30 minutes",
        description: "Complete at least 30 minutes of study today",
        icon: Clock,
        color: "text-blue-400",
        completed: totalMinutesToday >= 30,
        progress: Math.min(totalMinutesToday, 30),
        target: 30,
      },
      {
        id: "complete-topic",
        title: "Complete a topic",
        description: "Mark one topic as complete",
        icon: BookOpen,
        color: "text-emerald-400",
        completed: (stats?.completedTopics ?? 0) > 0,
        progress: stats?.completedTopics ?? 0,
        target: 1,
      },
      {
        id: "study-session",
        title: "Log a study session",
        description: "Record at least one study session",
        icon: Target,
        color: "text-violet-400",
        completed: todaySessions.length > 0,
        progress: todaySessions.length,
        target: 1,
      },
      {
        id: "streak-maintenance",
        title: "Maintain your streak",
        description: "Study today to keep your streak alive",
        icon: Zap,
        color: "text-amber-400",
        completed: todaySessions.length > 0,
        progress: todaySessions.length > 0 ? 1 : 0,
        target: 1,
      },
    ];

    return allChallenges;
  }, [sessions, stats]);

  const toggleChallenge = (challengeId: string) => {
    const newCompleted = new Set(completedChallenges);
    if (newCompleted.has(challengeId)) {
      newCompleted.delete(challengeId);
    } else {
      newCompleted.add(challengeId);
    }
    setCompletedChallenges(newCompleted);
    localStorage.setItem(
      "flutter-roadmap-daily-challenges",
      JSON.stringify({
        date: new Date().toDateString(),
        completed: [...newCompleted],
      })
    );
  };

  const completedCount = challenges.filter((c) => c.completed).length;
  const totalCount = challenges.length;

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-400" />
          <h3 className="text-sm font-semibold">Daily Challenges</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {completedCount}/{totalCount} completed
        </span>
      </div>

      <div className="space-y-3">
        {challenges.map((challenge, i) => {
          const Icon = challenge.icon;
          const isCompleted = challenge.completed || completedChallenges.has(challenge.id);

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => toggleChallenge(challenge.id)}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all cursor-pointer ${
                isCompleted
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border/50 bg-card/30 hover:bg-card/50"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="size-5 text-emerald-400" />
              ) : (
                <Circle className="size-5 text-muted-foreground" />
              )}

              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    isCompleted ? "text-emerald-400" : "text-foreground"
                  }`}
                >
                  {challenge.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {challenge.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCompleted ? "bg-emerald-400" : "bg-violet-400"
                    }`}
                    style={{
                      width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%`,
                    }}
                  />
                </div>
                <Icon className={`size-4 ${challenge.color}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {completedCount === totalCount && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-center"
        >
          <p className="text-sm font-medium text-amber-400">
            All challenges completed! Great job!
          </p>
        </motion.div>
      )}
    </GlassCard>
  );
}
