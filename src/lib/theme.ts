import type { Theme } from "./types";

const KEY = "trainup-theme";

export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  const color = theme === "light" ? "#f3f4ef" : "#090a09";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", color);
  try {
    window.localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}
