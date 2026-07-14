"use client";

import { AnimatedCheckbox } from "@/components/ui/animated-checkbox";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface RoadmapCheckboxProps {
  title: string;
  isChecked: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
  iconChecked?: string;
  iconUnchecked?: string;
}

export function RoadmapCheckbox({
  title,
  isChecked,
  onToggle,
  icon: Icon,
  iconChecked = "text-emerald-500/50",
  iconUnchecked = "text-emerald-400",
}: RoadmapCheckboxProps) {
  return (
    <label className="flex min-w-0 cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 group hover:bg-muted/30">
      <AnimatedCheckbox checked={isChecked} onToggle={onToggle} />
      {Icon && (
        <Icon
          className={cn(
            "size-4 mt-0.5 shrink-0 transition-colors duration-200",
            isChecked ? iconChecked : iconUnchecked
          )}
        />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 text-sm leading-relaxed transition-all duration-200",
          isChecked
            ? "text-muted-foreground line-through decoration-emerald-500/50"
            : "text-foreground/80 group-hover:text-foreground"
        )}
      >
        {title}
      </span>
    </label>
  );
}
