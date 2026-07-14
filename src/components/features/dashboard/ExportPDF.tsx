"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { useStreak } from "@/hooks/use-streak";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { formatMinutes } from "@/lib/format-time";

export function ExportPDF() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { stats } = useProgress();
  const { sessions, totalTime } = useSessions();
  const { currentStreak, longestStreak } = useStreak();

  const generatePDF = async () => {
    if (!stats) return;

    setIsGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = 20;

      // Header
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Flutter Roadmap Progress Report", margin, y);
      y += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y);
      y += 15;

      // Overall Progress
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text("Overall Progress", margin, y);
      y += 8;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Progress: ${stats.overallPercentage}%`, margin + 5, y);
      y += 6;
      doc.text(`Topics Completed: ${stats.completedTopics} / ${stats.totalTopics}`, margin + 5, y);
      y += 6;
      doc.text(`Projects Completed: ${stats.completedProjects} / ${stats.totalProjects}`, margin + 5, y);
      y += 6;

      if (stats.currentPhase) {
        doc.text(`Current Phase: Phase ${stats.currentPhase.order} - ${stats.currentPhase.title}`, margin + 5, y);
        y += 6;
      }

      if (stats.currentWeekNumber) {
        doc.text(`Current Week: ${stats.currentWeekNumber}`, margin + 5, y);
        y += 10;
      }

      // Study Stats
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Study Statistics", margin, y);
      y += 8;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Total Study Time: ${formatMinutes(totalTime?.totalMinutes ?? 0)}`, margin + 5, y);
      y += 6;
      doc.text(`Total Sessions: ${sessions?.length ?? 0}`, margin + 5, y);
      y += 6;
      doc.text(`Current Streak: ${currentStreak} days`, margin + 5, y);
      y += 6;
      doc.text(`Longest Streak: ${longestStreak} days`, margin + 5, y);
      y += 10;

      // Progress Bar Visualization
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("Progress Visualization", margin, y);
      y += 10;

      const barWidth = pageWidth - 2 * margin;
      const barHeight = 10;

      // Background bar
      doc.setFillColor(230, 230, 230);
      doc.roundedRect(margin, y, barWidth, barHeight, 3, 3, "F");

      // Progress bar
      const progressWidth = (stats.overallPercentage / 100) * barWidth;
      doc.setFillColor(139, 92, 246); // Violet color
      doc.roundedRect(margin, y, progressWidth, barHeight, 3, 3, "F");

      // Progress text
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255);
      if (stats.overallPercentage > 10) {
        doc.text(`${stats.overallPercentage}%`, margin + progressWidth / 2, y + 7, { align: "center" });
      }
      y += 15;

      // Recent Sessions
      if (sessions && sessions.length > 0) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text("Recent Sessions", margin, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        const recentSessions = sessions.slice(0, 10);
        for (const session of recentSessions) {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }

          const date = new Date(session.date).toLocaleDateString();
          const duration = formatMinutes(session.durationMinutes);
          const notes = session.notes ? ` - ${session.notes.substring(0, 50)}` : "";

          doc.text(`${date}: ${duration}${notes}`, margin + 5, y);
          y += 5;
        }
      }

      // Footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
          `Flutter Roadmap Progress Tracker - Page ${i} of ${totalPages}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      doc.save("flutter-roadmap-progress.pdf");
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={generatePDF}
      disabled={isGenerating || !stats}
      className="gap-2"
    >
      {isGenerating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Download className="size-4" />
      )}
      Export PDF
    </Button>
  );
}
