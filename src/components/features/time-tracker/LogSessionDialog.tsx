"use client";

import { useState, useCallback, useMemo } from "react";
import { useSessionMutations } from "@/hooks/use-sessions";
import { useRoadmap } from "@/hooks/use-progress";
import { useUserId } from "@/hooks/use-user-id";
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
import { ChevronDown, Plus, Clock, Loader2, AlertCircle, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const MAX_HOURS = 24;
const MAX_MINUTES = 59;
const MAX_NOTES_LENGTH = 200;
const MIN_SESSION_MINUTES = 5;

interface ValidationErrors {
  hours?: string;
  minutes?: string;
  notes?: string;
  duration?: string;
}

interface LogSessionDialogProps {
  defaultWeekId?: string;
}

export function LogSessionDialog({ defaultWeekId }: LogSessionDialogProps) {
  const userId = useUserId();
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [weekId, setWeekId] = useState<string>(defaultWeekId ?? "general");
  const [date, setDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  });
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { addSession } = useSessionMutations();
  const { roadmap } = useRoadmap();

  const parsedHours = parseInt(hours) || 0;
  const parsedMinutes = parseInt(minutes) || 0;
  const totalMinutes = parsedHours * 60 + parsedMinutes;

  const validate = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (hours !== "" && (parsedHours < 0 || parsedHours > MAX_HOURS)) {
      newErrors.hours = `Hours must be 0–${MAX_HOURS}`;
    }

    if (minutes !== "" && (parsedMinutes < 0 || parsedMinutes > MAX_MINUTES)) {
      newErrors.minutes = `Minutes must be 0–${MAX_MINUTES}`;
    }

    if (totalMinutes > 0 && totalMinutes < MIN_SESSION_MINUTES) {
      newErrors.duration = `Minimum session is ${MIN_SESSION_MINUTES} minutes`;
    }

    if (totalMinutes > MAX_HOURS * 60) {
      newErrors.duration = `Maximum session is ${MAX_HOURS} hours`;
    }

    if (notes.length > MAX_NOTES_LENGTH) {
      newErrors.notes = `Notes must be ${MAX_NOTES_LENGTH} characters or less`;
    }

    return newErrors;
  }, [hours, minutes, parsedHours, parsedMinutes, totalMinutes, notes]);

  const handleHoursChange = (value: string) => {
    if (value === "" || /^\d*$/.test(value)) {
      setHours(value);
      setTouched((prev) => ({ ...prev, hours: true }));
    }
  };

  const handleMinutesChange = (value: string) => {
    if (value === "" || /^\d*$/.test(value)) {
      setMinutes(value);
      setTouched((prev) => ({ ...prev, minutes: true }));
    }
  };

  const handleNotesChange = (value: string) => {
    if (value.length <= MAX_NOTES_LENGTH) {
      setNotes(value);
      setTouched((prev) => ({ ...prev, notes: true }));
    }
  };

  const handleSave = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ hours: true, minutes: true, notes: true, duration: true });

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors below");
      return;
    }

    if (totalMinutes <= 0) {
      setErrors({ duration: "Please enter a valid duration" });
      toast.error("Please enter a valid duration");
      return;
    }

    setIsSaving(true);
    try {
      const [year, month, day] = date.split("-").map(Number);
      const dateTimestamp = Date.UTC(year!, month! - 1, day!);

      await addSession({
        userId,
        weekId: weekId === "general" ? undefined : (weekId as Id<"roadmapWeeks">),
        durationMinutes: totalMinutes,
        date: dateTimestamp,
        notes: notes.trim() || undefined,
      });
      toast.success(`Logged ${totalMinutes} minutes of study time`);
      setOpen(false);
      resetForm();
    } catch {
      toast.error("Failed to save session");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setHours("");
    setMinutes("");
    setWeekId(defaultWeekId ?? "general");
    const now = new Date();
    setDate(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
    );
    setNotes("");
    setErrors({});
    setTouched({});
  };

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

  const hasErrors = useMemo(() => {
    if (hours !== "" && (parsedHours < 0 || parsedHours > MAX_HOURS)) return true;
    if (minutes !== "" && (parsedMinutes < 0 || parsedMinutes > MAX_MINUTES))
      return true;
    if (totalMinutes > 0 && totalMinutes < MIN_SESSION_MINUTES) return true;
    if (totalMinutes > MAX_HOURS * 60) return true;
    if (notes.length > MAX_NOTES_LENGTH) return true;
    return false;
  }, [hours, minutes, parsedHours, parsedMinutes, totalMinutes, notes]);

  const showDurationError = touched.duration && errors.duration;
  const showHoursError = touched.hours && errors.hours;
  const showMinutesError = touched.minutes && errors.minutes;
  const showNotesError = touched.notes && errors.notes;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger
        render={
          <Button
            size="sm"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
          >
            <Plus className="size-4 mr-1.5" />
            Log Session
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md border-white/10 bg-[oklch(0.14_0.005_280)] backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Clock className="size-5 text-violet-400" />
            Log Study Session
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
              Week (optional)
            </label>
            <div className="relative">
              <select
                value={weekId}
                onChange={(e) => setWeekId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 pr-8 text-sm text-foreground outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Date
            </label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`}
                className="border-white/10 bg-white/5 font-mono text-sm [color-scheme:dark]"
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
                    onChange={(e) => handleHoursChange(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, hours: true }))
                    }
                    className={cn(
                      "border-white/10 bg-white/5 text-center font-mono text-lg",
                      showHoursError &&
                        "border-red-500/50 focus-visible:ring-red-500/50"
                    )}
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
                    onChange={(e) => handleMinutesChange(e.target.value)}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, minutes: true }))
                    }
                    className={cn(
                      "border-white/10 bg-white/5 text-center font-mono text-lg",
                      showMinutesError &&
                        "border-red-500/50 focus-visible:ring-red-500/50"
                    )}
                    placeholder="0"
                  />
                  <span className="text-sm text-muted-foreground">m</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showDurationError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="size-3" />
                  {errors.duration}
                </motion.p>
              )}
              {showHoursError && !showDurationError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="size-3" />
                  {errors.hours}
                </motion.p>
              )}
              {showMinutesError && !showDurationError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="size-3" />
                  {errors.minutes}
                </motion.p>
              )}
            </AnimatePresence>

            {totalMinutes > 0 && !showDurationError && (
              <p className="text-xs text-violet-400">
                Total: {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
              </p>
            )}
          </div>

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
              onChange={(e) => handleNotesChange(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, notes: true }))
              }
              placeholder="What did you study?"
              className={cn(
                "h-20 resize-none border-white/10 bg-white/5",
                showNotesError &&
                  "border-red-500/50 focus-visible:ring-red-500/50"
              )}
            />
            <AnimatePresence>
              {showNotesError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400"
                >
                  <AlertCircle className="size-3" />
                  {errors.notes}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving || totalMinutes <= 0 || hasErrors}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
          >
            {isSaving ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <Clock className="size-4 mr-2" />
            )}
            Save Session
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
