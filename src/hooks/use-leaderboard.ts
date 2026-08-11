"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useLeaderboard() {
  const userId = useUserId();
  const leaderboard = useQuery(
    api.leaderboard.getLeaderboard,
    userId ? undefined : "skip"
  );
  const userRank = useQuery(
    api.leaderboard.getUserRank,
    userId ? undefined : "skip"
  );

  return {
    entries: leaderboard ?? [],
    userRank,
  };
}
