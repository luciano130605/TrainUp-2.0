import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

/** One table's row count for the signed-in athlete. */
export type TableReport = {
  table: string;
  /** Rows belonging to this user / total rows where the user scoping applies. */
  rows: number | null;
  /** Populated when the count could not run (missing table, permissions…). */
  error?: string;
};

export type DbReport = {
  /** "neon" = a real hosted Postgres; "pglite" = in-memory fallback. */
  backend: string;
  /** Human explanation of what that backend means for data durability. */
  durability: string;
  /** True when DATABASE_URL is configured. */
  configured: boolean;
  tables: TableReport[];
  migrations: string[];
  userId: string;
};

/**
 * Reports which database backend is actually serving this deployment and how
 * much data lives in it — the question a deployed app cannot otherwise answer,
 * since the PGLite fallback has no console to look at.
 */
export const databaseReport = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<DbReport> => {
    const { getSql, dbSource } = await import("@/lib/db");
    const sql = await getSql();
    const uid = context.userId;

    // Scope counts by user where the schema is per-user; `_migrations` is global.
    const scoped: Array<[string, string]> = [
      ["profiles", `select count(*)::int as n from profiles where user_id = $1`],
      ["custom_routines", `select count(*)::int as n from custom_routines where user_id = $1`],
      ["completed_sessions", `select count(*)::int as n from completed_sessions where user_id = $1`],
      ["personal_records", `select count(*)::int as n from personal_records where user_id = $1`],
      ["body_logs", `select count(*)::int as n from body_logs where user_id = $1`],
    ];

    const tables: TableReport[] = [];
    for (const [table, query] of scoped) {
      try {
        const rows = await sql.query<{ n: number }>(query, [uid]);
        tables.push({ table, rows: Number(rows[0]?.n ?? 0) });
      } catch (err) {
        tables.push({ table, rows: null, error: err instanceof Error ? err.message : String(err) });
      }
    }

    let migrations: string[] = [];
    try {
      const rows = await sql.query<{ name: string }>(
        `select name from _migrations order by name`,
      );
      migrations = rows.map((r) => r.name);
    } catch (err) {
      migrations = [`no se pudo leer _migrations: ${err instanceof Error ? err.message : String(err)}`];
    }

    return {
      backend: dbSource,
      durability:
        dbSource === "neon"
          ? "Postgres alojado. Los datos sobreviven a reinicios y despliegues."
          : "Postgres embebido EN MEMORIA. Se vacía cada vez que el servidor reinicia.",
      configured: dbSource === "neon",
      tables,
      migrations,
      userId: uid,
    };
  });