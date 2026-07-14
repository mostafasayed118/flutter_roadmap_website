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
      <h2 className="text-lg font-semibold mb-4">Essential Tools</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card/30 p-3 text-center hover:bg-card/50 hover:border-border transition-all"
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
