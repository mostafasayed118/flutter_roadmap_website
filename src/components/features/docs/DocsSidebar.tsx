"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocCategory } from "@/lib/docs-data";

interface DocsSidebarProps {
  categories: DocCategory[];
  className?: string;
  onNavigate?: () => void;
}

interface ActiveState {
  categoryId: string;
  sectionId: string;
}

export function DocsSidebar({ categories, className, onNavigate }: DocsSidebarProps) {
  const [active, setActive] = useState<ActiveState | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categories.map((c) => c.id))
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    const sectionElements: HTMLElement[] = [];
    const categoryElements: HTMLElement[] = [];

    categories.forEach((cat) => {
      const catEl = document.getElementById(`cat-${cat.id}`);
      if (catEl) categoryElements.push(catEl);

      cat.sections.forEach((sec) => {
        const secEl = document.getElementById(sec.id);
        if (secEl) sectionElements.push(secEl);
      });
    });

    if (sectionElements.length === 0) return;

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
          const sectionId = topEntry.target.id;

          const matchedCat = categories.find((cat) =>
            cat.sections.some((sec) => sec.id === sectionId)
          );

          if (matchedCat) {
            setActive({ categoryId: matchedCat.id, sectionId });
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

    sectionElements.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [categories]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onNavigate?.();
    },
    [onNavigate]
  );

  return (
    <nav className={cn("space-y-1", className)}>
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isExpanded = expandedCategories.has(cat.id);
        const isCatActive = active?.categoryId === cat.id;

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
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1 truncate">{cat.title}</span>
              <ChevronRight
                className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
                  isExpanded && "rotate-90"
                )}
              />
            </button>

            {isExpanded && (
              <ul className="mt-1 ml-4 space-y-0.5 border-l border-border/50 pl-3">
                {cat.sections.map((sec) => {
                  const isActive = active?.sectionId === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        onClick={() => scrollToSection(sec.id)}
                        className={cn(
                          "w-full truncate rounded-md px-2 py-1 text-left text-[13px] transition-colors",
                          isActive
                            ? "bg-violet-500/10 font-medium text-violet-400"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {sec.title}
                      </button>
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
