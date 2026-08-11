"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { Id } from "@convex/_generated/dataModel";

export function useSessions() {
  const userId = useUserId();
  const sessions = useQuery(
    api.timeTracker.getUserSessions,
    userId ? undefined : "skip"
  );
  const totalTime = useQuery(
    api.timeTracker.getUserTotalTime,
    userId ? undefined : "skip"
  );
  const breakdown = useQuery(
    api.timeTracker.getWeeklyTimeBreakdown,
    userId ? undefined : "skip"
  );

  return {
    sessions,
    totalTime,
    breakdown,
    isLoading: sessions === undefined || totalTime === undefined,
  };
}

export function useWeekTime(weekId: Id<"roadmapWeeks"> | undefined) {
  const userId = useUserId();
  const weekTime = useQuery(
    api.timeTracker.getWeekTotalTime,
    weekId && userId ? { weekId } : "skip"
  );

  return {
    weekTime,
    isLoading: weekTime === undefined && weekId !== undefined,
  };
}

export function useSessionMutations() {
  const addSession = useMutation(api.timeTracker.addSession);
  const updateSession = useMutation(api.timeTracker.updateSession);
  const deleteSession = useMutation(api.timeTracker.deleteSession);

  return {
    addSession,
    updateSession,
    deleteSession,
  };
}
