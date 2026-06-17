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
    <label className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 group hover:bg-white/[0.03]">
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
          "text-sm leading-relaxed transition-all duration-200",
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
