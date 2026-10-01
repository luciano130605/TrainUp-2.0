import type { Settings, SoundTone } from "./types";

/**
 * Every audible / vibro-tactile signal in the app funnels through here.
 *
 * The toggles in Ajustes are the source of truth, but the values also live in
 * module-level mirrors so the live session and the standalone timer can fire a
 * chime from inside an interval callback without subscribing to the store.
 */
type AudioConfig = {
  sound: boolean;
  vibration: boolean;
  haptics: boolean;
  volume: number;
  tone: SoundTone;
};

const config: AudioConfig = {
  sound: true,
  vibration: true,
  haptics: false,
  volume: 70,
  tone: "clasico",
};

/** Call once from the store whenever settings change (and on hydrate). */
export function applyAudioSettings(settings: Settings) {
  config.sound = settings.sound;
  config.vibration = settings.vibration;
  config.haptics = settings.haptics;
  config.volume = Math.min(100, Math.max(0, settings.volume));
  config.tone = settings.tone;
}

/** Back-compat shim for the couple of call sites that only flip vibration. */
export function setVibrationEnabled(on: boolean) {
  config.vibration = on;
}

export function soundEnabled() {
  return config.sound;
}

export function hapticsEnabled() {
  return config.haptics;
}

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  return ctx;
}

/**
 * iOS ships the clicker in a "suspended" state until a real user gesture
 * resumes it, so every first tap anywhere in the app unlocks audio. We attach a
 * one-shot listener so the very first chime of a rest is never swallowed.
 */
export function unlockAudio() {
  const audio = getCtx();
  if (!audio) return;
  void audio.resume().catch(() => { });
  if (typeof document === "undefined") return;
  const once = () => {
    void getCtx()?.resume().catch(() => { });
    document.removeEventListener("pointerdown", once);
    document.removeEventListener("touchstart", once);
  };
  document.addEventListener("pointerdown", once, { once: true });
  document.addEventListener("touchstart", once, { once: true });
}

type Note = { freq: number; dur: number; type?: OscillatorType; delay?: number };

/** Tone recipes per sound preset, as a sequence of notes. */
const TONES: Record<SoundTone, { tick: Note[]; done: Note[] }> = {
  clasico: {
    tick: [{ freq: 660, dur: 0.12 }],
    done: [
      { freq: 523, dur: 0.22 },
      { freq: 784, dur: 0.22, delay: 0.12 },
      { freq: 1046, dur: 0.22, delay: 0.24 },
    ],
  },
  campana: {
    tick: [{ freq: 880, dur: 0.5, type: "triangle" }],
    done: [
      { freq: 880, dur: 0.9, type: "triangle" },
      { freq: 1318, dur: 0.7, type: "sine", delay: 0.05 },
      { freq: 1760, dur: 0.5, type: "sine", delay: 0.1 },
    ],
  },
  suave: {
    tick: [{ freq: 494, dur: 0.05, type: "sine" }],
    done: [
      { freq: 587, dur: 0.18, type: "sine" },
      { freq: 784, dur: 0.3, type: "sine", delay: 0.1 },
    ],
  },
  digital: {
    tick: [{ freq: 1200, dur: 0.05, type: "square" }],
    done: [
      { freq: 1200, dur: 0.08, type: "square" },
      { freq: 1600, dur: 0.08, type: "square", delay: 0.09 },
      { freq: 2000, dur: 0.14, type: "square", delay: 0.18 },
    ],
  },
};

function play(notes: Note[], gain: number) {
  const audio = getCtx();
  if (!audio) return;
  void audio.resume().catch(() => { });
  const now = audio.currentTime;
  for (const note of notes) {
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = note.type ?? "sine";
    osc.frequency.value = note.freq;
    const t = now + (note.delay ?? 0);
    amp.gain.setValueAtTime(0.0001, t);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);
    osc.connect(amp);
    amp.connect(audio.destination);
    osc.start(t);
    osc.stop(t + note.dur + 0.02);
  }
}

/** Master volume scales the ceiling so "10%" really is barely there. */
function scaledGain(base: number) {
  return base * (config.volume / 100);
}

export type ChimeKind = "tick" | "done" | "countdown";

/** Rest finished, timer block ended, countdown beat. Silent when sound is off. */
export function chime(kind: ChimeKind = "done") {
  if (!config.sound) return;
  const recipe = TONES[config.tone] ?? TONES.clasico;
  if (kind === "countdown") {
    play([{ freq: 720, dur: 0.07, type: "square" }], scaledGain(0.04));
    return;
  }
  if (kind === "tick") {
    play(recipe.tick, scaledGain(0.06));
    return;
  }
  play(recipe.done, scaledGain(0.08));
}

/** Plays a tone on demand for the picker in Ajustes, ignoring the on/off toggle. */
export function previewSound(tone: SoundTone = config.tone) {
  const recipe = TONES[tone] ?? TONES.clasico;
  play(recipe.done, scaledGain(0.09));
}

function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
  if (typeof nav.vibrate !== "function") return false;
  try {
    return nav.vibrate(pattern);
  } catch {
    return false;
  }
}

/**
 * Buzz for a finished rest.
 *
 * iOS Safari has never implemented `navigator.vibrate`, so a plain call is a
 * silent no-op on an iPhone. There the only lever left is the audio clicker: a
 * very low, very short burst reads as a tactile thump through the phone's
 * speaker, doubled so it feels like a pulse rather than a beep. On Android the
 * real vibration motor wins and we never get here.
 */
export function pulse(pattern: number | number[] = [28, 40, 48]) {
  if (!config.vibration) return;
  if (vibrate(pattern)) return;
  iosHapticThump();
}

/** Single short buzz for a tap. No-op on iOS, which has no vibrate API. */
export function tapFeedback() {
  if (!config.haptics) return;
  vibrate(12);
}

function iosHapticThump() {
  if (!config.sound) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume().catch(() => { });
  const now = audio.currentTime;
  for (const offset of [0, 0.09]) {
    const osc = audio.createOscillator();
    const amp = audio.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(110, now + offset);
    osc.frequency.exponentialRampToValueAtTime(45, now + offset + 0.06);
    amp.gain.setValueAtTime(0.0001, now + offset);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.0002, scaledGain(0.18)), now + offset + 0.008);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.07);
    osc.connect(amp);
    amp.connect(audio.destination);
    osc.start(now + offset);
    osc.stop(now + offset + 0.09);
  }
}

/** True when the device exposes a real vibration motor (Android, not iOS). */
export function hasRealVibration() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { vibrate?: unknown };
  return typeof nav.vibrate === "function";
}
