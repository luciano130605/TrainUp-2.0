import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stepper({
  value,
  onChange,
  step = 1,
  min = 0,
  suffix,
  wide,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  wide?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const shown = Number.isInteger(value) ? String(value) : value.toFixed(1);

  useEffect(() => {
    if (!editing) setDraft(shown);
  }, [editing, shown]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function commitDraft() {
    const normalized = draft.trim().replace(",", ".");
    const parsed = Number(normalized);
    if (Number.isFinite(parsed)) onChange(Math.max(min, Math.round(parsed * 10) / 10));
    setEditing(false);
  }

  function cancelDraft() {
    setDraft(shown);
    setEditing(false);
  }

  return (
    <div
      className={cn(
        "flex h-12 items-center rounded-lg bg-elevated shadow-[var(--shadow-border)]",
        wide ? "min-w-0 flex-1" : "min-w-24",
      )}
    >
      <button
        type="button"
        className="flex size-12 items-center justify-center text-muted pressable"
        aria-label="Restar"
        onClick={() => onChange(Math.max(min, Math.round((value - step) * 10) / 10))}
      >
        <Minus className="size-4" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col items-center">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            inputMode="decimal"
            aria-label={suffix ? `Cargar ${suffix}` : "Cargar valor"}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              } else if (e.key === "Escape") {
                cancelDraft();
              }
            }}
            className="h-7 w-full min-w-0 bg-transparent text-center font-display text-xl leading-none tabular-nums outline-none"
          />
        ) : (
          <button
            type="button"
            className="min-w-10 rounded px-1 font-display text-xl leading-none tabular-nums pressable"
            onClick={() => setEditing(true)}
            aria-label={suffix ? `Editar ${shown} ${suffix}` : `Editar ${shown}`}
          >
            {shown}
          </button>
        )}
        {suffix ? <span className="text-[10px] uppercase tracking-wider text-muted">{suffix}</span> : null}
      </div>
      <button
        type="button"
        className="flex size-12 items-center justify-center text-muted pressable"
        aria-label="Sumar"
        onClick={() => onChange(Math.round((value + step) * 10) / 10)}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
