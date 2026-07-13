"use client";

import { Award, Lock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useBadges } from "@/hooks/use-badges";
import { cn } from "@/lib/utils";

const iconMap: Record<string, string> = {
  footprints: "👟",
  trophy: "🏆",
  flame: "🔥",
  target: "🎯",
  code: "💻",
  smartphone: "📱",
  layers: "🧩",
  clock: "⏰",
  hourglass: "⏳",
  award: "🏅",
  zap: "⚡",
  "check-circle": "✅",
  star: "⭐",
  crown: "👑",
  folder: "📁",
};

export function BadgeShowcase() {
  const { badges, unlockedCount, totalCount } = useBadges();

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="size-4 text-amber-400" />
          <h3 className="text-sm font-semibold">Badges</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {unlockedCount}/{totalCount}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              "group relative flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all",
              badge.unlocked
                ? "border-amber-500/20 bg-amber-500/5"
                : "border-white/5 bg-white/[0.02] opacity-50"
            )}
          >
            <span className="text-2xl">
              {badge.unlocked
                ? iconMap[badge.icon] ?? "🏅"
                : "🔒"}
            </span>
            <span className="text-[10px] font-medium leading-tight text-foreground">
              {badge.title}
            </span>
            <span className="text-[9px] text-muted-foreground">
              {badge.description}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
