"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

interface ShortcutItem {
  keys: string[];
  label: string;
}

interface ShortcutSection {
  title: string;
  shortcuts: ShortcutItem[];
}

const SHORTCUTS: ShortcutSection[] = [
  {
    title: "Timer Controls",
    shortcuts: [
      { keys: ["Space"], label: "Start / Pause timer" },
      { keys: ["S"], label: "Save session (when timer running)" },
    ],
  },
  {
    title: "Navigation",
    shortcuts: [
      { keys: ["/"], label: "Focus search bar" },
    ],
  },
  {
    title: "General",
    shortcuts: [
      { keys: ["?"], label: "Toggle this help" },
      { keys: ["Esc"], label: "Close dialog / modal" },
    ],
  },
];

function KbdBadge({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((key) => (
        <kbd
          key={key}
          className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-white/10 bg-white/5 px-1.5 font-mono text-xs text-muted-foreground"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsModal({
  open,
  onOpenChange,
}: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-white/10 bg-[oklch(0.14_0.005_280)] backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Keyboard className="size-5 text-violet-400" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {SHORTCUTS.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
              <div className="space-y-1.5">
                {section.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.label}
                    className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-white/5"
                  >
                    <span className="text-sm text-foreground">
                      {shortcut.label}
                    </span>
                    <KbdBadge keys={shortcut.keys} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground/60">
          Shortcuts are disabled when typing in input fields
        </p>
      </DialogContent>
    </Dialog>
  );
}
