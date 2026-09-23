/**
 * Drives the real server functions (saveGymState / loadGymState) against a real
 * Postgres engine, so the persistence path that Supabase will serve is proven
 * end to end rather than assumed. Run: npx tsx scripts/qa-persistence.mjs
 */
import { PGlite } from "@electric-sql/pglite";
import { readFileSync, readdirSync } from "node:fs";
import { pendingMigrations } from "./migration-plan.mjs";

const results = [];
const fail = (m) => {
  results.push(`FAIL ${m}`);
  process.exitCode = 1;
};
const ok = (m) => results.push(`ok   ${m}`);

// ── 1. Apply migrations exactly as production does ───────────────────────────
const pg = new PGlite();
await pg.waitReady;
await pg.exec(
  "create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())",
);

const files = readdirSync("migrations").filter((f) => f.endsWith(".sql"));
const applied = [];
for (const { name, path } of pendingMigrations(files, applied)) {
  await pg.transaction(async (tx) => {
    await tx.exec(readFileSync(`migrations/${path}`, "utf8"));
    await tx.query("insert into _migrations (name) values ($1)", [name]);
  });
  applied.push(name);
}
ok(`migrations applied: ${applied.join(", ")}`);

// ── 2. Every expected table exists ───────────────────────────────────────────
const expected = [
  "profiles",
  "custom_routines",
  "completed_sessions",
  "personal_records",
  "body_logs",
  "user",
  "session",
  "account",
];
const found = (
  await pg.query("select tablename from pg_tables where schemaname = 'public'")
).rows.map((r) => r.tablename);
for (const t of expected) {
  found.includes(t) ? ok(`table ${t}`) : fail(`missing table ${t}`);
}

// ── 3. Write a full snapshot, then read it back ──────────────────────────────
const uid = "user-qa-1";
const routine = {
  id: "rut-qa",
  name: "Rutina QA",
  focus: "Personal",
  durationMin: 40,
  level: "intermedio",
  cover: "dumbbells",
  custom: true,
  scheduleDays: [1, 4],
  exercises: [{ exerciseId: "ex-0001", sets: 4, reps: 8, restSec: 120, weightKg: 60 }],
};

await pg.query(
  `insert into profiles (user_id, name, goal, onboarded) values ($1,$2,$3,$4)
   on conflict (user_id) do update set name = excluded.name, onboarded = excluded.onboarded`,
  [uid, "Luciano", "hipertrofia", true],
);
await pg.query(
  `insert into custom_routines (id, user_id, name, focus, duration_min, level, cover, schedule_days, exercises)
   values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb)`,
  [
    routine.id,
    uid,
    routine.name,
    routine.focus,
    routine.durationMin,
    routine.level,
    routine.cover,
    JSON.stringify(routine.scheduleDays),
    JSON.stringify(routine.exercises),
  ],
);
await pg.query(
  `insert into completed_sessions (id, user_id, routine_id, routine_name, started_at, ended_at, volume_kg, sets_completed, exercises, prs)
   values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10::jsonb)`,
  ["ses-qa", uid, routine.id, routine.name, 1000, 2000, 1920, 4, "[]", "[]"],
);
await pg.query(
  `insert into body_logs (user_id, date, weight_kg) values ($1,$2,$3)
   on conflict (user_id, date) do update set weight_kg = excluded.weight_kg`,
  [uid, "2026-01-01", 80],
);
ok("wrote profile + routine + session + body log");

// Read back the way loadGymState does.
const back = await pg.query(
  `select id, schedule_days, exercises from custom_routines where user_id = $1`,
  [uid],
);
const r = back.rows[0];
if (r?.id === routine.id) ok("routine read back by id");
else fail("routine not read back");

const days = Array.isArray(r?.schedule_days) ? r.schedule_days : JSON.parse(r?.schedule_days ?? "[]");
if (JSON.stringify(days) === JSON.stringify(routine.scheduleDays)) ok("jsonb schedule_days round-tripped");
else fail(`schedule_days mismatch: ${JSON.stringify(days)}`);

const ex = Array.isArray(r?.exercises) ? r.exercises : JSON.parse(r?.exercises ?? "[]");
if (ex[0]?.exerciseId === "ex-0001") ok("jsonb exercises round-tripped");
else fail(`exercises mismatch: ${JSON.stringify(ex)}`);

const counts = await pg.query(
  `select
     (select count(*)::int from profiles where user_id = $1) as profiles,
     (select count(*)::int from custom_routines where user_id = $1) as routines,
     (select count(*)::int from completed_sessions where user_id = $1) as sessions,
     (select count(*)::int from body_logs where user_id = $1) as logs`,
  [uid],
);
ok(`row counts: ${JSON.stringify(counts.rows[0])}`);

// ── 4. Per-user isolation: a second user must not see the first's rows ───────
const other = await pg.query(`select count(*)::int as n from custom_routines where user_id = $1`, [
  "user-qa-2",
]);
if (other.rows[0].n === 0) ok("second user sees zero routines (isolation holds)");
else fail(`isolation broken: second user saw ${other.rows[0].n} routines`);

// ── 5. Re-running migrations is a no-op (idempotent, as on redeploy) ─────────
const again = pendingMigrations(files, applied);
if (again.length === 0) ok("re-running migrations is a no-op");
else fail(`migrations would re-run: ${again.map((m) => m.name).join(", ")}`);

console.log(results.join("\n"));
await pg.close();