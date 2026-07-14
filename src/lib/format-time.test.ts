import { describe, it, expect } from "vitest";
import { formatMinutes, formatTimerDisplay, toDateInputValue, todayInputValue } from "./format-time";

describe("formatMinutes", () => {
  it("returns '0m' for 0 minutes", () => {
    expect(formatMinutes(0)).toBe("0m");
  });

  it("returns '0m' for negative values", () => {
    expect(formatMinutes(-10)).toBe("0m");
  });

  it("formats minutes only", () => {
    expect(formatMinutes(30)).toBe("30m");
  });

  it("formats hours only", () => {
    expect(formatMinutes(60)).toBe("1h");
  });

  it("formats hours and minutes", () => {
    expect(formatMinutes(90)).toBe("1h 30m");
  });

  it("formats large values", () => {
    expect(formatMinutes(1500)).toBe("25h");
  });
});

describe("formatTimerDisplay", () => {
  it("formats 0ms as 00:00:00", () => {
    expect(formatTimerDisplay(0)).toBe("00:00:00");
  });

  it("formats seconds", () => {
    expect(formatTimerDisplay(5000)).toBe("00:00:05");
  });

  it("formats minutes", () => {
    expect(formatTimerDisplay(60000)).toBe("00:01:00");
  });

  it("formats hours", () => {
    expect(formatTimerDisplay(3600000)).toBe("01:00:00");
  });

  it("formats complex time", () => {
    expect(formatTimerDisplay(3661000)).toBe("01:01:01");
  });

  it("pads single digits", () => {
    expect(formatTimerDisplay(61000)).toBe("00:01:01");
  });
});

describe("toDateInputValue", () => {
  it("formats date correctly", () => {
    const date = new Date(2024, 0, 15); // January 15, 2024
    expect(toDateInputValue(date)).toBe("2024-01-15");
  });

  it("pads month and day", () => {
    const date = new Date(2024, 2, 5); // March 5, 2024
    expect(toDateInputValue(date)).toBe("2024-03-05");
  });
});

describe("todayInputValue", () => {
  it("returns today's date in YYYY-MM-DD format", () => {
    const today = new Date();
    const expected = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    expect(todayInputValue()).toBe(expected);
  });
});
