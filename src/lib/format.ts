import { format, isToday, isYesterday, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import type { Gender, Goal, Level, Unit } from "./types";

export const GOAL_LABEL: Record<Goal, string> = {
  fuerza: "Fuerza",
  hipertrofia: "Hipertrofia",
  definicion: "Definición",
  resistencia: "Resistencia",
};

export const LEVEL_LABEL: Record<Level, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

export function toDisplayWeight(kg: number, unit: Unit) {
  if (unit === "kg") return roundTo(kg, 0.5);
  return roundTo(kg * 2.20462262, 1);
}

export function fromDisplayWeight(value: number, unit: Unit) {
  if (unit === "kg") return value;
  return value / 2.20462262;
}

export function weightStep(unit: Unit) {
  return unit === "kg" ? 2.5 : 5;
}

export function formatWeight(kg: number, unit: Unit, withUnit = true) {
  const v = toDisplayWeight(kg, unit);
  const text = Number.isInteger(v) ? String(v) : v.toFixed(1);
  return withUnit ? `${text} ${unit}` : text;
}

export function formatVolume(kg: number, unit: Unit) {
  const v = unit === "kg" ? kg : kg * 2.20462262;
  if (v >= 1000) return `${(v / 1000).toFixed(1)} t`;
  return `${Math.round(v)} ${unit}`;
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function formatClock(totalSec: number) {
  const n = Math.max(0, Math.ceil(totalSec));
  const m = Math.floor(n / 60);
  const s = n % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 6) return "Buena madrugada";
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

export function dayLabel(ts: number) {
  if (isToday(ts)) return "Hoy";
  if (isYesterday(ts)) return "Ayer";
  return format(ts, "EEE d MMM", { locale: es });
}

export function longDate(ts = Date.now()) {
  return format(ts, "EEEE d MMMM", { locale: es });
}

export function weekStart(ts = Date.now()) {
  return startOfWeek(ts, { weekStartsOn: 1 }).getTime();
}

export function e1rm(weightKg: number, reps: number) {
  if (reps <= 1) return weightKg;
  return weightKg * (1 + reps / 30);
}

export const GENDER_LABEL: Record<Gender, string> = {
  hombre: "Hombre",
  mujer: "Mujer",
  otro: "Otro",
};

export const WEEKDAY_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] as const;

export function weekdayShort(iso: number) {
  return WEEKDAY_SHORT[(iso - 1 + 7) % 7] ?? "";
}

export function firstName(name: string) {
  const part = name.trim().split(/\s+/)[0];
  return part || "atleta";
}

