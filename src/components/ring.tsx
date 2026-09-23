export function Ring({
  value,
  size = 72,
  stroke = 6,
  label,
  sub,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  // Guard the arithmetic: a NaN/Infinity `value` (e.g. a division by a missing
  // goal) would render `strokeDashoffset="NaN"` and log a React error.
  const safe = Number.isFinite(value) ? value : 0;
  const clamped = Math.min(1, Math.max(0, safe));
  const dash = c * (1 - clamped);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-elevated"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dash}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-lg leading-none tabular-nums">{label}</span>
        {sub ? <span className="text-[10px] uppercase tracking-wider text-muted">{sub}</span> : null}
      </div>
    </div>
  );
}
