"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

interface OverallProgressCardProps {
  percentage: number;
}

export function OverallProgressCard({ percentage }: OverallProgressCardProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <GlassCard hover glow glowColor="violet" className="p-6">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Overall Progress</h3>
        <div className="relative size-40">
          <svg viewBox="0 0 160 160" className="size-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="oklch(0.2 0 0)"
              strokeWidth="8"
            />
            <motion.circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {percentage}%
            </motion.span>
            <span className="text-xs text-muted-foreground mt-1">completed</span>
          </div>
          {percentage > 0 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139,92,246,0.1)",
                  "0 0 40px rgba(139,92,246,0.2)",
                  "0 0 20px rgba(139,92,246,0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          )}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {percentage === 100
            ? "All items completed!"
            : percentage === 0
              ? "Start your journey!"
              : `${100 - percentage}% remaining`}
        </p>
      </div>
    </GlassCard>
  );
}
