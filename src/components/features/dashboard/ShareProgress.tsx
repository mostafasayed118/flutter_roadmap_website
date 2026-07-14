"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useStreak } from "@/hooks/use-streak";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { toast } from "sonner";

export function ShareProgress() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { stats } = useProgress();
  const { currentStreak } = useStreak();

  if (!stats) return null;

  const shareText = `I'm ${stats.overallPercentage}% through my Flutter learning journey! ${stats.completedTopics} topics and ${stats.completedProjects} projects completed. ${currentStreak > 0 ? `🔥 ${currentStreak} day streak!` : ""} #Flutter #Learning #Coding`;

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Share2 className="mr-2 size-4" />
        Share
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Progress</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-card/30 p-4">
              <p className="text-sm text-muted-foreground">{shareText}</p>
              <p className="mt-2 text-xs text-muted-foreground/70">{shareUrl}</p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:bg-card/50"
              >
                <Twitter className="size-5 text-sky-500" />
                <span className="text-sm font-medium">Share on Twitter</span>
              </a>

              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:bg-card/50"
              >
                <Linkedin className="size-5 text-blue-600" />
                <span className="text-sm font-medium">Share on LinkedIn</span>
              </a>

              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:bg-card/50"
              >
                <Facebook className="size-5 text-blue-500" />
                <span className="text-sm font-medium">Share on Facebook</span>
              </a>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:bg-card/50"
              >
                {copied ? (
                  <Check className="size-5 text-emerald-500" />
                ) : (
                  <Link2 className="size-5 text-muted-foreground" />
                )}
                <span className="text-sm font-medium">
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
