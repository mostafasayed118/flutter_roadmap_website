"use client";

import { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, BellOff, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ReminderSettings {
  enabled: boolean;
  time: string;
  days: number[];
}

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  time: "19:00",
  days: [1, 2, 3, 4, 5], // Weekdays
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function StudyReminders() {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isLoading, setIsLoading] = useState(false);

  // Client-only init: reads browser permission + reminder settings. Lazy
  // state init would diverge from the server-rendered default.
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPermission(Notification.permission);
      const stored = localStorage.getItem("flutter-roadmap-reminders");
      if (stored) {
        try {
          setSettings(JSON.parse(stored));
        } catch {
          // Use default settings
        }
      }
    }
  }, []);

  const saveSettings = useCallback((newSettings: ReminderSettings) => {
    setSettings(newSettings);
    localStorage.setItem("flutter-roadmap-reminders", JSON.stringify(newSettings));
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      toast.error("Notifications not supported in this browser");
      return;
    }

    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === "granted") {
        toast.success("Notifications enabled!");
      } else {
        toast.error("Notification permission denied");
      }
    } catch {
      toast.error("Failed to request notification permission");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEnabled = (enabled: boolean) => {
    if (enabled && permission !== "granted") {
      requestPermission();
      return;
    }
    saveSettings({ ...settings, enabled });
    if (enabled) {
      toast.success("Study reminders enabled!");
    } else {
      toast.info("Study reminders disabled");
    }
  };

  const setTime = (time: string) => {
    saveSettings({ ...settings, time });
  };

  const toggleDay = (day: number) => {
    const newDays = settings.days.includes(day)
      ? settings.days.filter((d) => d !== day)
      : [...settings.days, day];
    saveSettings({ ...settings, days: newDays });
  };

  const testNotification = () => {
    if (permission !== "granted") {
      toast.error("Please enable notifications first");
      return;
    }

    new Notification("Flutter Roadmap", {
      body: "Time to study! Keep your learning streak going.",
      icon: "/icons/icon.svg",
      tag: "study-reminder-test",
    });
    toast.success("Test notification sent!");
  };

  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {settings.enabled ? (
            <Bell className="size-4 text-violet-400" />
          ) : (
            <BellOff className="size-4 text-muted-foreground" />
          )}
          <h3 className="text-sm font-semibold">Study Reminders</h3>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={toggleEnabled}
          disabled={permission === "denied"}
        />
      </div>

      {permission === "denied" && (
        <p className="mb-4 text-xs text-destructive">
          Notifications are blocked. Please enable them in your browser settings.
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs text-muted-foreground">
            Reminder Time
          </label>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <input
              type="time"
              value={settings.time}
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm focus:border-violet-500/50 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs text-muted-foreground">
            Reminder Days
          </label>
          <div className="flex gap-1">
            {DAY_NAMES.map((day, i) => (
              <button
                key={i}
                onClick={() => toggleDay(i)}
                className={`rounded-lg px-2 py-1 text-xs font-medium transition-all ${
                  settings.days.includes(i)
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={testNotification}
          disabled={permission !== "granted"}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Test Notification"
          )}
        </Button>
      </div>
    </GlassCard>
  );
}
