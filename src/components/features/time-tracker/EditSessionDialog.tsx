"use client";

import { useState, useEffect } from "react";
import { useSessionMutations } from "@/hooks/use-sessions";
import { Id } from "@convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Loader2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SESSION } from "@/lib/constants";

interface EditSessionDialogProps {
  sessionId: Id<"studySessions">;
  initialDuration: number;
  initialDate: number;
  initialNotes?: string;
  onUpdated?: () => void;
}

export function EditSessionDialog({
  sessionId,
  initialDuration,
  initialDate,
  initialNotes,
  onUpdated,
}: EditSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(String(Math.floor(initialDuration / 60)));
  const [minutes, setMinutes] = useState(String(initialDuration % 60));
  const [date, setDate] = useState(() => {
    const d = new Date(initialDate);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  });
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const { updateSession } = useSessionMutations();

  useEffect(() => {
    if (open) {
      setHours(String(Math.floor(initialDuration / 60)));
      setMinutes(String(initialDuration % 60));
      const d = new Date(initialDate);
      setDate(
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
      );
      setNotes(initialNotes ?? "");
    }
  }, [open, initialDuration, initialDate, initialNotes]);

  const parsedHours = parseInt(hours) || 0;
  const parsedMinutes = parseInt(minutes) || 0;
  const totalMinutes = parsedHours * 60 + parsedMinutes;

  const handleSave = async () => {
    if (totalMinutes <= 0) {
      toast.error("Duration must be at least 1 minute");
      return;
    }

    setIsSaving(true);
    try {
      const parts = date.split("-").map(Number);
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      if (!year || !month || !day) {
        toast.error("Invalid date");
        return;
      }
      const dateTimestamp = Date.UTC(year, month - 1, day);

      await updateSession({
        sessionId,
        durationMinutes: totalMinutes,
        date: dateTimestamp,
        notes: notes.trim() || undefined,
      });
      toast.success("Session updated");
      setOpen(false);
      onUpdated?.();
    } catch {
      toast.error("Failed to update session");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Pencil className="size-3.5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Pencil className="size-5 text-violet-400" />
            Edit Session
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="border-border bg-muted/50 font-mono text-sm [color-scheme:dark]"
              />
              <Calendar className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Duration
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={hours}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || (/^\d*$/.test(v) && parseInt(v) <= SESSION.MAX_HOURS)) setHours(v);
                    }}
                    className="border-border bg-muted/50 text-center font-mono text-lg"
                    placeholder="0"
                  />
                  <span className="text-sm text-muted-foreground">h</span>
                </div>
              </div>
              <span className="text-lg text-muted-foreground">:</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={minutes}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || (/^\d*$/.test(v) && parseInt(v) <= SESSION.MAX_MINUTES)) setMinutes(v);
                    }}
                    className="border-border bg-muted/50 text-center font-mono text-lg"
                    placeholder="0"
                  />
                  <span className="text-sm text-muted-foreground">m</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Notes (optional)
              </label>
              <span
                className={cn(
                  "text-xs tabular-nums",
                  notes.length > SESSION.MAX_NOTES_LENGTH * 0.9
                    ? "text-red-400"
                    : "text-muted-foreground"
                )}
              >
                {notes.length}/{SESSION.MAX_NOTES_LENGTH}
              </span>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => {
                if (e.target.value.length <= SESSION.MAX_NOTES_LENGTH)
                  setNotes(e.target.value);
              }}
              placeholder="What did you study?"
              className="h-20 resize-none border-border bg-muted/50"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || totalMinutes <= 0}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
          >
            {isSaving ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Pencil className="size-4 mr-2" />
            )}
            Save Changes
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
