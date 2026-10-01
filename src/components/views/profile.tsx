import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  History,
  Moon,
  Repeat,
  Smartphone,
  Timer,
  Vibrate,
  Volume2,
  Zap,
} from "lucide-react";
import { GENDER_LABEL, GOAL_LABEL, LEVEL_LABEL, formatWeight, fromDisplayWeight, toDisplayWeight } from "@/lib/format";
import type { Gender, Goal, Level, SoundTone, Theme, Unit } from "@/lib/types";
import { REST_PRESETS, useTrain } from "@/lib/store";
import { hasRealVibration, previewSound, pulse } from "@/lib/audio";
import { releaseWakeLock, requestWakeLock } from "@/lib/wake-lock";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Mark } from "../mark";
import { Switch } from "../ui/switch";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { disableTestModeAndNotify } from "@/lib/auth/test-user";
import { authEnabled, signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { deleteAccountData } from "@/lib/data";
import { ensureNotifyPermission } from "@/lib/notify";

const TONES: Array<{ id: SoundTone; label: string }> = [
  { id: "clasico", label: "Clásico" },
  { id: "campana", label: "Campana" },
  { id: "suave", label: "Suave" },
  { id: "digital", label: "Digital" },
];

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
  const user = useCurrentUser();
  const { isPending, testMode } = useCurrentUserState();
  const [weight, setWeight] = useState(String(toDisplayWeight(profile.bodyWeightKg, profile.unit)));
  const [height, setHeight] = useState(String(profile.heightCm));
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

  const [vibrationSupported, setVibrationSupported] = useState(true);
  const [wakeLockSupported, setWakeLockSupported] = useState(true);

  // Capability probes for the honest hints under the phone-dependent toggles.
  useEffect(() => {
    setVibrationSupported(hasRealVibration());
    setWakeLockSupported(typeof navigator !== "undefined" && "wakeLock" in navigator);
  }, []);

  async function toggleNotifications(on: boolean) {
    if (on) {
      const ok = await ensureNotifyPermission();
      updateSettings({ notifications: ok });
      return;
    }
    updateSettings({ notifications: false });
  }

  /** "Pantalla encendida": show it working right now, not just store the flag. */
  async function toggleKeepAwake(on: boolean) {
    updateSettings({ keepAwake: on });
    if (!on) {
      await releaseWakeLock();
      return;
    }
    await requestWakeLock();
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

  /** Sale del modo prueba y vuelve al login, sin tocar la cuenta real. */
  function exitTestMode() {
    disableTestModeAndNotify();
    if (typeof window !== "undefined") window.location.href = "/login";
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
        <div className="min-w-0">
          <h1 className="truncate font-display text-3xl leading-none tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 truncate text-xs text-muted">
            {GOAL_LABEL[profile.goal]} · {LEVEL_LABEL[profile.level]} · {history.length} sesiones
          </p>
          {user?.primaryEmail ? (
            <p className="truncate text-[11px] text-subtle">{user.primaryEmail}</p>
          ) : null}
        </div>
      </header>

      {testMode ? (
        <section className="rounded-xl bg-elevated px-3.5 py-3 shadow-[var(--shadow-border)]">
          <p className="text-[10px] uppercase tracking-wider text-accent">Modo prueba</p>
          <p className="mt-1 text-xs text-muted">
            Estás como invitado. El progreso se guarda solo acá, no en la nube.
          </p>
          <Button type="button" variant="secondary" size="sm" className="mt-2" onClick={exitTestMode}>
            Salir del modo prueba
          </Button>
        </section>
      ) : null}

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
            <Chip
              key={t}
              active={!settings.autoTheme && settings.theme === t}
              onClick={() => updateSettings({ theme: t, autoTheme: false })}
            >
              {t === "dark" ? "Oscuro" : "Claro"}
            </Chip>
          ))}
        </div>
        <div className="mt-1.5 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]">
          <ToggleRow
            icon={<Moon className="size-4" />}
            label="Tema automático"
            hint="Sigue el ajuste claro/oscuro del teléfono"
            checked={settings.autoTheme}
            onChange={(v) => updateSettings({ autoTheme: v })}
          />
        </div>
      </Field>

      <SettingsGroup title="Entrenamiento">
        <ToggleRow
          icon={<Smartphone className="size-4" />}
          label="Pantalla encendida"
          hint="Evita que se apague mientras entrenás"
          checked={settings.keepAwake}
          onChange={(v) => void toggleKeepAwake(v)}
          badge={!wakeLockSupported ? "Este navegador no lo permite" : undefined}
        />
        <ToggleRow
          icon={<Repeat className="size-4" />}
          label="Avance automático"
          hint="Pasa solo al siguiente ejercicio al cerrar el último set"
          checked={settings.autoAdvance}
          onChange={(v) => updateSettings({ autoAdvance: v })}
        />
        <ToggleRow
          icon={<History className="size-4" />}
          label="Cargar último peso"
          hint="Prellena cada serie con lo que levantaste la última vez"
          checked={settings.prefillLastWeight}
          onChange={(v) => updateSettings({ prefillLastWeight: v })}
        />
      </SettingsGroup>

      <SettingsGroup title="Avisos y descanso">
        <ToggleRow
          icon={<Bell className="size-4" />}
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
          icon={<Timer className="size-4" />}
          label="Sonido"
          hint="Tono cuando termina el descanso o el timer"
          checked={settings.sound}
          onChange={(v) => {
            updateSettings({ sound: v });
            if (v) previewSound(settings.tone);
          }}
        />
        {settings.sound ? (
          <div className="space-y-3 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted">Volumen</span>
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                value={settings.volume}
                aria-label="Volumen"
                onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
                className="h-9 min-w-0 flex-1 accent-[var(--tu-accent)]"
              />
              <span className="w-9 text-right text-xs tabular-nums text-muted">{settings.volume}%</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    updateSettings({ tone: t.id });
                    previewSound(t.id);
                  }}
                  className={cn(
                    "h-11 rounded-full px-3 text-xs font-medium pressable",
                    settings.tone === t.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <ToggleRow
          icon={<Vibrate className="size-4" />}
          label="Vibración"
          hint={
            vibrationSupported
              ? "Pulso al terminar el descanso"
              : "En iPhone suena como un golpe grave del parlante"
          }
          checked={settings.vibration}
          onChange={(v) => {
            updateSettings({ vibration: v });
            if (v) pulse();
          }}
        />
        <ToggleRow
          icon={<Zap className="size-4" />}
          label="Vibración al tocar"
          hint="Respuesta corta en cada serie o botón"
          checked={settings.haptics}
          onChange={(v) => updateSettings({ haptics: v })}
          badge={!vibrationSupported ? "Solo Android" : undefined}
        />
        <ToggleRow
          icon={<Volume2 className="size-4" />}
          label="Cuenta regresiva 3-2-1"
          hint="Aviso en los últimos 3 segundos del descanso"
          checked={settings.countdownSound}
          onChange={(v) => updateSettings({ countdownSound: v })}
        />
        <ChoiceRow label="Descanso por defecto">
          {REST_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => updateSettings({ defaultRestSec: p.sec })}
              className={cn(
                "h-11 flex-1 rounded-lg text-xs font-medium pressable shadow-[var(--shadow-border)]",
                settings.defaultRestSec === p.sec
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-fg",
              )}
            >
              {p.label}
            </button>
          ))}
        </ChoiceRow>
      </SettingsGroup>

      <SettingsGroup title="Gimnasio">
        <ChoiceRow label={`Objetivo semanal (${settings.weeklyGoal} por semana)`}>
          {[3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => updateSettings({ weeklyGoal: n })}
              className={cn(
                "h-11 flex-1 rounded-lg text-sm font-medium pressable shadow-[var(--shadow-border)]",
                settings.weeklyGoal === n ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
              )}
            >
              {n}
            </button>
          ))}
        </ChoiceRow>
        <ChoiceRow label="Discos más chicos" hint="Para el cálculo de discos por lado">
          {[0.5, 1, 1.25, 2.5].map((kg) => (
            <button
              key={kg}
              type="button"
              onClick={() => updateSettings({ minPlateKg: kg })}
              className={cn(
                "h-11 flex-1 rounded-lg text-xs font-medium pressable shadow-[var(--shadow-border)]",
                settings.minPlateKg === kg ? "bg-accent text-accent-fg" : "bg-elevated text-fg",
              )}
            >
              {kg} kg
            </button>
          ))}
        </ChoiceRow>
      </SettingsGroup>

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

    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
  icon,
  badge,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  icon?: ReactNode;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        {icon ? (
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-lg",
              checked ? "bg-accent/15 text-accent" : "bg-elevated text-muted",
            )}
          >
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted">{hint}</p>
          {badge ? (
            <p className="mt-0.5 text-[11px] text-subtle">{badge}</p>
          ) : null}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <p className="mb-2 text-xs uppercase tracking-[0.18em] text-muted">{title}</p>
      <div className="space-y-1 rounded-2xl bg-surface p-1 shadow-[var(--shadow-border)]">
        {children}
      </div>
    </section>
  );
}

function ChoiceRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="px-4 py-3">
      <p className="text-sm font-medium">{label}</p>
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
      <div className="mt-2 flex gap-1.5">{children}</div>
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
