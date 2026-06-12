"use client";

import { useMemo, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { TopicCheckbox } from "./TopicCheckbox";
import { ProjectCheckbox } from "./ProjectCheckbox";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, PlayCircle } from "lucide-react";
import { fireWeekComplete } from "@/lib/confetti";

interface WeekCardProps {
  weekId: string;
  order: number;
  title: string;
  estimatedHours: string;
  topics: string[];
  projects: string[];
  integratedCourses?: { title: string; url: string; description: string }[];
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
  const userId = useUserId();
  const toggleTopic = useMutation(api.progress.toggleTopic);
  const toggleProject = useMutation(api.progress.toggleProject);

  const completedTopicsSet = new Set(completedTopics);
  const completedProjectsSet = new Set(completedProjects);

  const allTopicsDone = topics.length > 0 && topics.every((_, i) => completedTopicsSet.has(i));
  const allProjectsDone = projects.length > 0 && projects.every((_, i) => completedProjectsSet.has(i));
  const isWeekComplete = allTopicsDone && allProjectsDone;
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
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold">
            <span className="text-muted-foreground">Week {order}:</span> {title}
          </h3>
          <Badge
            variant="outline"
            className={`shrink-0 text-xs font-normal ${
              isWeekComplete
                ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                : "border-white/10 text-muted-foreground"
            }`}
          >
            {estimatedHours}
          </Badge>
        </div>

        <div className="space-y-3">
          {topics.length > 0 && (
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
                <BookOpen className="size-3 text-blue-400" />
                Topics
              </h4>
              <div className="space-y-0.5">
                {topics.map((topic, idx) => (
                  <TopicCheckbox
                    key={idx}
                    title={topic}
                    isChecked={completedTopicsSet.has(idx)}
                    onToggle={() =>
                      toggleTopic({ userId, weekId: weekId as any, topicIndex: idx })
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
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Practice Projects
                </h4>
                <div className="space-y-0.5">
                  {projects.map((project, idx) => (
                    <ProjectCheckbox
                      key={idx}
                      title={project}
                      isChecked={completedProjectsSet.has(idx)}
                      onToggle={() =>
                        toggleProject({ userId, weekId: weekId as any, projectIndex: idx })
                      }
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
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1.5">
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
                        className="w-full justify-between gap-2 h-auto py-2 text-left border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{course.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
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
