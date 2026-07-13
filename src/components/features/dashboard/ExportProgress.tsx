"use client";

import { useCallback } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";

export function ExportProgress() {
  const { stats, isLoading } = useProgress();

  const handleExport = useCallback(() => {
    if (!stats) return;

    const lines: string[] = [
      "# FlutterPath Progress Report",
      "",
      `Generated: ${new Date().toLocaleDateString()}`,
      "",
      "## Overall Progress",
      `- **Completion:** ${stats.overallPercentage}%`,
      `- **Topics Completed:** ${stats.completedTopics}/${stats.totalTopics}`,
      `- **Projects Completed:** ${stats.completedProjects}/${stats.totalProjects}`,
      "",
    ];

    if (stats.currentPhase) {
      lines.push(
        `## Current Phase`,
        `- Phase ${stats.currentPhase.order}: ${stats.currentPhase.title}`,
        ""
      );
    }

    if (stats.nextItems.length > 0) {
      lines.push("## Next Steps");
      for (const item of stats.nextItems) {
        lines.push(`- [ ] ${item.title} (${item.week})`);
      }
      lines.push("");
    }

    lines.push("---", "*Exported from FlutterPath*");

    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flutterpath-progress-${new Date().toISOString().split("T")[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [stats]);

  if (isLoading || !stats) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="gap-1.5"
    >
      <Download className="size-3.5" />
      Export
    </Button>
  );
}
