import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as authClient } from "./client-BjbFQbVA.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mark-tYtoT43K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Modo de PRUEBA — entra sin tocar la base de datos.
*
* Cuando está activo, la app se comporta como si hubiera una sesión iniciada
* (`TEST_USER`) pero **nunca** llama a `loadGymState` / `saveGymState`, así que
* no se lee ni se escribe ninguna fila en Postgres. El estado vive solo en
* `localStorage`, igual que en el onboarding, y se puede borrar con un toque.
*
* Se activa de tres formas, en orden de precedencia:
*   1. Botón "Entrar como invitado" en `/login`.
*   2. `?demo=1` en la URL (útil para compartir un link de prueba).
*   3. `localStorage["trainup-test-mode"] === "1"` (persiste entre recargas).
*
* Desactivar: botón "Salir del modo prueba" en el perfil, o `?demo=0`.
*/
var TEST_MODE_KEY = "trainup-test-mode";
var TEST_USER = {
	id: "test-user",
	displayName: "Usuario de prueba",
	primaryEmail: "prueba@local",
	profileImageUrl: null,
	isDevFallback: false
};
/**
* Whether test mode is on right now. Reads `?demo=` first (and persists it), so
* a shared link survives a reload without the query string.
*/
function isTestMode() {
	if (typeof window === "undefined") return false;
	try {
		const flag = new URLSearchParams(window.location.search).get("demo");
		if (flag === "1") {
			window.localStorage.setItem(TEST_MODE_KEY, "1");
			return true;
		}
		if (flag === "0") {
			window.localStorage.removeItem(TEST_MODE_KEY);
			return false;
		}
		return window.localStorage.getItem(TEST_MODE_KEY) === "1";
	} catch {
		return false;
	}
}
function enableTestMode() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(TEST_MODE_KEY, "1");
	} catch {}
}
function disableTestMode() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(TEST_MODE_KEY);
	} catch {}
}
/**
* Subscribe/read helper so React can re-render when the flag flips without a
* full page load (the login button and the profile toggle both live in the SPA).
*/
var listeners = /* @__PURE__ */ new Set();
function subscribeTestMode(onChange) {
	listeners.add(onChange);
	return () => listeners.delete(onChange);
}
function notify() {
	for (const fn of listeners) fn();
}
function enableTestModeAndNotify() {
	enableTestMode();
	notify();
}
function disableTestModeAndNotify() {
	disableTestMode();
	notify();
}
/**
* Stable fallback user, used ONLY when auth is disabled
* (`VITE_AUTH_ENABLED=false`, the shipped default). With auth on, the sandbox
* live preview does real sign-in via the baked preview client. Its id is
* `"dev-user"` — the SAME id `verify.server.ts` returns server-side — so per-user
* rows written in that mode belong to one consistent owner.
*/
var DEV_USER = {
	id: "dev-user",
	displayName: "Dev User",
	primaryEmail: "dev@example.com",
	profileImageUrl: null,
	isDevFallback: true
};
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const testMode = (0, import_react.useSyncExternalStore)(subscribeTestMode, isTestMode, () => false);
	const { data, isPending } = authClient.useSession();
	if (testMode) return {
		user: TEST_USER,
		isPending: false,
		testMode: true
	};
	return {
		user: DEV_USER,
		isPending: false,
		testMode: false
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-end gap-0.5", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 rounded-sm bg-fg/40 h-2.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 rounded-sm bg-fg/70 h-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 rounded-sm bg-accent h-6" })
		]
	});
}
//#endregion
export { isTestMode as a, useCurrentUserState as c, enableTestModeAndNotify as i, cn as n, uid as o, disableTestModeAndNotify as r, useCurrentUser as s, Mark as t };
