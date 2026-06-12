"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Official Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {docs.map((doc) => (
            <a key={doc.name} href={doc.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full justify-between gap-1 h-auto py-2">
                <span className="text-xs font-medium">{doc.name}</span>
                <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
              </Button>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
