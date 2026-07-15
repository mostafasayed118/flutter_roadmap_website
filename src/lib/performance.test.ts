import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce, throttle } from "./performance";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("delays function execution", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledOnce();
  });

  it("cancels previous call when invoked again", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    vi.advanceTimersByTime(50);
    debouncedFn();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledOnce();
  });

  it("passes arguments to the function", () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn("arg1", "arg2");
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith("arg1", "arg2");
  });
});

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls function immediately on first invocation", () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    expect(fn).toHaveBeenCalledOnce();
  });

  it("does not call function again within limit", () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    throttledFn();
    throttledFn();

    expect(fn).toHaveBeenCalledOnce();
  });

  it("calls function again after limit expires", () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn();
    vi.advanceTimersByTime(100);
    throttledFn();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("passes arguments to the function", () => {
    const fn = vi.fn();
    const throttledFn = throttle(fn, 100);

    throttledFn("test");
    expect(fn).toHaveBeenCalledWith("test");
  });
});
