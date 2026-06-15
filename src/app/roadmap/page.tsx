"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useUserId } from "@/hooks/use-user-id";
import { PhaseAccordion } from "@/components/roadmap/PhaseAccordion";
import { Accordion } from "@/components/ui/accordion";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function RoadmapPage() {
  const userId = useUserId();
  const roadmap = useQuery(api.progress.getRoadmapWithProgress, { userId });
  const seedRoadmap = useMutation(api.seed.seedRoadmap);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedRoadmap();
    } catch (err) {
      console.error("Seed failed:", err);
    } finally {
      setIsSeeding(false);
    }
  };

  if (!roadmap) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
          <div className="h-4 w-72 mt-1 animate-pulse rounded bg-white/5" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 w-full animate-pulse rounded-xl bg-white/5" />
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
            <p className="text-sm text-muted-foreground mt-1">
              34 weeks · 10 phases · Track your progress by checking off topics and projects
            </p>
          </div>
          <GlassCard className="p-12 flex flex-col items-center justify-center text-center gap-4">
            <Database className="size-12 text-violet-400/50" />
            <div>
              <h2 className="text-lg font-semibold mb-1">No roadmap data yet</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                The roadmap database is empty. Click the button below to load all 34 weeks
                of Flutter learning content.
              </p>
            </div>
            <Button
              onClick={handleSeed}
              disabled={isSeeding}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {isSeeding ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="size-4 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Load Roadmap Data
                  <ArrowRight className="size-4 ml-2" />
                </>
              )}
            </Button>
          </GlassCard>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Flutter Roadmap
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            34 weeks · 10 phases · Track your progress by checking off topics and projects
          </p>
        </div>

        <Accordion className="space-y-3" defaultValue={roadmap.length > 0 ? [`phase-${roadmap[0]!.order}`] : []}>
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
    </AnimatedPage>
  );
}
