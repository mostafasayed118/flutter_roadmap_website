/**
 * Timer notification utilities — audio chimes (Web Audio API) and browser notifications.
 * Zero external dependencies; no audio files downloaded.
 */

// ── Types ──────────────────────────────────────────────────────

export type SoundType = "focus-complete" | "break-complete";

export interface NotificationSettings {
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

// ── Constants ──────────────────────────────────────────────────

const SETTINGS_KEY = "flutter-roadmap-timer-notifications";

const DEFAULT_SETTINGS: NotificationSettings = {
  soundEnabled: true,
  notificationsEnabled: true,
};

// ── Settings Persistence ───────────────────────────────────────

export function loadNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<NotificationSettings>;
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── Audio Context (lazy singleton) ─────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return audioCtx;
  } catch {
    return null;
  }
}

/**
 * Resume a suspended AudioContext (required after first user gesture on some browsers).
 */
export async function resumeAudioContext(): Promise<void> {
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch {
      // Silently ignore — audio will be skipped
    }
  }
}

// ── Audio Chime Generation ─────────────────────────────────────

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface ChimeNote {
  frequency: number;
  startOffset: number;
  duration: number;
  gain: number;
}

const FOCUS_COMPLETE_CHIME: ChimeNote[] = [
  { frequency: 523.25, startOffset: 0, duration: 0.15, gain: 0.3 },   // C5
  { frequency: 659.25, startOffset: 0.12, duration: 0.15, gain: 0.3 }, // E5
  { frequency: 783.99, startOffset: 0.24, duration: 0.25, gain: 0.3 }, // G5
  { frequency: 1046.5, startOffset: 0.38, duration: 0.35, gain: 0.25 }, // C6
];

const BREAK_COMPLETE_CHIME: ChimeNote[] = [
  { frequency: 783.99, startOffset: 0, duration: 0.15, gain: 0.3 },   // G5
  { frequency: 659.25, startOffset: 0.12, duration: 0.15, gain: 0.3 }, // E5
  { frequency: 523.25, startOffset: 0.24, duration: 0.25, gain: 0.3 }, // C5
  { frequency: 392.0, startOffset: 0.38, duration: 0.35, gain: 0.25 }, // G4
];

function playChime(notes: ChimeNote[]): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (prefersReducedMotion()) return;

  const now = ctx.currentTime;

  for (const note of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(note.frequency, now + note.startOffset);

    gain.gain.setValueAtTime(0, now + note.startOffset);
    gain.gain.linearRampToValueAtTime(note.gain, now + note.startOffset + 0.01);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + note.startOffset + note.duration
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.startOffset);
    osc.stop(now + note.startOffset + note.duration + 0.01);
  }
}

export function playSound(type: SoundType): void {
  switch (type) {
    case "focus-complete":
      playChime(FOCUS_COMPLETE_CHIME);
      break;
    case "break-complete":
      playChime(BREAK_COMPLETE_CHIME);
      break;
  }
}

// ── Browser Notifications ──────────────────────────────────────

export type NotificationPermission = "granted" | "denied" | "default";

/**
 * Request notification permission. Only call from a user gesture (e.g. start()).
 * Returns the resulting permission state.
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted" || Notification.permission === "denied") {
    return Notification.permission;
  }
  try {
    return await Notification.requestPermission();
  } catch {
    return "denied";
  }
}

export function getNotificationPermission(): NotificationPermission {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  return Notification.permission;
}

interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
}

const NOTIFICATION_MESSAGES: Record<SoundType, NotificationPayload> = {
  "focus-complete": {
    title: "Focus session complete!",
    body: "Time for a break.",
  },
  "break-complete": {
    title: "Break is over!",
    body: "Ready to focus?",
  },
};

/**
 * Show a browser notification. Only fires when the tab is hidden.
 * Silently no-ops if permission denied, API unavailable, or tab visible.
 */
export function showNotification(type: SoundType): void {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  if (!document.hidden) return;

  const payload = NOTIFICATION_MESSAGES[type];
  try {
    new Notification(payload.title, {
      body: payload.body,
      icon: "/favicon.ico",
      tag: `timer-${type}`,
      requireInteraction: false,
    });
  } catch {
    // Silently ignore — some environments don't support Notification constructor
  }
}

/**
 * Combined trigger: play sound + show notification (if settings allow).
 */
export function triggerTimerAlert(
  type: SoundType,
  settings: NotificationSettings
): void {
  if (settings.soundEnabled) {
    playSound(type);
  }
  if (settings.notificationsEnabled) {
    showNotification(type);
  }
}
