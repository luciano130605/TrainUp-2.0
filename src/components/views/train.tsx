import { useMemo, useState } from "react";
import { Pencil, Search } from "lucide-react";
import { COVER_SRC, filterRoutines } from "@/lib/routines";
import { EQUIPMENT_LABEL, getExercise, MUSCLE_LABEL, searchExercises } from "@/lib/exercises";
import { LEVEL_LABEL, WEEKDAY_SHORT } from "@/lib/format";
import { useTrain } from "@/lib/store";
import type { Muscle, Routine } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TimerView } from "./timer";
import { Button } from "../ui/button";

const MUSCLES: Array<Muscle | "todos"> = [
  "todos",
  "pecho",
  "espalda",
  "hombros",
  "biceps",
  "triceps",
  "cuadriceps",
  "isquiotibiales",
  "gemelos",
  "gluteos",
  "aductores",
  "abductores",
  "core",
  "cardio",
];

export function TrainView() {
  const profile = useTrain((s) => s.profile);
  const extras = useTrain((s) => s.customRoutines);
  const startRoutine = useTrain((s) => s.startRoutine);
  const deleteCustom = useTrain((s) => s.deleteCustomRoutine);
  const [mode, setMode] = useState<"rutinas" | "timer">("rutinas");
  const catalog = filterRoutines(profile.level);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="pb-3">
        <h1 className="font-display text-4xl tracking-tight">Entrenar</h1>
        <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]">
          {(
            [
              ["rutinas", "Rutinas"],
              ["timer", "Timer"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={cn(
                "h-10 rounded-lg text-sm font-medium pressable",
                mode === id ? "bg-elevated text-fg" : "text-muted",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {mode === "rutinas" ? (
        <div className="space-y-3 pb-8 stagger-in">
          {extras.length === 0 ? (
            <p className="text-sm text-muted">
              Todavía no tenés rutinas propias. Creá una y asignale un día: el inicio te avisa.
            </p>
          ) : (
            extras.map((r) => (
              <RoutineCard
                key={r.id}
                routine={r}
                onStart={() => startRoutine(r)}
                extra={
                  (r.scheduleDays ?? []).length
                    ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ")
                    : "Sin día asignado"
                }
              />
            ))
          )}

        </div>
      ) : null}

      {mode === "timer" ? <TimerView /> : null}
    </div>
  );
}


export function RoutineCard({
  routine,
  onStart,
  onDelete,
  onEdit,
  extra,
}: {
  routine: Routine;
  onStart: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  extra?: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
      <button type="button" onClick={onStart} className="block w-full text-left pressable">
        <div className="relative h-28">
          <img
            src={COVER_SRC[routine.cover]}
            alt=""
            className="media h-full w-full object-cover"
            decoding="async"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
        </div>
        <div className="px-4 pb-4 pt-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl leading-none">{routine.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {extra ?? `${routine.focus} · ${routine.durationMin} min · ${LEVEL_LABEL[routine.level]}`}
              </p>
            </div>
            <span className="mt-0.5 rounded-full bg-elevated px-2.5 py-1 text-[11px] tabular-nums text-muted">
              {routine.exercises.length} ej.
            </span>
          </div>
        </div>
      </button>
      {onDelete || onEdit ? (
        <div className="flex items-center justify-end gap-1 px-3 pb-3">
          {onEdit ? (
            <button
              type="button"
              onClick={onEdit}
              className="flex h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-fg pressable "
            >
              Editar
            </button>
          ) : null}
          {onDelete ? (
            <button
              type="button"
              onClick={onDelete}
              className="h-11 rounded-lg px-3 text-sm text-danger pressable"
            >
              Eliminar
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function Library({
  onPick,
  hideStartHint,
}: {
  onPick: (id: string) => void;
  hideStartHint?: boolean;
}) {
  const [q, setQ] = useState("");
  const [muscle, setMuscle] = useState<Muscle | "todos">("todos");
  const list = useMemo(() => searchExercises(q, muscle), [q, muscle]);

  return (
    <div className="pb-8">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar ejercicio"
          className="h-12 w-full rounded-xl bg-elevated pl-10 pr-3 text-sm shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
        />
      </div>
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {MUSCLES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMuscle(m)}
            className={cn(
              "h-9 shrink-0 rounded-full px-3 text-xs font-medium pressable",
              muscle === m ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            {m === "todos" ? "Todos" : MUSCLE_LABEL[m]}
          </button>
        ))}
      </div>
      {!hideStartHint ? (
        <p className="mt-3 text-xs text-muted">Toca para entrenar ese movimiento solo.</p>
      ) : null}
      <ul className="mt-3 space-y-2">
        {list.map((ex) => (
          <li key={ex.id}>
            <button
              type="button"
              onClick={() => onPick(ex.id)}
              className="flex w-full items-center justify-between rounded-xl bg-surface px-4 py-3 text-left shadow-[var(--shadow-border)] pressable"
            >
              <span>
                <span className="block font-medium">{ex.name}</span>
                <span className="text-xs text-muted">
                  {MUSCLE_LABEL[ex.muscle]} · {EQUIPMENT_LABEL[ex.equipment]}
                </span>
              </span>
              <span className="text-xs tabular-nums text-muted">
                {ex.defaultSets}×{ex.defaultReps}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
