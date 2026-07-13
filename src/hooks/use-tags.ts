"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserId } from "./use-user-id";

export const SESSION_TAGS = [
  "coding",
  "reading docs",
  "watching tutorials",
  "practice projects",
  "review",
  "debugging",
  "testing",
  "research",
] as const;

export type SessionTag = (typeof SESSION_TAGS)[number];

export function useTagBreakdown() {
  const userId = useUserId();
  const breakdown = useQuery(
    api.timeTracker.getTagBreakdown,
    userId ? { userId } : "skip"
  );

  return {
    tags: breakdown?.tags ?? [],
    untaggedMinutes: breakdown?.untaggedMinutes ?? 0,
  };
}
