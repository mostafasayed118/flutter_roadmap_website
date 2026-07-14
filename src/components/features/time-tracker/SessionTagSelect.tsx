"use client";

import { X } from "lucide-react";
import { SESSION_TAGS, type SessionTag } from "@/hooks/use-tags";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  coding: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "reading docs": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "watching tutorials":
    "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "practice projects":
    "bg-amber-500/15 text-amber-400 border-amber-500/30",
  review: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  debugging: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  testing: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  research: "bg-orange-500/15 text-orange-400 border-orange-500/30",
};

interface SessionTagSelectProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function SessionTagSelect({
  selectedTags,
  onTagsChange,
  className,
}: SessionTagSelectProps) {
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">Tags</label>
      <div className="flex flex-wrap gap-1.5">
        {SESSION_TAGS.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                isSelected
                  ? tagColors[tag] ?? "bg-violet-500/15 text-violet-400 border-violet-500/30"
                  : "border-border bg-background/50 text-muted-foreground hover:bg-muted/50"
              )}
            >
              {tag}
              {isSelected && <X className="size-3" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
