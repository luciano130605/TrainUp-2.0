import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type {
  GymSnapshot,
  Profile,
  Routine,
  Settings,
} from "./types";

function asJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

function asBool(value: unknown, fallback = false) {
  if (typeof value === "boolean") return value;
  if (value === "t" || value === "true" || value === true || value === 1) return true;
  if (value === "f" || value === "false" || value === false || value === 0) return false;
  return fallback;
}

function asNum(value: unknown, fallback = 0) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

type ProfileRow = {
  name: string;
  goal: Profile["goal"];
  level: Profile["level"];
  days_per_week: number;
  unit: Profile["unit"];
  body_weight_kg: number;
  height_cm: number;
  gender: Profile["gender"];
  birth_date: string;
  onboarded: boolean;
  theme: Settings["theme"];
  notifications: boolean;
  notify_hour: string;
  keep_awake: boolean;
  vibration: boolean;
};

function rowToState(row: ProfileRow): { profile: Profile; settings: Settings } {
  const days = asNum(row.days_per_week, 4);
  const daysPerWeek = (days === 3 || days === 4 || days === 5 || days === 6 ? days : 4) as 3 | 4 | 5 | 6;
  return {
    profile: {
      name: row.name || "",
      goal: row.goal || "hipertrofia",
      level: row.level || "intermedio",
      daysPerWeek,
      unit: row.unit === "lb" ? "lb" : "kg",
      bodyWeightKg: asNum(row.body_weight_kg, 75),
      heightCm: asNum(row.height_cm, 170),
      gender: row.gender === "mujer" || row.gender === "otro" ? row.gender : "hombre",
      birthDate: row.birth_date || "1995-01-01",
      onboarded: asBool(row.onboarded, false),
    },
    settings: {
      theme: row.theme === "light" ? "light" : "dark",
      notifications: asBool(row.notifications, false),
      notifyHour: row.notify_hour || "08:00",
      keepAwake: asBool(row.keep_awake, true),
      vibration: asBool(row.vibration, true),
    },
  };
}

export const loadGymState = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<GymSnapshot | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const uid = context.userId;
    const profiles = await sql<ProfileRow>`
      select name, goal, level, days_per_week, unit, body_weight_kg, height_cm, gender, birth_date,
             onboarded, theme, notifications, notify_hour, keep_awake, vibration
      from profiles where user_id = ${uid}
    `;
    const row = profiles[0];
    if (!row) return null;

    const { profile, settings } = rowToState(row);

    const routines = await sql<{
      id: string;
      name: string;
      focus: string;
      duration_min: number;
      level: Routine["level"];
      cover: Routine["cover"];
      schedule_days: unknown;
      exercises: unknown;
    }>`
      select id, name, focus, duration_min, level, cover, schedule_days, exercises
      from custom_routines where user_id = ${uid} order by created_at desc
    `;

    const sessions = await sql<{
      id: string;
      routine_id: string;
      routine_name: string;
      started_at: number;
      ended_at: number;
      volume_kg: number;
      sets_completed: number;
      exercises: unknown;
      prs: unknown;
    }>`
      select id, routine_id, routine_name, started_at, ended_at, volume_kg, sets_completed, exercises, prs
      from completed_sessions where user_id = ${uid} order by ended_at desc limit 200
    `;

    const records = await sql<{
      exercise_id: string;
      weight_kg: number;
      reps: number;
      e1rm: number;
      date: string;
    }>`
      select exercise_id, weight_kg, reps, e1rm, date from personal_records where user_id = ${uid}
    `;

    const logs = await sql<{ date: string; weight_kg: number }>`
      select date, weight_kg from body_logs where user_id = ${uid} order by date asc
    `;

    return {
      profile,
      settings,
      customRoutines: routines.map((r) => ({
        id: r.id,
        name: r.name,
        focus: r.focus,
        durationMin: asNum(r.duration_min, 40),
        level: r.level,
        cover: r.cover,
        custom: true,
        scheduleDays: asJson<number[]>(r.schedule_days, []),
        exercises: asJson(r.exercises, []),
      })),
      history: sessions.map((s) => ({
        id: s.id,
        routineId: s.routine_id,
        routineName: s.routine_name,
        startedAt: asNum(s.started_at),
        endedAt: asNum(s.ended_at),
        volumeKg: asNum(s.volume_kg),
        setsCompleted: asNum(s.sets_completed),
        exercises: asJson(s.exercises, []),
        prs: asJson(s.prs, []),
      })),
      records: records.map((r) => ({
        exerciseId: r.exercise_id,
        weightKg: asNum(r.weight_kg),
        reps: asNum(r.reps),
        e1rm: asNum(r.e1rm),
        date: r.date,
      })),
      bodyLogs: logs.map((l) => ({ date: l.date, weightKg: asNum(l.weight_kg) })),
    };
  });

export const saveGymState = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: GymSnapshot) => data)
  .handler(async ({ context, data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const uid = context.userId;
    const p = data.profile;
    const s = data.settings;

    await sql`
      insert into profiles (
        user_id, name, goal, level, days_per_week, unit, body_weight_kg, height_cm, gender, birth_date,
        onboarded, theme, notifications, notify_hour, keep_awake, vibration, updated_at
      ) values (
        ${uid}, ${p.name}, ${p.goal}, ${p.level}, ${p.daysPerWeek}, ${p.unit}, ${p.bodyWeightKg},
        ${p.heightCm}, ${p.gender}, ${p.birthDate}, ${p.onboarded}, ${s.theme}, ${s.notifications},
        ${s.notifyHour}, ${s.keepAwake}, ${s.vibration}, now()
      )
      on conflict (user_id) do update set
        name = excluded.name,
        goal = excluded.goal,
        level = excluded.level,
        days_per_week = excluded.days_per_week,
        unit = excluded.unit,
        body_weight_kg = excluded.body_weight_kg,
        height_cm = excluded.height_cm,
        gender = excluded.gender,
        birth_date = excluded.birth_date,
        onboarded = excluded.onboarded,
        theme = excluded.theme,
        notifications = excluded.notifications,
        notify_hour = excluded.notify_hour,
        keep_awake = excluded.keep_awake,
        vibration = excluded.vibration,
        updated_at = now()
    `;

    await sql`delete from custom_routines where user_id = ${uid}`;
    for (const r of data.customRoutines) {
      await sql.query(
        `insert into custom_routines (id, user_id, name, focus, duration_min, level, cover, schedule_days, exercises)
         values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb)`,
        [
          r.id,
          uid,
          r.name,
          r.focus,
          r.durationMin,
          r.level,
          r.cover,
          JSON.stringify(r.scheduleDays ?? []),
          JSON.stringify(r.exercises),
        ],
      );
    }

    await sql`delete from completed_sessions where user_id = ${uid}`;
    for (const h of data.history.slice(0, 200)) {
      await sql.query(
        `insert into completed_sessions
          (id, user_id, routine_id, routine_name, started_at, ended_at, volume_kg, sets_completed, exercises, prs)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb)`,
        [
          h.id,
          uid,
          h.routineId,
          h.routineName,
          h.startedAt,
          h.endedAt,
          h.volumeKg,
          h.setsCompleted,
          JSON.stringify(h.exercises),
          JSON.stringify(h.prs),
        ],
      );
    }

    await sql`delete from personal_records where user_id = ${uid}`;
    for (const rec of data.records) {
      await sql.query(
        `insert into personal_records (user_id, exercise_id, weight_kg, reps, e1rm, date)
         values ($1,$2,$3,$4,$5,$6)`,
        [uid, rec.exerciseId, rec.weightKg, rec.reps, rec.e1rm, rec.date],
      );
    }

    await sql`delete from body_logs where user_id = ${uid}`;
    for (const log of data.bodyLogs) {
      await sql.query(
        `insert into body_logs (user_id, date, weight_kg) values ($1,$2,$3)`,
        [uid, log.date, log.weightKg],
      );
    }

    return { ok: true as const };
  });

export const deleteAccountData = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const uid = context.userId;
    await sql`delete from body_logs where user_id = ${uid}`;
    await sql`delete from personal_records where user_id = ${uid}`;
    await sql`delete from completed_sessions where user_id = ${uid}`;
    await sql`delete from custom_routines where user_id = ${uid}`;
    await sql`delete from profiles where user_id = ${uid}`;
    await sql`delete from "session" where "userId" = ${uid}`;
    await sql`delete from "account" where "userId" = ${uid}`;
    await sql`delete from "user" where "id" = ${uid}`;
    return { ok: true as const };
  });
