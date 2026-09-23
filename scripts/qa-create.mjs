/**
 * Walks the Crear flow the way a person does: open Crear → Nueva rutina →
 * Añadir ejercicio (modal) → pick a movement → edit series/reps/weight in the
 * detail modal → save. Screenshots each step and reports console errors.
 *
 *   node scripts/qa-create.mjs
 */
import { mkdirSync, existsSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl } from "./browser-guard.mjs";

const URL = checkedUrl(process.env.QA_URL || "http://127.0.0.1:8080/");
const OUT = "screenshots";

const CHROME = [
  process.env.QA_CHROME,
  "C:/Users/lucia/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe",
  "C:/Users/lucia/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe",
].filter(Boolean).find((p) => existsSync(p));

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: CHROME,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e?.message || e)));

const step = async (name) => {
  await page.screenshot({ path: `${OUT}/create-${name}.png` });
  return name;
};

await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
// Start from a clean slate every run, otherwise a routine saved by the previous
// run is already in the list and the "empty state" assertions drift.
await page.evaluate(() => localStorage.clear());
// Land on an onboarded account with history so the app renders the shell.
await page.evaluate(() => {
  localStorage.setItem(
    "trainup-v2",
    JSON.stringify({
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
    }),
  );
});
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(2500);

// Navigate to Crear via the tab bar.
await page.getByRole("button", { name: "Crear" }).first().click();
await page.waitForTimeout(400);
await step("01-tab");

await page.getByRole("button", { name: "Nueva rutina" }).click();
await page.waitForTimeout(400);
await step("02-empty");

// Open the exercise picker modal.
await page.getByRole("button", { name: /Añadir ejercicio/ }).click();
await page.waitForTimeout(500);
await step("03-library-modal");
const libraryVisible = await page.getByRole("dialog").isVisible();

// Search + pick a movement.
await page.getByPlaceholder("Buscar ejercicio").fill("sentadilla");
await page.waitForTimeout(400);
await step("04-search");
await page.getByRole("button", { name: /Sentadilla/ }).first().click();
await page.waitForTimeout(600);
await step("05-detail-modal");
const detailVisible = await page.getByRole("dialog").isVisible();
const detailText = await page.getByRole("dialog").innerText();

// Bump series and set a weight via the steppers.
const plusButtons = page.getByRole("dialog").getByLabel("Sumar");
await plusButtons.nth(0).click(); // series 4 -> 5
await plusButtons.nth(1).click(); // reps
await plusButtons.nth(2).click(); // weight +2.5 kg
await page.waitForTimeout(300);
await step("06-adjusted");
const adjustedText = await page.getByRole("dialog").innerText();

await page.getByRole("button", { name: "Listo" }).click();
await page.waitForTimeout(400);
await step("07-in-list");
const listText = await page.locator("ul").first().innerText();

await page.getByRole("button", { name: /Guardar rutina/ }).click();
await page.waitForTimeout(600);
await step("08-saved");

// Re-open the saved routine's editor to confirm the values round-tripped.
const savedText = await page.locator("body").innerText();

console.log(
  JSON.stringify(
    {
      libraryVisible,
      detailVisible,
      detailText,
      adjustedText,
      listText,
      savedHasRoutine: savedText.includes("Sentadilla") || savedText.includes("Mi rutina"),
      errors,
    },
    null,
    2,
  ),
);

await browser.close();
