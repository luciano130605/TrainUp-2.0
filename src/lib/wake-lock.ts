let sentinel: WakeLockSentinel | null = null;

export async function requestWakeLock() {
  if (typeof navigator === "undefined" || !("wakeLock" in navigator)) return;
  try {
    sentinel = await navigator.wakeLock.request("screen");
    sentinel.addEventListener("release", () => {
      sentinel = null;
    });
  } catch {
    sentinel = null;
  }
}

export async function releaseWakeLock() {
  try {
    await sentinel?.release();
  } catch {
    /* already released */
  }
  sentinel = null;
}
