"use client";

import { useEffect, useRef } from "react";

interface KeyboardShortcutHandlers {
  onToggleTimer: () => void;
  onSaveSession: () => void;
  onFocusSearch: () => void;
  onToggleHelp: () => void;
}

const INPUT_TAG_NAMES = new Set([
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "BUTTON",
]);

function isInputFocused(): boolean {
  const el = document.activeElement;
  if (!el || el === document.body) return false;
  if (INPUT_TAG_NAMES.has(el.tagName)) return true;
  if ((el as HTMLElement).isContentEditable) return true;
  return false;
}

export function useKeyboardShortcuts({
  onToggleTimer,
  onSaveSession,
  onFocusSearch,
  onToggleHelp,
}: KeyboardShortcutHandlers): void {
  const handlersRef = useRef<KeyboardShortcutHandlers>({
    onToggleTimer,
    onSaveSession,
    onFocusSearch,
    onToggleHelp,
  });

  // Keep handlers ref current without re-registering listeners
  useEffect(() => {
    handlersRef.current = {
      onToggleTimer,
      onSaveSession,
      onFocusSearch,
      onToggleHelp,
    };
  }, [onToggleTimer, onSaveSession, onFocusSearch, onToggleHelp]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Escape — let native behavior handle dialog close
      if (event.key === "Escape") return;

      // Skip shortcuts when user is typing in an input
      if (isInputFocused()) return;

      // Skip if modifier keys are held (Ctrl, Alt, Meta)
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const handlers = handlersRef.current;

      switch (event.key) {
        case " ":
          event.preventDefault();
          handlers.onToggleTimer();
          break;
        case "s":
        case "S":
          event.preventDefault();
          handlers.onSaveSession();
          break;
        case "/":
          event.preventDefault();
          handlers.onFocusSearch();
          break;
        case "?":
          event.preventDefault();
          handlers.onToggleHelp();
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
