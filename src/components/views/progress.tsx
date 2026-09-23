import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { getExercise } from "@/lib/exercises";
import { formatDuration, formatVolume, formatWeight } from "@/lib/format";
import { useTrain } from "@/lib/store";

export function ProgressView() {
  const history = useTrain((s) => s.history);
  const records = useTrain((s) => s.records);
  const unit = useTrain((s) => s.profile.unit);
  const bodyLogs = useTrain((s) => s.bodyLogs);

  const weekData = useMemo(() => {
    const days = Array.from({ length: 8 }, (_, i) => {
      const d = subDays(new Date(), 7 - i);
      const key = format(d, "yyyy-MM-dd");
      const vol = history
        .filter((h) => format(h.endedAt, "yyyy-MM-dd") === key)
        .reduce((s, h) => s + h.volumeKg, 0);
      return {
        day: format(d, "EE", { locale: es }).slice(0, 2),
        vol: unit === "kg" ? Math.round(vol) : Math.round(vol * 2.2),
      };
    });
    return days;
  }, [history, unit]);

  const heat = useMemo(() => {
    const set = new Set(history.map((h) => format(h.endedAt, "yyyy-MM-dd")));
    return Array.from({ length: 84 }, (_, i) => {
      const d = subDays(new Date(), 83 - i);
      const key = format(d, "yyyy-MM-dd");
      return { key, on: set.has(key) };
    });
  }, [history]);

  const totalVol = history.reduce((s, h) => s + h.volumeKg, 0);
  const lastWeight = bodyLogs.at(-1);

  return (
    <div className="space-y-7 pb-8 stagger-in">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Progreso</h1>
        <p className="mt-1 text-sm text-muted">
          {history.length} sesiones · {formatVolume(totalVol, unit)} acumuladas
        </p>
      </header>

      <section className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Volumen · 8 días</p>
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
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Calendario</p>
        <div className="mt-3 grid grid-cols-7 gap-1.5">
          {heat.map((d) => (
            <span
              key={d.key}
              title={d.key}
              className={`h-3.5 rounded-sm ${d.on ? "bg-accent" : "bg-elevated"}`}
            />
          ))}
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

      {lastWeight ? (
        <p className="text-sm text-muted">
          Peso corporal · {formatWeight(lastWeight.weightKg, unit)}
        </p>
      ) : null}

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
