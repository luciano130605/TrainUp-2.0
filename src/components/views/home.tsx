import { ChevronRight, Dumbbell } from "lucide-react";
import { isToday } from "date-fns";
import { COVER_SRC } from "@/lib/routines";
import { firstName, formatDuration, formatVolume, formatWeight, greeting, longDate, weekdayShort } from "@/lib/format";
import { getExercise, MUSCLE_LABEL } from "@/lib/exercises";
import { computeStreak, todaysRoutine, useTrain } from "@/lib/store";
import { hoursLeft, recoveryStatus } from "@/lib/recovery";
import type { MuscleStatus } from "@/lib/recovery";
import { routinesForToday } from "@/lib/notify";
import { Button } from "../ui/button";
import { Ring } from "../ring";

export function HomeView() {
  const profile = useTrain((s) => s.profile);
  const history = useTrain((s) => s.history);
  const extras = useTrain((s) => s.customRoutines);
  const records = useTrain((s) => s.records);
  const startRoutine = useTrain((s) => s.startRoutine);
  const setTab = useTrain((s) => s.setTab);
  const lastSummary = useTrain((s) => s.lastSummary);

  const today = todaysRoutine(profile, history, extras);
  const scheduled = routinesForToday(extras);
  const streak = computeStreak(history);
  const weekStart = startOfLocalWeek();
  const weekSessions = history.filter((h) => h.endedAt >= weekStart);
  const trainedToday = history.some((h) => isToday(h.endedAt));
  const weekVol = weekSessions.reduce((s, h) => s + h.volumeKg, 0);
  const last = history[0];
  const latestPr = records[0];
  const recovery = recoveryStatus(history);
  const recovering = recovery.filter((m) => !m.ready);
  const readyCount = recovery.filter((m) => m.ready).length;
  const unit = profile.unit;

  return (
    <div className="stagger-in space-y-4 pb-10">
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{greeting()}</p>
          <h1 className="mt-0.5 truncate font-display text-2xl leading-none">
            {firstName(profile.name)}
          </h1>
          <p className="mt-1 truncate text-xs text-muted">{longDate()}</p>
        </div>
        <Ring
          value={weekSessions.length / profile.daysPerWeek}
          label={`${weekSessions.length}/${profile.daysPerWeek}`}
          sub="semana"
        />
      </header>

      {lastSummary ? (
        <div className="flex items-center gap-3 rounded-xl bg-elevated px-3.5 py-2.5 shadow-[var(--shadow-border)]">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <Dumbbell className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-accent">Sesión cerrada</p>
            <p className="truncate text-sm font-medium leading-tight">{lastSummary.routineName}</p>
            <p className="truncate text-[11px] tabular-nums text-muted">
              {formatDuration(lastSummary.endedAt - lastSummary.startedAt)} ·{" "}
              {formatVolume(lastSummary.volumeKg, unit)} · {lastSummary.setsCompleted} series
              {lastSummary.prs.length ? ` · ${lastSummary.prs.length} PR` : ""}
            </p>
          </div>
        </div>
      ) : null}

      {today ? (
        <button
          type="button"
          onClick={() => startRoutine(today)}
          className="group block w-full overflow-hidden rounded-2xl text-left pressable"
        >
          <div className="relative h-36 overflow-hidden rounded-2xl bg-elevated sm:h-48">
            <img
              src={COVER_SRC[today.cover]}
              alt=""
              className="absolute inset-0 size-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/70 to-bg/10" />
            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
                {trainedToday
                  ? "Listo por hoy"
                  : scheduled.some((r) => r.id === today.id)
                    ? "Programada"
                    : "Te toca"}
              </p>
              <h2 className="mt-0.5 truncate font-display text-2xl leading-none sm:text-3xl">
                {today.name}
              </h2>
              <p className="mt-0.5 truncate text-xs text-fg/80">
                {today.durationMin} min · {today.exercises.length} ejercicios
              </p>
            </div>
          </div>
          <span className="mt-2 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-accent text-sm font-semibold text-accent-fg">
            {trainedToday ? "Repetir sesión" : "Empezar"}
            <ChevronRight className="size-4" />
          </span>
        </button>
      ) : null}

      <section className="grid grid-cols-3 gap-2">
        <Stat label="Racha" value={`${streak}d`} />
        <Stat label="Volumen" value={formatVolume(weekVol, unit)} />
        <Stat label="PRs" value={String(records.length)} />
      </section>

      {scheduled.length > 0 ? (
        <section className="rounded-xl bg-elevated px-3.5 py-2.5 shadow-[var(--shadow-border)]">
          <p className="text-[10px] uppercase tracking-wider text-accent">Hoy en tu plan</p>
          <ul className="mt-1 divide-y divide-line">
            {scheduled.map((r) => {
              const done = history.some((h) => isToday(h.endedAt) && h.routineId === r.id);
              return (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight">{r.name}</p>
                    <p className="truncate text-[11px] text-muted">
                      {(r.scheduleDays ?? []).map(weekdayShort).join(" · ")}
                      {done ? " · hecha" : ""}
                    </p>
                  </div>
                  <Button size="sm" variant={done ? "secondary" : "primary"} onClick={() => startRoutine(r)}>
                    {done ? "Repetir" : "Empezar"}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted">Recuperación</h3>
          <p className="text-[11px] tabular-nums text-muted">
            {readyCount}/{recovery.length} listos
          </p>
        </div>
        {recovering.length === 0 ? (
          <p className="rounded-xl bg-surface px-3.5 py-3 text-xs text-muted shadow-[var(--shadow-border)]">
            {history.length > 0
              ? "Todos los grupos están recuperados. Dale."
              : "Cuando entrenes, acá vas a ver qué grupo está listo."}
          </p>
        ) : (
          <ul className="divide-y divide-line overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
            {recovering.map((m) => (
              <RecoveryRow key={m.muscle} status={m} />
            ))}
          </ul>
        )}
      </section>

      {last ? (
        <section>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted">Última sesión</h3>
            <button
              type="button"
              className="flex items-center gap-0.5 text-[11px] text-muted"
              onClick={() => setTab("progress")}
            >
              Historial
              <ChevronRight className="size-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setTab("progress")}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-3 text-left shadow-[var(--shadow-border)] pressable"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight">{last.routineName}</p>
              <p className="truncate text-[11px] text-muted">
                {formatVolume(last.volumeKg, unit)} · {last.setsCompleted} series
              </p>
            </div>
            <p className="shrink-0 text-xs tabular-nums text-muted">
              {formatDuration(last.endedAt - last.startedAt)}
            </p>
          </button>
        </section>
      ) : (
        <p className="text-xs text-muted">El primer entrenamiento es el que cuenta.</p>
      )}

      {latestPr ? (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 shadow-[var(--shadow-border)]">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted">Mejor marca</p>
            <p className="truncate text-sm font-medium leading-tight">
              {getExercise(latestPr.exerciseId).name}
            </p>
          </div>
          <p className="shrink-0 font-display text-lg leading-none tabular-nums">
            {formatWeight(latestPr.weightKg, unit, false)}
            <span className="ml-0.5 text-[11px] text-muted">
              {unit} × {latestPr.reps}
            </span>
          </p>
        </div>
      ) : null}

      <Button variant="secondary" block onClick={() => setTab("train")}>
        Ver todas las rutinas
      </Button>
    </div>
  );
}

/** One recovery row: name, bar and status on a single thumb-friendly line. */
function RecoveryRow({ status }: { status: MuscleStatus }) {
  return (
    <li className="flex items-center gap-2.5 px-3.5 py-2">
      <span className="w-16 shrink-0 text-[11px] uppercase tracking-wide text-fg/90">
        {MUSCLE_LABEL[status.muscle]}
      </span>
      <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-elevated">
        <span
          className="block h-full rounded-full bg-accent"
          style={{ width: `${Math.round(status.ratio * 100)}%` }}
        />
      </span>
      <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-muted">
        {status.ready ? "Listo" : `${Math.ceil(hoursLeft(status))} h`}
      </span>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-surface px-3 py-2 shadow-[var(--shadow-border)]">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-0.5 truncate font-display text-lg leading-none tabular-nums sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function startOfLocalWeek() {
  const d = new Date();
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - diff);
  return d.getTime();
}
