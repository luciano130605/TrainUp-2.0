import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addMonths, format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { getExercise, MUSCLE_LABEL } from "@/lib/exercises";
import {
  formatVolume,
  formatWeight,
  formatDuration,
  fromDisplayWeight,
  toDisplayWeight,
} from "@/lib/format";
import { useTrain } from "@/lib/store";

const DAY_LABELS = ["LU", "MA", "MI", "JU", "VI"];

function monthKey(d: Date) {
  return format(d, "yyyy-MM");
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function monthShort(d: Date) {
  return capitalize(format(d, "LLL", { locale: es }).replace(".", ""));
}

const CHART_STYLE = {
  background: "var(--tu-elevated)",
  border: "1px solid var(--tu-line)",
  borderRadius: 12,
  color: "var(--tu-fg)",
  fontSize: 12,
} as const;

export function ProgressView() {
  const history = useTrain((s) => s.history);
  const records = useTrain((s) => s.records);
  const unit = useTrain((s) => s.profile.unit);
  const bodyLogs = useTrain((s) => s.bodyLogs);
  const setMonthWeight = useTrain((s) => s.setMonthWeight);
  const [draftMonth, setDraftMonth] = useState<Record<string, string>>({});
  const [offset, setOffset] = useState(0);

  const today = useMemo(() => new Date(), []);
  const anchor = useMemo(() => addMonths(startOfMonth(today), offset), [today, offset]);
  const monthLabel = useMemo(() => capitalize(format(anchor, "LLLL yyyy", { locale: es })), [anchor]);
  const canGoNext = offset < 0;

  // ── Volumen · semana en curso (lunes a viernes) ─────────────────────────────
  const weekData = useMemo(() => {
    const monday = new Date(today);
    monday.setDate(today.getDate() - (Number(format(today, "i")) - 1));
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const key = format(d, "yyyy-MM-dd");
      const vol = history
        .filter((h) => format(h.endedAt, "yyyy-MM-dd") === key)
        .reduce((s, h) => s + h.volumeKg, 0);
      return {
        day: capitalize(format(d, "EE", { locale: es }).replace(".", "")),
        vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2),
        date: key,
      };
    });
  }, [history, unit, today]);

  const weekTotal = history
    .filter((h) => weekData.some((d) => d.date === format(h.endedAt, "yyyy-MM-dd")))
    .reduce((s, h) => s + h.volumeKg, 0);

  // ── Calendario del mes: 5 columnas (Lun–Vie) alineadas al mes real ──────────
  const calendar = useMemo(() => {
    const first = startOfMonth(anchor);
    const startIso = Number(format(first, "i")) - 1; // 0 = lunes … 4 = viernes

    const trainedDates = new Set<string>();
    for (const h of history) {
      const d = new Date(h.endedAt);
      if (monthKey(d) === monthKey(anchor)) trainedDates.add(format(d, "yyyy-MM-dd"));
    }

    const cells: Array<{ key: string; label: string; trained: boolean; future: boolean; isToday: boolean }> = [];
    for (let i = 0; i < startIso; i++) {
      cells.push({ key: `pad-${i}`, label: "", trained: false, future: false, isToday: false });
    }
    const lastDay = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
      const d = new Date(anchor.getFullYear(), anchor.getMonth(), day);
      const wd = d.getDay();
      if (wd === 0 || wd === 6) continue; // solo lunes a viernes
      const key = format(d, "yyyy-MM-dd");
      cells.push({
        key,
        label: String(day),
        trained: trainedDates.has(key),
        future: d.getTime() > today.getTime(),
        isToday: key === format(today, "yyyy-MM-dd"),
      });
    }
    return cells;
  }, [anchor, history, today]);

  const trainedCount = calendar.filter((c) => c.trained).length;

  // ── Peso corporal · vista anual (ene a dic) ────────────────────────────────
  // Cada mes guarda UN peso puntual editable, así agosto y septiembre tienen su
  // propio valor en lugar de un promedio.
  const yearLabel = String(anchor.getFullYear());

  const bodyData = useMemo(() => {
    const year = anchor.getFullYear();
    const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
    const mk = (mi: number) => `${year}-${String(mi + 1).padStart(2, "0")}`;
    return Array.from({ length: lastMonth + 1 }, (_, mi) => {
      const entry: { mes: string; peso?: number } = { mes: monthShort(new Date(year, mi, 1)) };
      const log = bodyLogs.find((l) => l.date.startsWith(mk(mi)));
      if (log) entry.peso = toDisplayWeight(log.weightKg, unit);
      return entry;
    });
  }, [bodyLogs, anchor, today, unit]);

  const monthRows = useMemo(() => {
    const year = anchor.getFullYear();
    const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
    return Array.from({ length: lastMonth + 1 }, (_, mi) => {
      const iso = `${year}-${String(mi + 1).padStart(2, "0")}`;
      const log = bodyLogs.find((l) => l.date.startsWith(iso));
      return {
        iso,
        label: monthShort(new Date(year, mi, 1)),
        weightKg: log?.weightKg ?? null,
      };
    });
  }, [bodyLogs, anchor, today]);

  const yearLogs = bodyLogs
    .filter((l) => new Date(`${l.date}T12:00:00`).getFullYear() === anchor.getFullYear())
    .sort((a, b) => a.date.localeCompare(b.date));
  const yearStartWeight = yearLogs[0];
  const yearEndWeight = yearLogs.at(-1);
  const yearWeight = yearEndWeight ?? bodyLogs.at(-1);

  function saveMonthWeight(monthISO: string) {
    const n = Number((draftMonth[monthISO] ?? "").replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return;
    setMonthWeight(monthISO, fromDisplayWeight(n, unit));
    setDraftMonth((d) => ({ ...d, [monthISO]: "" }));
  }

  const totalVol = history.reduce((s, h) => s + h.volumeKg, 0);
  const topRecords = records
    .slice()
    .sort((a, b) => b.e1rm - a.e1rm)
    .slice(0, 6);

  return (
    <div className="space-y-5 pb-8 stagger-in">
      <header>
        <h1 className="font-display text-3xl tracking-tight">Progreso</h1>
        <p className="mt-0.5 text-xs text-muted">
          {history.length} sesiones · {formatVolume(totalVol, unit)} acumuladas
        </p>
      </header>

      <section className="rounded-2xl bg-surface p-3.5 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Volumen · esta semana</p>
          <p className="text-xs font-medium tabular-nums text-muted">{formatVolume(weekTotal, unit)}</p>
        </div>
        <div className="mt-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekData} margin={{ top: 6, right: 2, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tu-accent)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--tu-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tick={{ fill: "var(--tu-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis tick={{ fill: "var(--tu-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CHART_STYLE} formatter={(v) => [`${v} ${unit}`, "Volumen"]} />
              <Area type="monotone" dataKey="vol" stroke="var(--tu-accent)" fill="url(#vol)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Calendario</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOffset((o) => o - 1)}
              aria-label="Mes anterior"
              className="grid size-7 place-items-center rounded-md bg-elevated text-sm text-muted pressable"
            >
              ‹
            </button>
            <span className="min-w-24 text-center text-xs font-medium capitalize tabular-nums">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={() => setOffset((o) => (o < 0 ? o + 1 : 0))}
              disabled={!canGoNext}
              aria-label="Mes siguiente"
              className="grid size-7 place-items-center rounded-md bg-elevated text-sm text-muted pressable disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-2.5 grid-cols-5 gap-1.5">
          {DAY_LABELS.map((label) => (
            <span
              key={`h-${label}`}
              className="text-center text-[9px] font-semibold tracking-wide text-subtle"
            >
              {label}
            </span>
          ))}
          {calendar.map((c) =>
            c.label === "" ? (
              <span key={c.key} aria-hidden className="size-7" />
            ) : (
              <span
                key={c.key}
                title={`${c.key}${c.trained ? " · entrenado" : ""}`}
                className={`flex size-7 items-center justify-center rounded-md text-[11px] tabular-nums ${c.trained
                    ? "bg-accent font-semibold text-accent-fg"
                    : c.isToday
                      ? "text-fg shadow-[inset_0_0_0_1px_var(--tu-line-strong)]"
                      : c.future
                        ? "text-subtle/50"
                        : "bg-elevated text-subtle"
                  }`}
              >
                {c.label}
              </span>
            ),
          )}
        </div>
        <p className="mt-2 text-[10px] text-muted">
          {trainedCount} {trainedCount === 1 ? "día entrenado" : "días entrenados"} · lunes a viernes
        </p>
      </section>

      <section className="rounded-2xl bg-surface p-3.5 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Peso corporal · {yearLabel}
          </p>
          <p className="flex items-baseline gap-1.5 text-xs font-medium tabular-nums">
            {yearWeight ? formatWeight(yearWeight.weightKg, unit) : "—"}
            {yearStartWeight && yearEndWeight && yearStartWeight !== yearEndWeight ? (
              <span
                className={
                  yearEndWeight.weightKg <= yearStartWeight.weightKg ? "text-accent" : "text-warn"
                }
              >
                {yearEndWeight.weightKg <= yearStartWeight.weightKg ? "▼" : "▲"}{" "}
                {Math.abs(
                  toDisplayWeight(yearEndWeight.weightKg, unit) -
                  toDisplayWeight(yearStartWeight.weightKg, unit),
                ).toFixed(1)}
              </span>
            ) : null}
          </p>
        </div>

        <div className="mt-2 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bodyData} margin={{ top: 6, right: 2, left: -30, bottom: 0 }}>
              <defs>
                <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tu-accent)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--tu-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="mes"
                tick={{ fill: "var(--tu-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fill: "var(--tu-muted)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={38}
              />
              <Tooltip contentStyle={CHART_STYLE} formatter={(v) => [`${v} ${unit}`, "Peso"]} />
              <Area
                type="monotone"
                dataKey="peso"
                connectNulls
                stroke="var(--tu-accent)"
                fill="url(#bw)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <ul className="mt-2 divide-y divide-[var(--tu-line)] border-t border-[var(--tu-line)]">
          {monthRows.map((row) => {
            const draft = draftMonth[row.iso] ?? "";
            return (
              <li key={row.iso} className="flex items-center gap-1.5 py-1.5">
                <span className="w-14 shrink-0 text-xs capitalize text-muted">{row.label}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={draft}
                  onChange={(e) => setDraftMonth((d) => ({ ...d, [row.iso]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveMonthWeight(row.iso);
                  }}
                  placeholder={row.weightKg != null ? String(toDisplayWeight(row.weightKg, unit)) : "—"}
                  className="min-w-0 flex-1 rounded-md bg-elevated px-2 py-1.5 text-xs tabular-nums shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
                />
                <span className="w-5 shrink-0 text-[11px] text-subtle">{unit}</span>
                <button
                  type="button"
                  onClick={() => saveMonthWeight(row.iso)}
                  disabled={!draft.trim()}
                  className="shrink-0 rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-accent-fg pressable disabled:opacity-25 disabled:pointer-events-none"
                >
                  Guardar
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Marcas personales</p>
          {topRecords.length > 0 ? (
            <p className="text-[11px] tabular-nums text-muted">
              Top {topRecords.length} de {records.length}
            </p>
          ) : null}
        </div>

        {topRecords.length === 0 ? (
          <p className="mt-2.5 rounded-xl bg-surface px-3.5 py-3 text-xs text-muted shadow-[var(--shadow-border)]">
            Todavía no hay PRs. Cerrá una serie con peso y aparece acá.
          </p>
        ) : (
          <ul className="mt-2.5 space-y-1.5">
            {topRecords.map((r, i) => {
              const ex = getExercise(r.exerciseId);
              return (
                <li
                  key={r.exerciseId}
                  className="flex items-center gap-3 rounded-xl bg-surface px-3 py-2.5 shadow-[var(--shadow-border)]"
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold tabular-nums ${i === 0 ? "bg-accent text-accent-fg" : "bg-elevated text-muted"
                      }`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-tight">{ex.name}</p>
                    <p className="truncate text-[11px] text-muted">
                      {MUSCLE_LABEL[ex.muscle]} · {r.date}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-lg leading-none tabular-nums">
                      {formatWeight(r.weightKg, unit, false)}
                      <span className="ml-0.5 text-[11px] text-muted">{unit}</span>
                    </p>
                    <p className="text-[10px] text-muted">× {r.reps} reps</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Historial</p>
        {history.length === 0 ? (
          <p className="mt-2.5 rounded-xl bg-surface px-3.5 py-3 text-xs text-muted shadow-[var(--shadow-border)]">
            Cuando termines una sesión, aparece acá.
          </p>
        ) : (
          <ul className="mt-2.5 space-y-1.5">
            {history.slice(0, 12).map((h) => (
              <li
                key={h.id}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 shadow-[var(--shadow-border)]"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium leading-tight">{h.routineName}</p>
                  <p className="truncate text-[11px] tabular-nums text-muted">
                    {formatVolume(h.volumeKg, unit)} · {h.setsCompleted} series ·{" "}
                    {formatDuration(h.endedAt - h.startedAt)}
                    {h.prs.length ? ` · ${h.prs.length} PR` : ""}
                  </p>
                </div>
                <p className="shrink-0 text-[11px] tabular-nums text-muted">
                  {format(h.endedAt, "d MMM", { locale: es })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
