import { useEffect, useState } from "react";
import {
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Plus,
  Replace,
  Timer,
  X,
} from "lucide-react";
import { EQUIPMENT_LABEL, getExercise, MUSCLE_LABEL } from "@/lib/exercises";
import {
  formatClock,
  formatDuration,
  formatWeight,
  toDisplayWeight,
  fromDisplayWeight,
  weightStep,
} from "@/lib/format";
import { useTrain } from "@/lib/store";
import type { WorkoutSet } from "@/lib/types";
import { cn } from "@/lib/utils";
import { chime, pulse } from "@/lib/audio";
import { isLowPowerDevice } from "@/lib/low-power";
import { releaseWakeLock, requestWakeLock } from "@/lib/wake-lock";
import { Button } from "../ui/button";
import { Stepper } from "../stepper";
import { Library } from "./train";
import { Ring } from "../ring";

export function SessionView() {
  const session = useTrain((s) => s.session);
  const unit = useTrain((s) => s.profile.unit);
  const skipRest = useTrain((s) => s.skipRest);
  const addRest = useTrain((s) => s.addRest);
  const setCurrent = useTrain((s) => s.setCurrentExercise);
  const toggleSet = useTrain((s) => s.toggleSet);
  const updateSet = useTrain((s) => s.updateSet);
  const addSet = useTrain((s) => s.addSet);
  const removeSet = useTrain((s) => s.removeSet);
  const replaceExercise = useTrain((s) => s.replaceExercise);
  const finish = useTrain((s) => s.finishSession);
  const discard = useTrain((s) => s.discardSession);
  const keepAwake = useTrain((s) => s.settings.keepAwake);
  const [now, setNow] = useState(Date.now());
  /** Seconds left on the rest timer when it was paused by hand, else null. */
  const [pausedRest, setPausedRest] = useState<number | null>(null);
  const [picker, setPicker] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [rang, setRang] = useState(false);

  useEffect(() => {
    const tick = isLowPowerDevice() ? 400 : 200;
    const id = window.setInterval(() => setNow(Date.now()), tick);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!keepAwake) return;
    void requestWakeLock();
    const onVis = () => {
      if (document.visibilityState === "visible") void requestWakeLock();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      void releaseWakeLock();
    };
  }, [keepAwake]);

  const currentIndex = session?.currentIndex ?? 0;

  // Each new exercise opens collapsed: the sets are what you touch mid-workout,
  // the technique notes are one tap away.
  useEffect(() => {
    setShowDetail(false);
  }, [currentIndex]);

  // A rest period that starts or ends on its own clears any manual pause.
  useEffect(() => {
    if (!session?.restUntil) setPausedRest(null);
  }, [session?.restUntil]);

  useEffect(() => {
    if (!session?.restUntil) {
      setRang(false);
      return;
    }
    if (session.restUntil <= Date.now() && !rang) {
      setRang(true);
      chime("done");
      pulse();
      skipRest();
    }
  }, [now, session?.restUntil, rang, skipRest]);

  if (!session) return null;

  const current = session.exercises[session.currentIndex]!;
  const exercise = getExercise(current.exerciseId);
  const countdown = session.restUntil ? Math.max(0, (session.restUntil - now) / 1000) : 0;
  const remaining = pausedRest != null ? pausedRest : countdown;
  const resting = remaining > 0;
  const doneSets = session.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.completed).length, 0);
  const totalSets = session.exercises.reduce((n, ex) => n + ex.sets.length, 0);
  const elapsed = now - session.startedAt;
  const nextIndex = session.exercises.findIndex(
    (ex, i) => i > session.currentIndex && ex.sets.some((st) => !st.completed),
  );
  const nextExercise = nextIndex >= 0 ? getExercise(session.exercises[nextIndex]!.exerciseId) : undefined;
  const currentDone = current.sets.filter((st) => st.completed).length;
  const openSet = current.sets.find((st) => !st.completed);
  const nextUp = openSet ? `${formatWeight(openSet.weightKg, unit)} × ${openSet.reps}` : nextExercise?.name;

  function pauseRest() {
    setPausedRest(countdown);
  }

  function resumeRest() {
    if (pausedRest == null) return;
    // `addRest` shifts the deadline by a delta, so feed it the gap between what
    // was left when we paused and what is left now (0 once it stopped ticking).
    addRest(pausedRest - countdown);
    setPausedRest(null);
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-bg">
      <header className="flex shrink-0 items-center gap-2 border-b border-line px-4 pb-3 pt-8 safe-top">
        <button
          type="button"
          className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-lg text-muted pressable"
          onClick={() => setConfirm(true)}
          aria-label="Cerrar sesión"
        >
          <X className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] uppercase tracking-[0.18em] text-muted">
            {session.routineName}
          </p>
          <p className="font-display text-lg leading-tight tabular-nums">
            {formatDuration(elapsed)}
            <span className="ml-2 font-sans text-xs text-muted">
              {doneSets}/{totalSets} series
            </span>
          </p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-elevated">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-200"
              style={{ width: `${(doneSets / Math.max(1, totalSets)) * 100}%` }}
            />
          </div>
        </div>
        {resting ? (
          <button
            type="button"
            onClick={() => (pausedRest != null ? resumeRest() : pauseRest())}
            aria-label={pausedRest != null ? "Reanudar descanso" : "Pausar descanso"}
            className={cn(
              "flex h-11 shrink-0 items-center gap-1.5 rounded-full px-3 font-display text-lg leading-none tabular-nums pressable",
              pausedRest != null ? "bg-elevated text-muted" : "bg-accent/15 text-accent",
            )}
          >
            {pausedRest != null ? <Play className="size-4" /> : <Pause className="size-4" />}
            {formatClock(remaining)}
          </button>
        ) : null}
      </header>

      {picker ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 pt-4 safe-bottom">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl">Sustituir</h2>
            <Button variant="ghost" size="sm" onClick={() => setPicker(false)}>
              Cancelar
            </Button>
          </div>
          <Library
            hideStartHint
            onPick={(id) => {
              replaceExercise(session.currentIndex, id);
              setPicker(false);
            }}
          />
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-36 pt-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
            {MUSCLE_LABEL[exercise.muscle]} · {EQUIPMENT_LABEL[exercise.equipment]}
          </p>
          <h1 className="mt-1 font-display text-4xl leading-none tracking-tight sm:text-5xl">
            {exercise.name}
          </h1>

          {exercise.cues.length || exercise.gif ? (
            <>
              <button
                type="button"
                onClick={() => setShowDetail((v) => !v)}
                aria-expanded={showDetail}
                className="-ml-2 mt-1 flex h-11 items-center gap-1 rounded-lg px-2 text-sm text-muted pressable"
              >
                {exercise.gif ? "Técnica y referencia" : "Indicaciones"}
                <ChevronDown className={cn("size-4 transition-transform", showDetail && "rotate-180")} />
              </button>
              {showDetail ? (
                <div className="pb-1">
                  {exercise.gif ? <MediaPlate src={exercise.gif} name={exercise.name} /> : null}
                  {exercise.cues.length ? (
                    <ul className="mt-3 space-y-1.5">
                      {exercise.cues.map((cue) => (
                        <li key={cue} className="flex gap-2 text-sm text-muted">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/70" />
                          {cue}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </>
          ) : null}

          <div className="mt-4 flex items-baseline justify-between">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Series · {currentDone}/{current.sets.length}
            </h2>
            {exercise.esTiempo ? (
              <span className="flex items-center gap-1 text-xs text-muted">
                <Timer className="size-3.5" />
                en segundos
              </span>
            ) : null}
          </div>

          <ul className="mt-2 space-y-2">
            {current.sets.map((st, i) => (
              <SetRow
                key={st.id}
                set={st}
                index={i}
                unit={unit}
                suffix={exercise.esTiempo ? "seg" : "reps"}
                active={openSet?.id === st.id}
                onChange={(patch) => updateSet(session.currentIndex, st.id, patch)}
                onToggle={() => toggleSet(session.currentIndex, st.id)}
              />
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              className="basis-28 flex-1"
              onClick={() => {
                setShowDetail(false);
                addSet(session.currentIndex);
              }}
            >
              <Plus className="size-4" />
              Serie
            </Button>
            <Button
              variant="secondary"
              className="basis-28 flex-1"
              onClick={() => {
                setShowDetail(false);
                setPicker(true);
              }}
            >
              <Replace className="size-4" />
              Cambiar
            </Button>
            {current.sets.length > 1 ? (
              <Button
                variant="ghost"
                className="basis-28 flex-1"
                onClick={() => removeSet(session.currentIndex, current.sets.at(-1)!.id)}
              >
                Quitar
              </Button>
            ) : null}
          </div>
        </div>
      )}

      {/* Session controls, anchored to the visual bottom edge so collapsing mobile
          browser chrome can never bury the active set or the navigation. */}
      <footer className="session-bar-fixed z-20 border-t border-line bg-surface/95 px-4 pt-3 backdrop-blur safe-bottom">
        {nextExercise && !resting ? (
          <p className="mb-2 truncate text-center text-xs text-muted">
            Sigue: <span className="text-fg">{nextExercise.name}</span>
          </p>
        ) : null}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-elevated pressable disabled:opacity-30"
            disabled={session.currentIndex === 0}
            onClick={() => setCurrent(session.currentIndex - 1)}
            aria-label="Ejercicio anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          {openSet ? (
            <Button
              size="lg"
              className="min-w-0 flex-1 px-3"
              onClick={() => toggleSet(session.currentIndex, openSet.id)}
            >
              <CheckCheck className="size-5 shrink-0" />
              <span className="truncate">
                Serie {current.sets.indexOf(openSet) + 1} · {formatWeight(openSet.weightKg, unit)} ×{" "}
                {openSet.reps}
                {exercise.esTiempo ? "s" : ""}
              </span>
            </Button>
          ) : (
            <Button
              size="lg"
              className="min-w-0 flex-1 px-3"
              disabled={nextIndex < 0}
              onClick={() => setCurrent(nextIndex)}
            >
              <ChevronRight className="size-5 shrink-0" />
              <span className="truncate">
                {nextExercise ? `Siguiente: ${nextExercise.name}` : "Último ejercicio"}
              </span>
            </Button>
          )}
          <button
            type="button"
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-elevated pressable disabled:opacity-30"
            disabled={session.currentIndex >= session.exercises.length - 1}
            onClick={() => setCurrent(session.currentIndex + 1)}
            aria-label="Ejercicio siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs tabular-nums text-muted">
            {session.currentIndex + 1} / {session.exercises.length} ejercicios
          </p>
          <button
            type="button"
            className="flex h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted pressable"
            onClick={() => finish()}
          >
            <Check className="size-3.5" />
            Terminar sesión
          </button>
        </div>
      </footer>

      {resting ? (
        <div className="absolute inset-0 z-30 flex flex-col justify-end bg-bg/70">
          <div className="rounded-t-2xl bg-surface px-6 pb-10 pt-6 shadow-[var(--shadow-border)]">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">
              {pausedRest != null ? "Descanso en pausa" : "Descanso"}
            </p>
            <div className="mt-4 flex justify-center">
              <Ring
                size={168}
                stroke={8}
                value={
                  pausedRest != null
                    ? 1 - pausedRest / Math.max(1, session.restTotalSec)
                    : session.restTotalSec
                      ? 1 - remaining / session.restTotalSec
                      : 0
                }
                label={formatClock(remaining)}
                sub={pausedRest != null ? "pausa" : "rest"}
              />
            </div>
            <p className="mt-3 truncate text-center text-sm text-muted">
              Sigue: <span className="text-fg">{nextUp ?? "cierre de sesión"}</span>
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <Button variant="secondary" onClick={() => addRest(-15)}>
                −15s
              </Button>
              {pausedRest != null ? (
                <Button onClick={resumeRest}>
                  <Play className="size-4" />
                  Seguir
                </Button>
              ) : (
                <Button onClick={pauseRest}>
                  <Pause className="size-4" />
                  Pausa
                </Button>
              )}
              <Button variant="secondary" onClick={() => addRest(15)}>
                +15s
              </Button>
            </div>
            <Button variant="ghost" block className="mt-1" onClick={() => skipRest()}>
              Saltar descanso
            </Button>
          </div>
        </div>
      ) : null}

      {confirm ? (
        <div className="absolute inset-0 z-40 flex items-end bg-bg/70">
          <div className="w-full rounded-t-2xl bg-surface px-5 pb-8 pt-5 shadow-[var(--shadow-border)] safe-bottom">
            <h2 className="font-display text-3xl">¿Salir sin guardar?</h2>
            <p className="mt-2 text-sm text-muted">Las series de esta sesión no se registrarán.</p>
            <div className="mt-5 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => setConfirm(false)}>
                Seguir
              </Button>
              <Button variant="danger" className="flex-1" onClick={discard}>
                Descartar
              </Button>
            </div>
            <Button className="mt-2" block onClick={() => finish()}>
              Guardar y salir
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * One set. The next unfinished set is the row you are on, so it is the one the
 * accent ring points at; finished rows recede.
 */
function SetRow({
  set,
  index,
  unit,
  suffix,
  active,
  onChange,
  onToggle,
}: {
  set: WorkoutSet;
  index: number;
  unit: "kg" | "lb";
  suffix: string;
  active: boolean;
  onChange: (patch: Partial<WorkoutSet>) => void;
  onToggle: () => void;
}) {
  return (
    <li
      className={cn(
        "rounded-xl bg-surface px-2 py-2 shadow-[var(--shadow-border)]",
        set.completed && "bg-elevated/60",
        active && "ring-1 ring-accent/45",
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "w-6 text-center font-display text-lg tabular-nums",
            active ? "text-accent" : "text-muted",
          )}
        >
          {index + 1}
        </span>
        <Stepper
          value={toDisplayWeight(set.weightKg, unit)}
          step={weightStep(unit)}
          suffix={unit}
          wide
          onChange={(n) => onChange({ weightKg: fromDisplayWeight(n, unit) })}
        />
        <Stepper
          value={set.reps}
          step={1}
          min={0}
          suffix={suffix}
          onChange={(n) => onChange({ reps: Math.max(0, Math.round(n)) })}
        />
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-lg pressable",
            set.completed ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
          )}
          aria-label={set.completed ? `Desmarcar serie ${index + 1}` : `Completar serie ${index + 1}`}
        >
          <Check className="size-5" />
        </button>
      </div>
    </li>
  );
}

/**
 * Reference clip for the current movement. The catalogue ships product photos on
 * a white background, so the plate frames them and fades their edges into the
 * card instead of dropping a white slab mid-workout; a failed load swaps in a
 * calm note rather than a broken icon.
 */
function MediaPlate({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-elevated">
        <p className="max-w-[16rem] text-center text-xs text-muted">
          Sin referencia para este ejercicio. Seguí las indicaciones y tu técnica.
        </p>
      </div>
    );
  }
  return (
    <figure className="media-plate">
      <img
        src={src}
        alt={`Referencia de ${name}`}
        className="media h-44 w-full object-contain sm:h-52"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </figure>
  );
}