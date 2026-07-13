"use client";

import { useMemo, useEffect, useRef } from "react";
import { useWeekProgress } from "@/hooks/use-progress";
import { useWeekTime } from "@/hooks/use-sessions";
import { Id } from "@convex/_generated/dataModel";
import { RoadmapCheckbox } from "./RoadmapCheckbox";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, PlayCircle, Clock, Hammer } from "lucide-react";
import { fireWeekComplete } from "@/lib/confetti";
import { formatMinutes } from "@/lib/format-time";

interface WeekCardProps {
  weekId: Id<"roadmapWeeks">;
  order: number;
  title: string;
  estimatedHours: string;
  topics: string[];
  projects: string[];
  integratedCourses?: {
    title: string;
    url: string;
    description: string;
  }[];
  completedTopics: number[];
  completedProjects: number[];
}

export function WeekCard({
  weekId,
  order,
  title,
  estimatedHours,
  topics,
  projects,
  integratedCourses,
  completedTopics,
  completedProjects,
}: WeekCardProps) {
  const { userId, toggleItem } = useWeekProgress();
  const { weekTime } = useWeekTime(weekId);

  const completedTopicsSet = useMemo(
    () => new Set(completedTopics),
    [completedTopics]
  );
  const completedProjectsSet = useMemo(
    () => new Set(completedProjects),
    [completedProjects]
  );

  const validCompletedTopics = useMemo(
    () => completedTopics.filter((i) => i >= 0 && i < topics.length),
    [completedTopics, topics.length]
  );
  const validCompletedProjects = useMemo(
    () => completedProjects.filter((i) => i >= 0 && i < projects.length),
    [completedProjects, projects.length]
  );

  const totalItems = topics.length + projects.length;
  const completedCount =
    validCompletedTopics.length + validCompletedProjects.length;
  const isWeekComplete = totalItems === 0 ? true : completedCount >= totalItems;
  const wasCompleteRef = useRef(isWeekComplete);

  useEffect(() => {
    if (isWeekComplete && !wasCompleteRef.current) {
      fireWeekComplete();
    }
    wasCompleteRef.current = isWeekComplete;
  }, [isWeekComplete]);

  return (
    <GlassCard
      glow={isWeekComplete}
      glowColor="emerald"
      className={isWeekComplete ? "border-emerald-500/30" : ""}
    >
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold">
            <span className="text-muted-foreground">Week {order}:</span>{" "}
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1.5">
            {weekTime && weekTime.totalMinutes > 0 && (
              <Badge
                variant="outline"
                className="border-violet-500/30 bg-violet-500/10 text-xs font-normal text-violet-400"
              >
                <Clock className="size-3 mr-1" />
                {formatMinutes(weekTime.totalMinutes)}
              </Badge>
            )}
            <Badge
              variant="outline"
              className={`text-xs font-normal ${
                isWeekComplete
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-white/10 text-muted-foreground"
              }`}
            >
              {estimatedHours}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {topics.length > 0 && (
            <section>
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="size-3 text-blue-400" />
                Topics
              </h4>
              <div className="space-y-0.5">
                {topics.map((topic, idx) => (
                  <RoadmapCheckbox
                    key={idx}
                    title={topic}
                    isChecked={completedTopicsSet.has(idx)}
                    onToggle={() =>
                      toggleItem({ weekId, type: "topic", index: idx })
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <>
              <Separator className="bg-white/5" />
              <section>
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Practice Projects
                </h4>
                <div className="space-y-0.5">
                  {projects.map((project, idx) => (
                    <RoadmapCheckbox
                      key={idx}
                      title={project}
                      isChecked={completedProjectsSet.has(idx)}
                      onToggle={() =>
                        toggleItem({ weekId, type: "project", index: idx })
                      }
                      icon={Hammer}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {integratedCourses && integratedCourses.length > 0 && (
            <>
              <Separator className="bg-white/5" />
              <section>
                <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <PlayCircle className="size-3 text-violet-400" />
                  Integrated Courses
                </h4>
                <div className="space-y-1.5">
                  {integratedCourses.map((course, idx) => (
                    <a
                      key={idx}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-between gap-2 h-auto border-white/5 bg-white/[0.02] py-2 text-left hover:border-white/10 hover:bg-white/[0.05]"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {course.title}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {course.description}
                          </p>
                        </div>
                        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                      </Button>
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
