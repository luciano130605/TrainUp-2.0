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
  | "smith"
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

export type SoundTone = "clasico" | "campana" | "suave" | "digital";

export type Settings = {
  theme: Theme;
  notifications: boolean;
  notifyHour: string;
  keepAwake: boolean;
  vibration: boolean;
  /** Chime at the end of every rest / timer block. */
  sound: boolean;
  /** Silent 0–100 scale applied on top of the tone. */
  volume: number;
  tone: SoundTone;
  /** Tone before the last 3 seconds of a rest, counted down. */
  countdownSound: boolean;
  /** Short buzz on every tap on a set / control. */
  haptics: boolean;
  /** Follow the phone's light/dark setting. */
  autoTheme: boolean;
  /** Prefill every set with the load from the last time on that movement. */
  prefillLastWeight: boolean;
  /** Jump to the next exercise on its own once the last set is done. */
  autoAdvance: boolean;
  /** Seconds a new routine's exercises start with. */
  defaultRestSec: number;
  /** Smallest plate pair available, so load maths matches the gym. */
  minPlateKg: number;
  /** Sessions per week the home ring aims at. */
  weeklyGoal: number;
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

export type RestPreset = { id: string; label: string; sec: number };

export type GymSnapshot = {
  profile: Profile;
  settings: Settings;
  customRoutines: Routine[];
  history: CompletedSession[];
  records: PersonalRecord[];
  bodyLogs: BodyLog[];
};
