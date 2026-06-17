"use client";

import { useState } from "react";
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
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface DeleteSessionDialogProps {
  sessionId: Id<"studySessions">;
  sessionLabel: string;
  onDeleted?: () => void;
}

export function DeleteSessionDialog({
  sessionId,
  sessionLabel,
  onDeleted,
}: DeleteSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteSession } = useSessionMutations();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSession({ sessionId });
      toast.success("Session deleted");
      setOpen(false);
      onDeleted?.();
    } catch {
      toast.error("Failed to delete session");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0 text-muted-foreground hover:text-red-400"
          >
            <Trash2 className="size-3.5" />
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm border-white/10 bg-[oklch(0.14_0.005_280)] backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="size-5 text-red-400" />
            Delete Session
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 space-y-4"
        >
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this session?
          </p>
          <p className="text-sm font-medium">{sessionLabel}</p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-white/10 bg-white/5 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-600 text-white hover:bg-red-500 hover:scale-[1.02] transition-all duration-200"
            >
              {isDeleting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="size-4 mr-2" />
              )}
              Delete
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
