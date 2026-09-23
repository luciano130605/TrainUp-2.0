import { useMemo, useState } from "react";
import { ChevronRight, Plus, Trash2 } from "lucide-react";
import { EQUIPMENT_LABEL, getExercise, MUSCLE_LABEL } from "@/lib/exercises";
import { formatWeight, WEEKDAY_SHORT } from "@/lib/format";
import { planPlates, BAR_OPTIONS, PLATE_KG } from "@/lib/plates";
import { useTrain } from "@/lib/store";
import type { Routine, RoutineExercise } from "@/lib/types";
import { cn, uid } from "@/lib/utils";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { Stepper } from "../stepper";
import { Library, RoutineCard } from "./train";

export function CreateView() {
  const extras = useTrain((s) => s.customRoutines);
  const startRoutine = useTrain((s) => s.startRoutine);
  const deleteCustom = useTrain((s) => s.deleteCustomRoutine);
  const [mode, setMode] = useState<"rutinas" | "crear" | "barra">("rutinas");
  // Routine being edited; null while creating a new one.
  const [editingId, setEditingId] = useState<string | null>(null);

  function openCreator(id: string | null) {
    setEditingId(id);
    setMode("crear");
  }

  const editing = editingId ? extras.find((r) => r.id === editingId) : undefined;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="pb-3">
        <h1 className="font-display text-4xl tracking-tight">Crear</h1>
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]">
          {(
            [
              ["rutinas", "Rutinas"],
              ["crear", "Crear"],
              ["barra", "Barra"],
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
                onEdit={() => openCreator(r.id)}
                onDelete={() => deleteCustom(r.id)}
                extra={
                  (r.scheduleDays ?? []).length
                    ? (r.scheduleDays ?? []).map((d) => WEEKDAY_SHORT[d - 1]).join(" · ")
                    : "Sin día asignado"
                }
              />
            ))
          )}
          <Button variant="secondary" block onClick={() => openCreator(null)}>
            Nueva rutina
          </Button>
        </div>
      ) : null}

      {mode === "crear" ? (
        <Creator
          key={editing?.id ?? "new"}
          routine={editing}
          onDone={() => {
            setEditingId(null);
            setMode("rutinas");
          }}
        />
      ) : null}
      {mode === "barra" ? <BarCalculator /> : null}
    </div>
  );
}

function Creator({ routine, onDone }: { routine?: Routine; onDone: () => void }) {
  const save = useTrain((s) => s.saveCustomRoutine);
  const unit = useTrain((s) => s.profile.unit);
  const isEdit = Boolean(routine);
  const [name, setName] = useState(routine?.name ?? "Mi rutina");
  const [picked, setPicked] = useState<RoutineExercise[]>(routine?.exercises ?? []);
  const [days, setDays] = useState<number[]>(routine?.scheduleDays ?? [isoToday()]);
  const [libOpen, setLibOpen] = useState(false);
  // "new" while configuring a freshly picked exercise, a numeric index while
  // editing one already in the list, null while the sheet is closed.
  const [editing, setEditing] = useState<number | "new" | null>(null);

  function add(id: string) {
    const ex = getExercise(id);
    setPicked((p) => [
      ...p,
      { exerciseId: id, sets: ex.defaultSets, reps: ex.defaultReps, restSec: ex.restSec },
    ]);
    setLibOpen(false);
    // Straight into the detail sheet so sets/reps/weight are set on the way in.
    setEditing("new");
  }

  function updateSlot(index: number, patch: Partial<RoutineExercise>) {
    setPicked((prev) => prev.map((slot, i) => (i === index ? { ...slot, ...patch } : slot)));
  }

  function toggleDay(d: number) {
    setDays((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d].sort()));
  }

  const editIndex = editing === "new" ? picked.length - 1 : editing;
  const editSlot = editIndex !== null && editIndex >= 0 ? picked[editIndex] : undefined;

  function persist() {
    if (!name.trim() || picked.length === 0) return;
    save({
      id: routine?.id ?? uid("rut"),
      name: name.trim(),
      focus: routine?.focus ?? "Personal",
      durationMin: Math.max(20, picked.length * 8),
      level: routine?.level ?? "intermedio",
      cover: routine?.cover ?? "dumbbells",
      custom: true,
      scheduleDays: days,
      exercises: picked,
    });
    onDone();
  }

  return (
    <div className="space-y-4 pb-8">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none"
      />
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">Días que avisa el inicio</p>
        <div className="grid grid-cols-7 gap-1">
          {WEEKDAY_SHORT.map((label, i) => {
            const d = i + 1;
            const on = days.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={cn(
                  "h-11 rounded-lg text-xs font-medium pressable",
                  on ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <ul className="space-y-2">
        {picked.map((slot, i) => {
          const ex = getExercise(slot.exerciseId);
          return (
            <li
              key={`${slot.exerciseId}-${i}`}
              className="flex items-center gap-2 rounded-xl bg-surface pl-1 shadow-[var(--shadow-border)]"
            >
              <button
                type="button"
                onClick={() => setEditing(i)}
                className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-3 text-left pressable"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{ex.name}</span>
                  <span className="block truncate text-xs tabular-nums text-muted">
                    {MUSCLE_LABEL[ex.muscle]} · {EQUIPMENT_LABEL[ex.equipment]} ·{" "}
                    {slot.sets} series × {slot.reps} reps
                    {slot.weightKg ? ` · ${formatWeight(slot.weightKg, unit)}` : ""}
                    {" · "}
                    {slot.restSec}s
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted" />
              </button>
              <button
                type="button"
                className="mr-1 flex size-10 shrink-0 items-center justify-center text-muted pressable"
                onClick={() => setPicked((p) => p.filter((_, idx) => idx !== i))}
                aria-label={`Quitar ${ex.name}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          );
        })}
      </ul>

      <Button variant="secondary" block onClick={() => setLibOpen(true)}>
        <Plus className="size-4" />
        Añadir ejercicio
      </Button>
      <Button block disabled={!picked.length} onClick={persist}>
        {isEdit ? "Guardar cambios" : "Guardar rutina"}
      </Button>

      <Modal
        open={libOpen}
        onClose={() => setLibOpen(false)}
        title="Elegí el ejercicio"
        subtitle="Después ajustás series, reps y peso."
      >
        <Library hideStartHint onPick={add} />
      </Modal>

      <Modal
        open={editSlot !== undefined}
        onClose={() => setEditing(null)}
        title={editSlot ? getExercise(editSlot.exerciseId).name : ""}
        subtitle={
          editSlot
            ? `${MUSCLE_LABEL[getExercise(editSlot.exerciseId).muscle]} · ${
                EQUIPMENT_LABEL[getExercise(editSlot.exerciseId).equipment]
              }`
            : undefined
        }
        footer={
          <Button block onClick={() => setEditing(null)}>
            Listo
          </Button>
        }
      >
        {editSlot && editIndex !== null ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Series">
                <Stepper
                  wide
                  min={1}
                  value={editSlot.sets}
                  onChange={(sets) => updateSlot(editIndex, { sets })}
                  suffix="series"
                />
              </Field>
              <Field label="Reps">
                <Stepper
                  wide
                  min={1}
                  value={editSlot.reps}
                  onChange={(reps) => updateSlot(editIndex, { reps })}
                  suffix="reps"
                />
              </Field>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-muted">
                Peso en la primera serie
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Stepper
                  wide
                  min={0}
                  step={unit === "kg" ? 2.5 : 5}
                  value={slotWeightInUnit(editSlot, unit)}
                  onChange={(v) =>
                    updateSlot(editIndex, {
                      weightKg: unit === "kg" ? v : v / 2.20462262,
                    })
                  }
                  suffix={unit}
                />
                <button
                  type="button"
                  onClick={() =>
                    updateSlot(editIndex, {
                      weightKg: useTrain.getState().profile.bodyWeightKg,
                    })
                  }
                  className="h-12 shrink-0 rounded-lg bg-elevated px-3 text-xs font-medium text-muted pressable shadow-[var(--shadow-border)]"
                >
                  Mi peso
                </button>
              </div>
              <p className="mt-2 text-xs text-muted">
                Se precarga sola la próxima vez que entrenes este ejercicio; cada serie la
                ajustás en la sesión.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Descanso</p>
              <div className="mt-2 flex items-center gap-3">
                <Stepper
                  wide
                  min={0}
                  step={15}
                  value={editSlot.restSec}
                  onChange={(restSec) => updateSlot(editIndex, { restSec })}
                  suffix="seg"
                />
                <button
                  type="button"
                  onClick={() => updateSlot(editIndex, { restSec: 0 })}
                  className={cn(
                    "h-12 shrink-0 rounded-lg px-3 text-xs font-medium pressable shadow-[var(--shadow-border)]",
                    editSlot.restSec === 0 ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
                  )}
                >
                  Sin descanso
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[30, 45, 60, 90, 120, 180].map((s) => (
                  <button
                    key={`rest-${s}`}
                    type="button"
                    onClick={() => updateSlot(editIndex, { restSec: s })}
                    className={cn(
                      "h-9 rounded-full px-3 text-xs font-medium tabular-nums pressable",
                      editSlot.restSec === s ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
                    )}
                  >
                    {s}s
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted">
                {formatRest(editSlot.restSec)}. Ajustá de 15 en 15 segundos o usá un atajo.
              </p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/** Slot weight in the athlete's display unit, rounded for the stepper. */
function slotWeightInUnit(slot: RoutineExercise, unit: "kg" | "lb") {
  const kg = slot.weightKg ?? 0;
  if (unit === "kg") return Math.round(kg * 2) / 2;
  return Math.round(kg * 2.20462262 * 10) / 10;
}

function isoToday() {
  const d = new Date().getDay();
  return d === 0 ? 7 : d;
}

/** Human rest label, e.g. 90 → "1 min 30 s", 0 → "Sin descanso entre series". */
function formatRest(sec: number) {
  if (sec <= 0) return "Sin descanso entre series";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m === 0) return `${s} segundos de descanso`;
  if (s === 0) return `${m} min de descanso`;
  return `${m} min ${s} s de descanso`;
}

function BarCalculator() {
  const [target, setTarget] = useState("100");
  const [bar, setBar] = useState(20);
  const plan = useMemo(() => planPlates(Number(target) || 0, bar), [target, bar]);
  const maxH = 72;

  return (
    <div className="space-y-5 pb-10 stagger-in">
      <p className="text-sm text-muted">
        Decí cuánto querés levantar y cuánto pesa la barra. Armamos los discos por lado
        ({PLATE_KG.join(" / ")} kg).
      </p>

      <label className="block">
        <span className="text-xs uppercase tracking-wider text-muted">Peso objetivo</span>
        <input
          inputMode="decimal"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-2 h-14 w-full rounded-xl bg-elevated px-4 font-display text-3xl tabular-nums shadow-[var(--shadow-border)] outline-none"
        />
      </label>

      <div>
        <p className="text-xs uppercase tracking-wider text-muted">Barra</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {BAR_OPTIONS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBar(b)}
              className={cn(
                "h-11 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]",
                bar === b ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
              )}
            >
              {b} kg
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-surface px-4 py-5 shadow-[var(--shadow-border)]">
        <p className="text-center text-xs uppercase tracking-wider text-muted">Carga por lado</p>
        <p className="mt-1 text-center font-display text-4xl tabular-nums">
          {plan.perSideKg}
          <span className="ml-1 text-lg text-muted">kg</span>
        </p>
        <div className="mt-6 flex items-end justify-center gap-1">
          <Sleeve plates={[...plan.perSide].reverse()} maxH={maxH} mirror />
          <div className="mb-3 h-3 w-28 rounded-full bg-fg/80 sm:w-40" />
          <Sleeve plates={plan.perSide} maxH={maxH} />
        </div>
        {plan.perSide.length === 0 ? (
          <p className="mt-4 text-center text-sm text-muted">Solo la barra.</p>
        ) : (
          <ul className="mt-5 space-y-1.5">
            {plan.perSide.map((p) => (
              <li key={p.weight} className="flex items-center justify-between text-sm">
                <span className="text-muted">{p.weight} kg</span>
                <span className="tabular-nums">
                  {p.count} por lado · {p.count * 2} discos
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-center text-xs text-muted">
          Total real {plan.actualKg} kg
          {!plan.possible && plan.loadKg > 0
            ? ` · resto ${plan.remainderKg} kg por lado (no entra exacto)`
            : ""}
        </p>
      </div>
    </div>
  );
}

function Sleeve({
  plates,
  maxH,
  mirror,
}: {
  plates: { weight: number; count: number }[];
  maxH: number;
  mirror?: boolean;
}) {
  const discs = plates.flatMap((p) => Array.from({ length: p.count }, () => p.weight));
  const ordered = mirror ? [...discs].reverse() : discs;
  return (
    <div className="flex items-end gap-0.5">
      {ordered.map((w, i) => {
        const h = 28 + (w / 20) * (maxH - 28);
        return (
          <span
            key={`${w}-${i}`}
            title={`${w} kg`}
            className="w-2.5 rounded-sm bg-accent"
            style={{
              height: h,
              opacity: 0.45 + (w / 20) * 0.55,
            }}
          />
        );
      })}
    </div>
  );
}
