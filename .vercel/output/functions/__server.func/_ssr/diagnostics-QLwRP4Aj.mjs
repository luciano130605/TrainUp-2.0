import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-wG7fM00R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostics-QLwRP4Aj.js
/** One table's row count for the signed-in athlete. */
var databaseReport_createServerFn_handler = createServerRpc({
	id: "9a0473252c7ff8500a3f419ad2bb5d17f05ec6fa67778cef12b95000f1c25fc6",
	name: "databaseReport",
	filename: "src/lib/diagnostics.ts"
}, (opts) => databaseReport.__executeServer(opts));
var databaseReport = createServerFn().middleware([authMiddleware]).handler(databaseReport_createServerFn_handler, async ({ context }) => {
	const { getSql, dbSource } = await import("./db-CRa2RZOV.mjs").then((n) => n.t).then((n) => n.t);
	const sql = await getSql();
	const uid = context.userId;
	const scoped = [
		["profiles", `select count(*)::int as n from profiles where user_id = $1`],
		["custom_routines", `select count(*)::int as n from custom_routines where user_id = $1`],
		["completed_sessions", `select count(*)::int as n from completed_sessions where user_id = $1`],
		["personal_records", `select count(*)::int as n from personal_records where user_id = $1`],
		["body_logs", `select count(*)::int as n from body_logs where user_id = $1`]
	];
	const tables = [];
	for (const [table, query] of scoped) try {
		const rows = await sql.query(query, [uid]);
		tables.push({
			table,
			rows: Number(rows[0]?.n ?? 0)
		});
	} catch (err) {
		tables.push({
			table,
			rows: null,
			error: err instanceof Error ? err.message : String(err)
		});
	}
	let migrations = [];
	try {
		migrations = (await sql.query(`select name from _migrations order by name`)).map((r) => r.name);
	} catch (err) {
		migrations = [`no se pudo leer _migrations: ${err instanceof Error ? err.message : String(err)}`];
	}
	return {
		backend: dbSource,
		durability: dbSource === "neon" ? "Postgres alojado. Los datos sobreviven a reinicios y despliegues." : "Postgres embebido EN MEMORIA. Se vacía cada vez que el servidor reinicia.",
		configured: dbSource === "neon",
		tables,
		migrations,
		userId: uid
	};
});
//#endregion
export { databaseReport_createServerFn_handler };
