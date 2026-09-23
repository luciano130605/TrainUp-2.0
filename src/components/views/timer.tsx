import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { TimerMode } from "@/lib/types";
import { formatClock } from "@/lib/format";
import { useTrain } from "@/lib/store";
import { chime, pulse } from "@/lib/audio";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Ring } from "../ring";
import { Stepper } from "../stepper";

const MODES: { id: TimerMode; label: string }[] = [
  { id: "descanso", label: "Rest" },
  { id: "tabata", label: "Tabata" },
  { id: "emom", label: "EMOM" },
  { id: "amrap", label: "AMRAP" },
  { id: "cronometro", label: "Cronó" },
];

export function TimerView() {
  const mode = useTrain((s) => s.timerMode);
  const setMode = useTrain((s) => s.setTimerMode);
  const [seconds, setSeconds] = useState(90);
  const [work, setWork] = useState(20);
  const [rest, setRest] = useState(10);
  const [rounds, setRounds] = useState(8);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [phase, setPhase] = useState<"work" | "rest">("work");
  const [round, setRound] = useState(1);
  const started = useRef<number | null>(null);
  const acc = useRef(0);
  const ended = useRef(false);

  const target = useMemo(() => {
    if (mode === "descanso") return seconds;
    if (mode === "amrap") return seconds;
    if (mode === "emom") return rounds * 60;
    if (mode === "tabata") return rounds * (work + rest);
    return 0;
  }, [mode, seconds, rounds, work, rest]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const now = Date.now();
      if (started.current == null) started.current = now;
      const t = acc.current + (now - started.current) / 1000;
      setElapsed(t);
    }, 100);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (!running) return;
    if (mode === "cronometro") return;
    if (ended.current) return;
    if (mode === "descanso" || mode === "amrap") {
      if (elapsed >= target) finishBlock();
      return;
    }
    if (mode === "emom") {
      const r = Math.floor(elapsed / 60) + 1;
      if (r !== round && r <= rounds) {
        setRound(r);
        chime("tick");
        pulse();
      }
      if (elapsed >= target) finishBlock();
      return;
    }
    if (mode === "tabata") {
      const cycle = work + rest;
      const pos = elapsed % cycle;
      const r = Math.min(rounds, Math.floor(elapsed / cycle) + 1);
      const nextPhase: "work" | "rest" = pos < work ? "work" : "rest";
      if (nextPhase !== phase) {
        setPhase(nextPhase);
        chime(nextPhase === "work" ? "tick" : "done");
        pulse();
      }
      if (r !== round) setRound(r);
      if (elapsed >= target) finishBlock();
    }
  }, [elapsed, running, mode, target, work, rest, rounds, phase, round]);

  function finishBlock() {
    if (ended.current) return;
    ended.current = true;
    setRunning(false);
    acc.current = target;
    setElapsed(target);
    started.current = null;
    chime("done");
    pulse();
  }

  function toggle() {
    if (running) {
      acc.current = elapsed;
      started.current = null;
      setRunning(false);
    } else {
      if (elapsed >= target && mode !== "cronometro") reset();
      started.current = Date.now();
      setRunning(true);
    }
  }

  function reset() {
    setRunning(false);
    setElapsed(0);
    acc.current = 0;
    started.current = null;
    ended.current = false;
    setPhase("work");
    setRound(1);
  }

  function switchMode(next: TimerMode) {
    reset();
    setMode(next);
    if (next === "tabata") {
      setWork(20);
      setRest(10);
      setRounds(8);
    }
    if (next === "emom") setRounds(10);
    if (next === "amrap") setSeconds(600);
    if (next === "descanso") setSeconds(90);
  }

  const remaining =
    mode === "cronometro" ? elapsed : Math.max(0, target - elapsed);
  const progress =
    mode === "cronometro" ? 0 : target ? Math.min(1, elapsed / target) : 0;
  const label =
    mode === "tabata" ? (phase === "work" ? "WORK" : "REST") : mode === "emom" ? `R${round}` : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col pb-6">
      <h1 className="font-display text-4xl tracking-tight">Timer</h1>
      <div className="mt-3 flex gap-1 overflow-x-auto">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => switchMode(m.id)}
            className={cn(
              "h-10 shrink-0 rounded-full px-3 text-xs font-medium pressable",
              mode === m.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <Ring
          size={220}
          stroke={10}
          value={progress}
          label={formatClock(remaining)}
          sub={label}
        />
        {mode === "tabata" || mode === "emom" ? (
          <p className="mt-3 text-sm text-muted">
            Ronda {round} / {rounds}
          </p>
        ) : null}
      </div>

      <div className="mt-8 space-y-3">
        {mode === "descanso" || mode === "amrap" ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">{mode === "amrap" ? "Minutos" : "Segundos"}</span>
            <Stepper
              value={mode === "amrap" ? Math.round(seconds / 60) : seconds}
              step={mode === "amrap" ? 1 : 15}
              min={mode === "amrap" ? 1 : 15}
              onChange={(n) => setSeconds(mode === "amrap" ? n * 60 : n)}
            />
          </div>
        ) : null}
        {mode === "tabata" ? (
          <>
            <Row label="Work" value={work} step={5} onChange={setWork} />
            <Row label="Rest" value={rest} step={5} onChange={setRest} />
            <Row label="Rondas" value={rounds} step={1} onChange={setRounds} />
          </>
        ) : null}
        {mode === "emom" ? <Row label="Minutos" value={rounds} step={1} min={1} onChange={setRounds} /> : null}
      </div>

      <div className="mt-auto flex gap-2 pt-6">
        <Button variant="secondary" size="lg" className="flex-1" onClick={reset}>
          <RotateCcw className="size-4" />
          Reset
        </Button>
        <Button size="lg" className="flex-[1.4]" onClick={toggle}>
          {running ? <Pause className="size-4" /> : <Play className="size-4" />}
          {running ? "Pausa" : "Start"}
        </Button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  step,
  min = 0,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  min?: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <Stepper value={value} step={step} min={min} onChange={onChange} />
    </div>
  );
}
