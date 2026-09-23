import { ChevronRight, Dumbbell } from "lucide-react";
import { isToday } from "date-fns";
import { COVER_SRC } from "@/lib/routines";
import { firstName, formatDuration, formatVolume, formatWeight, greeting, longDate, weekdayShort } from "@/lib/format";
import { MUSCLE_LABEL } from "@/lib/exercises";
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
    <div className="stagger-in space-y-5 pb-10">
      <header className="flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{longDate()}</p>
        <Ring
          value={weekSessions.length / profile.daysPerWeek}
          label={`${weekSessions.length}/${profile.daysPerWeek}`}
          sub="semana"
        />
      </header>

      {lastSummary ? (
        <div className="flex items-center gap-3 rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <Dumbbell className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-wider text-accent">Sesión cerrada</p>
            <p className="truncate text-sm font-medium">{lastSummary.routineName}</p>
            <p className="truncate text-xs tabular-nums text-muted">
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

          <div className="hero-art relative h-48 overflow-hidden rounded-2xl sm:h-56">
           
            <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-bg/5" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
                {trainedToday
                  ? "Listo por hoy"
                  : scheduled.some((r) => r.id === today.id)
                    ? "Programada"
                    : "Te toca"}
              </p>
              <h2 className="mt-1 truncate font-display text-[2rem] leading-none sm:text-4xl">
                {today.name}
              </h2>
              <p className="mt-1 truncate text-sm text-fg/80">
                {today.durationMin} min · {today.exercises.length} ejercicios
              </p>
            </div>
          </div>
          <span className="mt-3 flex h-12 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-fg">
            {trainedToday ? "Repetir sesión" : "Empezar"}
          </span>
        </button>
      ) : null}

      <section className="grid grid-cols-3 gap-2">
        <Stat label="Racha" value={`${streak}d`} />
        <Stat label="Volumen" value={formatVolume(weekVol, unit)} />
        <Stat label="PRs" value={String(records.length)} />
      </section>

      {scheduled.length > 0 ? (
        <section className="rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
          <p className="text-[11px] uppercase tracking-wider text-accent">Hoy en tu plan</p>
          <ul className="mt-1 divide-y divide-line">
            {scheduled.map((r) => {
              const done = history.some((h) => isToday(h.endedAt) && h.routineId === r.id);
              return (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="truncate text-xs text-muted">
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
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted">Recuperación</h3>
          <p className="text-xs tabular-nums text-muted">
            {readyCount}/{recovery.length} listos
          </p>
        </div>
        {recovering.length === 0 ? (
          <p className="rounded-xl bg-surface px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]">
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
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted">Última sesión</h3>
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs text-muted"
              onClick={() => setTab("progress")}
            >
              Historial
            </button>
          </div>
          <button
            type="button"
            onClick={() => setTab("progress")}
            className="flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3.5 text-left shadow-[var(--shadow-border)] pressable"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{last.routineName}</p>
              <p className="truncate text-xs text-muted">
                {formatVolume(last.volumeKg, unit)} · {last.setsCompleted} series
              </p>
            </div>
            <p className="shrink-0 text-sm tabular-nums text-muted">
              {formatDuration(last.endedAt - last.startedAt)}
            </p>
          </button>
        </section>
      ) : (
        <p className="text-sm text-muted">El primer entrenamiento es el que cuenta.</p>
      )}

      {latestPr ? (
        <p className="text-xs text-muted">
          Mejor marca reciente · {formatWeight(latestPr.weightKg, unit)} × {latestPr.reps}
        </p>
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
    <li className="flex items-center gap-3 px-4 py-2.5">
      <span className="w-20 shrink-0 text-xs uppercase tracking-wider text-fg/90">
        {MUSCLE_LABEL[status.muscle]}
      </span>
      <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-elevated">
        <span
          className="block h-full rounded-full bg-accent"
          style={{ width: `${Math.round(status.ratio * 100)}%` }}
        />
      </span>
      <span className="w-12 shrink-0 text-right text-xs tabular-nums text-muted">
        {status.ready ? "Listo" : `${Math.ceil(hoursLeft(status))} h`}
      </span>
    </li>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 truncate font-display text-xl leading-none tabular-nums sm:text-2xl">
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
