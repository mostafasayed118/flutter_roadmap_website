"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const docs = [
  { name: "Flutter", url: "https://flutter.dev" },
  { name: "Dart", url: "https://dart.dev" },
  { name: "Bloc/Cubit", url: "https://bloclibrary.dev" },
  { name: "Packages", url: "https://pub.dev" },
  { name: "Firebase Flutter", url: "https://firebase.flutter.dev" },
];

export function DocsSection() {
  return (
    <GlassCard className="p-5">
      <h2 className="text-lg font-semibold mb-4">Official Documentation</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {docs.map((doc) => (
          <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full justify-between gap-1 h-auto py-2 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10"
            >
              <span className="text-xs font-medium">{doc.name}</span>
              <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
            </Button>
          </a>
        ))}
      </div>
    </GlassCard>
  );
}
