"use client";

import { AnimatedCheckbox } from "@/components/ui/animated-checkbox";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientProgress } from "@/components/ui/gradient-progress";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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
  const isComplete = percentage === 100;

  return (
    <GlassCard
      hover
      glow={isComplete}
      glowColor="emerald"
      className={cn(
        "overflow-hidden",
        isComplete && "border-emerald-500/20"
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle2 className="size-4 text-emerald-400" />
            ) : null}
            <h2 className="font-semibold text-sm">{category}</h2>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
            {completedCount}/{totalCount}
          </span>
        </div>
        <GradientProgress value={percentage} height="h-1.5" />
        <div className="mt-3 space-y-0.5">
          {items.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 rounded-md px-2 py-1.5 hover:bg-white/[0.03] cursor-pointer group"
            >
              <AnimatedCheckbox checked={item.completed} onToggle={() => onToggle(idx)} size="sm" />
              <span
                className={cn(
                  "text-sm leading-relaxed transition-all duration-200",
                  item.completed
                    ? "text-muted-foreground line-through decoration-emerald-500/50"
                    : "text-foreground/80 group-hover:text-foreground"
                )}
              >
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
