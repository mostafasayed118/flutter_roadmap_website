import dynamic from "next/dynamic";

const DocsContentEnhanced = dynamic(
  () =>
    import("@/components/features/docs/DocsContentEnhanced").then(
      (mod) => mod.DocsContentEnhanced
    ),
  {
    loading: () => (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6 animate-pulse">
            <div>
              <div className="h-8 w-72 rounded-md bg-muted/50" />
              <div className="h-4 w-96 mt-1 rounded-md bg-muted/50" />
            </div>
            <div className="h-10 w-full max-w-xl rounded-lg bg-muted/50" />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              <div className="hidden lg:block space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-8 w-full rounded-lg bg-muted/50" />
                ))}
              </div>
              <div className="lg:col-span-3 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border/50 bg-card/30 p-6"
                  >
                    <div className="mb-3 h-5 w-48 rounded-md bg-muted/50" />
                    <div className="mb-2 h-4 w-full rounded-md bg-muted/50" />
                    <div className="mb-4 h-4 w-3/4 rounded-md bg-muted/50" />
                    <div className="h-32 w-full rounded-lg bg-muted/50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

export default function DocsPage() {
  return <DocsContentEnhanced />;
}
