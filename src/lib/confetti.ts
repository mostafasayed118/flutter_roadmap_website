import confetti from "canvas-confetti";

export function fireWeekComplete() {
  const count = 50;
  const defaults = { origin: { y: 0.6 }, zIndex: 1000 };
  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      particleCount: Math.floor(count * particleRatio),
      ...opts,
    });
  }
  fire(0.25, { spread: 26, startVelocity: 30 });
  fire(0.2, { spread: 40 });
  fire(0.35, { spread: 60, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 80, startVelocity: 20, decay: 0.92, scalar: 1.1 });
}

export function fireBigCelebration() {
  const duration = 1200;
  const end = Date.now() + duration;
  const colors = ["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ec4899"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 50,
      origin: { x: 0 },
      colors,
      zIndex: 1000,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 50,
      origin: { x: 1 },
      colors,
      zIndex: 1000,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
