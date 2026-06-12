"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { PhaseAccordion } from "@/components/roadmap/PhaseAccordion";
import { Accordion } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function RoadmapPage() {
  const userId = useUserId();
  const roadmap = useQuery(api.progress.getRoadmapWithProgress, { userId });

  if (!roadmap) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72 mt-1" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Flutter Roadmap</h1>
        <p className="text-sm text-muted-foreground">
          34 weeks · 10 phases · Track your progress by checking off topics and projects
        </p>
      </div>

      <Accordion defaultValue={roadmap.map((p) => `phase-${p.order}`)} className="space-y-3">
        {roadmap.map((phase) => (
          <PhaseAccordion
            key={phase._id}
            phaseId={phase._id}
            order={phase.order}
            title={phase.title}
            duration={phase.duration}
            period={phase.period}
            weeks={phase.weeks}
            stats={phase.stats}
          />
        ))}
      </Accordion>
    </div>
  );
}
