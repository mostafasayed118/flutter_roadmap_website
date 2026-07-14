"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { Menu, SearchX, X } from "lucide-react";
import {
  loadAllCategories,
  filterLoadedCategories,
} from "@/lib/docs";
import type { DocCategoryGroup, DocEntry } from "@/lib/docs/types";
import { DocsSidebar } from "./DocsSidebar";
import { DocContentRenderer } from "./DocContentRenderer";
import { SearchBar } from "./SearchBar";
import { RelatedRoadmapBanner } from "./RelatedRoadmapBanner";
import { DifficultyBadge } from "./DifficultyBadge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const STORAGE_KEY = "flutterpath-docs-read";

function getReadDocs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function markAsRead(id: string): Set<string> {
  const readDocs = getReadDocs();
  readDocs.add(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...readDocs]));
  return readDocs;
}

function DocsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-72 rounded-md bg-muted/50" />
        <Skeleton className="mt-1 h-4 w-96 rounded-md bg-muted/50" />
      </div>
      <Skeleton className="h-10 w-full max-w-xl rounded-lg bg-muted/50" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg bg-muted/50" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border/50 bg-card/30 p-6"
            >
              <Skeleton className="mb-3 h-5 w-48 rounded-md bg-muted/50" />
              <Skeleton className="mb-2 h-4 w-full rounded-md bg-muted/50" />
              <Skeleton className="mb-4 h-4 w-3/4 rounded-md bg-muted/50" />
              <Skeleton className="h-32 w-full rounded-lg bg-muted/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocsContentEnhanced() {
  const [categories, setCategories] = useState<DocCategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<DocEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DocEntry | null>(null);
  const [readDocs, setReadDocs] = useState<Set<string>>(() => new Set());

  // Load categories lazily on mount
  useEffect(() => {
    loadAllCategories()
      .then((cats) => {
        console.log("[Docs] Loaded categories:", cats.length, "with entries:", cats.reduce((sum, c) => sum + c.entries.length, 0));
        setCategories(cats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("[Docs] Failed to load categories:", err);
        setLoadError(true);
        setIsLoading(false);
      });
  }, []);

  // Load read docs from localStorage
  useEffect(() => {
    setReadDocs(getReadDocs());
  }, []);

  const filteredCategories = useMemo(
    () => filterLoadedCategories(categories, searchQuery),
    [categories, searchQuery]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        const q = query.toLowerCase();
        const results = categories.flatMap((cat) =>
          cat.entries.filter(
            (entry) =>
              entry.title.toLowerCase().includes(q) ||
              entry.summary.toLowerCase().includes(q) ||
              entry.tags.some((tag) => tag.toLowerCase().includes(q)) ||
              entry.codeSnippets.some(
                (snip) =>
                  snip.label.toLowerCase().includes(q) ||
                  snip.code.toLowerCase().includes(q)
              )
          )
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    [categories]
  );

  const handleSelectSearchResult = useCallback((entry: DocEntry) => {
    setSelectedEntry(entry);
    setSearchQuery("");
    setSearchResults([]);
    // Scroll to the entry after a short delay for DOM update
    setTimeout(() => {
      const el = document.getElementById(entry.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, []);

  const handleSelectEntryFromSidebar = useCallback((entry: DocEntry) => {
    setSelectedEntry(entry);
  }, []);

  const handleMarkRead = useCallback((entryId: string) => {
    setReadDocs(markAsRead(entryId));
  }, []);

  if (isLoading) {
    return <DocsSkeleton />;
  }

  if (loadError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-4">
          <p className="text-lg font-semibold text-red-300">Failed to load documentation</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page to try again.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header bar */}
      <div className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl lg:hidden">
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
            <SheetHeader className="border-b border-border/50 px-4 py-3">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto p-3">
              <DocsSidebar
                categories={filteredCategories}
                onNavigate={() => setMobileOpen(false)}
                onSelectEntry={handleSelectEntryFromSidebar}
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Knowledge Base
            </span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Comprehensive Flutter, Dart, Bloc, and Firebase documentation with
            interactive code examples.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-xl">
            <SearchBar
              onSearch={handleSearch}
              results={searchResults}
              onSelect={handleSelectSearchResult}
            />
          </div>

          {searchQuery && (
            <p className="mt-2 text-xs text-muted-foreground">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} found for{" "}
              <span className="font-medium text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </p>
          )}
        </div>

        {/* Selected entry banner */}
        {selectedEntry && (
          <div className="mb-6">
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    Viewing:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {selectedEntry.title}
                  </span>
                  <DifficultyBadge difficulty={selectedEntry.difficulty} />
                </div>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
                aria-label="Clear selection"
              >
                <X className="size-4" />
              </button>
            </div>
            <RelatedRoadmapBanner
              relatedWeeks={selectedEntry.relatedWeeks}
              className="mt-3"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <DocsSidebar
                categories={filteredCategories}
                selectedEntryId={selectedEntry?.id}
                onSelectEntry={handleSelectEntryFromSidebar}
              />
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 lg:col-span-3">
            {filteredCategories.length === 0 && searchQuery && (
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
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="mt-4"
                >
                  Clear search
                </Button>
              </div>
            )}

            {/* If an entry is selected, show it with DocContentRenderer */}
            {selectedEntry ? (
              <DocContentRenderer
                entry={selectedEntry}
                onMarkRead={handleMarkRead}
              />
            ) : (
              /* Otherwise, show all categories with DocEntryCards */
              filteredCategories.map((cat) => (
                <section key={cat.id} className="mb-16">
                  <div id={`cat-${cat.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10">
                        <cat.icon className="size-5 text-violet-400" />
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
                  </div>

                  {cat.entries.map((entry) => (
                    <article
                      key={entry.id}
                      id={entry.id}
                      className="mb-10 scroll-mt-24"
                    >
                      <DocContentRenderer
                        entry={entry}
                        onMarkRead={handleMarkRead}
                      />
                    </article>
                  ))}
                </section>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
