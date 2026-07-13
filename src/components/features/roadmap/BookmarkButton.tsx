"use client";

import { Star } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  weekId: Id<"roadmapWeeks">;
  topicIndex: number;
  topicTitle: string;
  className?: string;
}

export function BookmarkButton({
  weekId,
  topicIndex,
  topicTitle,
  className,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(weekId, topicIndex);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark?.(weekId, topicIndex, topicTitle);
      }}
      className={cn(
        "shrink-0 rounded-md p-1 transition-colors",
        bookmarked
          ? "text-amber-400 hover:text-amber-300"
          : "text-muted-foreground/30 hover:text-muted-foreground/80",
        className
      )}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Star
        className="size-3.5"
        fill={bookmarked ? "currentColor" : "none"}
      />
    </button>
  );
}
