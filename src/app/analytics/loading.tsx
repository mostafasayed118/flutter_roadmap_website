import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-full max-w-md" />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <GlassCard className="p-6">
          <Skeleton className="h-48" />
        </GlassCard>
        <GlassCard className="p-6">
          <Skeleton className="h-48" />
        </GlassCard>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <GlassCard className="p-6">
          <Skeleton className="h-32" />
        </GlassCard>
        <GlassCard className="p-6">
          <Skeleton className="h-32" />
        </GlassCard>
      </div>
    </div>
  );
}
