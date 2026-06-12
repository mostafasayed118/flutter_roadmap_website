"use client";

import { AnimatedCheckbox } from "@/components/ui/animated-checkbox";
import { cn } from "@/lib/utils";
import { Hammer } from "lucide-react";

interface ProjectCheckboxProps {
  title: string;
  isChecked: boolean;
  onToggle: () => void;
}

export function ProjectCheckbox({ title, isChecked, onToggle }: ProjectCheckboxProps) {
  return (
    <label className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-white/[0.03] cursor-pointer group">
      <AnimatedCheckbox checked={isChecked} onToggle={onToggle} />
      <Hammer
        className={cn(
          "size-4 mt-0.5 shrink-0 transition-colors duration-200",
          isChecked ? "text-emerald-500/50" : "text-emerald-400"
        )}
      />
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
