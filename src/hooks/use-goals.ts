"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useWeeklyGoal(weekNumber: number) {
  const userId = useUserId();
  const year = new Date().getFullYear();
  const goal = useQuery(
    api.goals.getGoal,
    userId ? { weekNumber, year } : "skip"
  );
  const setGoal = useMutation(api.goals.setGoal);

  return {
    goal,
    setGoal: userId
      ? (targetHours: number, targetTopics: number) =>
          setGoal({ weekNumber, targetHours, targetTopics, year })
      : undefined,
  };
}
