"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
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
  const [hours, setHours] = useState(Math.floor(initialDuration / 60));
  const [minutes, setMinutes] = useState(initialDuration % 60);
  const [date, setDate] = useState(() => new Date(initialDate).toISOString().split("T")[0]);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [isSaving, setIsSaving] = useState(false);

  const updateSession = useMutation(api.timeTracker.updateSession);

  useEffect(() => {
    if (open) {
      setHours(Math.floor(initialDuration / 60));
      setMinutes(initialDuration % 60);
      setDate(new Date(initialDate).toISOString().split("T")[0]);
      setNotes(initialNotes ?? "");
    }
  }, [open, initialDuration, initialDate, initialNotes]);

  const totalMinutes = hours * 60 + minutes;

  const handleSave = async () => {
    if (totalMinutes <= 0) {
      toast.error("Duration must be at least 1 minute");
      return;
    }

    setIsSaving(true);
    try {
      const [year, month, day] = date.split("-").map(Number);
      const dateTimestamp = Date.UTC(year!, month! - 1, day!);

      await updateSession({
        sessionId,
        durationMinutes: totalMinutes,
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
          <Button variant="ghost" size="sm" className="size-8 p-0 text-muted-foreground hover:text-foreground">
            <Pencil className="size-3.5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md border-white/10 bg-[oklch(0.14_0.005_280)] backdrop-blur-xl">
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
          className="space-y-4 mt-2"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="border-white/10 bg-white/5 font-mono text-sm [color-scheme:dark]"
              />
              <Calendar className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Duration</label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={hours}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || /^\d*$/.test(v)) setHours(Math.min(24, parseInt(v) || 0));
                    }}
                    className="border-white/10 bg-white/5 text-center font-mono text-lg"
                  />
                  <span className="text-sm text-muted-foreground">h</span>
                </div>
              </div>
              <span className="text-muted-foreground text-lg">:</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={minutes}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "" || /^\d*$/.test(v)) setMinutes(Math.min(59, parseInt(v) || 0));
                    }}
                    className="border-white/10 bg-white/5 text-center font-mono text-lg"
                  />
                  <span className="text-sm text-muted-foreground">m</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Notes (optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you study?"
              className="border-white/10 bg-white/5 resize-none h-20"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || totalMinutes <= 0}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white"
          >
            {isSaving ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Pencil className="size-4 mr-2" />}
            Save Changes
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
