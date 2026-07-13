"use client";

import { useEffect } from "react";

interface AutoScrollToNextProps {
  weekOrder: number;
  isComplete: boolean;
  isFirstIncomplete: boolean;
}

export function AutoScrollToNext({
  weekOrder,
  isComplete,
  isFirstIncomplete,
}: AutoScrollToNextProps) {
  useEffect(() => {
    if (isFirstIncomplete) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`week-${weekOrder}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-violet-500/50", "ring-offset-2", "ring-offset-background");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-violet-500/50", "ring-offset-2", "ring-offset-background");
          }, 2000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [weekOrder, isFirstIncomplete]);

  return null;
}
