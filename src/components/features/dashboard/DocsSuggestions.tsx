"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { getEntriesForWeek } from "@/lib/docs";

const categoryIcons: Record<string, string> = {
  dart: "📘",
  flutter: "🎯",
  bloc: "🧩",
  packages: "📦",
  firebase: "🔥",
  "cheat-sheet": "⚡",
};

interface DocsSuggestionsProps {
  currentWeek: number | null;
}

export function DocsSuggestions({ currentWeek }: DocsSuggestionsProps) {
  const [entries, setEntries] = useState<
    { id: string; title: string; category: string; summary: string }[]
  >([]);

  useEffect(() => {
    if (!currentWeek) return;
    getEntriesForWeek(currentWeek).then((e) => {
      setEntries(
        e.slice(0, 3).map((entry) => ({
          id: entry.id,
          title: entry.title,
          category: entry.category,
          summary: entry.summary,
        }))
      );
    });
  }, [currentWeek]);

  if (!currentWeek || entries.length === 0) return null;

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="size-4 text-violet-400" />
        <h3 className="text-sm font-semibold">Suggested Reading</h3>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => (
          <Link
            key={entry.id}
            href={`/docs#${entry.id}`}
            className="group flex items-start gap-3 rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:border-border hover:bg-card/50"
          >
            <span className="mt-0.5 text-base">
              {categoryIcons[entry.category] ?? "📄"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground group-hover:text-violet-300 transition-colors">
                {entry.title}
              </p>
              <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                {entry.summary}
              </p>
            </div>
            <ArrowRight className="mt-1 size-3.5 shrink-0 text-muted-foreground/30 transition-all group-hover:text-violet-400 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <Link
        href="/docs"
        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-card/30 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      >
        <BookOpen className="size-3" />
        Browse all docs
      </Link>
    </GlassCard>
  );
}
