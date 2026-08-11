"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Palette, Check } from "lucide-react";

interface ThemePreset {
  id: string;
  name: string;
  primary: string;
  gradient: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Violet",
    primary: "#8b5cf6",
    gradient: "from-violet-400 via-indigo-400 to-cyan-400",
  },
  {
    id: "ocean",
    name: "Ocean",
    primary: "#0ea5e9",
    gradient: "from-sky-400 via-blue-400 to-indigo-400",
  },
  {
    id: "forest",
    name: "Forest",
    primary: "#22c55e",
    gradient: "from-emerald-400 via-green-400 to-teal-400",
  },
  {
    id: "sunset",
    name: "Sunset",
    primary: "#f97316",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
  },
  {
    id: "rose",
    name: "Rose",
    primary: "#f43f5e",
    gradient: "from-rose-400 via-pink-400 to-fuchsia-400",
  },
  {
    id: "midnight",
    name: "Midnight",
    primary: "#6366f1",
    gradient: "from-indigo-400 via-purple-400 to-violet-400",
  },
];

const STORAGE_KEY = "flutter-roadmap-theme";

function loadTheme(): string {
  if (typeof window === "undefined") return "default";
  try {
    return localStorage.getItem(STORAGE_KEY) || "default";
  } catch {
    return "default";
  }
}

function saveTheme(themeId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, themeId);
}

export function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState<string>("default");

  // Client-only init: reads the saved theme from localStorage. Lazy state
  // init would diverge from the server-rendered default.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedTheme(loadTheme());
  }, []);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    saveTheme(themeId);

    const theme = THEME_PRESETS.find((t) => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty("--theme-primary", theme.primary);
    }
  };

  const selectedPreset = THEME_PRESETS.find((t) => t.id === selectedTheme);

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Palette className="size-4 text-violet-400" />
        <h3 className="text-sm font-semibold">Theme</h3>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <div
          className="size-6 rounded-full border-2 border-white/20"
          style={{ backgroundColor: selectedPreset?.primary }}
        />
        <span className="text-sm text-muted-foreground">
          {selectedPreset?.name || "Default"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {THEME_PRESETS.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={`relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
              selectedTheme === theme.id
                ? "border-white/30 bg-white/10"
                : "border-border/50 bg-card/30 hover:bg-card/50"
            }`}
          >
            <div
              className={`size-8 rounded-full bg-gradient-to-r ${theme.gradient} ${
                selectedTheme === theme.id ? "ring-2 ring-white/50" : ""
              }`}
            />
            {selectedTheme === theme.id && (
              <Check className="absolute top-1 right-1 size-3 text-white" />
            )}
            <span className="text-[10px] text-muted-foreground">{theme.name}</span>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
