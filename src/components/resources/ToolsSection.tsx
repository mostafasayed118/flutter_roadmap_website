"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  Code,
  Globe,
  Beaker,
  GitBranch,
  Sigma,
  Flame,
} from "lucide-react";

const tools = [
  { name: "VS Code + Flutter Extension", icon: Code },
  { name: "Android Studio", icon: Globe },
  { name: "Postman / Thunder Client", icon: Beaker },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Figma", icon: Sigma },
  { name: "Firebase Console", icon: Flame },
];

export function ToolsSection() {
  return (
    <GlassCard className="p-5">
      <h3 className="text-lg font-semibold mb-4">Essential Tools</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center hover:bg-white/[0.05] hover:border-white/10 transition-all"
            >
              <Icon className="size-5 text-violet-400" />
              <span className="text-xs font-medium leading-tight">{tool.name}</span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
