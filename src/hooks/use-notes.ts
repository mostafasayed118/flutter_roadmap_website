"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "./use-user-id";
import { Id } from "@convex/_generated/dataModel";

export function useWeekNotes(weekId: Id<"roadmapWeeks"> | undefined) {
  const userId = useUserId();
  const notes = useQuery(
    api.progress.getWeekNotes,
    userId && weekId ? { userId, weekId } : "skip"
  );
  const updateNotes = useMutation(api.progress.updateWeekNotes);

  return {
    notes: notes ?? "",
    updateNotes: userId && weekId
      ? (notes: string) => updateNotes({ userId, weekId, notes })
      : undefined,
  };
}
