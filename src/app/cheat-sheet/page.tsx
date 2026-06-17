import dynamic from "next/dynamic";

const CheatSheetContent = dynamic(
  () =>
    import("@/components/features/cheat-sheet/CheatSheetContent").then(
      (mod) => mod.CheatSheetContent
    ),
  {
    loading: () => (
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-8 w-72 rounded-md bg-white/5" />
          <div className="h-4 w-96 mt-1 rounded-md bg-white/5" />
        </div>
        <div className="h-10 w-full rounded-lg bg-white/5" />
        <div className="h-64 w-full rounded-xl bg-white/5" />
      </div>
    ),
  }
);

export default function CheatSheetPage() {
  return <CheatSheetContent />;
}
