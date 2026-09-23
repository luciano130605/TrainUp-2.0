let vibrationOn = true;

export function setVibrationEnabled(on: boolean) {
  vibrationOn = on;
}

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function chime(kind: "tick" | "done" = "done") {
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();
  const now = audio.currentTime;
  const freqs = kind === "tick" ? [660] : [523, 784, 1046];
  freqs.forEach((freq, i) => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.12;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start(t);
    osc.stop(t + 0.24);
  });
}

export function pulse() {
  if (!vibrationOn) return;
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate([28, 40, 48]);
  }
}
