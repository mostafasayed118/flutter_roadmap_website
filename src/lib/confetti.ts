import confetti from "canvas-confetti";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function fireWeekComplete(): void {
  if (prefersReducedMotion()) return;

  const count = 50;
  const defaults = {
    origin: { y: 0.6 },
    zIndex: 1000,
    gravity: 0.8,
    decay: 0.94,
  };

  function fire(particleRatio: number, opts: confetti.Options): void {
    confetti({
      ...defaults,
      particleCount: Math.floor(count * particleRatio),
      ...opts,
    });
  }

  fire(0.25, { spread: 26, startVelocity: 30 });
  fire(0.2, { spread: 40 });
  fire(0.35, { spread: 60, scalar: 0.8 });
  fire(0.1, { spread: 80, startVelocity: 20, scalar: 1.1 });
}

export function fireBigCelebration(): void {
  if (prefersReducedMotion()) return;

  const duration = 1500;
  const end = Date.now() + duration;
  const colors = ["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ec4899"];

  (function frame(): void {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 90,
      startVelocity: 40,
      gravity: 0.8,
      decay: 0.94,
      origin: { x: 0 },
      colors,
      zIndex: 1000,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 90,
      startVelocity: 40,
      gravity: 0.8,
      decay: 0.94,
      origin: { x: 1 },
      colors,
      zIndex: 1000,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
