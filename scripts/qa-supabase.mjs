/**
 * Probes the Supabase project's reachable Postgres endpoints and reports which
 * connection string shape actually works. Run: node scripts/qa-supabase.mjs
 */
import pg from "pg";
import net from "node:net";

const REF = "nniwljitgxwnhuurreub";

const candidates = [
  {
    label: "Session pooler (IPv4, puerto 5432)",
    host: `aws-0-us-east-1.pooler.supabase.com`,
    port: 5432,
    user: `postgres.${REF}`,
  },
  {
    label: "Transaction pooler (IPv4, puerto 6543)",
    host: `aws-0-us-east-1.pooler.supabase.com`,
    port: 6543,
    user: `postgres.${REF}`,
  },
  {
    label: "Directo (db.<ref> — solo IPv6)",
    host: `db.${REF}.supabase.co`,
    port: 5432,
    user: "postgres",
  },
];

function tcpProbe(host, port, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host, port });
    const done = (result) => {
      socket.destroy();
      resolve(result);
    };
    socket.setTimeout(timeoutMs);
    socket.on("connect", () => done("alcanzable"));
    socket.on("timeout", () => done("timeout"));
    socket.on("error", (e) => done(`error: ${e.code ?? e.message}`));
  });
}

// Resolve to IPv4 explicitly — that is what Vercel's runtime can reach.
async function resolvesIPv4(host) {
  try {
    const { lookup } = await import("node:dns/promises");
    const r = await lookup(host, { family: 4, all: true });
    return r.length ? r.map((x) => x.address).join(", ") : "sin registro A";
  } catch (e) {
    return `sin IPv4 (${e.code ?? e.message})`;
  }
}

console.log("== Alcanzabilidad TCP de endpoints Postgres ==\n");
for (const c of candidates) {
  const v4 = await resolvesIPv4(c.host);
  const reach = await tcpProbe(c.host, c.port);
  console.log(`${c.label}`);
  console.log(`  host:        ${c.host}:${c.port}`);
  console.log(`  user:        ${c.user}`);
  console.log(`  IPv4:        ${v4}`);
  console.log(`  TCP:         ${reach}\n`);
}

console.log("== ¿La app puede hablar con el pooler? (conexión real) ==\n");
// Any password will fail auth, but a DIFFERENT error proves the socket +
// protocol handshake work — which is what we are testing.
for (const c of candidates.slice(0, 2)) {
  const pool = new pg.Pool({
    host: c.host,
    port: c.port,
    user: c.user,
    password: "definitely-wrong-password-for-probe",
    database: "postgres",
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
    max: 1,
  });
  try {
    const client = await pool.connect();
    const r = await client.query("select 1 as ok");
    console.log(`${c.label}: CONECTÓ (inesperado, revisar credenciales) ${JSON.stringify(r.rows)}`);
    client.release();
  } catch (e) {
    const code = e.code ?? "";
    // 28P01 = wrong password -> the network + TLS + protocol all work.
    // 28000 = not found/refused. ECONNREFUSED/ENOTFOUND = network problem.
    const verdict =
      code === "28P01"
        ? "OK — llegó a Postgres y autenticó (clave incorrecta a propósito)"
        : `PROBLEMA — código ${code || e.message}`;
    console.log(`${c.label}: ${verdict}`);
  } finally {
    await pool.end().catch(() => { });
  }
}
