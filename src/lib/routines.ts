import type { Goal, Level, Routine } from "./types";

export const COVER_SRC: Record<Routine["cover"], string> = {
  hero: "/media/gym-hero.jpg",
  barbell: "/media/barbell.jpg",
  kettlebell: "/media/kettlebell.jpg",
  dumbbells: "/media/dumbbells.jpg",
};

export const ROUTINES: Routine[] = [
  {
    id: "push",
    name: "Empuje",
    focus: "Pecho, hombros, tríceps",
    durationMin: 55,
    level: "intermedio",
    cover: "barbell",
    exercises: [
      { exerciseId: "press-banca", sets: 4, reps: 8, restSec: 150 },
      { exerciseId: "press-inclinado", sets: 3, reps: 8, restSec: 120 },
      { exerciseId: "press-hombro-mancuernas", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "laterales", sets: 3, reps: 12, restSec: 45 },
      { exerciseId: "fondos", sets: 3, reps: 8, restSec: 90 },
      { exerciseId: "extension-triceps", sets: 3, reps: 12, restSec: 45 },
    ],
  },
  {
    id: "pull",
    name: "Jalón",
    focus: "Espalda y bíceps",
    durationMin: 55,
    level: "intermedio",
    cover: "dumbbells",
    exercises: [
      { exerciseId: "peso-muerto", sets: 3, reps: 5, restSec: 180 },
      { exerciseId: "dominadas", sets: 4, reps: 6, restSec: 150 },
      { exerciseId: "remo-barra", sets: 4, reps: 8, restSec: 120 },
      { exerciseId: "jalon", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "face-pull", sets: 3, reps: 15, restSec: 45 },
      { exerciseId: "curl-biceps", sets: 3, reps: 10, restSec: 60 },
    ],
  },
  {
    id: "legs",
    name: "Piernas",
    focus: "Cuádriceps, femorales, glúteo",
    durationMin: 60,
    level: "intermedio",
    cover: "hero",
    exercises: [
      { exerciseId: "sentadilla", sets: 4, reps: 6, restSec: 180 },
      { exerciseId: "rumano", sets: 3, reps: 8, restSec: 120 },
      { exerciseId: "prensa", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "bulgara", sets: 3, reps: 8, restSec: 90 },
      { exerciseId: "curl-femoral", sets: 3, reps: 12, restSec: 60 },
      { exerciseId: "gemelos", sets: 4, reps: 12, restSec: 45 },
    ],
  },
  {
    id: "upper",
    name: "Torso",
    focus: "Empuje y jalón en un bloque",
    durationMin: 50,
    level: "intermedio",
    cover: "dumbbells",
    exercises: [
      { exerciseId: "press-banca", sets: 4, reps: 8, restSec: 120 },
      { exerciseId: "remo-barra", sets: 4, reps: 8, restSec: 120 },
      { exerciseId: "press-militar", sets: 3, reps: 6, restSec: 120 },
      { exerciseId: "jalon", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "laterales", sets: 3, reps: 12, restSec: 45 },
      { exerciseId: "curl-martillo", sets: 2, reps: 10, restSec: 45 },
    ],
  },
  {
    id: "lower",
    name: "Inferior",
    focus: "Fuerza de tren inferior",
    durationMin: 50,
    level: "intermedio",
    cover: "kettlebell",
    exercises: [
      { exerciseId: "sentadilla", sets: 4, reps: 6, restSec: 180 },
      { exerciseId: "rumano", sets: 3, reps: 8, restSec: 120 },
      { exerciseId: "hip-thrust", sets: 3, reps: 8, restSec: 90 },
      { exerciseId: "zancadas", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "plancha", sets: 3, reps: 40, restSec: 45 },
    ],
  },
  {
    id: "full-a",
    name: "Cuerpo completo A",
    focus: "Patrones básicos",
    durationMin: 45,
    level: "principiante",
    cover: "hero",
    exercises: [
      { exerciseId: "sentadilla-goblet", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "press-mancuernas", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "remo-mancuerna", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "laterales", sets: 3, reps: 12, restSec: 45 },
      { exerciseId: "plancha", sets: 3, reps: 30, restSec: 45 },
    ],
  },
  {
    id: "full-b",
    name: "Cuerpo completo B",
    focus: "Bisagra, empuje, core",
    durationMin: 45,
    level: "principiante",
    cover: "kettlebell",
    exercises: [
      { exerciseId: "rumano", sets: 3, reps: 8, restSec: 120 },
      { exerciseId: "flexiones", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "jalon", sets: 3, reps: 10, restSec: 90 },
      { exerciseId: "hip-thrust", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "pallof", sets: 3, reps: 10, restSec: 45 },
    ],
  },
  {
    id: "full-c",
    name: "Cuerpo completo C",
    focus: "Densidad y control",
    durationMin: 40,
    level: "principiante",
    cover: "dumbbells",
    exercises: [
      { exerciseId: "prensa", sets: 3, reps: 12, restSec: 90 },
      { exerciseId: "press-hombro-mancuernas", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "remo-mancuerna", sets: 3, reps: 10, restSec: 75 },
      { exerciseId: "kb-swing", sets: 3, reps: 12, restSec: 60 },
      { exerciseId: "crunch", sets: 3, reps: 15, restSec: 30 },
    ],
  },
  {
    id: "five-by-five",
    name: "Fuerza 5×5",
    focus: "Los tres grandes",
    durationMin: 50,
    level: "intermedio",
    cover: "barbell",
    exercises: [
      { exerciseId: "sentadilla", sets: 5, reps: 5, restSec: 180 },
      { exerciseId: "press-banca", sets: 5, reps: 5, restSec: 180 },
      { exerciseId: "remo-barra", sets: 5, reps: 5, restSec: 150 },
    ],
  },
  {
    id: "core-express",
    name: "Core express",
    focus: "15 minutos de tronco",
    durationMin: 15,
    level: "principiante",
    cover: "kettlebell",
    exercises: [
      { exerciseId: "plancha", sets: 3, reps: 40, restSec: 30 },
      { exerciseId: "elevacion-piernas", sets: 3, reps: 12, restSec: 30 },
      { exerciseId: "pallof", sets: 3, reps: 10, restSec: 30 },
      { exerciseId: "russian-twist", sets: 3, reps: 16, restSec: 30 },
    ],
  },
  {
    id: "gluteos",
    name: "Glúteo y posterior",
    focus: "Cadena posterior",
    durationMin: 40,
    level: "intermedio",
    cover: "hero",
    exercises: [
      { exerciseId: "hip-thrust", sets: 4, reps: 8, restSec: 90 },
      { exerciseId: "rumano", sets: 3, reps: 8, restSec: 120 },
      { exerciseId: "bulgara", sets: 3, reps: 8, restSec: 75 },
      { exerciseId: "kb-swing", sets: 3, reps: 12, restSec: 60 },
      { exerciseId: "curl-femoral", sets: 3, reps: 12, restSec: 45 },
    ],
  },
  {
    id: "hiit",
    name: "Condición",
    focus: "Densidad y pulso",
    durationMin: 25,
    level: "avanzado",
    cover: "kettlebell",
    exercises: [
      { exerciseId: "kb-swing", sets: 5, reps: 15, restSec: 45 },
      { exerciseId: "burpees", sets: 4, reps: 8, restSec: 45 },
      { exerciseId: "farmer", sets: 3, reps: 40, restSec: 60 },
      { exerciseId: "flexiones", sets: 3, reps: 12, restSec: 45 },
    ],
  },
];

const PLAN: Record<string, string[]> = {
  "fuerza-3": ["five-by-five", "full-b", "five-by-five"],
  "fuerza-4": ["five-by-five", "pull", "five-by-five", "legs"],
  "fuerza-5": ["five-by-five", "push", "legs", "pull", "five-by-five"],
  "fuerza-6": ["push", "pull", "legs", "push", "pull", "legs"],
  "hipertrofia-3": ["full-a", "full-b", "full-c"],
  "hipertrofia-4": ["upper", "lower", "upper", "lower"],
  "hipertrofia-5": ["push", "pull", "legs", "upper", "lower"],
  "hipertrofia-6": ["push", "pull", "legs", "push", "pull", "legs"],
  "definicion-3": ["full-a", "hiit", "full-c"],
  "definicion-4": ["upper", "hiit", "lower", "core-express"],
  "definicion-5": ["push", "pull", "hiit", "legs", "core-express"],
  "definicion-6": ["push", "pull", "legs", "hiit", "upper", "core-express"],
  "resistencia-3": ["full-a", "hiit", "full-c"],
  "resistencia-4": ["full-a", "hiit", "full-b", "core-express"],
  "resistencia-5": ["full-a", "hiit", "full-b", "core-express", "full-c"],
  "resistencia-6": ["full-a", "hiit", "full-b", "hiit", "full-c", "core-express"],
};

export function getRoutine(id: string, extras: Routine[] = []): Routine | undefined {
  return extras.find((r) => r.id === id) ?? ROUTINES.find((r) => r.id === id);
}

export function planFor(goal: Goal, days: 3 | 4 | 5 | 6): string[] {
  return PLAN[`${goal}-${days}`] ?? PLAN["hipertrofia-4"]!;
}

export function filterRoutines(level: Level) {
  if (level === "principiante") {
    return ROUTINES.filter((r) => r.level !== "avanzado");
  }
  return ROUTINES;
}
