import { describe, it, expect } from "vitest";
import { TIMER, SESSION, DOCS, THEME, MOBILE_BREAKPOINT } from "./constants";

describe("TIMER constants", () => {
  it("has correct pomodoro focus duration (25 minutes)", () => {
    expect(TIMER.POMODORO_FOCUS_MS).toBe(25 * 60 * 1000);
  });

  it("has correct pomodoro break duration (5 minutes)", () => {
    expect(TIMER.POMODORO_BREAK_MS).toBe(5 * 60 * 1000);
  });

  it("has correct short focus duration (15 minutes)", () => {
    expect(TIMER.SHORT_FOCUS_MS).toBe(15 * 60 * 1000);
  });

  it("has correct long focus duration (45 minutes)", () => {
    expect(TIMER.LONG_FOCUS_MS).toBe(45 * 60 * 1000);
  });

  it("has correct max restored time (24 hours)", () => {
    expect(TIMER.MAX_RESTORED_MS).toBe(24 * 60 * 60 * 1000);
  });

  it("has correct min save duration (1 minute)", () => {
    expect(TIMER.MIN_SAVE_DURATION_MS).toBe(60 * 1000);
  });
});

describe("SESSION constants", () => {
  it("has correct max notes length", () => {
    expect(SESSION.MAX_NOTES_LENGTH).toBe(200);
  });

  it("has correct max hours", () => {
    expect(SESSION.MAX_HOURS).toBe(24);
  });

  it("has correct max minutes", () => {
    expect(SESSION.MAX_MINUTES).toBe(59);
  });

  it("has correct min duration", () => {
    expect(SESSION.MIN_DURATION_MINUTES).toBe(5);
  });

  it("has correct max duration", () => {
    expect(SESSION.MAX_DURATION_MINUTES).toBe(1440);
  });
});

describe("DOCS constants", () => {
  it("has intersection root margin", () => {
    expect(DOCS.INTERSECTION_ROOT_MARGIN).toBe("-80px 0px -70% 0px");
  });

  it("has storage key for read docs", () => {
    expect(DOCS.STORAGE_KEY_READ_DOCS).toBe("flutter-roadmap-read-docs");
  });
});

describe("THEME constants", () => {
  it("has primary color", () => {
    expect(THEME.PRIMARY).toBe("#8b5cf6");
  });

  it("has gradient classes", () => {
    expect(THEME.GRADIENT).toContain("violet");
    expect(THEME.GRADIENT).toContain("indigo");
    expect(THEME.GRADIENT).toContain("cyan");
  });
});

describe("MOBILE_BREAKPOINT", () => {
  it("is set to 768px", () => {
    expect(MOBILE_BREAKPOINT).toBe(768);
  });
});
