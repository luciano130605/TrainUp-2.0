import type { Routine } from "./types";

const WEEKDAY = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export function isoWeekday(d = new Date()) {
  const day = d.getDay();
  return day === 0 ? 7 : day;
}

export function weekdayName(iso: number) {
  return WEEKDAY[iso === 7 ? 0 : iso] ?? "";
}

export function routinesForToday(routines: Routine[], d = new Date()) {
  const today = isoWeekday(d);
  return routines.filter((r) => (r.scheduleDays ?? []).includes(today));
}

export async function ensureNotifyPermission() {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const res = await Notification.requestPermission();
  return res === "granted";
}

export function fireWorkoutNotice(title: string, body: string) {
  if (typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body, silent: false });
  } catch {
    /* unsupported */
  }
}

/** ms until the next occurrence of HH:MM local time. */
export function msUntilHour(hhmm: string, now = new Date()) {
  const [h, m] = hhmm.split(":").map((n) => Number(n));
  const next = new Date(now);
  next.setHours(h || 0, m || 0, 0, 0);
  if (next.getTime() <= now.getTime()) next.setDate(next.getDate() + 1);
  return next.getTime() - now.getTime();
}
