"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";

export function useProgress() {
  const userId = useUserId();
  const stats = useQuery(api.progress.getOverallStats, { userId });

  return {
    stats,
    isLoading: stats === undefined,
  };
}

export function useRoadmap() {
  const userId = useUserId();
  const roadmap = useQuery(api.progress.getRoadmapWithProgress, { userId });
  const seedRoadmap = useMutation(api.seed.seedRoadmap);

  return {
    roadmap,
    isLoading: roadmap === undefined,
    seedRoadmap,
  };
}

export function useWeekProgress() {
  const userId = useUserId();
  const toggleTopic = useMutation(api.progress.toggleTopic);
  const toggleProject = useMutation(api.progress.toggleProject);

  return {
    userId,
    toggleTopic,
    toggleProject,
  };
}
