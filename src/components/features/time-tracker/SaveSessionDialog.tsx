"use client";

import { useState, useMemo } from "react";
import { useSessionMutations } from "@/hooks/use-sessions";
import { useRoadmap } from "@/hooks/use-progress";
import { useUserId } from "@/hooks/use-user-id";
import { Id } from "@convex/_generated/dataModel";
import { formatMinutes, todayInputValue } from "@/lib/format-time";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_NOTES_LENGTH = 200;

interface SaveSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  durationMs: number;
  onSaved: () => void;
}

export function SaveSessionDialog({
  open,
  onOpenChange,
  durationMs,
  onSaved,
}: SaveSessionDialogProps) {
  const userId = useUserId();
  const { addSession } = useSessionMutations();
  const { roadmap } = useRoadmap();

  const [weekId, setWeekId] = useState<string>("general");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const durationMinutes = Math.max(1, Math.round(durationMs / 60000));

  const allWeeks = useMemo(
    () =>
      roadmap?.flatMap((phase) =>
        phase.weeks.map((w) => ({
          id: w._id,
          label: `Week ${w.order}: ${w.title}`,
        }))
      ) ?? [],
    [roadmap]
  );

  const handleSave = async () => {
    if (durationMinutes <= 0) {
      toast.error("Duration must be at least 1 minute");
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date();
      const dateTimestamp = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      await addSession({
        userId,
        weekId: weekId === "general" ? undefined : (weekId as Id<"roadmapWeeks">),
        durationMinutes,
        date: dateTimestamp,
        notes: notes.trim() || undefined,
      });

      toast.success(
        `Saved ${formatMinutes(durationMinutes)} study session`
      );
      onOpenChange(false);
      onSaved();
      resetForm();
    } catch {
      toast.error("Failed to save session");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setWeekId("general");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Clock className="size-5 text-violet-400" />
            Save Study Session
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 space-y-4"
        >
          {/* Duration Display */}
          <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
            <Clock className="size-5 text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-300">
                {formatMinutes(durationMinutes)}
              </p>
              <p className="text-xs text-muted-foreground">
                Recorded study time
              </p>
            </div>
          </div>

          {/* Week Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Week (optional)
            </label>
            <div className="relative">
              <select
                value={weekId}
                onChange={(e) => setWeekId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-muted/50 px-3 py-2 pr-8 text-sm text-foreground outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="general">General Study Time</option>
                {allWeeks.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Notes (optional)
              </label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  notes.length > MAX_NOTES_LENGTH * 0.9
                    ? "text-red-400"
                    : "text-muted-foreground"
                )}
              >
                {notes.length}/{MAX_NOTES_LENGTH}
              </span>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => {
                if (e.target.value.length <= MAX_NOTES_LENGTH)
                  setNotes(e.target.value);
              }}
              placeholder="What did you study?"
              className="h-20 resize-none border-border bg-muted/50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-border bg-muted/50 hover:bg-muted/80"
            >
              Discard
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || durationMinutes <= 0}
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-border border-t-background" />
              ) : (
                <Save className="size-4 mr-1.5" />
              )}
              Save Session
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
