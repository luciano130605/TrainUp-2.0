import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { addMonths, format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { getExercise } from "@/lib/exercises";
import { formatVolume, formatWeight, formatDuration, fromDisplayWeight, toDisplayWeight } from "@/lib/format";
import { useTrain } from "@/lib/store";
import { Button } from "../ui/button";

const DAY_LABELS = ["LU", "MA", "MI", "JU", "VI"];

function monthKey(d: Date) {
  return format(d, "yyyy-MM");
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

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

  // ── Volumen · última semana (lunes a viernes) ────────────────────────────────
  const weekData = useMemo(() => {
    // Lunes de la semana en curso.
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
        day: format(d, "EEEEEE", { locale: es }).toUpperCase(),
        vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2),
        date: key,
      };
    });
  }, [history, unit, today]);

  const weekTotal = history
    .filter((h) => weekData.some((d) => d.date === format(h.endedAt, "yyyy-MM-dd")))
    .reduce((s, h) => s + h.volumeKg, 0);

  // ── Calendario del mes: 5 columnas (Lun–Vie) alineadas al mes real ───────────
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
      if (wd === 0 || wd === 6) continue; // solo Lunes a Viernes
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

  // ── Peso corporal · mes seleccionado ────────────────────────────────────────
  // Peso corporal: vista anual (ene a dic). Cada mes guarda UN peso puntual
  // que el atleta puede editar, asi agosto y septiembre tienen su propio valor.
  const yearLabel = String(anchor.getFullYear());

  const bodyData = useMemo(() => {
    const year = anchor.getFullYear();
    const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
    const mk = (mi: number) => `${year}-${String(mi + 1).padStart(2, "0")}`;
    return Array.from({ length: lastMonth + 1 }, (_, mi) => {
      const entry: { mes: string; peso?: number } = {
        mes: capitalize(format(new Date(year, mi, 1), "LLL", { locale: es }).replace(".", "")),
      };
      const log = bodyLogs.find((l) => l.date.startsWith(mk(mi)));
      if (log) entry.peso = toDisplayWeight(log.weightKg, unit);
      return entry;
    });
  }, [bodyLogs, anchor, today, unit]);

  // One editable row per month of the shown year.
  const monthRows = useMemo(() => {
    const year = anchor.getFullYear();
    const lastMonth = year === today.getFullYear() ? today.getMonth() : 11;
    return Array.from({ length: lastMonth + 1 }, (_, mi) => {
      const iso = `${year}-${String(mi + 1).padStart(2, "0")}`;
      const log = bodyLogs.find((l) => l.date.startsWith(iso));
      return {
        iso,
        label: capitalize(format(new Date(year, mi, 1), "LLLL", { locale: es })),
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

  return (
    <div className="space-y-7 pb-8 stagger-in">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Progreso</h1>
        <p className="mt-1 text-sm text-muted">
          {history.length} sesiones · {formatVolume(totalVol, unit)} acumuladas
        </p>
      </header>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Volumen · esta semana</p>
          <p className="text-sm font-medium tabular-nums text-muted">{formatVolume(weekTotal, unit)}</p>
        </div>
        <div className="mt-3 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weekData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="vol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tu-accent)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--tu-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "var(--tu-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--tu-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--tu-elevated)",
                  border: "1px solid var(--tu-line)",
                  borderRadius: 12,
                  color: "var(--tu-fg)",
                }}
                formatter={(v) => [`${v} ${unit}`, "Volumen"]}
              />
              <Area type="monotone" dataKey="vol" stroke="var(--tu-accent)" fill="url(#vol)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Calendario</p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setOffset((o) => o - 1)}
              aria-label="Mes anterior"
              className="grid size-8 place-items-center rounded-lg bg-elevated text-muted shadow-[var(--shadow-border)] pressable"
            >
              ‹
            </button>
            <span className="min-w-34 text-center text-sm font-medium tabular-nums">{monthLabel}</span>
            <button
              type="button"
              onClick={() => setOffset((o) => (o < 0 ? o + 1 : 0))}
              disabled={!canGoNext}
              aria-label="Mes siguiente"
              className="grid size-8 place-items-center rounded-lg bg-elevated text-muted shadow-[var(--shadow-border)] pressable disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {DAY_LABELS.map((label) => (
            <span key={`h-${label}`} className="text-center text-[11px] font-medium text-muted">
              {label}
            </span>
          ))}
          {calendar.map((c) =>
            c.label === "" ? (
              <span key={c.key} aria-hidden className="h-10 rounded-lg" />
            ) : (
              <span
                key={c.key}
                title={`${c.key}${c.trained ? " · entrenado" : ""}`}
                className={`flex h-10 items-center justify-center rounded-lg text-sm tabular-nums ${
                  c.trained
                    ? "bg-accent font-semibold text-accent-fg"
                    : c.isToday
                      ? "text-fg shadow-[inset_0_0_0_1px_var(--tu-line-strong)]"
                      : c.future
                        ? "text-subtle"
                        : "bg-elevated text-subtle shadow-[var(--shadow-border)]"
                }`}
              >
                {c.label}
              </span>
            ),
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">
          {trainedCount} {trainedCount === 1 ? "día entrenado" : "días entrenados"} · lunes a viernes
        </p>
      </section>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Peso corporal · año {yearLabel}</p>
          <p className="flex items-baseline gap-2 text-sm font-medium tabular-nums">
            {yearWeight ? formatWeight(yearWeight.weightKg, unit) : "—"}
            {yearStartWeight && yearEndWeight && yearStartWeight !== yearEndWeight ? (
              <span className={yearEndWeight.weightKg <= yearStartWeight.weightKg ? "text-accent" : "text-warn"}>
                {yearEndWeight.weightKg <= yearStartWeight.weightKg ? "▼" : "▲"}{" "}
                {Math.abs(
                  toDisplayWeight(yearEndWeight.weightKg, unit) -
                    toDisplayWeight(yearStartWeight.weightKg, unit),
                ).toFixed(1)}
              </span>
            ) : null}
          </p>
        </div>
        <div className="mt-3 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bodyData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--tu-accent)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--tu-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mes" tick={{ fill: "var(--tu-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tick={{ fill: "var(--tu-muted)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--tu-elevated)",
                  border: "1px solid var(--tu-line)",
                  borderRadius: 12,
                  color: "var(--tu-fg)",
                }}
                formatter={(v) => [`${v} ${unit}`, "Peso"]}
              />
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
        <p className="mt-3 text-[11px] text-muted">Un peso por mes · editá el que quieras abajo.</p>

        <ul className="mt-3 divide-y divide-[var(--tu-line)] border-t border-[var(--tu-line)]">
          {monthRows.map((row) => (
            <li key={row.iso} className="flex items-center gap-2 py-2">
              <span className="w-24 shrink-0 text-sm capitalize text-muted">{row.label}</span>
              <input
                type="number"
                inputMode="decimal"
                value={draftMonth[row.iso] ?? ""}
                onChange={(e) => setDraftMonth((d) => ({ ...d, [row.iso]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveMonthWeight(row.iso);
                }}
                placeholder={
                  row.weightKg != null ? String(toDisplayWeight(row.weightKg, unit)) : "—"
                }
                className="min-w-0 flex-1 rounded-lg bg-elevated px-3 py-2 text-sm tabular-nums shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
              />
              <span className="w-6 shrink-0 text-xs text-muted">{unit}</span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => saveMonthWeight(row.iso)}
                disabled={!(draftMonth[row.iso] ?? "").trim()}
              >
                OK
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Marcas personales</p>
        {records.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Todavía no hay PRs. Ciérralos en la sesión.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {records
              .slice()
              .sort((a, b) => b.e1rm - a.e1rm)
              .slice(0, 8)
              .map((r) => {
                const ex = getExercise(r.exerciseId);
                return (
                  <li
                    key={r.exerciseId}
                    className="flex items-center justify-between rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
                  >
                    <span>
                      <span className="block font-medium">{ex.name}</span>
                      <span className="text-xs text-muted">{r.date}</span>
                    </span>
                    <span className="font-display text-xl tabular-nums">
                      {formatWeight(r.weightKg, unit, false)}
                      <span className="ml-1 text-xs text-muted">
                        {unit} × {r.reps}
                      </span>
                    </span>
                  </li>
                );
              })}
          </ul>
        )}
      </section>

      <section>
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Historial</p>
        {history.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Cuando termines una sesión, aparece aquí.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {history.slice(0, 12).map((h) => (
              <li
                key={h.id}
                className="rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{h.routineName}</p>
                  <p className="text-xs tabular-nums text-muted">
                    {format(h.endedAt, "d MMM", { locale: es })}
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {formatDuration(h.endedAt - h.startedAt)} · {formatVolume(h.volumeKg, unit)} ·{" "}
                  {h.setsCompleted} series
                  {h.prs.length ? ` · ${h.prs.length} PR` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
