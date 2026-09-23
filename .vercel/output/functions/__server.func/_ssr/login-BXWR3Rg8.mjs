import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useCurrentUserState, n as cn, t as Mark } from "./mark-zNoHINay.mjs";
import { t as GROK_PROVIDERS } from "./server-BHRbO-e7.mjs";
import { t as Button } from "./button-BXLaTDzf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BXWR3Rg8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [socialBusy, setSocialBusy] = (0, import_react.useState)(null);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function submitEmail(e) {
		e.preventDefault();
		setError(null);
		if (!email.trim() || password.length < 8) {
			setError("Usá un email válido y una clave de al menos 8 caracteres.");
			return;
		}
		setBusy(true);
		try {
			if (mode === "register") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.split("@")[0] || "Atleta"
				});
				if (err) throw new Error(err.message || "No se pudo crear la cuenta");
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) throw new Error(err.message || "Email o clave incorrectos");
			}
			await authClient.getSession();
			navigate({ to: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Algo falló");
		} finally {
			setBusy(false);
		}
	}
	async function social(providerId) {
		setError(null);
		setSocialBusy(providerId);
		try {
			await signIn(providerId, {
				callbackURL: "/",
				errorCallbackURL: "/login"
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "No se pudo entrar con esa red");
			setSocialBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-bg via-bg/80 to-bg/40" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-end px-6 pb-10 pt-16 sm:justify-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-5 font-display text-6xl leading-none tracking-tight ",
					children: [
						"TRAIN",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"UP"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-2xl bg-surface/90 p-4 shadow-[var(--shadow-border)] backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-1 rounded-xl bg-elevated p-1",
							children: [["login", "Entrar"], ["register", "Crear cuenta"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setMode(id);
									setError(null);
								},
								className: cn("h-10 rounded-lg text-sm font-medium pressable", mode === id ? "bg-surface text-fg" : "text-muted"),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 space-y-3",
							onSubmit: submitEmail,
							children: [
								mode === "register" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nombre",
									value: name,
									onChange: setName,
									placeholder: "Cómo te llamamos",
									autoComplete: "name"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									value: email,
									onChange: setEmail,
									placeholder: "vos@email.com",
									type: "email",
									autoComplete: "email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Contraseña",
									value: password,
									onChange: setPassword,
									placeholder: "Mínimo 8 caracteres",
									type: "password",
									autoComplete: mode === "register" ? "new-password" : "current-password"
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									block: true,
									size: "lg",
									disabled: busy,
									children: busy ? "Esperá…" : mode === "register" ? "Crear cuenta" : "Entrar"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-4 flex items-center gap-3 text-xs uppercase tracking-wider text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
								"o con redes",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => void social(p.providerId),
								disabled: socialBusy !== null,
								children: socialBusy === p.providerId ? "…" : p.label
							}, p.providerId))
						})
					]
				})
			]
		})]
	});
}
function Field({ label, value, onChange, placeholder, type = "text", autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			autoComplete,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "mt-1.5 h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
		})]
	});
}
//#endregion
export { Login as component };
