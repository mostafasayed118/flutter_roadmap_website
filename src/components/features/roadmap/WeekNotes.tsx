"use client";

import { useState, useCallback } from "react";
import { StickyNote, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeekNotes } from "@/hooks/use-notes";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface WeekNotesProps {
  weekId: Id<"roadmapWeeks">;
  className?: string;
}

export function WeekNotes({ weekId, className }: WeekNotesProps) {
  const { notes, updateNotes } = useWeekNotes(weekId);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(notes);

  const handleSave = useCallback(() => {
    updateNotes?.(draft);
    setIsEditing(false);
  }, [draft, updateNotes]);

  const handleCancel = useCallback(() => {
    setDraft(notes);
    setIsEditing(false);
  }, [notes]);

  if (isEditing) {
    return (
      <div className={cn("mt-3", className)}>
        <div className="rounded-lg border border-violet-500/30 bg-violet-500/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-violet-300">
              My Notes
            </span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-6 px-2 text-xs"
              >
                <Save className="mr-1 size-3" />
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCancel}
                className="h-6 px-2 text-xs"
              >
                <X className="size-3" />
              </Button>
            </div>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What did you learn this week?"
            className="h-24 w-full resize-none rounded-md border border-white/10 bg-white/[0.03] p-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mt-3", className)}>
      <button
        onClick={() => {
          setDraft(notes);
          setIsEditing(true);
        }}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <StickyNote className="size-3 text-amber-400" />
        {notes ? (
          <span className="max-w-[200px] truncate">{notes}</span>
        ) : (
          <span>Add a note...</span>
        )}
      </button>
    </div>
  );
}
