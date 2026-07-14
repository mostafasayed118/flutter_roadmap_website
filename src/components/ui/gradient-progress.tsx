"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientProgressProps {
  value: number;
  className?: string;
  height?: string;
}

export function GradientProgress({
  value,
  className,
  height = "h-2",
}: GradientProgressProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-muted",
        height,
        className
      )}
    >
      <motion.div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full",
          "bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />
      {value > 0 && (
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 opacity-50 blur-sm"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      )}
      {value > 0 && value < 100 && (
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        />
      )}
    </div>
  );
}
