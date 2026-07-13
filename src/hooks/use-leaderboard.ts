"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useLeaderboard() {
  const userId = useUserId();
  const leaderboard = useQuery(api.leaderboard.getLeaderboard, {});
  const userRank = useQuery(
    api.leaderboard.getUserRank,
    userId ? { userId } : "skip"
  );

  return {
    entries: leaderboard ?? [],
    userRank,
  };
}
