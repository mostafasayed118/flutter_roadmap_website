import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  glowColor?: "violet" | "emerald" | "blue";
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  glowColor = "violet",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/10",
        hover &&
          "transition-all duration-300 ease-out hover:scale-[1.015] hover:border-white/20 hover:shadow-xl hover:shadow-black/15",
        glow &&
          glowColor === "violet" &&
          "ring-1 ring-violet-500/20 hover:ring-violet-500/40",
        glow &&
          glowColor === "emerald" &&
          "ring-1 ring-emerald-500/20 hover:ring-emerald-500/40",
        glow &&
          glowColor === "blue" &&
          "ring-1 ring-blue-500/20 hover:ring-blue-500/40",
        className
      )}
    >
      {children}
    </div>
  );
}
