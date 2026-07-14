"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getReadDocs, toggleReadDoc } from "@/lib/docs-helpers";
import { DifficultyBadge } from "./DifficultyBadge";
import type { DocCategoryGroup, DocEntry } from "@/lib/docs/types";

interface DocsSidebarProps {
  categories: DocCategoryGroup[];
  className?: string;
  onNavigate?: () => void;
  selectedEntryId?: string;
  onSelectEntry?: (entry: DocEntry) => void;
}

interface ActiveState {
  categoryId: string;
  entryId: string;
}

export function DocsSidebar({
  categories,
  className,
  onNavigate,
  selectedEntryId,
  onSelectEntry,
}: DocsSidebarProps) {
  const [active, setActive] = useState<ActiveState | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categories.map((c) => c.id))
  );
  const [readDocs, setReadDocs] = useState<Set<string>>(() => new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Load read docs from localStorage
  useEffect(() => {
    setReadDocs(getReadDocs());
  }, []);

  // Expand category containing selected entry
  useEffect(() => {
    if (selectedEntryId) {
      const matchedCat = categories.find((cat) =>
        cat.entries.some((entry) => entry.id === selectedEntryId)
      );
      if (matchedCat) {
        setExpandedCategories((prev) => {
          if (prev.has(matchedCat.id)) return prev;
          const next = new Set(prev);
          next.add(matchedCat.id);
          return next;
        });
        setActive({ categoryId: matchedCat.id, entryId: selectedEntryId });
      }
    }
  }, [selectedEntryId, categories]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleToggleRead = useCallback((entryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReadDocs(toggleReadDoc(entryId));
  }, []);

  // Intersection observer for active state tracking
  useEffect(() => {
    const entryElements: HTMLElement[] = [];

    categories.forEach((cat) => {
      cat.entries.forEach((entry) => {
        const entryEl = document.getElementById(entry.id);
        if (entryEl) entryElements.push(entryEl);
      });
    });

    if (entryElements.length === 0) return;

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
          const topEntry = visible[0];
          const entryId = topEntry.target.id;

          const matchedCat = categories.find((cat) =>
            cat.entries.some((entry) => entry.id === entryId)
          );

          if (matchedCat) {
            setActive({ categoryId: matchedCat.id, entryId });
            setExpandedCategories((prev) => {
              if (prev.has(matchedCat.id)) return prev;
              const next = new Set(prev);
              next.add(matchedCat.id);
              return next;
            });
          }
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    entryElements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [categories]);

  const scrollToEntry = useCallback(
    (entry: DocEntry) => {
      const el = document.getElementById(entry.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onSelectEntry?.(entry);
      onNavigate?.();
    },
    [onNavigate, onSelectEntry]
  );

  return (
    <nav className={cn("space-y-1", className)} aria-label="Documentation navigation">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isExpanded = expandedCategories.has(cat.id);
        const isCatActive = active?.categoryId === cat.id;

        const completedCount = cat.entries.filter((e) =>
          readDocs.has(e.id)
        ).length;
        const totalCount = cat.entries.length;
        const progress =
          totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return (
          <div key={cat.id} className="mb-2">
            <button
              onClick={() => toggleCategory(cat.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                isCatActive
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-foreground hover:bg-muted"
              )}
              aria-expanded={isExpanded}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 truncate">{cat.title}</span>
              {progress > 0 && (
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {completedCount}/{totalCount}
                </span>
              )}
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </button>

            {/* Progress bar */}
            {progress > 0 && progress < 100 && (
              <div className="mx-2.5 mt-1 h-1 overflow-hidden rounded-full bg-muted/50">
                <div
                  className="h-full rounded-full bg-violet-500/40 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {isExpanded && (
              <ul className="mt-1 ml-4 space-y-0.5 border-l border-border/50 pl-3">
                {cat.entries.map((entry) => {
                  const isActive = active?.entryId === entry.id;
                  const isRead = readDocs.has(entry.id);
                  return (
                    <li key={entry.id}>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => scrollToEntry(entry)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            scrollToEntry(entry);
                          }
                        }}
                        className={cn(
                          "group flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-[13px] transition-colors cursor-pointer",
                          isActive
                            ? "bg-violet-500/10 font-medium text-violet-400"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <button
                          onClick={(e) => handleToggleRead(entry.id, e)}
                          className="shrink-0"
                          aria-label={
                            isRead ? "Mark as unread" : "Mark as read"
                          }
                        >
                          <CheckCircle2
                            className={cn(
                              "size-3.5 transition-colors",
                              isRead
                                ? "text-emerald-400"
                                : "text-muted-foreground/30 group-hover:text-muted-foreground/50"
                            )}
                          />
                        </button>
                        <span className="flex-1 truncate">{entry.title}</span>
                        <DifficultyBadge
                          difficulty={entry.difficulty}
                          className="hidden group-hover:inline-flex"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
