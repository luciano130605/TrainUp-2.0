import { useState, type ReactNode } from "react";
import type { Gender, Goal, Level, Unit } from "@/lib/types";
import { GENDER_LABEL, GOAL_LABEL, LEVEL_LABEL } from "@/lib/format";
import { useTrain } from "@/lib/store";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/auth/use-current-user";

const GOALS: Goal[] = ["fuerza", "hipertrofia", "definicion", "resistencia"];
const LEVELS: Level[] = ["principiante", "intermedio", "avanzado"];
const DAYS: Array<3 | 4 | 5 | 6> = [3, 4, 5, 6];
const GENDERS: Gender[] = ["hombre", "mujer", "otro"];

export function Onboarding() {
  const complete = useTrain((s) => s.completeOnboarding);
  const user = useCurrentUser();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(user?.displayName ?? "");
  const [height, setHeight] = useState("170");
  const [gender, setGender] = useState<Gender>("hombre");
  const [birthDate, setBirthDate] = useState("1995-06-15");
  const [goal, setGoal] = useState<Goal>("hipertrofia");
  const [level, setLevel] = useState<Level>("intermedio");
  const [days, setDays] = useState<3 | 4 | 5 | 6>(4);
  const [unit, setUnit] = useState<Unit>("kg");
  const [weight, setWeight] = useState("75");

  const total = 4;

  function next() {
    if (step === 1 && !name.trim()) return;
    if (step < total) setStep(step + 1);
    else {
      complete({
        name: name.trim(),
        goal,
        level,
        daysPerWeek: days,
        unit,
        bodyWeightKg: unit === "kg" ? Number(weight) || 75 : (Number(weight) || 165) / 2.20462262,
        heightCm: Number(height) || 170,
        gender,
        birthDate,
      });
    }
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-bg">
      <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-6 pb-8 pt-14">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Paso {step} de {total}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full bg-accent"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>

        {step === 1 ? (
          <div className="mt-10 stagger-in">
            <h2 className="font-display text-4xl tracking-tight">¿Cómo te llamamos?</h2>
            <p className="mt-2 text-sm text-muted">Solo para saludarte al entrar.</p>
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="mt-8 h-14 w-full rounded-xl bg-elevated px-4 text-lg shadow-[var(--shadow-border)] outline-none placeholder:text-subtle focus:shadow-[var(--shadow-border-hover)]"
            />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-10 stagger-in">
            <h2 className="font-display text-4xl tracking-tight">Sobre vos</h2>
            <p className="mt-2 text-sm text-muted">Altura, género y fecha de nacimiento.</p>
            <p className="mt-8 text-xs uppercase tracking-wider text-muted">Género</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {GENDERS.map((g) => (
                <Choice key={g} active={gender === g} onClick={() => setGender(g)}>
                  {GENDER_LABEL[g]}
                </Choice>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Altura (cm)</p>
                <input
                  inputMode="numeric"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="mt-2 h-12 w-full rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Nacimiento</p>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="mt-2 h-12 w-full rounded-lg bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none"
                />
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-10 stagger-in">
            <h2 className="font-display text-4xl tracking-tight">Objetivo y nivel</h2>
            <p className="mt-2 text-sm text-muted">Armamos el plan de la semana con esto.</p>
            <p className="mt-8 text-xs uppercase tracking-wider text-muted">Objetivo</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <Choice key={g} active={goal === g} onClick={() => setGoal(g)}>
                  {GOAL_LABEL[g]}
                </Choice>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-wider text-muted">Nivel</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <Choice key={l} active={level === l} onClick={() => setLevel(l)}>
                  {LEVEL_LABEL[l]}
                </Choice>
              ))}
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-10 stagger-in">
            <h2 className="font-display text-4xl tracking-tight">Tu semana</h2>
            <p className="mt-2 text-sm text-muted">Días de entrenamiento, unidad y peso actual.</p>
            <p className="mt-8 text-xs uppercase tracking-wider text-muted">Días por semana</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {DAYS.map((d) => (
                <Choice key={d} active={days === d} onClick={() => setDays(d)}>
                  {d}
                </Choice>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Unidad</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Choice active={unit === "kg"} onClick={() => setUnit("kg")}>
                    kg
                  </Choice>
                  <Choice active={unit === "lb"} onClick={() => setUnit("lb")}>
                    lb
                  </Choice>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Peso</p>
                <input
                  inputMode="decimal"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="mt-2 h-12 w-full rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-auto flex gap-3 pt-8">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Atrás
          </Button>
          <Button className="flex-[1.4]" onClick={next} disabled={step === 1 && !name.trim()}>
            {step === total ? "Armar plan" : "Continuar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-12 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]",
        active ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
      )}
    >
      {children}
    </button>
  );
}
