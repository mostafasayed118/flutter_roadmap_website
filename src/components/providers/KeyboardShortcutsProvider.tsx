"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useStudyTimerContext } from "@/components/features/time-tracker/StudyTimerProvider";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { KeyboardShortcutsModal } from "@/components/features/keyboard-shortcuts-modal";

interface KeyboardShortcutsContextValue {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
}

const KeyboardShortcutsContext =
  createContext<KeyboardShortcutsContextValue | null>(null);

export function useKeyboardShortcutsContext(): KeyboardShortcutsContextValue {
  const ctx = useContext(KeyboardShortcutsContext);
  if (!ctx) {
    throw new Error(
      "useKeyboardShortcutsContext must be used within a <KeyboardShortcutsProvider>"
    );
  }
  return ctx;
}

export function KeyboardShortcutsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [helpOpen, setHelpOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const timer = useStudyTimerContext();

  const handleToggleTimer = useCallback(() => {
    if (timer.isRunning) {
      timer.pause();
    } else if (timer.isPaused) {
      timer.resume();
    } else {
      timer.start();
    }
  }, [timer]);

  const handleSaveSession = useCallback(() => {
    // Save is handled by the page-level stop handler
    // This shortcut just triggers stop if timer is running
    if (timer.isRunning || timer.isPaused) {
      timer.stop();
    }
  }, [timer]);

  const handleFocusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleToggleHelp = useCallback(() => {
    setHelpOpen((prev) => !prev);
  }, []);

  useKeyboardShortcuts({
    onToggleTimer: handleToggleTimer,
    onSaveSession: handleSaveSession,
    onFocusSearch: handleFocusSearch,
    onToggleHelp: handleToggleHelp,
  });

  return (
    <KeyboardShortcutsContext.Provider
      value={{ searchInputRef, helpOpen, setHelpOpen }}
    >
      {children}
      <KeyboardShortcutsModal open={helpOpen} onOpenChange={setHelpOpen} />
    </KeyboardShortcutsContext.Provider>
  );
}
