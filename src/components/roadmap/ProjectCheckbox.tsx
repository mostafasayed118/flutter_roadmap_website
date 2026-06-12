"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Hammer } from "lucide-react";

interface ProjectCheckboxProps {
  title: string;
  isChecked: boolean;
  onToggle: () => void;
}

export function ProjectCheckbox({ title, isChecked, onToggle }: ProjectCheckboxProps) {
  return (
    <label className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer group">
      <Checkbox
        checked={isChecked}
        onCheckedChange={onToggle}
        className="mt-0.5"
      />
      <Hammer
        className={cn(
          "size-4 mt-0.5 shrink-0 transition-colors",
          isChecked ? "text-muted-foreground" : "text-emerald-500"
        )}
      />
      <span
        className={cn(
          "text-sm leading-relaxed transition-colors",
          isChecked && "text-muted-foreground line-through"
        )}
      >
        {title}
      </span>
    </label>
  );
}
