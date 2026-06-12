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
      <motion.div
        className="absolute inset-0 rounded-md border"
        animate={{
          borderColor: checked ? "oklch(0.7 0.2 160)" : "oklch(0.4 0 0)",
          backgroundColor: checked
            ? "oklch(0.7 0.2 160 / 0.2)"
            : "transparent",
        }}
        transition={{ duration: 0.2 }}
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
              stroke="oklch(0.7 0.2 160)"
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
