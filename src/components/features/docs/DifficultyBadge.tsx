import { cn } from "@/lib/utils";
import type { Difficulty } from "@/lib/docs/types";

const difficultyConfig: Record<
  Difficulty,
  { label: string; className: string }
> = {
  beginner: {
    label: "Beginner",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  intermediate: {
    label: "Intermediate",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  advanced: {
    label: "Advanced",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
