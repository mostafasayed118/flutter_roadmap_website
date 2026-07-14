"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEntriesForWeek } from "@/lib/docs";
import type { DocEntry } from "@/lib/docs/types";

const categoryColors: Record<string, string> = {
  dart: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  flutter: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  bloc: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  packages: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  firebase: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "cheat-sheet": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

interface WeekDocsLinksProps {
  weekNumber: number;
  className?: string;
}

export function WeekDocsLinks({ weekNumber, className }: WeekDocsLinksProps) {
  const [entries, setEntries] = useState<DocEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEntriesForWeek(weekNumber).then((e) => {
      setEntries(e);
      setIsLoading(false);
    });
  }, [weekNumber]);

  if (isLoading || entries.length === 0) return null;

  return (
    <div className={cn("mt-3", className)}>
      <Link
        href="/docs"
        className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <BookOpen className="size-3 text-violet-400" />
        <span>Related Docs</span>
        <ArrowRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {entries.slice(0, 4).map((entry) => (
          <Link
            key={entry.id}
            href={`/docs#${entry.id}`}
            className={cn(
              "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors hover:opacity-80",
              categoryColors[entry.category] ?? "bg-muted/50 text-muted-foreground border-border"
            )}
          >
            {entry.title}
          </Link>
        ))}
        {entries.length > 4 && (
          <Link
            href="/docs"
            className="inline-flex items-center rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            +{entries.length - 4} more
          </Link>
        )}
      </div>
    </div>
  );
}
