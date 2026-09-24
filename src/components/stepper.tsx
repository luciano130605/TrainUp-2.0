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
    if (!editing) return;
    const input = inputRef.current;
    if (!input) return;
    // Focus in a rAF so iOS has already laid the input out before we select;
    // selecting too early leaves the caret collapsed and the keyboard closed.
    const raf = window.requestAnimationFrame(() => {
      input.focus();
      input.select();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [editing]);

  function commitDraft() {
    // Accept "80,5", "80.5", "80 kg" and stray spaces: an athlete typing the
    // load should never see it silently rejected.
    const normalized = draft.trim().replace(",", ".").replace(/[^0-9.]/g, "");
    const parsed = Number(normalized);
    if (normalized && Number.isFinite(parsed)) {
      onChange(Math.max(min, Math.round(parsed * 10) / 10));
    }
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
      <div className="flex h-full min-w-0 flex-1 flex-col items-center justify-center">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            type="text"
            inputMode="decimal"
            enterKeyHint="done"
            autoComplete="off"
            aria-label={suffix ? `Escribir ${suffix}` : "Escribir valor"}
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
            className="flex h-full w-full min-w-0 flex-col items-center justify-center rounded px-1 pressable"
            onClick={() => setEditing(true)}
            aria-label={suffix ? `Editar ${shown} ${suffix}` : `Editar ${shown}`}
          >
            <span className="font-display text-xl leading-none tabular-nums">{shown}</span>
            {suffix ? <span className="text-[10px] uppercase tracking-wider text-muted">{suffix}</span> : null}
          </button>
        )}
        {editing && suffix ? <span className="text-[10px] uppercase tracking-wider text-muted">{suffix}</span> : null}
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
