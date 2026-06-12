"use client";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { TopicCheckbox } from "./TopicCheckbox";
import { ProjectCheckbox } from "./ProjectCheckbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

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

  return (
    <Card className={allTopicsDone && allProjectsDone ? "border-green-200 dark:border-green-800" : undefined}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">
            Week {order}: {title}
          </CardTitle>
          <Badge variant="outline" className="shrink-0 text-xs font-normal">
            {estimatedHours}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.length > 0 && (
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
              <BookOpen className="size-3" />
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
            <Separator />
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
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
            <Separator />
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Integrated Courses
              </h4>
              <div className="space-y-2">
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
                      className="w-full justify-between gap-2 h-auto py-2 text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{course.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {course.description}
                        </p>
                      </div>
                      <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
                    </Button>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </CardContent>
    </Card>
  );
}
