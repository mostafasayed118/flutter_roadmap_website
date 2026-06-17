import { GlassCard } from "@/components/ui/glass-card";

const tips = [
  { icon: "🔥", title: "Code EVERY DAY", desc: "consistency beats intensity" },
  { icon: "📱", title: "Build projects", desc: "don't just follow tutorials" },
  { icon: "🐛", title: "Debug on your own", desc: "before asking for help" },
  { icon: "📖", title: "Read official documentation", desc: "it's your best friend" },
  { icon: "👥", title: "Join Flutter communities", desc: "Discord, Reddit, Twitter" },
  { icon: "💼", title: "Push everything to GitHub", desc: "build your portfolio" },
  { icon: "📝", title: "Document your learning", desc: "write about what you learn" },
  { icon: "🔄", title: "Review and refactor", desc: "improve old code" },
  { icon: "🎨", title: "Focus on UI/UX quality", desc: "details matter" },
  { icon: "🚀", title: "Deploy at least 2 apps", desc: "ship to stores" },
];

export function FinalTips() {
  return (
    <GlassCard className="p-5">
      <h2 className="text-lg font-semibold mb-4">Final Tips</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 hover:bg-white/[0.05] hover:border-white/10 transition-all"
          >
            <span className="text-lg shrink-0">{tip.icon}</span>
            <div>
              <p className="text-sm font-medium">{tip.title}</p>
              <p className="text-xs text-muted-foreground">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
