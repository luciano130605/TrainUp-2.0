/**
 * Settings QA: opens Ajustes on a phone viewport, flips the sound / vibration /
 * screen-on switches and the new customisation controls, and reports what
 * actually landed in the persisted store.
 *
 *   node scripts/qa-settings.mjs
 *
 * Writes /screenshots/settings-{top,bottom}.png and prints a JSON verdict.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl } from "./browser-guard.mjs";

const URL = checkedUrl(process.env.QA_URL || "http://127.0.0.1:8080/");
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const CHROME_CANDIDATES = [
  process.env.QA_CHROME,
  "C:/Users/lucia/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe",
  "C:/Users/lucia/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe",
].filter(Boolean);

let executablePath;
for (const candidate of CHROME_CANDIDATES) {
  try {
    if (existsSync(candidate)) {
      executablePath = candidate;
      break;
    }
  } catch {
    /* ignore */
  }
}

const seed = {
  state: {
    profile: {
      name: "Luciano",
      goal: "hipertrofia",
      level: "intermedio",
      daysPerWeek: 4,
      unit: "kg",
      bodyWeightKg: 78,
      heightCm: 178,
      gender: "hombre",
      birthDate: "1995-06-15",
      onboarded: true,
    },
    settings: { theme: "dark", notifications: false, notifyHour: "08:00", keepAwake: true, vibration: true },
    customRoutines: [],
    history: [],
    records: [],
    bodyLogs: [],
    session: null,
    timerMode: "descanso",
  },
  version: 1,
};

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const verdict = { url: URL, consoleErrors: [], pageErrors: [], steps: {}, screenshots: [] };

try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.on("console", (m) => {
    if (m.type() === "error") verdict.consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => verdict.pageErrors.push(String(e?.message || e)));

  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.evaluate((payload) => localStorage.setItem("trainup-v2", JSON.stringify(payload)), seed);
  await page.reload({ waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(2000);

  // Walk to the profile / settings tab the way a person does.
  await page.getByRole("button", { name: /^Yo$/ }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/settings-top.png` });

  const readSettings = () =>
    page.evaluate(() => JSON.parse(localStorage.getItem("trainup-v2") || "{}")?.state?.settings ?? {});

  verdict.steps.before = await readSettings();

  /** The switch belonging to the settings row whose label matches. */
  const rowSwitch = (label) => {
    const text = page.getByText(label, { exact: true }).first();
    const row = text.locator('xpath=ancestor::div[.//button[@role="switch"]][1]');
    return row.locator('button[role="switch"]').first();
  };

  const flip = async (label) => {
    // Settings rows are plain divs (not roles), and the list is taller than a
    // phone screen, so locate by text then climb to the nearest switch.
    const text = page.locator(`p:has-text("${label}")`).first();
    await text.scrollIntoViewIfNeeded();
    const sw = text.locator('xpath=ancestor::div[.//button[@role="switch"]][1]//button[@role="switch"]');
    await sw.click();
    await page.waitForTimeout(600);
  };

  // ── Sonido off → on ────────────────────────────────────────────────────────
  await flip("Sonido");
  verdict.steps.soundOff = (await readSettings()).sound;

  await flip("Sonido");
  const soundBack = await readSettings();
  verdict.steps.soundOn = soundBack.sound;

  // The volume + tone controls only exist while sound is on.
  const campana = page.getByRole("button", { name: "Campana" });
  await campana.scrollIntoViewIfNeeded();
  verdict.steps.toneControlsVisible = await campana.isVisible();
  await campana.click();
  await page.waitForTimeout(400);
  verdict.steps.tone = (await readSettings()).tone;

  await page.locator('input[type="range"]').first().fill("40");
  await page.waitForTimeout(500);
  verdict.steps.volume = (await readSettings()).volume;

  // ── Vibración off → on ─────────────────────────────────────────────────────
  await flip("Vibración");
  verdict.steps.vibrationOff = (await readSettings()).vibration;
  await flip("Vibración");
  verdict.steps.vibrationOn = (await readSettings()).vibration;

  // ── Pantalla encendida off → on ────────────────────────────────────────────
  await flip("Pantalla encendida");
  verdict.steps.keepAwakeOff = (await readSettings()).keepAwake;
  await flip("Pantalla encendida");
  verdict.steps.keepAwakeOn = (await readSettings()).keepAwake;

  // ── Vibración al tocar ─────────────────────────────────────────────────────
  await flip("Vibración al tocar");
  verdict.steps.haptics = (await readSettings()).haptics;

  // ── Cuenta regresiva ───────────────────────────────────────────────────────
  await flip("Cuenta regresiva");
  verdict.steps.countdownSound = (await readSettings()).countdownSound;

  // ── Descanso por defecto + objetivo semanal ────────────────────────────────
  await page.getByRole("button", { name: "2 min" }).first().scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "2 min" }).first().click();
  await page.waitForTimeout(500);
  verdict.steps.defaultRestSec = (await readSettings()).defaultRestSec;

  const goalRow = page.locator("div", { hasText: "Objetivo semanal" }).last();
  await goalRow.getByRole("button", { name: "5", exact: true }).click();
  await page.waitForTimeout(500);
  verdict.steps.weeklyGoal = (await readSettings()).weeklyGoal;

  // ── Tema automático ────────────────────────────────────────────────────────
  await flip("Tema automático");
  const afterAuto = await readSettings();
  verdict.steps.autoTheme = afterAuto.autoTheme;
  verdict.steps.autoThemeBootFlag = await page.evaluate(() =>
    localStorage.getItem("trainup-auto-theme"),
  );

  await page.screenshot({ path: `${OUT}/settings-bottom.png`, fullPage: true });
  verdict.screenshots = [`${OUT}/settings-top.png`, `${OUT}/settings-bottom.png`];

  verdict.overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth > el.clientWidth + 1;
  });
  await page.close();
} finally {
  await browser.close();
}

console.log(JSON.stringify(verdict, null, 2));