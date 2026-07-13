"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}

export function AnimatedCheckbox({
  checked,
  onToggle,
  size = "md",
}: AnimatedCheckboxProps) {
  const dim = size === "sm" ? 16 : 20;

  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="relative flex shrink-0 cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 rounded"
      style={{ width: dim, height: dim }}
    >
      <div
        className={`absolute inset-0 rounded-md border transition-colors duration-200 ease-in-out ${
          checked
            ? "border-emerald-500 bg-emerald-500/20"
            : "border-zinc-700 bg-transparent"
        }`}
      />
      <AnimatePresence>
        {checked && (
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewBox="0 0 24 24"
            className="absolute"
            style={{ width: dim * 0.7, height: dim * 0.7 }}
          >
            <motion.path
              d="M5 12l5 5L19 7"
              fill="none"
              stroke="currentColor"
              className="text-emerald-500"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
