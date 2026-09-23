import { getExercise } from "./exercises";
import type { CompletedSession, Muscle } from "./types";

/** Hours until a muscle is considered recovered. */
export const RECOVERY_HOURS: Record<Muscle, number> = {
  pecho: 48,
  espalda: 48,
  hombros: 40,
  piernas: 72,
  cuadriceps: 72,
  isquiotibiales: 72,
  gemelos: 48,
  gluteos: 48,
  aductores: 48,
  abductores: 48,
  biceps: 40,
  triceps: 40,
  core: 24,
  cardio: 18,
};

export const TRACKED_MUSCLES: Muscle[] = [
  "pecho",
  "espalda",
  "hombros",
  "piernas",
  "gluteos",
  "biceps",
  "triceps",
  "core",
];

export type MuscleStatus = {
  muscle: Muscle;
  lastAt: number | null;
  hours: number;
  ratio: number;
  ready: boolean;
};

export function lastTrainedMap(history: CompletedSession[]): Map<Muscle, number> {
  const map = new Map<Muscle, number>();
  for (const session of history) {
    for (const logged of session.exercises) {
      const ex = getExercise(logged.exerciseId);
      const muscles: Muscle[] = [ex.muscle, ...(ex.secondary ?? [])];
      for (const m of muscles) {
        const prev = map.get(m) ?? 0;
        if (session.endedAt > prev) map.set(m, session.endedAt);
      }
    }
  }
  return map;
}

export function recoveryStatus(history: CompletedSession[], now = Date.now()): MuscleStatus[] {
  const last = lastTrainedMap(history);
  return TRACKED_MUSCLES.map((muscle) => {
    const hours = RECOVERY_HOURS[muscle];
    const lastAt = last.get(muscle) ?? null;
    if (!lastAt) {
      return { muscle, lastAt: null, hours, ratio: 1, ready: true };
    }
    const elapsedH = (now - lastAt) / 3_600_000;
    const ratio = Math.min(1, Math.max(0, elapsedH / hours));
    return { muscle, lastAt, hours, ratio, ready: ratio >= 1 };
  });
}

export function hoursLeft(status: MuscleStatus): number {
  if (status.ready || !status.lastAt) return 0;
  return Math.max(0, status.hours * (1 - status.ratio));
}
