"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { WeekCard } from "./WeekCard";

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

  return (
    <AccordionItem value={`phase-${phaseOrder}`} className="border rounded-lg px-4">
      <AccordionTrigger className="hover:no-underline py-4">
        <div className="flex flex-1 items-center justify-between gap-4 text-left">
          <div>
            <h3 className="text-base font-semibold">
              Phase {phaseOrder}: {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {period} · {duration}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="secondary" className="text-xs font-mono">
              {phaseProgress}%
            </Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              {stats.completedTopics + stats.completedProjects}/{totalItems}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 pb-4">
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
