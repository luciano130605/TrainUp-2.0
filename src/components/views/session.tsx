import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Plus, Replace, X } from "lucide-react";
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
  const [picker, setPicker] = useState(false);
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
  const remaining = session.restUntil ? Math.max(0, (session.restUntil - now) / 1000) : 0;
  const resting = remaining > 0;
  const doneSets = session.exercises.reduce((n, ex) => n + ex.sets.filter((s) => s.completed).length, 0);
  const totalSets = session.exercises.reduce((n, ex) => n + ex.sets.length, 0);
  const elapsed = now - session.startedAt;

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-bg">
      <header className="flex items-center gap-2 px-4 pt-12 pb-3">
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-lg text-muted pressable"
          onClick={() => setConfirm(true)}
          aria-label="Cerrar sesión"
        >
          <X className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs uppercase tracking-[0.18em] text-muted">{session.routineName}</p>
          <p className="text-sm tabular-nums text-fg">
            {formatDuration(elapsed)} · {doneSets}/{totalSets}
          </p>
        </div>
        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full bg-accent transition-[width] duration-200"
            style={{ width: `${(doneSets / Math.max(1, totalSets)) * 100}%` }}
          />
        </div>
      </header>

      {picker ? (
        <div className="min-h-0 flex-1 overflow-y-auto px-4">
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
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">
            {MUSCLE_LABEL[exercise.muscle]} · {EQUIPMENT_LABEL[exercise.equipment]}
          </p>
          <h1 className="mt-1 font-display text-5xl leading-none tracking-tight">{exercise.name}</h1>
          {exercise.cues.length ? (
            <p className="mt-3 text-sm text-muted">{exercise.cues.join(" · ")}</p>
          ) : null}

          {exercise.gif ? (
            <GifPlate src={exercise.gif} name={exercise.name} />
          ) : null}

          <ul className="mt-6 space-y-2">
            {current.sets.map((st, i) => (
              <li
                key={st.id}
                className={cn(
                  "rounded-xl px-3 py-2 shadow-[var(--shadow-border)]",
                  st.completed ? "bg-elevated/70" : "bg-surface",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-display text-lg tabular-nums text-muted">{i + 1}</span>
                  <Stepper
                    value={toDisplayWeight(st.weightKg, unit)}
                    step={weightStep(unit)}
                    suffix={unit}
                    wide
                    onChange={(n) =>
                      updateSet(session.currentIndex, st.id, { weightKg: fromDisplayWeight(n, unit) })
                    }
                  />
                  <Stepper
                    value={st.reps}
                    step={1}
                    min={0}
                    suffix={exercise.esTiempo ? "seg" : "reps"}
                    onChange={(n) => updateSet(session.currentIndex, st.id, { reps: Math.max(0, Math.round(n)) })}
                  />
                  <button
                    type="button"
                    onClick={() => toggleSet(session.currentIndex, st.id)}
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-lg pressable",
                      st.completed ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
                    )}
                    aria-label={st.completed ? "Desmarcar serie" : "Completar serie"}
                  >
                    <Check className="size-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => addSet(session.currentIndex)}>
              <Plus className="size-4" />
              Serie
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setPicker(true)}>
              <Replace className="size-4" />
              Cambiar
            </Button>
            {current.sets.length > 1 ? (
              <Button
                variant="ghost"
                onClick={() => removeSet(session.currentIndex, current.sets.at(-1)!.id)}
              >
                Quitar
              </Button>
            ) : null}
          </div>
        </div>
      )}

      <footer className="safe-bottom shrink-0 border-t border-line px-4 pt-3 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-lg bg-elevated pressable disabled:opacity-30"
            disabled={session.currentIndex === 0}
            onClick={() => setCurrent(session.currentIndex - 1)}
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <p className="text-sm tabular-nums text-muted">
            {session.currentIndex + 1} / {session.exercises.length}
          </p>
          <button
            type="button"
            className="flex size-12 items-center justify-center rounded-lg bg-elevated pressable disabled:opacity-30"
            disabled={session.currentIndex >= session.exercises.length - 1}
            onClick={() => setCurrent(session.currentIndex + 1)}
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
        <Button block size="lg" onClick={() => finish()}>
          Terminar sesión
        </Button>
      </footer>

      {resting ? (
        <div className="absolute inset-0 z-20 flex flex-col justify-end bg-bg/70">
          <div className="rounded-t-2xl bg-surface px-6 pb-10 pt-6 shadow-[var(--shadow-border)]">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-muted">Descanso</p>
            <div className="mt-4 flex justify-center">
              <Ring
                size={168}
                stroke={8}
                value={session.restTotalSec ? 1 - remaining / session.restTotalSec : 0}
                label={formatClock(remaining)}
                sub="rest"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted">
              Siguiente: {formatWeight(current.sets.find((s) => !s.completed)?.weightKg ?? 0, unit)}
            </p>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <Button variant="secondary" onClick={() => addRest(-15)}>
                −15s
              </Button>
              <Button variant="secondary" onClick={() => skipRest()}>
                Saltar
              </Button>
              <Button variant="secondary" onClick={() => addRest(15)}>
                +15s
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {confirm ? (
        <div className="absolute inset-0 z-30 flex items-end bg-bg/70">
          <div className="w-full rounded-t-2xl bg-surface px-5 pb-8 pt-5">
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
 * Demonstration clip for the current movement. The catalogue references media
 * that may not be shipped yet, so a failed load swaps in a calm placeholder
 * instead of leaving a broken-image icon in the middle of a workout.
 */
function GifPlate({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <p className="max-w-[16rem] text-center text-xs text-muted">
          Sin video para este ejercicio. Seguí las indicaciones y tu técnica.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-4 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
      <img
        src={src}
        alt={`Demostración de ${name}`}
        className="media h-40 w-full object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
