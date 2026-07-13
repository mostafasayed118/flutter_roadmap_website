"use client";

import { useMemo } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Phase metadata for mapping weeks to phases
const phaseData: Record<
  number,
  { title: string; weeks: number[] }
> = {
  1: { title: "Dart Programming Language", weeks: [1, 2, 3, 4] },
  2: { title: "Flutter Fundamentals", weeks: [5, 6, 7, 8, 9] },
  3: { title: "State Management — Cubit/Bloc", weeks: [10, 11, 12, 13] },
  4: { title: "Networking & APIs", weeks: [14, 15, 16] },
  5: { title: "Local Storage & Database", weeks: [17, 18] },
  6: { title: "Advanced Flutter", weeks: [19, 20, 21, 22] },
  7: { title: "Architecture & Clean Code", weeks: [23, 24, 25] },
  8: { title: "Testing", weeks: [26, 27] },
  9: { title: "Firebase & Backend Services", weeks: [28, 29, 30] },
  10: { title: "Deployment & Portfolio", weeks: [31, 32, 33, 34] },
};

function getWeekPhase(week: number): { phase: number; title: string } | null {
  for (const [phaseNum, data] of Object.entries(phaseData)) {
    if (data.weeks.includes(week)) {
      return { phase: Number(phaseNum), title: data.title };
    }
  }
  return null;
}

interface RelatedRoadmapBannerProps {
  relatedWeeks: number[];
  className?: string;
}

export function RelatedRoadmapBanner({
  relatedWeeks,
  className,
}: RelatedRoadmapBannerProps) {
  const groupedWeeks = useMemo(() => {
    if (relatedWeeks.length === 0) return [];

    const sorted = [...relatedWeeks].sort((a, b) => a - b);
    const groups: { phase: number; phaseTitle: string; weeks: number[] }[] = [];

    for (const week of sorted) {
      const info = getWeekPhase(week);
      if (!info) continue;

      const existing = groups.find((g) => g.phase === info.phase);
      if (existing) {
        existing.weeks.push(week);
      } else {
        groups.push({
          phase: info.phase,
          phaseTitle: info.title,
          weeks: [week],
        });
      }
    }

    return groups;
  }, [relatedWeeks]);

  if (groupedWeeks.length === 0) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-violet-500/20 bg-violet-500/5 p-4",
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-300">
        <MapPin className="size-4" />
        <span>Related Roadmap Weeks</span>
      </div>

      <div className="space-y-2">
        {groupedWeeks.map((group) => (
          <div key={group.phase} className="flex items-start gap-2">
            <span className="mt-0.5 shrink-0 text-xs font-medium text-violet-400/70">
              Phase {group.phase}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {group.weeks.map((week) => (
                <Link
                  key={week}
                  href={`/roadmap#week-${week}`}
                  className="group inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-2 py-1 text-xs font-medium text-violet-300 transition-colors hover:bg-violet-500/20 hover:text-violet-200"
                >
                  Week {week}
                  <ArrowRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
              <span className="py-1 text-xs text-muted-foreground">
                {group.phaseTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
