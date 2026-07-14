"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useStreak() {
  const userId = useUserId();
  const streak = useQuery(
    api.streaks.getStreak,
    userId ? { userId } : "skip"
  );
  const recordStudyDay = useMutation(api.streaks.recordStudyDay);

  return {
    currentStreak: streak?.currentStreak ?? 0,
    longestStreak: streak?.longestStreak ?? 0,
    lastStudyDate: streak?.lastStudyDate ?? 0,
    recordStudyDay: userId ? () => recordStudyDay({ userId }) : undefined,
  };
}
