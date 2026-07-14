"use client";

import {
  Award,
  Lock,
  Footprints,
  Trophy,
  Flame,
  Target,
  Code,
  Smartphone,
  Layers,
  Clock,
  Hourglass,
  Zap,
  CheckCircle2,
  Star,
  Crown,
  Folder,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useBadges } from "@/hooks/use-badges";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  footprints: Footprints,
  trophy: Trophy,
  flame: Flame,
  target: Target,
  code: Code,
  smartphone: Smartphone,
  layers: Layers,
  clock: Clock,
  hourglass: Hourglass,
  award: Award,
  zap: Zap,
  "check-circle": CheckCircle2,
  star: Star,
  crown: Crown,
  folder: Folder,
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
        {badges.map((badge) => {
          const Icon = badge.unlocked ? (iconMap[badge.icon] ?? Award) : Lock;
          return (
            <div
              key={badge.id}
              className={cn(
                "group relative flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all duration-200",
                badge.unlocked
                  ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10"
                  : "border-border/50 bg-card/30 opacity-50"
              )}
            >
              <Icon
                className={cn(
                  "size-6",
                  badge.unlocked ? "text-amber-400" : "text-muted-foreground"
                )}
              />
              <span className="text-[10px] font-medium leading-tight text-foreground">
                {badge.title}
              </span>
              <span className="text-[9px] text-muted-foreground">
                {badge.description}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
