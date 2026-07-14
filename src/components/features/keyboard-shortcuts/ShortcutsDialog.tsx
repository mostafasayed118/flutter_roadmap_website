"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["?"], description: "Show keyboard shortcuts", category: "General" },
  { keys: ["Escape"], description: "Close dialog / Cancel", category: "General" },
  { keys: ["/"], description: "Focus search", category: "General" },
  { keys: ["g", "d"], description: "Go to Dashboard", category: "Navigation" },
  { keys: ["g", "r"], description: "Go to Roadmap", category: "Navigation" },
  { keys: ["g", "s"], description: "Go to Skills", category: "Navigation" },
  { keys: ["g", "a"], description: "Go to Analytics", category: "Navigation" },
  { keys: ["g", "b"], description: "Go to Knowledge Base", category: "Navigation" },
  { keys: ["Space"], description: "Start/Stop timer", category: "Timer" },
  { keys: ["S"], description: "Save session", category: "Timer" },
  { keys: ["R"], description: "Reset timer", category: "Timer" },
  { keys: ["t"], description: "Toggle sidebar", category: "UI" },
  { keys: ["d"], description: "Toggle dark mode", category: "UI" },
];

export function ShortcutsDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [...new Set(shortcuts.map((s) => s.category))];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="size-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-1">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50"
                    >
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, j) => (
                          <kbd
                            key={j}
                            className="inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-muted px-1.5 font-mono text-[11px] font-medium"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          Press <kbd className="px-1 py-0.5 rounded border bg-muted font-mono text-[10px]">?</kbd> anywhere to toggle this dialog
        </p>
      </DialogContent>
    </Dialog>
  );
}
