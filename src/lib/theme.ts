import type { Theme } from "./types";

const KEY = "trainup-theme";
const AUTO_KEY = "trainup-auto-theme";

/** Mirrors the auto-theme setting for the pre-hydration boot script. */
export function rememberAutoTheme(on: boolean) {
  try {
    window.localStorage.setItem(AUTO_KEY, on ? "1" : "0");
  } catch {
    /* ignore */
  }
}

export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

/** What the phone itself is set to — "dark" unless it asks for light. */
export function matchSystemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  const color = theme === "light" ? "#f3f4ef" : "#090a09";
  const metas = document.querySelectorAll('meta[name="theme-color"]');
  for (const meta of metas) meta.setAttribute("content", color);
  const statusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (statusBar) statusBar.setAttribute("content", theme === "light" ? "default" : "black-translucent");
  try {
    window.localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
}
