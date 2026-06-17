"use client";

import { useState, useMemo, useCallback } from "react";
import { Menu, Search, X } from "lucide-react";
import { docsData, type DocSection } from "@/lib/docs-data";
import { filterCategories } from "@/lib/search";
import { DocsSidebar } from "./DocsSidebar";
import { CopyableCodeBlock } from "@/components/ui/copyable-code-block";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

export function DocsContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(
    () => filterCategories(docsData, searchQuery),
    [searchQuery]
  );

  const resultCount = useMemo(
    () => filteredData.reduce((sum, cat) => sum + cat.sections.length, 0),
    [filteredData]
  );

  const clearSearch = useCallback(() => setSearchQuery(""), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header bar */}
      <div className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-white/5 bg-background/80 px-4 backdrop-blur-xl lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open navigation"
              />
            }
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b border-white/5 px-4 py-3">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto p-3">
              <DocsSidebar
                categories={filteredData}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-sm font-medium text-foreground">
          Knowledge Base
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header + search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Knowledge Base
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive Flutter, Dart, Bloc, and Firebase documentation with
            interactive code examples.
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docs... (e.g. dio, go_router, sealed class)"
              className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-muted-foreground">
              {resultCount} section{resultCount !== 1 ? "s" : ""} found for{" "}
              <span className="font-medium text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DocsSidebar categories={filteredData} />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 lg:col-span-3">
            {filteredData.length === 0 && searchQuery && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] py-20 text-center">
                <Search className="mb-4 size-10 text-muted-foreground/30" />
                <p className="text-lg font-medium text-foreground">
                  No results found
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different search term like &ldquo;dio&rdquo;,
                  &ldquo;go_router&rdquo;, or &ldquo;sealed class&rdquo;
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSearch}
                  className="mt-4"
                >
                  Clear search
                </Button>
              </div>
            )}

            {filteredData.map((cat) => (
              <section key={cat.id} className="mb-16">
                <div id={`cat-${cat.id}`} className="scroll-mt-24">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10">
                      <cat.icon className="size-5 text-violet-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        <HighlightedText text={cat.title} query={searchQuery} />
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>

                {cat.sections.map((sec) => (
                  <SectionCard
                    key={sec.id}
                    section={sec}
                    query={searchQuery}
                  />
                ))}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  section,
  query,
}: {
  section: DocSection;
  query: string;
}) {
  return (
    <article
      id={section.id}
      className="mb-10 scroll-mt-24 rounded-xl border border-white/5 bg-white/[0.02] p-6"
    >
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        <HighlightedText text={section.title} query={query} />
      </h3>
      <div className="text-sm leading-relaxed text-muted-foreground">
        <HighlightedText text={section.content} query={query} />
      </div>

      {section.codeSnippets && section.codeSnippets.length > 0 && (
        <div className="mt-4 space-y-3">
          {section.codeSnippets.map((snippet, i) => (
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
