"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon-sm" aria-label="Toggle theme">
        <Sun className="size-4" />
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = theme === "dark" ? "Dark mode" : theme === "light" ? "Light mode" : "System theme";

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
    >
      <Icon className="size-4" />
    </Button>
  );
}
