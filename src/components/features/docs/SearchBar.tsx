"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocEntry, DocCategoryType } from "@/lib/docs/types";

const categoryLabels: Record<DocCategoryType, string> = {
  dart: "Dart",
  flutter: "Flutter",
  bloc: "Bloc/Cubit",
  packages: "Packages",
  firebase: "Firebase",
  "cheat-sheet": "Cheat Sheet",
};

const categoryColors: Record<DocCategoryType, string> = {
  dart: "text-blue-400",
  flutter: "text-cyan-400",
  bloc: "text-purple-400",
  packages: "text-amber-400",
  firebase: "text-orange-400",
  "cheat-sheet": "text-emerald-400",
};

interface SearchBarProps {
  onSearch: (query: string) => void;
  results: DocEntry[];
  onSelect: (entry: DocEntry) => void;
  className?: string;
}

export function SearchBar({
  onSearch,
  results,
  onSelect,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onSearch(value);
      }, 300);
    },
    [onSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setHighlightIndex(-1);
      setIsOpen(value.length > 0);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
    onSearch("");
    inputRef.current?.focus();
  }, [onSearch]);

  const handleSelect = useCallback(
    (entry: DocEntry) => {
      onSelect(entry);
      setIsOpen(false);
      setQuery("");
    },
    [onSelect]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (highlightIndex >= 0 && highlightIndex < results.length) {
            handleSelect(results[highlightIndex]!);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightIndex(-1);
          break;
      }
    },
    [isOpen, results, highlightIndex, handleSelect]
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0) {
      const el = document.getElementById(`search-result-${highlightIndex}`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search docs... (e.g. dio, go_router, sealed class)"
          className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-500/40 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
          aria-label="Search documentation"
          aria-expanded={isOpen && results.length > 0}
          aria-autocomplete="list"
          role="combobox"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {query && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-xl">
          <div className="p-1">
            {results.slice(0, 10).map((entry, i) => (
              <button
                key={entry.id}
                id={`search-result-${i}`}
                onClick={() => handleSelect(entry)}
                onMouseEnter={() => setHighlightIndex(i)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                  highlightIndex === i
                    ? "bg-violet-500/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {entry.title}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-[10px] font-medium",
                        categoryColors[entry.category]
                      )}
                    >
                      {categoryLabels[entry.category]}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground/70">
                    {entry.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>
          {results.length > 10 && (
            <div className="border-t border-white/5 px-3 py-2 text-center text-xs text-muted-foreground">
              +{results.length - 10} more results
            </div>
          )}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-white/10 bg-zinc-900/95 p-6 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-sm text-muted-foreground">
            No results for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Try &ldquo;dio&rdquo;, &ldquo;go_router&rdquo;, or &ldquo;sealed
            class&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
