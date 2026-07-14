"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import type { JSX } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyableCodeBlock } from "@/components/ui/copyable-code-block";
import { DifficultyBadge } from "./DifficultyBadge";
import type { DocEntry } from "@/lib/docs/types";

// ── Markdown-like Content Parser ────────────────────────────────

interface ParsedBlock {
  type: "heading" | "paragraph" | "list" | "table" | "code" | "blockquote" | "hr";
  level?: number;
  content: string;
  items?: string[];
  rows?: string[][];
  language?: string;
  label?: string;
  id?: string;
}

function parseContent(raw: string): ParsedBlock[] {
  const lines = raw.split("\n");
  const blocks: ParsedBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1]!.length;
      const text = headingMatch[2]!;
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      blocks.push({ type: "heading", level, content: text, id });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]!.startsWith("> ")) {
        quoteLines.push(lines[i]!.slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", content: quoteLines.join("\n") });
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.includes("|")) {
        const cells = lines[i]!
          .split("|")
          .map((c) => c.trim())
          .filter((c) => c.length > 0);
        // Skip separator row
        if (!cells.every((c) => /^[-:]+$/.test(c))) {
          rows.push(cells);
        }
        i++;
      }
      if (rows.length > 0) {
        blocks.push({ type: "table", content: "", rows });
      }
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", content: "", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "list", content: "", items });
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph (collect consecutive non-empty lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() !== "" &&
      !lines[i]!.startsWith("#") &&
      !lines[i]!.startsWith("> ") &&
      !lines[i]!.startsWith("```") &&
      !/^[-*]\s+/.test(lines[i]!.trim()) &&
      !/^\d+\.\s+/.test(lines[i]!.trim()) &&
      !/^---+$/.test(lines[i]!.trim()) &&
      !(lines[i]!.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---"))
    ) {
      paraLines.push(lines[i]!);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", content: paraLines.join("\n") });
    }
  }

  return blocks;
}

// ── Inline Formatting ──────────────────────────────────────────

function formatInlineText(text: string): React.ReactNode[] {
  // Split by inline code, bold, italic, and links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Italic
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    // Link
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find earliest match
    const matches = [
      codeMatch ? { type: "code" as const, match: codeMatch, index: codeMatch.index! } : null,
      boldMatch ? { type: "bold" as const, match: boldMatch, index: boldMatch.index! } : null,
      italicMatch ? { type: "italic" as const, match: italicMatch, index: italicMatch.index! } : null,
      linkMatch ? { type: "link" as const, match: linkMatch, index: linkMatch.index! } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    // Add text before match
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    switch (first.type) {
      case "code":
        parts.push(
          <code
            key={key++}
            className="rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[13px] text-violet-300"
          >
            {first.match[1]}
          </code>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
        break;
      case "bold":
        parts.push(
          <strong key={key++} className="font-semibold text-foreground">
            {first.match[1]}
          </strong>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
        break;
      case "italic":
        parts.push(
          <em key={key++} className="italic text-muted-foreground/80">
            {first.match[1]}
          </em>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
        break;
      case "link":
        parts.push(
          <a
            key={key++}
            href={first.match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-400 underline decoration-violet-400/30 underline-offset-2 hover:text-violet-300 hover:decoration-violet-300/50"
          >
            {first.match[1]}
            <ExternalLink className="size-3" />
          </a>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
        break;
    }
  }

  return parts;
}

// ── Table of Contents ──────────────────────────────────────────

interface TocItem {
  id: string;
  level: number;
  text: string;
}

function TableOfContents({
  items,
  activeId,
}: {
  items: TocItem[];
  activeId: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "block truncate rounded-md px-2 py-1 text-[13px] transition-colors",
            item.level === 3 && "pl-4",
            item.level === 4 && "pl-6",
            activeId === item.id
              ? "bg-violet-500/10 font-medium text-violet-400"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

// ── Main Renderer ──────────────────────────────────────────────

interface DocContentRendererProps {
  entry: DocEntry;
  className?: string;
  onMarkRead?: (entryId: string) => void;
}

export function DocContentRenderer({
  entry,
  className,
  onMarkRead,
}: DocContentRendererProps) {
  const [activeTocId, setActiveTocId] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Parse content and extract headings for TOC
  const { blocks, tocItems } = useMemo(() => {
    const parsed = parseContent(entry.content);
    const headings = parsed
      .filter((b) => b.type === "heading" && b.level! >= 2 && b.id)
      .map((b) => ({
        id: b.id!,
        level: b.level!,
        text: b.content,
      }));
    return { blocks: parsed, tocItems: headings };
  }, [entry.content]);

  // Track heading visibility for TOC highlighting
  useEffect(() => {
    if (tocItems.length === 0) return;

    const headingElements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aRect = a.boundingClientRect;
            const bRect = b.boundingClientRect;
            return Math.abs(aRect.top) - Math.abs(bRect.top);
          });

        if (visible.length > 0) {
          setActiveTocId(visible[0]!.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocItems]);

  // Mark as read when content is scrolled to bottom
  useEffect(() => {
    const container = contentRef.current;
    if (!container || !onMarkRead) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        onMarkRead(entry.id);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [entry.id, onMarkRead]);

  // Map code snippets to their positions
  const snippetIndexRef = useRef(0);
  snippetIndexRef.current = 0;

  const renderBlock = useCallback(
    (block: ParsedBlock, index: number): React.ReactNode => {
      switch (block.type) {
        case "heading": {
          const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
          const className = cn(
            "scroll-mt-24 font-semibold text-foreground",
            block.level === 2 && "mt-8 mb-4 text-xl border-b border-border/50 pb-2",
            block.level === 3 && "mt-6 mb-3 text-lg",
            block.level === 4 && "mt-4 mb-2 text-base"
          );
          return (
            <Tag key={index} id={block.id} className={className}>
              {formatInlineText(block.content)}
            </Tag>
          );
        }

        case "paragraph":
          return (
            <p
              key={index}
              className="mb-4 text-sm leading-relaxed text-muted-foreground"
            >
              {formatInlineText(block.content)}
            </p>
          );

        case "list":
          return (
            <ul key={index} className="mb-4 space-y-1.5 pl-4">
              {block.items?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-400/60" />
                  <span>{formatInlineText(item)}</span>
                </li>
              ))}
            </ul>
          );

        case "table":
          return (
            <div key={index} className="mb-4 overflow-x-auto rounded-lg border border-border/50">
              <table className="w-full text-sm">
                {block.rows && block.rows.length > 0 && (
                  <>
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/30">
                        {block.rows[0]!.map((cell, ci) => (
                          <th
                            key={ci}
                            className="px-3 py-2 text-left text-xs font-medium text-muted-foreground"
                          >
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.slice(1).map((row, ri) => (
                        <tr
                          key={ri}
                          className="border-b border-border/30 last:border-0"
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className="px-3 py-2 text-muted-foreground"
                            >
                              {formatInlineText(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          );

        case "blockquote":
          return (
            <blockquote
              key={index}
              className="mb-4 border-l-2 border-violet-500/40 bg-violet-500/5 py-2 pl-4 text-sm italic text-muted-foreground/80"
            >
              {formatInlineText(block.content)}
            </blockquote>
          );

        case "hr":
          return <hr key={index} className="my-8 border-border/50" />;

        default:
          return null;
      }
    },
    []
  );

  return (
    <div className={cn("flex gap-8", className)}>
      {/* Main content */}
      <div ref={contentRef} className="min-w-0 flex-1">
        {/* Entry header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold text-foreground">{entry.title}</h2>
            <DifficultyBadge difficulty={entry.difficulty} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{entry.summary}</p>
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
            >
              Official documentation
              <ExternalLink className="size-3" />
            </a>
          )}
        </div>

        {/* Parsed content */}
        <div className="prose-sm max-w-none">
          {blocks.map((block, i) => renderBlock(block, i))}
        </div>

        {/* Code snippets */}
        {entry.codeSnippets.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Code Examples
            </h3>
            {entry.codeSnippets.map((snippet) => (
              <CopyableCodeBlock
                key={snippet.id}
                code={snippet.code}
                language={snippet.language}
                label={snippet.label}
              />
            ))}
          </div>
        )}

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Table of Contents (desktop only) */}
      {tocItems.length > 0 && (
        <aside className="hidden w-48 shrink-0 xl:block">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} activeId={activeTocId} />
          </div>
        </aside>
      )}
    </div>
  );
}
