import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { YoutubeSection } from "@/components/features/resources/YoutubeSection";
import { CoursesSection } from "@/components/features/resources/CoursesSection";
import { DocsSection } from "@/components/features/resources/DocsSection";
import { ToolsSection } from "@/components/features/resources/ToolsSection";
import { ScheduleTable } from "@/components/features/resources/ScheduleTable";
import { FinalTips } from "@/components/features/resources/FinalTips";

export default function ResourcesPage() {
  return (
    <AnimatedPage>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Resources
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
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
    </AnimatedPage>
  );
}
