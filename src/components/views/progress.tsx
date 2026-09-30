import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { getExercise } from "@/lib/exercises";
import { formatVolume, formatWeight, formatDuration, fromDisplayWeight, toDisplayWeight } from "@/lib/format";
import { useTrain } from "@/lib/store";
import { Button } from "../ui/button";

const WEEK_LABELS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
const DAY_LABELS = ["L", "M", "X", "J", "V"];

export function ProgressView() {
  const history = useTrain((s) => s.history);
  const records = useTrain((s) => s.records);
  const unit = useTrain((s) => s.profile.unit);
  const bodyLogs = useTrain((s) => s.bodyLogs);
  const addBodyLog = useTrain((s) => s.addBodyLog);
  const [draftWeight, setDraftWeight] = useState("");

  const monthData = useMemo(() => {
    const today = new Date();
    // Month view: 4 weeks × 5 days (Mon–Fri), the last 20 weekdays ending today.
    return Array.from({ length: 20 }, (_, i) => {
      const d = subDays(today, 19 - i);
      const key = format(d, "yyyy-MM-dd");
      const vol = history
        .filter((h) => format(h.endedAt, "yyyy-MM-dd") === key)
        .reduce((s, h) => s + h.volumeKg, 0);
      return {
        day: format(d, "d", { locale: es }),
        vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2),
      };
    });
  }, [history, unit]);

  const heat = useMemo(() => {
    const today = new Date();
    // 5 training days × 4 weeks for the current month.
    const set = new Set(history.map((h) => format(h.endedAt, "yyyy-MM-dd")));
    return Array.from({ length: 20 }, (_, i) => {
      const d = subDays(today, 19 - i);
      const key = format(d, "yyyy-MM-dd");
      return { key, day: format(d, "d", { locale: es }), on: set.has(key) };
    });
  }, [history]);

  const bodyData = useMemo(() => {
    const today = new Date();
    const logMap = new Map(bodyLogs.map((l) => [l.date, l.weightKg]));
    return Array.from({ length: 20 }, (_, i) => {
      const d = subDays(today, 19 - i);
      const key = format(d, "yyyy-MM-dd");
      const kg = logMap.get(key);
      const entry: { day: string; peso?: number } = { day: format(d, "d", { locale: es }) };
      if (kg != null) entry.peso = toDisplayWeight(kg, unit);
      return entry;
    });
  }, [bodyLogs, unit]);

  function saveBodyWeight() {
    const n = Number(draftWeight.replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return;
    addBodyLog(fromDisplayWeight(n, unit));
    setDraftWeight("");
  }

  const totalVol = history.reduce((s, h) => s + h.volumeKg, 0);
  const lastWeight = bodyLogs.at(-1);
  const profile = useTrain((s) => s.profile);

  return (
    <div className="space-y-7 pb-8 stagger-in">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Progreso</h1>
        <p className="mt-1 text-sm text-muted">
          {history.length} sesiones · {formatVolume(totalVol, unit)} acumuladas
        </p>
      </header>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Volumen · mes (20 días)</p>
        <div className="mt-3 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
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
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Calendario · mes</p>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {DAY_LABELS.map((label) => (
            <span key={`h-${label}`} className="text-center text-[10px] font-medium text-muted">
              {label}
            </span>
          ))}
          {heat.map((d) => (
            <span
              key={d.key}
              title={`${d.key}${d.on ? " · entrenado" : ""}`}
              className={`flex h-9 items-center justify-center rounded-lg text-xs tabular-nums shadow-[var(--shadow-border)] ${
                d.on ? "bg-accent text-accent-fg font-medium" : "bg-elevated text-subtle"
              }`}
            >
              {d.day}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
          {WEEK_LABELS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Peso corporal · mes</p>
          <p className="text-sm font-medium tabular-nums">
            {lastWeight ? formatWeight(lastWeight.weightKg, unit) : "—"}
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
              <XAxis dataKey="day" tick={{ fill: "var(--tu-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
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
        <div className="mt-3 flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            value={draftWeight}
            onChange={(e) => setDraftWeight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveBodyWeight();
            }}
            placeholder={`${toDisplayWeight(profile.bodyWeightKg, unit)}`}
            className="min-w-0 flex-1 rounded-lg bg-elevated px-3 py-2 text-sm tabular-nums shadow-[var(--shadow-border)] outline-none focus:shadow-[var(--shadow-border-hover)]"
          />
          <Button type="button" variant="primary" onClick={saveBodyWeight} className="px-4">
            Registrar
          </Button>
        </div>
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
