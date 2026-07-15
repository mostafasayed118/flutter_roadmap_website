"use client";

import { useState, useRef } from "react";
import { useProgress } from "@/hooks/use-progress";
import { useSessions } from "@/hooks/use-sessions";
import { useStreak } from "@/hooks/use-streak";
import { useBadges } from "@/hooks/use-badges";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { formatMinutes } from "@/lib/format-time";

interface BackupData {
  version: string;
  exportDate: string;
  progress: {
    overallPercentage: number;
    completedTopics: number;
    totalTopics: number;
    completedProjects: number;
    totalProjects: number;
  };
  sessions: Array<{
    durationMinutes: number;
    date: number;
    notes?: string;
    tags?: string[];
  }>;
  streak: {
    currentStreak: number;
    longestStreak: number;
  };
  badges: Array<{
    id: string;
    title: string;
    unlocked: boolean;
  }>;
}

export function DataBackup() {
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { stats } = useProgress();
  const { sessions, totalTime } = useSessions();
  const { currentStreak, longestStreak } = useStreak();
  const { badges } = useBadges();

  const exportData = async () => {
    if (!stats) return;

    setIsExporting(true);
    try {
      const backupData: BackupData = {
        version: "1.0.0",
        exportDate: new Date().toISOString(),
        progress: {
          overallPercentage: stats.overallPercentage,
          completedTopics: stats.completedTopics,
          totalTopics: stats.totalTopics,
          completedProjects: stats.completedProjects,
          totalProjects: stats.totalProjects,
        },
        sessions: (sessions ?? []).map((s) => ({
          durationMinutes: s.durationMinutes,
          date: s.date,
          notes: s.notes,
          tags: s.tags,
        })),
        streak: {
          currentStreak,
          longestStreak,
        },
        badges: badges.map((b) => ({
          id: b.id,
          title: b.title,
          unlocked: b.unlocked,
        })),
      };

      const content = JSON.stringify(backupData, null, 2);
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `flutterpath-backup-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Backup exported successfully!");
    } catch (error) {
      console.error("Failed to export backup:", error);
      toast.error("Failed to export backup");
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async (file: File) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text) as BackupData;

      // Validate backup structure
      if (!data.version || !data.exportDate || !data.progress) {
        throw new Error("Invalid backup file format");
      }

      // Store in localStorage for reference
      localStorage.setItem("flutterpath-backup-imported", JSON.stringify({
        date: data.exportDate,
        progress: data.progress,
      }));

      setImportResult({
        success: true,
        message: `Backup from ${new Date(data.exportDate).toLocaleDateString()} imported. ${data.sessions.length} sessions, ${data.badges.filter(b => b.unlocked).length} badges.`,
      });

      toast.success("Backup data imported successfully!");
    } catch (error) {
      console.error("Failed to import backup:", error);
      setImportResult({
        success: false,
        message: error instanceof Error ? error.message : "Invalid backup file",
      });
      toast.error("Failed to import backup");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2" />
        }
      >
        <Download className="size-4" />
        Backup
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Data Backup & Restore</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-border/50 bg-card/30 p-4">
            <h4 className="text-sm font-medium">Export Backup</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Download your learning progress, sessions, streaks, and badges as a JSON file.
            </p>
            <Button
              onClick={exportData}
              disabled={isExporting || !stats}
              className="mt-3 gap-2"
              variant="outline"
              size="sm"
            >
              {isExporting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
              Export Data
            </Button>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/30 p-4">
            <h4 className="text-sm font-medium">Import Backup</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Restore progress from a previously exported backup file.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) importData(file);
              }}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="mt-3 gap-2"
              variant="outline"
              size="sm"
            >
              {isImporting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              Import Data
            </Button>
          </div>

          {importResult && (
            <div className={`flex items-start gap-3 rounded-lg border p-3 ${
              importResult.success
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-red-500/30 bg-red-500/5"
            }`}>
              {importResult.success ? (
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="size-5 text-red-400 shrink-0" />
              )}
              <p className="text-sm text-muted-foreground">{importResult.message}</p>
            </div>
          )}

          {stats && (
            <div className="text-xs text-muted-foreground">
              <p>Current data: {stats.completedTopics} topics, {stats.completedProjects} projects, {formatMinutes(totalTime?.totalMinutes ?? 0)} studied</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
