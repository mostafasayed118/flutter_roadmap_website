"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";
import { AlertTriangle } from "lucide-react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) return null;
    try {
      return new ConvexReactClient(url);
    } catch (err) {
      console.error("Failed to initialize Convex client:", err);
      return null;
    }
  }, []);

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="max-w-md w-full rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-3">
          <AlertTriangle className="size-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-semibold text-red-300">Convex Configuration Missing</h2>
          <p className="text-sm text-muted-foreground">
            The <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NEXT_PUBLIC_CONVEX_URL</code> environment
            variable is not set or is invalid. The app cannot connect to the backend.
          </p>
          <p className="text-xs text-muted-foreground/80">
            Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">npx convex dev</code> to generate it, or set
            it manually in your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code> file.
          </p>
        </div>
      </div>
    );
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
