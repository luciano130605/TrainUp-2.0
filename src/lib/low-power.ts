/** Heuristic for mid/low-end phones: fewer animations and lighter charts. */
export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = nav.deviceMemory ?? 8;
  const saveData = Boolean(nav.connection?.saveData);
  return saveData || cores <= 4 || mem <= 4;
}

export function applyLowPowerClass() {
  if (typeof document === "undefined") return;
  if (isLowPowerDevice()) document.documentElement.classList.add("low-power");
  else document.documentElement.classList.remove("low-power");
}
