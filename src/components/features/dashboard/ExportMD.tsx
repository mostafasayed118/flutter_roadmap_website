"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { useStreak } from "@/hooks/use-streak";
import { Button } from "@/components/ui/button";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { formatMinutes } from "@/lib/format-time";

export function ExportMD() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { stats } = useProgress();
  const { sessions, totalTime } = useSessions();
  const { currentStreak, longestStreak } = useStreak();

  const generateMD = async () => {
    if (!stats) return;

    setIsGenerating(true);
    try {
      const lines: string[] = [];

      // Header
      lines.push("# Flutter Roadmap Progress Report");
      lines.push("");
      lines.push(`*Generated on ${new Date().toLocaleDateString()}*`);
      lines.push("");

      // Overall Progress
      lines.push("## Overall Progress");
      lines.push("");
      lines.push(`- **Progress:** ${stats.overallPercentage}%`);
      lines.push(`- **Topics Completed:** ${stats.completedTopics} / ${stats.totalTopics}`);
      lines.push(`- **Projects Completed:** ${stats.completedProjects} / ${stats.totalProjects}`);

      if (stats.currentPhase) {
        lines.push(`- **Current Phase:** Phase ${stats.currentPhase.order} - ${stats.currentPhase.title}`);
      }

      if (stats.currentWeekNumber) {
        lines.push(`- **Current Week:** ${stats.currentWeekNumber}`);
      }

      lines.push("");

      // Progress Bar
      lines.push("```");
      const barLength = 30;
      const filledLength = Math.round((stats.overallPercentage / 100) * barLength);
      const emptyLength = barLength - filledLength;
      lines.push(`[${"█".repeat(filledLength)}${"░".repeat(emptyLength)}] ${stats.overallPercentage}%`);
      lines.push("```");
      lines.push("");

      // Study Stats
      lines.push("## Study Statistics");
      lines.push("");
      lines.push(`- **Total Study Time:** ${formatMinutes(totalTime?.totalMinutes ?? 0)}`);
      lines.push(`- **Total Sessions:** ${sessions?.length ?? 0}`);
      lines.push(`- **Current Streak:** ${currentStreak} days`);
      lines.push(`- **Longest Streak:** ${longestStreak} days`);
      lines.push("");

      // Recent Sessions
      if (sessions && sessions.length > 0) {
        lines.push("## Recent Sessions");
        lines.push("");

        const recentSessions = sessions.slice(0, 15);
        lines.push("| Date | Duration | Notes |");
        lines.push("|------|----------|-------|");

        for (const session of recentSessions) {
          const date = new Date(session.date).toLocaleDateString();
          const duration = formatMinutes(session.durationMinutes);
          const notes = session.notes ? session.notes.substring(0, 50).replace(/\|/g, "\\|") : "-";
          lines.push(`| ${date} | ${duration} | ${notes} |`);
        }

        lines.push("");
      }

      // Footer
      lines.push("---");
      lines.push("*Flutter Roadmap Progress Tracker*");

      // Create and download file
      const content = lines.join("\n");
      const blob = new Blob([content], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flutter-roadmap-progress.md";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Markdown exported successfully!");
    } catch (error) {
      console.error("Failed to generate Markdown:", error);
      toast.error("Failed to generate Markdown");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generateMD}
      disabled={isGenerating || !stats}
      className="gap-2"
    >
      {isGenerating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <FileText className="size-4" />
      )}
      Export MD
    </Button>
  );
}
