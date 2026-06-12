"use client";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SkillItem {
  name: string;
  completed: boolean;
}

interface SkillCategoryCardProps {
  category: string;
  items: SkillItem[];
  onToggle: (itemIndex: number) => void;
}

export function SkillCategoryCard({ category, items, onToggle }: SkillCategoryCardProps) {
  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm">{category}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
            {completedCount}/{totalCount}
          </span>
        </div>
        <Progress value={percentage} className="h-1.5" />
      </CardHeader>
      <CardContent className="space-y-1">
        {items.map((item, idx) => (
          <label
            key={idx}
            className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-muted/50 cursor-pointer group"
          >
            <Checkbox
              checked={item.completed}
              onCheckedChange={() => onToggle(idx)}
              className="mt-0.5"
            />
            <span
              className={cn(
                "text-sm leading-relaxed transition-colors",
                item.completed && "text-muted-foreground line-through"
              )}
            >
              {item.name}
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
