"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { WeekCard } from "./WeekCard";
import { CheckCircle2 } from "lucide-react";

interface WeekData {
  _id: string;
  _creationTime: number;
  phaseId: string;
  order: number;
  title: string;
  estimatedHours: string;
  topics: string[];
  projects: string[];
  integratedCourses?: { title: string; url: string; description: string }[];
  progress: {
    completedTopics: number[];
    completedProjects: number[];
  };
}

interface PhaseAccordionProps {
  phaseId: string;
  order: number;
  title: string;
  duration: string;
  period: string;
  weeks: WeekData[];
  stats: {
    totalTopics: number;
    totalProjects: number;
    completedTopics: number;
    completedProjects: number;
  };
}

export function PhaseAccordion({
  order: phaseOrder,
  title,
  duration,
  period,
  weeks,
  stats,
}: PhaseAccordionProps) {
  const totalItems = stats.totalTopics + stats.totalProjects;
  const doneItems = stats.completedTopics + stats.completedProjects;
  const phaseProgress = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;
  const isPhaseComplete = phaseProgress === 100;

  return (
    <AccordionItem
      value={`phase-${phaseOrder}`}
      className={`rounded-xl border px-4 ${
        isPhaseComplete
          ? "border-emerald-500/20 bg-emerald-500/[0.02]"
          : "border-white/5 bg-white/[0.02]"
      }`}
    >
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex flex-1 items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            {isPhaseComplete ? (
              <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
            ) : (
              <div className="flex items-center justify-center size-5 rounded-full border border-white/10 text-xs text-muted-foreground shrink-0 font-mono">
                {phaseOrder}
              </div>
            )}
            <div>
              <h2 className="text-sm font-semibold">
                Phase {phaseOrder}: {title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {period} · {duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-20 hidden sm:block">
              <GradientProgress value={phaseProgress} height="h-1.5" />
            </div>
            <Badge
              variant="outline"
              className={`text-xs font-mono ${
                isPhaseComplete
                  ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                  : "border-white/10 text-muted-foreground"
              }`}
            >
              {phaseProgress}%
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3 pb-4">
          {weeks.map((week) => (
            <WeekCard
              key={week._id}
              weekId={week._id}
              order={week.order}
              title={week.title}
              estimatedHours={week.estimatedHours}
              topics={week.topics}
              projects={week.projects}
              integratedCourses={week.integratedCourses}
              completedTopics={week.progress.completedTopics}
              completedProjects={week.progress.completedProjects}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
