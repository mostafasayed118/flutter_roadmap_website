"use client";

import { Separator } from "@/components/ui/separator";
import { YoutubeSection } from "@/components/resources/YoutubeSection";
import { CoursesSection } from "@/components/resources/CoursesSection";
import { DocsSection } from "@/components/resources/DocsSection";
import { ToolsSection } from "@/components/resources/ToolsSection";
import { ScheduleTable } from "@/components/resources/ScheduleTable";
import { FinalTips } from "@/components/resources/FinalTips";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
        <p className="text-sm text-muted-foreground">
          Curated learning materials, tools, and references for your Flutter journey
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <YoutubeSection />
        <CoursesSection />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DocsSection />
        <ToolsSection />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Daily Study Schedule</h2>
        <ScheduleTable />
      </div>

      <FinalTips />
    </div>
  );
}
