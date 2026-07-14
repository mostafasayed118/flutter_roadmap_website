"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Code2, Smartphone, Layers, Package, Flame, Zap, SearchX, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyableCodeBlock } from "@/components/ui/copyable-code-block";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// ── Types ──────────────────────────────────────────────────────
type DocCategoryType = "dart" | "flutter" | "bloc" | "packages" | "firebase" | "cheat-sheet";
type Difficulty = "beginner" | "intermediate" | "advanced";

interface CodeSnippet {
  id: string;
  language: string;
  code: string;
  label: string;
}

interface DocEntry {
  id: string;
  title: string;
  category: DocCategoryType;
  summary: string;
  content: string;
  codeSnippets: CodeSnippet[];
  relatedWeeks: number[];
  tags: string[];
  difficulty: Difficulty;
  sourceUrl?: string;
}

interface DocCategoryGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  categoryType: DocCategoryType;
  entries: DocEntry[];
}

// ── Category metadata ──────────────────────────────────────────
const categoryMeta: Record<DocCategoryType, { id: string; title: string; icon: LucideIcon; description: string }> = {
  dart: { id: "dart-core", title: "Dart Core Concepts", icon: Code2, description: "Master the Dart language — types, OOP, async, null safety, generics, and effective Dart guidelines." },
  flutter: { id: "flutter-core", title: "Flutter UI & Core", icon: Smartphone, description: "Widgets, layout system, navigation, state management, animations, theming, and testing in Flutter." },
  bloc: { id: "bloc-cubit", title: "Bloc & Cubit State Management", icon: Layers, description: "Predictable state management with Cubit and Bloc, Flutter widgets, architecture patterns, and testing." },
  packages: { id: "flutter-packages", title: "Essential Packages", icon: Package, description: "Production-proven packages for networking, navigation, state, storage, serialization, UI, and device APIs." },
  firebase: { id: "firebase", title: "Firebase Integration", icon: Flame, description: "FlutterFire setup, Authentication, Firestore, Storage, FCM, Analytics, Crashlytics, Remote Config, and Security Rules." },
  "cheat-sheet": { id: "cheat-sheet", title: "Cheat Sheet", icon: Zap, description: "Quick reference cards for Dart, Flutter, Bloc/Cubit, Firebase, and deployment — copy-paste ready." },
};

// ── Difficulty Badge ───────────────────────────────────────────
const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  beginner: { label: "Beginner", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  intermediate: { label: "Intermediate", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  advanced: { label: "Advanced", className: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = difficultyConfig[difficulty];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", config.className)}>
      {config.label}
    </span>
  );
}

// ── Inline formatting ─────────────────────────────────────────
function formatInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining.length > 0) {
    const codeMatch = remaining.match(/`([^`]+)`/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const matches = [
      codeMatch ? { type: "code" as const, m: codeMatch, i: codeMatch.index! } : null,
      boldMatch ? { type: "bold" as const, m: boldMatch, i: boldMatch.index! } : null,
      italicMatch ? { type: "italic" as const, m: italicMatch, i: italicMatch.index! } : null,
      linkMatch ? { type: "link" as const, m: linkMatch, i: linkMatch.index! } : null,
    ].filter(Boolean).sort((a, b) => a!.i - b!.i);
    if (matches.length === 0) { parts.push(remaining); break; }
    const first = matches[0]!;
    if (first.i > 0) parts.push(remaining.slice(0, first.i));
    switch (first.type) {
      case "code": parts.push(<code key={key++} className="rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-[13px] text-violet-300">{first.m[1]}</code>); break;
      case "bold": parts.push(<strong key={key++} className="font-semibold text-foreground">{first.m[1]}</strong>); break;
      case "italic": parts.push(<em key={key++} className="italic text-muted-foreground/80">{first.m[1]}</em>); break;
      case "link": parts.push(<a key={key++} href={first.m[2]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-violet-400 underline decoration-violet-400/30 underline-offset-2 hover:text-violet-300">{first.m[1]}<ExternalLink className="size-3" /></a>); break;
    }
    remaining = remaining.slice(first.i + first.m[0].length);
  }
  return parts;
}

// ── Markdown parser ────────────────────────────────────────────
function parseContent(raw: string) {
  const lines = raw.split("\n");
  const blocks: Array<{ type: string; level?: number; content: string; items?: string[]; rows?: string[][]; id?: string }> = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^---+$/.test(line.trim())) { blocks.push({ type: "hr", content: "" }); i++; continue; }
    const hMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (hMatch) { const level = hMatch[1]!.length; const text = hMatch[2]!; const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); blocks.push({ type: "heading", level, content: text, id }); i++; continue; }
    if (line.startsWith("> ")) { const q: string[] = []; while (i < lines.length && lines[i]!.startsWith("> ")) { q.push(lines[i]!.slice(2)); i++; } blocks.push({ type: "blockquote", content: q.join("\n") }); continue; }
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---")) { const rows: string[][] = []; while (i < lines.length && lines[i]!.includes("|")) { const cells = lines[i]!.split("|").map((c) => c.trim()).filter((c) => c.length > 0); if (!cells.every((c) => /^[-:]+$/.test(c))) rows.push(cells); i++; } if (rows.length > 0) blocks.push({ type: "table", content: "", rows }); continue; }
    if (/^[-*]\s+/.test(line.trim())) { const items: string[] = []; while (i < lines.length && /^[-*]\s+/.test(lines[i]!.trim())) { items.push(lines[i]!.trim().replace(/^[-*]\s+/, "")); i++; } blocks.push({ type: "list", content: "", items }); continue; }
    if (/^\d+\.\s+/.test(line.trim())) { const items: string[] = []; while (i < lines.length && /^\d+\.\s+/.test(lines[i]!.trim())) { items.push(lines[i]!.trim().replace(/^\d+\.\s+/, "")); i++; } blocks.push({ type: "list", content: "", items }); continue; }
    if (line.trim() === "") { i++; continue; }
    const pLines: string[] = [];
    while (i < lines.length && lines[i]!.trim() !== "" && !lines[i]!.startsWith("#") && !lines[i]!.startsWith("> ") && !lines[i]!.startsWith("```") && !/^[-*]\s+/.test(lines[i]!.trim()) && !/^\d+\.\s+/.test(lines[i]!.trim()) && !/^---+$/.test(lines[i]!.trim()) && !(lines[i]!.includes("|") && i + 1 < lines.length && lines[i + 1]!.includes("---"))) { pLines.push(lines[i]!); i++; }
    if (pLines.length > 0) blocks.push({ type: "paragraph", content: pLines.join("\n") });
  }
  return blocks;
}

// ── Content Renderer ───────────────────────────────────────────
function ContentRenderer({ entry }: { entry: DocEntry }) {
  const blocks = useMemo(() => parseContent(entry.content), [entry.content]);
  return (
    <div className="min-w-0">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-2xl font-bold text-foreground">{entry.title}</h2>
          <DifficultyBadge difficulty={entry.difficulty} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{entry.summary}</p>
        {entry.sourceUrl && (
          <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300">
            Official docs <ExternalLink className="size-3" />
          </a>
        )}
      </div>
      <div className="prose-sm max-w-none">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "heading": { const Tag = `h${block.level}` as "h2" | "h3" | "h4"; const cls = cn("scroll-mt-24 font-semibold text-foreground", block.level === 2 && "mt-8 mb-4 text-xl border-b border-border/50 pb-2", block.level === 3 && "mt-6 mb-3 text-lg", block.level === 4 && "mt-4 mb-2 text-base"); return <Tag key={i} id={block.id} className={cls}>{formatInline(block.content)}</Tag>; }
            case "paragraph": return <p key={i} className="mb-4 text-sm leading-relaxed text-muted-foreground">{formatInline(block.content)}</p>;
            case "list": return <ul key={i} className="mb-4 space-y-1.5 pl-4">{block.items?.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-400/60" /><span>{formatInline(item)}</span></li>)}</ul>;
            case "table": return <div key={i} className="mb-4 overflow-x-auto rounded-lg border border-border/50"><table className="w-full text-sm">{block.rows && block.rows.length > 0 && <><thead><tr className="border-b border-border/50 bg-muted/30">{block.rows[0]!.map((c, ci) => <th key={ci} className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">{c}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, ri) => <tr key={ri} className="border-b border-border/30 last:border-0">{row.map((c, ci) => <td key={ci} className="px-3 py-2 text-muted-foreground">{formatInline(c)}</td>)}</tr>)}</tbody></>}</table></div>;
            case "blockquote": return <blockquote key={i} className="mb-4 border-l-2 border-violet-500/40 bg-violet-500/5 py-2 pl-4 text-sm italic text-muted-foreground/80">{formatInline(block.content)}</blockquote>;
            case "hr": return <hr key={i} className="my-8 border-border/50" />;
            default: return null;
          }
        })}
      </div>
      {entry.codeSnippets.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Code Examples</h3>
          {entry.codeSnippets.map((s) => <CopyableCodeBlock key={s.id} code={s.code} language={s.language} label={s.label} />)}
        </div>
      )}
      {entry.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => <span key={tag} className="rounded-md bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground/70">{tag}</span>)}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function DocsPage() {
  const [categories, setCategories] = useState<DocCategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DocEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    const catTypes = Object.keys(categoryMeta) as DocCategoryType[];

    const importMap: Record<DocCategoryType, () => Promise<unknown>> = {
      dart: () => import("@/lib/docs/docs-dart"),
      flutter: () => import("@/lib/docs/docs-flutter"),
      bloc: () => import("@/lib/docs/docs-bloc"),
      packages: () => import("@/lib/docs/docs-packages"),
      firebase: () => import("@/lib/docs/docs-firebase"),
      "cheat-sheet": () => import("@/lib/docs/docs-cheat-sheet"),
    };

    const keyMap: Record<DocCategoryType, string> = {
      dart: "dartDocs",
      flutter: "flutterDocs",
      bloc: "blocDocs",
      packages: "packagesDocs",
      firebase: "firebaseDocs",
      "cheat-sheet": "cheatSheetDocs",
    };

    async function load() {
      const results: DocCategoryGroup[] = [];
      for (const catType of catTypes) {
        try {
          const mod = await importMap[catType]() as Record<string, unknown>;
          const docs = mod[keyMap[catType]] as DocEntry[] | undefined;
          if (docs && docs.length > 0 && !cancelled) {
            results.push({
              ...categoryMeta[catType],
              categoryType: catType,
              entries: docs,
            });
          }
        } catch (err) {
          console.error(`[Docs] Failed to load ${catType}:`, err);
        }
      }
      if (!cancelled) {
        console.log(`[Docs] Loaded ${results.length} categories, ${results.reduce((s, c) => s + c.entries.length, 0)} entries`);
        setCategories(results);
        setIsLoading(false);
      }
    }

    load().catch((err) => {
      if (!cancelled) {
        setError(String(err));
        setIsLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        entries: cat.entries.filter(
          (e) =>
            e.title.toLowerCase().includes(q) ||
            e.summary.toLowerCase().includes(q) ||
            e.tags.some((t) => t.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.entries.length > 0);
  }, [categories, searchQuery]);

  if (isLoading) {
    return (
      <div className="space-y-6 p-8">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-96" />
        <Skeleton className="h-10 w-full max-w-xl" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="hidden lg:block space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
          <div className="lg:col-span-3 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-6">
                <Skeleton className="mb-3 h-5 w-48" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />
                <Skeleton className="h-32 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-4">
          <p className="text-lg font-semibold text-red-300">Failed to load documentation</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Knowledge Base
            </span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive Flutter, Dart, Bloc, and Firebase documentation with interactive code examples.
          </p>
          {/* Search */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs... (e.g. dio, go_router, sealed class)"
                className="h-10 w-full rounded-lg border border-border bg-background/50 pl-4 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selected entry */}
        {selectedEntry && (
          <div className="mb-8">
            <button
              onClick={() => setSelectedEntry(null)}
              className="mb-4 text-sm text-violet-400 hover:text-violet-300"
            >
              ← Back to all docs
            </button>
            <ContentRenderer entry={selectedEntry} />
          </div>
        )}

        {/* Categories */}
        {!selectedEntry &&
          filtered.map((cat) => {
            const Icon = cat.icon;
            return (
              <section key={cat.id} className="mb-16">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10">
                    <Icon className="size-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {cat.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {cat.description}
                    </p>
                  </div>
                </div>
                {cat.entries.map((entry) => (
                  <article
                    key={entry.id}
                    id={entry.id}
                    className="mb-8 scroll-mt-24 rounded-xl border border-border/50 bg-card/30 p-6 transition-all hover:border-violet-500/20 hover:bg-card/50"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <DifficultyBadge difficulty={entry.difficulty} />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {entry.summary}
                    </p>
                    {entry.codeSnippets.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {entry.codeSnippets.slice(0, 2).map((s) => (
                          <CopyableCodeBlock
                            key={s.id}
                            code={s.code}
                            language={s.language}
                            label={s.label}
                          />
                        ))}
                        {entry.codeSnippets.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{entry.codeSnippets.length - 2} more code examples
                          </p>
                        )}
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground/70"
                          >
                            {tag}
                          </span>
                        ))}
                        {entry.tags.length > 5 && (
                          <span className="text-[11px] text-muted-foreground/50">
                            +{entry.tags.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedEntry(entry)}
                      className="mt-3 text-sm text-violet-400 hover:text-violet-300"
                    >
                      Read more →
                    </button>
                  </article>
                ))}
              </section>
            );
          })}

        {filtered.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/30 py-20 text-center">
            <SearchX className="mb-4 size-10 text-muted-foreground/30" />
            <p className="text-lg font-medium text-foreground">
              No matching topics found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try different keywords like &ldquo;dio&rdquo;,
              &ldquo;go_router&rdquo;, or &ldquo;sealed class&rdquo;
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchQuery("")}
              className="mt-4"
            >
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
