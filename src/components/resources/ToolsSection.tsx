"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Essential Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
              >
                <Icon className="size-6 text-muted-foreground" />
                <span className="text-xs font-medium leading-tight">{tool.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
