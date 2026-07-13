"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUserId } from "./use-user-id";

export function useBookmarks() {
  const userId = useUserId();
  const bookmarks = useQuery(
    api.bookmarks.getBookmarks,
    userId ? { userId } : "skip"
  );
  const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
  const updateNote = useMutation(api.bookmarks.updateBookmarkNote);

  const isBookmarked = (weekId: string, topicIndex: number) => {
    if (!bookmarks) return false;
    return bookmarks.some(
      (b) => b.weekId === weekId && b.topicIndex === topicIndex
    );
  };

  return {
    bookmarks: bookmarks ?? [],
    isBookmarked,
    toggleBookmark: userId
      ? (weekId: string, topicIndex: number, topicTitle: string) =>
          toggleBookmark({ userId, weekId: weekId as any, topicIndex, topicTitle })
      : undefined,
    updateNote,
  };
}
