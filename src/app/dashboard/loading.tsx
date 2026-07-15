import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-6">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="size-32 rounded-full" />
          </div>
        </GlassCard>
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="p-4">
            <Skeleton className="h-16 w-full" />
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <GlassCard className="p-4">
          <Skeleton className="h-24" />
        </GlassCard>
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <Skeleton className="h-32" />
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
