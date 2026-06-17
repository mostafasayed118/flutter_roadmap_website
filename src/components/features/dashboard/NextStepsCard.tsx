"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, BookOpen, Hammer, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface NextStepsCardProps {
  items: { title: string; week: string; type: "topic" | "project" }[];
  isLoading?: boolean;
}

export function NextStepsCard({ items, isLoading = false }: NextStepsCardProps) {
  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <Skeleton className="size-4 mt-0.5 shrink-0 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/2 rounded-md" />
              </div>
              <Skeleton className="h-5 w-14 shrink-0 rounded-full" />
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard glow glowColor="violet" className="p-6">
      <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-3 mb-3">
            <CheckCircle2 className="size-6 text-emerald-400" />
          </div>
          <p className="text-sm font-medium">All caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">
            You&apos;ve completed all current items. Keep going on the Roadmap page.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200"
            >
              <div className="mt-0.5">
                {item.type === "topic" ? (
                  <BookOpen className="size-4 text-blue-400" />
                ) : (
                  <Hammer className="size-4 text-emerald-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.week}</p>
              </div>
              <Badge
                variant="outline"
                className={`shrink-0 text-xs ${
                  item.type === "topic"
                    ? "border-blue-500/30 text-blue-400"
                    : "border-emerald-500/30 text-emerald-400"
                }`}
              >
                {item.type === "topic" ? "Topic" : "Project"}
              </Badge>
            </motion.div>
          ))}
          <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
            <ArrowRight className="size-3" />
            <span>Continue on the Roadmap page to track more</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
