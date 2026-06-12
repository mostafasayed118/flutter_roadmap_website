"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const channels = [
  { name: "Vandad Nahavandipoor", note: "Comprehensive Dart & Flutter" },
  { name: "Reso Coder", note: "Clean Architecture focus" },
  { name: "Flutter (Official)", note: "Official channel" },
  { name: "The Net Ninja", note: "Beginner-friendly" },
  { name: "Code With Andrea", note: "Advanced patterns" },
  { name: "FilledStacks", note: "Architecture & best practices" },
  { name: "Tharwat Samy", note: "Arabic content" },
];

const searchUrl = (name: string) => {
  const query = name.includes("Official") ? "Flutter" : name;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query + " Flutter")}`;
};

export function YoutubeSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">YouTube Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {channels.map((ch) => (
            <a
              key={ch.name}
              href={searchUrl(ch.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0 hover:text-primary transition-colors group"
            >
              <div>
                <p className="text-sm font-medium">{ch.name}</p>
                <p className="text-xs text-muted-foreground">{ch.note}</p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
