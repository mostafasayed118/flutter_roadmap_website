"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useBadges() {
  const userId = useUserId();
  const badges = useQuery(
    api.badges.getBadges,
    userId ? { userId } : "skip"
  );
  const unlockBadge = useMutation(api.badges.unlockBadge);

  const unlockedCount = badges?.filter((b: any) => b.unlocked).length ?? 0;
  const totalCount = badges?.length ?? 0;

  return {
    badges: badges ?? [],
    unlockedCount,
    totalCount,
    unlockBadge: userId
      ? (badgeId: string) => unlockBadge({ userId, badgeId })
      : undefined,
  };
}
