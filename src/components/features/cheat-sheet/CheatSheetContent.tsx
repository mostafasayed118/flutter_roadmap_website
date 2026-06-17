"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyableCodeBlock } from "@/components/ui/copyable-code-block";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Terminal,
  Code2,
  Palette,
  Boxes,
  Database,
  Wifi,
  FlaskConical,
  Rocket,
  MapIcon,
  type LucideIcon,
} from "lucide-react";
import {
  cheatCategories,
  type CheatIconKey,
  type CheatSection,
} from "@/lib/cheat-sheet-data";

const iconMap: Record<CheatIconKey, LucideIcon> = {
  code2: Code2,
  palette: Palette,
  map: MapIcon,
  boxes: Boxes,
  wifi: Wifi,
  database: Database,
  flask: FlaskConical,
  rocket: Rocket,
  terminal: Terminal,
};

function CheatSheetSection({ section }: { section: CheatSection }) {
  return (
    <div className="space-y-2">
      <CopyableCodeBlock
        code={section.code}
        language={section.language}
        label={section.label}
      />
    </div>
  );
}

export function CheatSheetContent() {
  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Flutter Quick Reference
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy-paste ready code snippets for Dart, Flutter, Firebase, and more
          </p>
        </div>

        <Tabs defaultValue="dart" className="w-full">
          <div className="-mx-1 overflow-x-auto px-1">
            <TabsList className="w-full min-w-max border border-white/10 bg-white/5">
              {cheatCategories.map((cat) => {
                const Icon = iconMap[cat.iconKey];
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="gap-1.5 data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-300"
                  >
                    <Icon className="size-4" />
                    <span className="hidden sm:inline">{cat.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {cheatCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-4">
              <GlassCard className="p-4 sm:p-6">
                <div className="space-y-6">
                  {cat.sections.map((section) => (
                    <CheatSheetSection
                      key={section.title}
                      section={section}
                    />
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
