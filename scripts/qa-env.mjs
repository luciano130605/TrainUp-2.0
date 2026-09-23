/**
 * Verifies the .env DATABASE_URL is a real, usable connection string and that
 * the app can actually reach the database with it. Run: node scripts/qa-env.mjs
 */
import { readFileSync } from "node:fs";
import pg from "pg";

const text = readFileSync(".env", "utf8");
const line = text.match(/^DATABASE_URL=(.+)$/m);

if (!line) {
  console.log("RESULTADO: no hay DATABASE_URL en el .env");
  process.exit(1);
}

const url = line[1].trim().replace(/^["']|["']$/g, "");
const masked = url.replace(/:\/\/([^:]+):([^@]+)@/, "://$1:***@");
console.log("cadena leída:", masked);

const isPlaceholder = /TU_PASSWORD_REAL|\[YOUR-PASSWORD\]|\[PASSWORD\]/i.test(url);
console.log("usa el texto de ejemplo:", isPlaceholder);

// Flag the IPv6-only host that Vercel cannot reach.
if (url.includes("db.") && url.includes(".supabase.co")) {
  console.log("AVISO: usás el host directo (db.<ref>), que en Vercel NO funciona (solo IPv6).");
}

if (isPlaceholder) {
  console.log("RESULTADO: la cadena tiene el texto de ejemplo, no tu contraseña real.");
  console.log("Reemplazá TU_PASSWORD_REAL por la contraseña de tu base de Supabase.");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: url,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
  max: 1,
});

try {
  const client = await pool.connect();
  const who = await client.query("select current_database() as db, current_user as usr");
  console.log("CONECTÓ:", JSON.stringify(who.rows[0]));

  const tables = await client.query(
    "select tablename from pg_tables where schemaname='public' order by tablename",
  );
  console.log(
    "tablas:",
    tables.rows.map((r) => r.tablename).join(", ") || "(ninguna todavía)",
  );
  client.release();
  console.log("RESULTADO: la conexión funciona.");
} catch (e) {
  console.log("ERROR:", e.code ?? "", e.message);
  console.log(
    e.code === "28P01"
      ? "RESULTADO: contraseña incorrecta."
      : "RESULTADO: la conexión falló (ver el error de arriba).",
  );
  process.exit(1);
} finally {
  await pool.end().catch(() => { });
}