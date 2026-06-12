"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Hammer } from "lucide-react";

interface NextStepsCardProps {
  items: { title: string; week: string; type: "topic" | "project" }[];
  isLoading: boolean;
}

export function NextStepsCard({ items, isLoading }: NextStepsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Next Steps</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            All items completed! Great job.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div className="mt-0.5">
                  {item.type === "topic" ? (
                    <BookOpen className="size-4 text-blue-500" />
                  ) : (
                    <Hammer className="size-4 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.week}</p>
                </div>
                <Badge variant={item.type === "topic" ? "default" : "secondary"} className="shrink-0 text-xs">
                  {item.type === "topic" ? "Topic" : "Project"}
                </Badge>
              </div>
            ))}
            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
              <ArrowRight className="size-3" />
              <span>Continue on the Roadmap page to track more</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
