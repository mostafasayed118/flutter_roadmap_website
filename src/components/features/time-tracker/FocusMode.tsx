"use client";

import { useEffect, useState } from "react";
import { useStudyTimerContext } from "./StudyTimerProvider";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function FocusMode() {
  const { isRunning, time } = useStudyTimerContext();
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    if (!isRunning && isFocusMode) {
      setIsFocusMode(false);
    }
  }, [isRunning, isFocusMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "f" && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        if (isRunning) {
          e.preventDefault();
          setIsFocusMode((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
    return () => document.body.classList.remove("focus-mode");
  }, [isFocusMode]);

  if (!isRunning) return null;

  return (
    <AnimatePresence>
      {isFocusMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 md:bottom-8"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFocusMode(false)}
            className="gap-2 bg-background/80 backdrop-blur-xl border-border/50 shadow-lg"
          >
            <Minimize2 className="size-4" />
            Exit Focus Mode (F)
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
