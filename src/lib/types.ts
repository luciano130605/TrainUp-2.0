export type Goal = "fuerza" | "hipertrofia" | "definicion" | "resistencia";
export type Level = "principiante" | "intermedio" | "avanzado";
export type Unit = "kg" | "lb";
export type Tab = "home" | "train" | "create" | "progress" | "profile";
export type Gender = "hombre" | "mujer" | "otro";
export type Theme = "dark" | "light";
export type Muscle =
  | "pecho"
  | "espalda"
  | "hombros"
  | "piernas"
  | "cuadriceps"
  | "isquiotibiales"
  | "gemelos"
  | "gluteos"
  | "aductores"
  | "abductores"
  | "biceps"
  | "triceps"
  | "core"
  | "cardio";
export type Equipment =
  | "barra"
  | "mancuernas"
  | "maquina"
  | "peso-corporal"
  | "kettlebell"
  | "polea"
  | "banco";

export type Exercise = {
  id: string;
  name: string;
  muscle: Muscle;
  secondary?: Muscle[];
  equipment: Equipment;
  cues: string[];
  defaultSets: number;
  defaultReps: number;
  restSec: number;
  compound: boolean;
  /** Demonstration clip under /public. Omitted when the app ships no media. */
  gif?: string;
  /** True when the exercise is measured in seconds (planks), not reps. */
  esTiempo?: boolean;
};

export type RoutineExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  restSec: number;
  /** Starting load for the first set, in kg. Falls back to the last session. */
  weightKg?: number;
};

export type Routine = {
  id: string;
  name: string;
  focus: string;
  durationMin: number;
  level: Level;
  cover: "hero" | "barbell" | "kettlebell" | "dumbbells";
  exercises: RoutineExercise[];
  custom?: boolean;
  /** ISO weekday 1 (lunes) … 7 (domingo). */
  scheduleDays?: number[];
};

export type Profile = {
  name: string;
  goal: Goal;
  level: Level;
  daysPerWeek: 3 | 4 | 5 | 6;
  unit: Unit;
  bodyWeightKg: number;
  heightCm: number;
  gender: Gender;
  birthDate: string;
  onboarded: boolean;
};

export type Settings = {
  theme: Theme;
  notifications: boolean;
  notifyHour: string;
  keepAwake: boolean;
  vibration: boolean;
};

export type WorkoutSet = {
  id: string;
  reps: number;
  weightKg: number;
  completed: boolean;
};

export type SessionExercise = {
  exerciseId: string;
  restSec: number;
  notes: string;
  sets: WorkoutSet[];
};

export type ActiveSession = {
  routineId: string;
  routineName: string;
  startedAt: number;
  exercises: SessionExercise[];
  currentIndex: number;
  restUntil: number | null;
  restTotalSec: number;
};

export type LoggedSet = {
  reps: number;
  weightKg: number;
};

export type LoggedExercise = {
  exerciseId: string;
  sets: LoggedSet[];
};

export type CompletedSession = {
  id: string;
  routineId: string;
  routineName: string;
  startedAt: number;
  endedAt: number;
  volumeKg: number;
  setsCompleted: number;
  exercises: LoggedExercise[];
  prs: string[];
};

export type BodyLog = {
  date: string;
  weightKg: number;
};

export type PersonalRecord = {
  exerciseId: string;
  weightKg: number;
  reps: number;
  e1rm: number;
  date: string;
};

export type TimerMode = "descanso" | "tabata" | "emom" | "amrap" | "cronometro";

export type GymSnapshot = {
  profile: Profile;
  settings: Settings;
  customRoutines: Routine[];
  history: CompletedSession[];
  records: PersonalRecord[];
  bodyLogs: BodyLog[];
};
