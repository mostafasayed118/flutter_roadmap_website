"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TopicCheckboxProps {
  title: string;
  isChecked: boolean;
  onToggle: () => void;
}

export function TopicCheckbox({ title, isChecked, onToggle }: TopicCheckboxProps) {
  return (
    <label className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer group">
      <Checkbox
        checked={isChecked}
        onCheckedChange={onToggle}
        className="mt-0.5"
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
