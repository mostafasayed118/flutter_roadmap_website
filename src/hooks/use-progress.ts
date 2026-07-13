"use client";

import { useCallback, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { Id } from "@convex/_generated/dataModel";

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

/** Minimum interval (ms) between consecutive toggle mutations for the same item. */
const TOGGLE_DEBOUNCE_MS = 100;

export function useWeekProgress() {
  const userId = useUserId();
  const toggleItemMutation = useMutation(api.progress.toggleItem);
  const lastToggleRef = useRef<Map<string, number>>(new Map());

  const toggleItem = useCallback(
    async ({
      weekId,
      type,
      index,
    }: {
      weekId: Id<"roadmapWeeks">;
      type: "topic" | "project";
      index: number;
    }) => {
      const key = `${weekId}:${type}:${index}`;
      const now = Date.now();
      const last = lastToggleRef.current.get(key);

      if (last !== undefined && now - last < TOGGLE_DEBOUNCE_MS) {
        return;
      }

      lastToggleRef.current.set(key, now);
      await toggleItemMutation({ userId, weekId, type, index });
    },
    [userId, toggleItemMutation]
  );

  return {
    userId,
    toggleItem,
  };
}
