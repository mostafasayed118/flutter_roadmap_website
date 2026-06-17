"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Code, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface QuickStatsGridProps {
  completedTopics: number;
  totalTopics: number;
  completedProjects: number;
  totalProjects: number;
  currentPhaseLabel: string | null;
  isLoading?: boolean;
}

export function QuickStatsGrid({
  completedTopics,
  totalTopics,
  completedProjects,
  totalProjects,
  currentPhaseLabel,
  isLoading = false,
}: QuickStatsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "Topics Completed",
      value: `${completedTopics} / ${totalTopics}`,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Projects Built",
      value: `${completedProjects} / ${totalProjects}`,
      icon: Code,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Current Focus",
      value: currentPhaseLabel ?? "Not started",
      icon: MapPin,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.08 }}
          >
            <GlassCard hover className="p-4">
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${stat.bg} border ${stat.border}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-lg font-bold tabular-nums truncate">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
