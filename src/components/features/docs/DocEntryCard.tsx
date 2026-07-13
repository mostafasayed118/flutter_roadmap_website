"use client";

import { CopyableCodeBlock } from "@/components/ui/copyable-code-block";
import { DifficultyBadge } from "./DifficultyBadge";
import type { DocEntry } from "@/lib/docs/types";

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="rounded bg-violet-500/20 px-0.5 text-violet-300"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface DocEntryCardProps {
  entry: DocEntry;
  query?: string;
}

export function DocEntryCard({ entry, query = "" }: DocEntryCardProps) {
  return (
    <article
      id={entry.id}
      className="mb-10 scroll-mt-24 rounded-xl border border-white/5 bg-white/[0.02] p-6"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">
          <HighlightedText text={entry.title} query={query} />
        </h3>
        <DifficultyBadge difficulty={entry.difficulty} />
      </div>

      <div className="text-sm leading-relaxed text-muted-foreground">
        <HighlightedText text={entry.content} query={query} />
      </div>

      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 6).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground/70"
            >
              {tag}
            </span>
          ))}
          {entry.tags.length > 6 && (
            <span className="text-[11px] text-muted-foreground/50">
              +{entry.tags.length - 6} more
            </span>
          )}
        </div>
      )}

      {entry.codeSnippets.length > 0 && (
        <div className="mt-4 space-y-3">
          {entry.codeSnippets.map((snippet, i) => (
            <CopyableCodeBlock
              key={i}
              code={snippet.code}
              language={snippet.language}
              label={snippet.label}
            />
          ))}
        </div>
      )}
    </article>
  );
}
