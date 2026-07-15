// ── Timer Sound Effects ──────────────────────────────────────────

type SoundType = "start" | "pause" | "resume" | "complete" | "break-complete" | "tick";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.3) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported
  }
}

function playChime(notes: { freq: number; delay: number; duration: number }[]) {
  try {
    const ctx = getAudioContext();
    notes.forEach(({ freq, delay, duration }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + duration);
    });
  } catch {
    // Audio not supported
  }
}

export const timerSounds = {
  start() {
    // Rising two-note chime
    playChime([
      { freq: 523.25, delay: 0, duration: 0.15 }, // C5
      { freq: 659.25, delay: 0.1, duration: 0.2 }, // E5
    ]);
  },

  pause() {
    // Falling two-note chime
    playChime([
      { freq: 659.25, delay: 0, duration: 0.15 }, // E5
      { freq: 523.25, delay: 0.1, duration: 0.2 }, // C5
    ]);
  },

  resume() {
    // Rising two-note chime (same as start)
    playChime([
      { freq: 523.25, delay: 0, duration: 0.15 }, // C5
      { freq: 659.25, delay: 0.1, duration: 0.2 }, // E5
    ]);
  },

  complete() {
    // Success melody - three ascending notes
    playChime([
      { freq: 523.25, delay: 0, duration: 0.2 }, // C5
      { freq: 659.25, delay: 0.15, duration: 0.2 }, // E5
      { freq: 783.99, delay: 0.3, duration: 0.4 }, // G5
    ]);
  },

  breakComplete() {
    // Break complete - two quick notes
    playChime([
      { freq: 783.99, delay: 0, duration: 0.15 }, // G5
      { freq: 1046.5, delay: 0.1, duration: 0.3 }, // C6
    ]);
  },

  tick() {
    // Subtle tick sound
    playTone(800, 0.05, "sine", 0.1);
  },

  error() {
    // Error sound - two low notes
    playChime([
      { freq: 200, delay: 0, duration: 0.15 },
      { freq: 150, delay: 0.1, duration: 0.2 },
    ]);
  },
};

export function resumeAudioContext() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
  } catch {
    // Ignore
  }
}
