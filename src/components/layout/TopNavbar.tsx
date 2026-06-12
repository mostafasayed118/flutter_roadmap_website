"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Flame, MapPin } from "lucide-react";

export function TopNavbar() {
  const userId = useUserId();
  const stats = useQuery(api.progress.getOverallStats, { userId });

  const percentage = stats?.overallPercentage ?? 0;

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4 bg-background">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex flex-1 items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Flame className="size-4 text-orange-500" />
          <span>Progress</span>
        </div>
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Progress value={percentage} className="h-2" />
          <span className="text-sm font-mono tabular-nums text-muted-foreground min-w-[3ch]">
            {percentage}%
          </span>
        </div>
      </div>
      {stats?.currentPhase && (
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          <span className="truncate max-w-[280px]">
            Phase {stats.currentPhase.order}: {stats.currentPhase.title}
            {stats.currentWeek ? ` — ${stats.currentWeek.title}` : ""}
          </span>
        </div>
      )}
    </header>
  );
}
