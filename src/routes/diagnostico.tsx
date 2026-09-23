import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { databaseReport, type DbReport } from "@/lib/diagnostics";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { Splash } from "@/components/splash";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostico")({ component: Diagnostics });

function Diagnostics() {
  const { user, isPending } = useCurrentUserState();
  const [report, setReport] = useState<DbReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    void databaseReport()
      .then((r) => {
        if (alive) setReport(r);
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      alive = false;
    };
  }, [user]);

  if (isPending) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <Splash />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const durable = report?.configured ?? false;

  return (
    <div className="mx-auto w-full max-w-xl px-5 pb-16 pt-10">
      <h1 className="font-display text-4xl tracking-tight">Diagnóstico</h1>
      <p className="mt-2 text-sm text-muted">
        Qué base de datos está sirviendo esta versión de la app y cuántos datos tiene guardados.
      </p>

      {error ? (
        <p className="mt-6 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">{error}</p>
      ) : null}

      {!report && !error ? <p className="mt-6 text-sm text-muted">Consultando…</p> : null}

      {report ? (
        <div className="mt-6 space-y-4">
          <section
            className={cn(
              "rounded-2xl px-4 py-4 shadow-[var(--shadow-border)]",
              durable ? "bg-accent/12" : "bg-danger/12",
            )}
          >
            <p className="text-xs uppercase tracking-wider text-muted">Backend activo</p>
            <p className="mt-1 font-display text-3xl leading-none">
              {report.backend === "neon" ? "Neon · Postgres" : "PGLite · en memoria"}
            </p>
            <p className={cn("mt-2 text-sm", durable ? "text-fg" : "text-danger")}>
              {report.durability}
            </p>
            <p className="mt-3 text-xs text-muted">
              DATABASE_URL {report.configured ? "configurada" : "no configurada"} · usuario{" "}
              <span className="tabular-nums">{report.userId}</span>
            </p>
          </section>

          <section className="rounded-2xl bg-surface shadow-[var(--shadow-border)]">
            <h2 className="px-4 pt-4 text-xs uppercase tracking-wider text-muted">
              Filas por tabla
            </h2>
            <ul className="mt-2 divide-y divide-line">
              {report.tables.map((t) => (
                <li key={t.table} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm">{t.table}</span>
                  <span className="text-sm tabular-nums">
                    {t.rows === null ? (
                      <span className="text-danger">error</span>
                    ) : (
                      t.rows
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {report.tables
              .filter((t) => t.error)
              .map((t) => (
                <p key={`${t.table}-err`} className="px-4 pb-3 text-xs text-danger">
                  {t.table}: {t.error}
                </p>
              ))}
          </section>

          <section className="rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
            <h2 className="text-xs uppercase tracking-wider text-muted">Migraciones aplicadas</h2>
            <p className="mt-2 text-sm tabular-nums">{report.migrations.join(" · ") || "ninguna"}</p>
          </section>

          {!durable ? (
            <section className="rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
              <h2 className="text-xs uppercase tracking-wider text-muted">Qué hacer</h2>
              <p className="mt-2 text-sm">
                Sin <code>DATABASE_URL</code> la app funciona, pero olvida todo al reiniciar. Para
                guardar de verdad hay que conectar una base Postgres (por ejemplo Neon) y volver a
                publicar.
              </p>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}