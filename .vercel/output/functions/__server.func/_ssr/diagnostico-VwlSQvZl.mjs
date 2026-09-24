import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-wG7fM00R.mjs";
import { a as useCurrentUserState, n as cn } from "./mark-SSOXUADh.mjs";
import { n as Splash, r as createSsrRpc, t as RedirectToSignIn } from "./splash-DZIrZWDa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diagnostico-VwlSQvZl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** One table's row count for the signed-in athlete. */
/**
* Reports which database backend is actually serving this deployment and how
* much data lives in it — the question a deployed app cannot otherwise answer,
* since the PGLite fallback has no console to look at.
*/
var databaseReport = createServerFn().middleware([authMiddleware]).handler(createSsrRpc("9a0473252c7ff8500a3f419ad2bb5d17f05ec6fa67778cef12b95000f1c25fc6"));
function Diagnostics() {
	const { user, isPending } = useCurrentUserState();
	const [report, setReport] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let alive = true;
		databaseReport().then((r) => {
			if (alive) setReport(r);
		}).catch((e) => {
			if (alive) setError(e instanceof Error ? e.message : String(e));
		});
		return () => {
			alive = false;
		};
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const durable = report?.configured ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-xl px-5 pb-16 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Diagnóstico"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Qué base de datos está sirviendo esta versión de la app y cuántos datos tiene guardados."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger",
				children: error
			}) : null,
			!report && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted",
				children: "Consultando…"
			}) : null,
			report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: cn("rounded-2xl px-4 py-4 shadow-[var(--shadow-border)]", durable ? "bg-accent/12" : "bg-danger/12"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted",
								children: "Backend activo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-3xl leading-none",
								children: report.backend === "neon" ? "Neon · Postgres" : "PGLite · en memoria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-2 text-sm", durable ? "text-fg" : "text-danger"),
								children: report.durability
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs text-muted",
								children: [
									"DATABASE_URL ",
									report.configured ? "configurada" : "no configurada",
									" · usuario",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: report.userId
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl bg-surface shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "px-4 pt-4 text-xs uppercase tracking-wider text-muted",
								children: "Filas por tabla"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 divide-y divide-line",
								children: report.tables.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: t.table
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm tabular-nums",
										children: t.rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-danger",
											children: "error"
										}) : t.rows
									})]
								}, t.table))
							}),
							report.tables.filter((t) => t.error).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "px-4 pb-3 text-xs text-danger",
								children: [
									t.table,
									": ",
									t.error
								]
							}, `${t.table}-err`))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Migraciones aplicadas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm tabular-nums",
							children: report.migrations.join(" · ") || "ninguna"
						})]
					}),
					!durable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: "Qué hacer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: [
								"Sin ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "DATABASE_URL" }),
								" la app funciona, pero olvida todo al reiniciar. Para guardar de verdad hay que conectar una base Postgres (por ejemplo Neon) y volver a publicar."
							]
						})]
					}) : null
				]
			}) : null
		]
	});
}
//#endregion
export { Diagnostics as component };
