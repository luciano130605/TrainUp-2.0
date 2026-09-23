import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ActiveSession,
  CompletedSession,
  GymSnapshot,
  Profile,
  Routine,
  Settings,
  Tab,
  TimerMode,
  WorkoutSet,
} from "./types";
import { getExercise } from "./exercises";
import { getRoutine, planFor } from "./routines";
import { e1rm, weekStart } from "./format";
import { uid } from "./utils";
import { isToday } from "date-fns";
import { setVibrationEnabled } from "./audio";
import { applyTheme } from "./theme";
import { isoWeekday } from "./notify";

type OnboardingInput = Pick<
  Profile,
  "name" | "goal" | "level" | "daysPerWeek" | "unit" | "bodyWeightKg" | "heightCm" | "gender" | "birthDate"
>;

type Store = GymSnapshot & {
  hydrated: boolean;
  tab: Tab;
  session: ActiveSession | null;
  lastSummary: CompletedSession | null;
  timerMode: TimerMode;
  markHydrated: () => void;
  hydrateRemote: (snap: GymSnapshot) => void;
  beginFreshAccount: () => void;
  setTab: (tab: Tab) => void;
  completeOnboarding: (input: OnboardingInput) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  startRoutine: (routine: Routine) => void;
  discardSession: () => void;
  setCurrentExercise: (index: number) => void;
  updateSet: (exerciseIndex: number, setId: string, patch: Partial<WorkoutSet>) => void;
  toggleSet: (exerciseIndex: number, setId: string) => void;
  addSet: (exerciseIndex: number) => void;
  removeSet: (exerciseIndex: number, setId: string) => void;
  replaceExercise: (exerciseIndex: number, exerciseId: string) => void;
  skipRest: () => void;
  addRest: (sec: number) => void;
  finishSession: () => CompletedSession | null;
  saveCustomRoutine: (routine: Routine) => void;
  deleteCustomRoutine: (id: string) => void;
  addBodyLog: (weightKg: number) => void;
  setTimerMode: (mode: TimerMode) => void;
  resetAll: () => void;
};

export const defaultProfile: Profile = {
  name: "",
  goal: "hipertrofia",
  level: "intermedio",
  daysPerWeek: 4,
  unit: "kg",
  bodyWeightKg: 75,
  heightCm: 170,
  gender: "hombre",
  birthDate: "1995-01-01",
  onboarded: false,
};

export const defaultSettings: Settings = {
  theme: "dark",
  notifications: false,
  notifyHour: "08:00",
  keepAwake: true,
  vibration: true,
};

const STORE_VERSION = 1;

function lastLoad(history: CompletedSession[], exerciseId: string): { weightKg: number; reps: number } | null {
  for (const session of history) {
    const found = session.exercises.find((e) => e.exerciseId === exerciseId);
    const last = found?.sets.at(-1);
    if (last) return last;
  }
  return null;
}

function buildSession(routine: Routine, history: CompletedSession[]): ActiveSession {
  return {
    routineId: routine.id,
    routineName: routine.name,
    startedAt: Date.now(),
    currentIndex: 0,
    restUntil: null,
    restTotalSec: 0,
    exercises: routine.exercises.map((slot) => {
      const ex = getExercise(slot.exerciseId);
      const prev = lastLoad(history, slot.exerciseId);
      // Precedence: what the athlete dialled into the routine, then what they
      // last lifted for this movement, then an empty bar.
      const weightKg = slot.weightKg ?? prev?.weightKg ?? 0;
      const reps = slot.reps || ex.defaultReps;
      const sets: WorkoutSet[] = Array.from({ length: slot.sets }, () => ({
        id: uid("set"),
        reps,
        weightKg,
        completed: false,
      }));
      return {
        exerciseId: slot.exerciseId,
        restSec: slot.restSec,
        notes: "",
        sets,
      };
    }),
  };
}

function volumeOf(session: Pick<ActiveSession, "exercises">) {
  return session.exercises.reduce((sum, ex) => {
    return sum + ex.sets.reduce((s, set) => (set.completed ? s + set.weightKg * set.reps : s), 0);
  }, 0);
}

export function todaysRoutine(
  profile: Profile,
  history: CompletedSession[],
  extras: Routine[],
): Routine | undefined {
  const scheduled = extras.filter((r) => (r.scheduleDays ?? []).includes(isoWeekday()));
  if (scheduled[0] && !history.some((h) => isToday(h.endedAt) && h.routineId === scheduled[0]!.id)) {
    return scheduled[0];
  }
  const plan = planFor(profile.goal, profile.daysPerWeek);
  const start = weekStart();
  const doneThisWeek = history.filter((h) => h.endedAt >= start);
  if (history.some((h) => isToday(h.endedAt))) {
    return getRoutine(plan[Math.min(doneThisWeek.length - 1, plan.length - 1)]!, extras) ?? getRoutine(plan[0]!, extras);
  }
  const idx = Math.min(doneThisWeek.length, plan.length - 1);
  return getRoutine(plan[idx]!, extras);
}

export function computeStreak(history: CompletedSession[]) {
  if (history.length === 0) return 0;
  const days = new Set(
    history.map((h) => {
      const d = new Date(h.endedAt);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }),
  );
  let streak = 0;
  const cursor = new Date();
  if (!days.has(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`)) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`)) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;
let persistFn: ((snap: GymSnapshot) => Promise<unknown>) | null = null;

export function bindGymPersist(fn: (snap: GymSnapshot) => Promise<unknown>) {
  persistFn = fn;
}

/** Persist the current store immediately, bypassing the debounce. */
export function persistNow(): Promise<void> {
  const s = useTrain.getState();
  if (!s.profile.onboarded || !persistFn) return Promise.resolve();
  return Promise.resolve(persistFn(snapshot(s))).then(
    () => undefined,
    () => undefined,
  );
}

export function snapshot(s: GymSnapshot): GymSnapshot {
  return {
    profile: s.profile,
    settings: s.settings,
    customRoutines: s.customRoutines,
    history: s.history,
    records: s.records,
    bodyLogs: s.bodyLogs,
  };
}

function queueSave(get: () => Store) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const s = get();
    if (!s.profile.onboarded || !persistFn) return;
    void persistFn(snapshot(s)).catch(() => {});
  }, 450);
}

export const useTrain = create<Store>()(
  persist(
    (set, get) => ({
      hydrated: false,
      tab: "home",
      profile: defaultProfile,
      settings: defaultSettings,
      customRoutines: [],
      history: [],
      records: [],
      bodyLogs: [],
      session: null,
      lastSummary: null,
      timerMode: "descanso",
      markHydrated: () => set({ hydrated: true }),
      hydrateRemote: (snap) => {
        applyTheme(snap.settings.theme);
        setVibrationEnabled(snap.settings.vibration);
        set({
          ...snap,
          hydrated: true,
        });
      },
      beginFreshAccount: () => {
        applyTheme(defaultSettings.theme);
        setVibrationEnabled(defaultSettings.vibration);
        set({
          profile: defaultProfile,
          settings: defaultSettings,
          customRoutines: [],
          history: [],
          records: [],
          bodyLogs: [],
          session: null,
          lastSummary: null,
          tab: "home",
          hydrated: true,
        });
      },
      setTab: (tab) => set({ tab }),
      completeOnboarding: (input) => {
        set({
          profile: { ...input, onboarded: true },
          bodyLogs: [
            {
              date: new Date().toISOString().slice(0, 10),
              weightKg: input.bodyWeightKg,
            },
          ],
          tab: "home",
        });
        const s = get();
        applyTheme(s.settings.theme);
        setVibrationEnabled(s.settings.vibration);
        if (persistFn) void persistFn(snapshot(s)).catch(() => {});
      },
      updateProfile: (patch) => {
        set((s) => ({ profile: { ...s.profile, ...patch } }));
        queueSave(get);
      },
      updateSettings: (patch) => {
        set((s) => {
          const settings = { ...s.settings, ...patch };
          if (patch.theme) applyTheme(patch.theme);
          if (patch.vibration != null) setVibrationEnabled(patch.vibration);
          return { settings };
        });
        queueSave(get);
      },
      startRoutine: (routine) =>
        set((s) => ({
          session: buildSession(routine, s.history),
          lastSummary: null,
        })),
      discardSession: () => set({ session: null }),
      setCurrentExercise: (index) =>
        set((s) =>
          s.session ? { session: { ...s.session, currentIndex: index, restUntil: null } } : {},
        ),
      updateSet: (exerciseIndex, setId, patch) =>
        set((s) => {
          if (!s.session) return {};
          const exercises = s.session.exercises.map((ex, i) => {
            if (i !== exerciseIndex) return ex;
            return {
              ...ex,
              sets: ex.sets.map((st) => (st.id === setId ? { ...st, ...patch } : st)),
            };
          });
          return { session: { ...s.session, exercises } };
        }),
      toggleSet: (exerciseIndex, setId) =>
        set((s) => {
          if (!s.session) return {};
          const target = s.session.exercises[exerciseIndex];
          if (!target) return {};
          const was = target.sets.find((st) => st.id === setId)?.completed ?? false;
          const exercises = s.session.exercises.map((ex, i) => {
            if (i !== exerciseIndex) return ex;
            return {
              ...ex,
              sets: ex.sets.map((st) =>
                st.id === setId ? { ...st, completed: !st.completed } : st,
              ),
            };
          });
          let restUntil: number | null = s.session.restUntil;
          let restTotalSec = s.session.restTotalSec;
          let currentIndex = s.session.currentIndex;
          if (!was) {
            restUntil = Date.now() + target.restSec * 1000;
            restTotalSec = target.restSec;
            const updated = exercises[exerciseIndex]!;
            if (updated.sets.every((st) => st.completed) && exerciseIndex < exercises.length - 1) {
              currentIndex = exerciseIndex + 1;
            }
          } else {
            restUntil = null;
          }
          return {
            session: { ...s.session, exercises, restUntil, restTotalSec, currentIndex },
          };
        }),
      addSet: (exerciseIndex) =>
        set((s) => {
          if (!s.session) return {};
          const exercises = s.session.exercises.map((ex, i) => {
            if (i !== exerciseIndex) return ex;
            const last = ex.sets.at(-1);
            return {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: uid("set"),
                  reps: last?.reps ?? 8,
                  weightKg: last?.weightKg ?? 0,
                  completed: false,
                },
              ],
            };
          });
          return { session: { ...s.session, exercises } };
        }),
      removeSet: (exerciseIndex, setId) =>
        set((s) => {
          if (!s.session) return {};
          const exercises = s.session.exercises.map((ex, i) => {
            if (i !== exerciseIndex) return ex;
            if (ex.sets.length <= 1) return ex;
            return { ...ex, sets: ex.sets.filter((st) => st.id !== setId) };
          });
          return { session: { ...s.session, exercises } };
        }),
      replaceExercise: (exerciseIndex, exerciseId) =>
        set((s) => {
          if (!s.session) return {};
          const ex = getExercise(exerciseId);
          const prev = lastLoad(s.history, exerciseId);
          const exercises = s.session.exercises.map((item, i) => {
            if (i !== exerciseIndex) return item;
            return {
              exerciseId,
              restSec: ex.restSec,
              notes: "",
              sets: Array.from({ length: Math.max(item.sets.length, ex.defaultSets) }, () => ({
                id: uid("set"),
                reps: ex.defaultReps,
                weightKg: prev?.weightKg ?? 0,
                completed: false,
              })),
            };
          });
          return { session: { ...s.session, exercises, restUntil: null } };
        }),
      skipRest: () =>
        set((s) => (s.session ? { session: { ...s.session, restUntil: null } } : {})),
      addRest: (sec) =>
        set((s) => {
          if (!s.session) return {};
          const base = s.session.restUntil && s.session.restUntil > Date.now() ? s.session.restUntil : Date.now();
          return {
            session: {
              ...s.session,
              restUntil: base + sec * 1000,
              restTotalSec: s.session.restTotalSec + sec,
            },
          };
        }),
      finishSession: () => {
        const s = get();
        if (!s.session) return null;
        const endedAt = Date.now();
        const exercises = s.session.exercises
          .map((ex) => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets
              .filter((st) => st.completed && (st.weightKg > 0 || st.reps > 0))
              .map((st) => ({ reps: st.reps, weightKg: st.weightKg })),
          }))
          .filter((ex) => ex.sets.length > 0);
        const setsCompleted = exercises.reduce((n, ex) => n + ex.sets.length, 0);
        if (setsCompleted === 0) {
          set({ session: null });
          return null;
        }
        const volumeKg = volumeOf({
          exercises: s.session.exercises,
        });
        const records = [...s.records];
        const prs: string[] = [];
        for (const ex of exercises) {
          for (const st of ex.sets) {
            const est = e1rm(st.weightKg, st.reps);
            const current = records.find((r) => r.exerciseId === ex.exerciseId);
            if (!current || est > current.e1rm + 0.01 || st.weightKg > current.weightKg) {
              const next = {
                exerciseId: ex.exerciseId,
                weightKg: st.weightKg,
                reps: st.reps,
                e1rm: est,
                date: new Date(endedAt).toISOString().slice(0, 10),
              };
              const idx = records.findIndex((r) => r.exerciseId === ex.exerciseId);
              if (idx >= 0) records[idx] = next;
              else records.push(next);
              if (!prs.includes(ex.exerciseId)) prs.push(ex.exerciseId);
            }
          }
        }
        const logged: CompletedSession = {
          id: uid("ses"),
          routineId: s.session.routineId,
          routineName: s.session.routineName,
          startedAt: s.session.startedAt,
          endedAt,
          volumeKg,
          setsCompleted,
          exercises,
          prs,
        };
        set({
          session: null,
          lastSummary: logged,
          history: [logged, ...s.history].slice(0, 200),
          records,
          tab: "home",
        });
        queueSave(get);
        return logged;
      },
      saveCustomRoutine: (routine) => {
        set((s) => ({
          customRoutines: [routine, ...s.customRoutines.filter((r) => r.id !== routine.id)],
        }));
        queueSave(get);
      },
      deleteCustomRoutine: (id) => {
        set((s) => ({ customRoutines: s.customRoutines.filter((r) => r.id !== id) }));
        queueSave(get);
      },
      addBodyLog: (weightKg) => {
        set((s) => {
          const date = new Date().toISOString().slice(0, 10);
          const rest = s.bodyLogs.filter((l) => l.date !== date);
          return {
            bodyLogs: [...rest, { date, weightKg }].sort((a, b) => a.date.localeCompare(b.date)),
            profile: { ...s.profile, bodyWeightKg: weightKg },
          };
        });
        queueSave(get);
      },
      setTimerMode: (timerMode) => set({ timerMode }),
      resetAll: () => {
        set({
          profile: { ...defaultProfile, onboarded: true, name: get().profile.name },
          customRoutines: [],
          history: [],
          records: [],
          bodyLogs: [],
          session: null,
          lastSummary: null,
          tab: "home",
        });
        queueSave(get);
      },
    }),
    {
      name: "trainup-v2",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // zustand DROPS persisted state whose stored `version` does not match the
      // configured one (and logs "couldn't be migrated"), which silently wipes a
      // returning athlete's history and throws them back into onboarding. Pin the
      // version and keep identity migrate as a no-op so stored snapshots survive.
      version: STORE_VERSION,
      migrate: (persisted) => persisted as Store,
      partialize: (s) => ({
        profile: s.profile,
        settings: s.settings,
        customRoutines: s.customRoutines,
        history: s.history,
        records: s.records,
        bodyLogs: s.bodyLogs,
        session: s.session,
        timerMode: s.timerMode,
      }),
    },
  ),
);
