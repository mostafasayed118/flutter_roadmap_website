// ── Timer Constants ──────────────────────────────────────────────
export const TIMER = {
  POMODORO_FOCUS_MS: 25 * 60 * 1000,
  POMODORO_BREAK_MS: 5 * 60 * 1000,
  SHORT_FOCUS_MS: 15 * 60 * 1000,
  LONG_FOCUS_MS: 45 * 60 * 1000,
  MAX_RESTORED_MS: 24 * 60 * 60 * 1000,
  MIN_SAVE_DURATION_MS: 60 * 1000,
} as const;

// ── Session Constants ───────────────────────────────────────────
export const SESSION = {
  MAX_NOTES_LENGTH: 200,
  MAX_HOURS: 24,
  MAX_MINUTES: 59,
  MIN_DURATION_MINUTES: 5,
  MAX_DURATION_MINUTES: 1440,
} as const;

// ── Docs Constants ──────────────────────────────────────────────
export const DOCS = {
  INTERSECTION_ROOT_MARGIN: "-80px 0px -70% 0px",
  STORAGE_KEY_READ_DOCS: "flutter-roadmap-read-docs",
} as const;

// ── Theme Colors ────────────────────────────────────────────────
export const THEME = {
  PRIMARY: "#8b5cf6",
  GRADIENT: "from-violet-400 via-indigo-400 to-cyan-400",
} as const;

// ── Mobile Breakpoint ───────────────────────────────────────────
export const MOBILE_BREAKPOINT = 768;
