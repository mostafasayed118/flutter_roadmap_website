"use client";

import { useState, useCallback } from "react";
import { useRoadmap } from "@/hooks/use-progress";
import { useStudyTimerContext } from "@/components/features/time-tracker/StudyTimerProvider";
import { MiniTimer } from "@/components/features/time-tracker/MiniTimer";
import { SaveSessionDialog } from "@/components/features/time-tracker/SaveSessionDialog";
import { PhaseAccordion } from "@/components/features/roadmap/PhaseAccordion";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function RoadmapPage() {
  const { roadmap, isLoading, seedRoadmap } = useRoadmap();
  const timer = useStudyTimerContext();
  const [isSeeding, setIsSeeding] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [savedDuration, setSavedDuration] = useState(0);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedRoadmap();
      toast.success("Roadmap loaded successfully");
    } catch (err) {
      console.error("Seed failed:", err);
      toast.error("Failed to load roadmap data");
    } finally {
      setIsSeeding(false);
    }
  };

  // Intercept timer stop to open save dialog
  const handleTimerStop = useCallback(() => {
    const elapsed = timer.time;
    timer.stop();
    if (elapsed > 60000) {
      setSavedDuration(elapsed);
      setSaveOpen(true);
    }
  }, [timer]);

  if (isLoading || !roadmap) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 rounded-md" />
          <Skeleton className="mt-1 h-4 w-72 rounded-md" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <GlassCard key={i} className="p-4">
              <div className="mb-3 flex items-start justify-between">
                <Skeleton className="h-5 w-48 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (roadmap.length === 0) {
    return (
      <AnimatedPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Flutter Roadmap
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              34 weeks · 10 phases · Track your progress by checking off topics
              and projects
            </p>
          </div>
          <GlassCard className="p-6 sm:p-12">
            <EmptyState
              icon={Database}
              title="No roadmap data yet"
              description="The roadmap database is empty. Click the button below to load all 34 weeks of Flutter learning content."
              action={
                <Button
                  onClick={handleSeed}
                  disabled={isSeeding}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
                >
                  {isSeeding ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="size-4 rounded-full border-2 border-border border-t-foreground"
                    />
                  ) : (
                    <>
                      Load Roadmap Data
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              }
            />
          </GlassCard>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Flutter Roadmap
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              34 weeks · 10 phases · Track your progress by checking off topics
              and projects
            </p>
          </div>
          <MiniTimer onStop={handleTimerStop} />
        </div>

        <Accordion
          className="space-y-3"
          defaultValue={
            roadmap.length > 0 ? [`phase-${roadmap[0]!.order}`] : []
          }
        >
          {roadmap.map((phase) => (
            <PhaseAccordion
              key={phase._id}
              phaseId={phase._id}
              order={phase.order}
              title={phase.title}
              duration={phase.duration}
              period={phase.period}
              weeks={phase.weeks}
              stats={phase.stats}
            />
          ))}
        </Accordion>
      </div>

      <SaveSessionDialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        durationMs={savedDuration}
        onSaved={() => {
          setSaveOpen(false);
          timer.reset();
        }}
      />
    </AnimatedPage>
  );
}
