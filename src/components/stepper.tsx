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
  const shown = Number.isInteger(value) ? String(value) : value.toFixed(1);
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
        <span className="font-display text-xl leading-none tabular-nums">{shown}</span>
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
