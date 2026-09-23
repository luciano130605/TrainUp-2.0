import { useState, type ReactNode } from "react";
import { GENDER_LABEL, GOAL_LABEL, LEVEL_LABEL, formatWeight, fromDisplayWeight, toDisplayWeight } from "@/lib/format";
import type { Gender, Goal, Level, Theme, Unit } from "@/lib/types";
import { useTrain } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mark } from "../mark";
import { Switch } from "../ui/switch";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { deleteAccountData } from "@/lib/data";
import { ensureNotifyPermission } from "@/lib/notify";

const GOALS: Goal[] = ["fuerza", "hipertrofia", "definicion", "resistencia"];
const LEVELS: Level[] = ["principiante", "intermedio", "avanzado"];
const DAYS: Array<3 | 4 | 5 | 6> = [3, 4, 5, 6];
const GENDERS: Gender[] = ["hombre", "mujer", "otro"];

export function ProfileView() {
  const profile = useTrain((s) => s.profile);
  const settings = useTrain((s) => s.settings);
  const history = useTrain((s) => s.history);
  const update = useTrain((s) => s.updateProfile);
  const updateSettings = useTrain((s) => s.updateSettings);
  const addBodyLog = useTrain((s) => s.addBodyLog);
  const resetAll = useTrain((s) => s.resetAll);
  const user = useCurrentUser();
  const { isPending } = useCurrentUserState();
  const [weight, setWeight] = useState(String(toDisplayWeight(profile.bodyWeightKg, profile.unit)));
  const [height, setHeight] = useState(String(profile.heightCm));
  const [confirmWipe, setConfirmWipe] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const gateSession = typeof window !== "undefined" && hasGateSessionMarker();

  function saveWeight() {
    const n = Number(weight);
    if (!Number.isFinite(n) || n <= 0) return;
    addBodyLog(fromDisplayWeight(n, profile.unit));
  }

  function setUnit(unit: Unit) {
    update({ unit });
    setWeight(String(toDisplayWeight(profile.bodyWeightKg, unit)));
  }

  async function toggleNotifications(on: boolean) {
    if (on) {
      const ok = await ensureNotifyPermission();
      updateSettings({ notifications: ok });
      return;
    }
    updateSettings({ notifications: false });
  }

  async function onSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

  async function onDeleteAccount() {
    setDeleting(true);
    try {
      await deleteAccountData();
      await signOut();
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-7 pb-10">
      <header className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center overflow-hidden rounded-xl bg-elevated shadow-[var(--shadow-border)]">
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt="" className="size-full object-cover" />
          ) : (
            <Mark />
          )}
        </div>
        <div>
          <h1 className="font-display text-4xl leading-none tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-sm text-muted">
            {GOAL_LABEL[profile.goal]} · {LEVEL_LABEL[profile.level]} · {history.length} sesiones
          </p>
          {user?.primaryEmail ? <p className="text-xs text-subtle">{user.primaryEmail}</p> : null}
        </div>
      </header>

      <Field label="Nombre">
        <input
          value={profile.name}
          onChange={(e) => update({ name: e.target.value })}
          className="h-12 w-full rounded-xl bg-elevated px-4 shadow-[var(--shadow-border)] outline-none"
        />
      </Field>

      <Field label="Objetivo">
        <div className="grid grid-cols-2 gap-2">
          {GOALS.map((g) => (
            <Chip key={g} active={profile.goal === g} onClick={() => update({ goal: g })}>
              {GOAL_LABEL[g]}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Nivel">
        <div className="grid grid-cols-3 gap-2">
          {LEVELS.map((l) => (
            <Chip key={l} active={profile.level === l} onClick={() => update({ level: l })}>
              {LEVEL_LABEL[l]}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Días por semana">
        <div className="grid grid-cols-4 gap-2">
          {DAYS.map((d) => (
            <Chip key={d} active={profile.daysPerWeek === d} onClick={() => update({ daysPerWeek: d })}>
              {d}
            </Chip>
          ))}
        </div>
      </Field>

      <Field label="Género">
        <div className="grid grid-cols-3 gap-2">
          {GENDERS.map((g) => (
            <Chip key={g} active={profile.gender === g} onClick={() => update({ gender: g })}>
              {GENDER_LABEL[g]}
            </Chip>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Altura (cm)">
          <input
            inputMode="numeric"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              const n = Number(e.target.value);
              if (Number.isFinite(n) && n > 100) update({ heightCm: n });
            }}
            className="h-12 w-full rounded-xl bg-elevated px-4 tabular-nums shadow-[var(--shadow-border)] outline-none"
          />
        </Field>
        <Field label="Nacimiento">
          <input
            type="date"
            value={profile.birthDate}
            onChange={(e) => update({ birthDate: e.target.value })}
            className="h-12 w-full rounded-xl bg-elevated px-3 text-sm shadow-[var(--shadow-border)] outline-none"
          />
        </Field>
      </div>

      <Field label="Unidad">
        <div className="grid grid-cols-2 gap-2">
          <Chip active={profile.unit === "kg"} onClick={() => setUnit("kg")}>
            Kilogramos
          </Chip>
          <Chip active={profile.unit === "lb"} onClick={() => setUnit("lb")}>
            Libras
          </Chip>
        </div>
      </Field>

      <Field label={`Peso corporal (${profile.unit})`}>
        <div className="flex gap-2">
          <input
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="h-12 flex-1 rounded-xl bg-elevated px-4 tabular-nums shadow-[var(--shadow-border)] outline-none"
          />
          <Button onClick={saveWeight}>Guardar</Button>
        </div>
        <p className="mt-2 text-xs text-muted">Actual: {formatWeight(profile.bodyWeightKg, profile.unit)}</p>
      </Field>

      <Field label="Apariencia">
        <div className="grid grid-cols-2 gap-2">
          {(["dark", "light"] as Theme[]).map((t) => (
            <Chip key={t} active={settings.theme === t} onClick={() => updateSettings({ theme: t })}>
              {t === "dark" ? "Oscuro" : "Claro"}
            </Chip>
          ))}
        </div>
      </Field>

      <section className="space-y-1 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]">
        <ToggleRow
          label="Notificaciones"
          hint="Aviso del entrenamiento del día"
          checked={settings.notifications}
          onChange={(v) => void toggleNotifications(v)}
        />
        {settings.notifications ? (
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted">Hora</span>
            <input
              type="time"
              value={settings.notifyHour}
              onChange={(e) => updateSettings({ notifyHour: e.target.value })}
              className="h-11 rounded-lg bg-elevated px-3 tabular-nums shadow-[var(--shadow-border)] outline-none"
            />
          </div>
        ) : null}
        <ToggleRow
          label="Pantalla encendida"
          hint="Mantenerla activa durante la rutina"
          checked={settings.keepAwake}
          onChange={(v) => updateSettings({ keepAwake: v })}
        />
        <ToggleRow
          label="Vibración"
          hint="Pulso al terminar el descanso"
          checked={settings.vibration}
          onChange={(v) => updateSettings({ vibration: v })}
        />
      </section>

      {authEnabled && !isPending && user && !user.isDevFallback && !gateSession ? (
        <div className="space-y-2">
          <Button variant="secondary" block disabled={signingOut} onClick={() => void onSignOut()}>
            {signingOut ? "Cerrando…" : "Cerrar sesión"}
          </Button>
          {confirmDelete ? (
            <div className="space-y-2">
              <p className="text-sm text-danger">Se borra la cuenta y todo el historial. No se puede deshacer.</p>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1" onClick={() => setConfirmDelete(false)}>
                  Cancelar
                </Button>
                <Button variant="danger" className="flex-1" disabled={deleting} onClick={() => void onDeleteAccount()}>
                  {deleting ? "Borrando…" : "Eliminar"}
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="ghost" block onClick={() => setConfirmDelete(true)}>
              Eliminar cuenta
            </Button>
          )}
        </div>
      ) : null}

      {confirmWipe ? (
        <div className="space-y-2">
          <p className="text-sm text-danger">Esto borra historial, PRs y el perfil de este dispositivo.</p>
          <div className="flex gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmWipe(false)}>
              Cancelar
            </Button>
            <Button variant="danger" className="flex-1" onClick={resetAll}>
              Borrar
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="ghost" block onClick={() => setConfirmWipe(true)}>
          Borrar datos locales
        </Button>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      {children}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]",
        active ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
      )}
    >
      {children}
    </button>
  );
}
