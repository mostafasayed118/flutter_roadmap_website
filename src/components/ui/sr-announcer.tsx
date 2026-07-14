"use client";

export function SrAnnouncer() {
  return (
    <div
      id="sr-announcer"
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
      role="status"
    />
  );
}
