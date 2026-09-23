import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [socialBusy, setSocialBusy] = useState<string | null>(null);

  if (!isPending && user) {
    return <Navigate to="/" />;
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!authEnabled) {
      setError("El acceso está desactivado.");
      return;
    }
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
          name: name.trim() || email.split("@")[0] || "Atleta",
        });
        if (err) throw new Error(err.message || "No se pudo crear la cuenta");
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message || "Email o clave incorrectos");
      }
      await authClient.getSession();
      void navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo falló");
    } finally {
      setBusy(false);
    }
  }

  async function social(providerId: string) {
    setError(null);
    setSocialBusy(providerId);
    try {
      await signIn(providerId, { callbackURL: "/", errorCallbackURL: "/login" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo entrar con esa red");
      setSocialBusy(null);
    }
  }

  return (
    <main className="relative min-h-dvh bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/80 to-bg/40" />
      </div>
      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col justify-end px-6 pb-10 pt-16 sm:justify-center">
        <Mark />
        <h1 className="mt-5 font-display text-6xl leading-none tracking-tight ">
          TRAIN
          <br />
          UP
        </h1>

        <div className="mt-8 rounded-2xl bg-surface/90 p-4 shadow-[var(--shadow-border)] backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-elevated p-1">
            {(
              [
                ["login", "Entrar"],
                ["register", "Crear cuenta"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode(id);
                  setError(null);
                }}
                className={cn(
                  "h-10 rounded-lg text-sm font-medium pressable",
                  mode === id ? "bg-surface text-fg" : "text-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <form className="mt-4 space-y-3" onSubmit={submitEmail}>
            {mode === "register" ? (
              <Field
                label="Nombre"
                value={name}
                onChange={setName}
                placeholder="Cómo te llamamos"
                autoComplete="name"
              />
            ) : null}
            <Field
              label="Email"
              value={email}
              onChange={setEmail}
              placeholder="vos@email.com"
              type="email"
              autoComplete="email"
            />
            <Field
              label="Contraseña"
              value={password}
              onChange={setPassword}
              placeholder="Mínimo 8 caracteres"
              type="password"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" block size="lg" disabled={busy}>
              {busy ? "Esperá…" : mode === "register" ? "Crear cuenta" : "Entrar"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" />
            o con redes
            <span className="h-px flex-1 bg-line" />
          </div>

          {authEnabled ? (
            <div className="grid grid-cols-2 gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="secondary"
                  onClick={() => void social(p.providerId)}
                  disabled={socialBusy !== null}
                >
                  {socialBusy === p.providerId ? "…" : p.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">El acceso con redes está desactivado.</p>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none placeholder:text-subtle"
      />
    </label>
  );
}
