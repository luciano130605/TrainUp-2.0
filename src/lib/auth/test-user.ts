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

const TEST_MODE_KEY = "trainup-test-mode";

/** Stable id so the local snapshot is not re-keyed between reloads. */
export const TEST_USER_ID = "test-user";

export const TEST_USER = {
  id: TEST_USER_ID,
  displayName: "Usuario de prueba",
  primaryEmail: "prueba@local",
  profileImageUrl: null,
  isDevFallback: false,
} as const;

/**
 * Whether test mode is on right now. Reads `?demo=` first (and persists it), so
 * a shared link survives a reload without the query string.
 */
export function isTestMode(): boolean {
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

export function enableTestMode(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TEST_MODE_KEY, "1");
  } catch {
    /* storage unavailable — the in-memory redirect still works */
  }
}

export function disableTestMode(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(TEST_MODE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Subscribe/read helper so React can re-render when the flag flips without a
 * full page load (the login button and the profile toggle both live in the SPA).
 */
const listeners = new Set<() => void>();

export function subscribeTestMode(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function notify() {
  for (const fn of listeners) fn();
}

export function enableTestModeAndNotify(): void {
  enableTestMode();
  notify();
}

export function disableTestModeAndNotify(): void {
  disableTestMode();
  notify();
}
