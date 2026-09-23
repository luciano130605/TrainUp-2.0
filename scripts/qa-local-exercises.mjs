import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: "screenshots/01-login.png" });

// The app is behind a real sign-in wall, so register a throwaway athlete first.
const email = `qa${Date.now()}@example.com`;
await page.getByRole("button", { name: "Crear cuenta" }).first().click();
await page.waitForTimeout(400);
await page.getByPlaceholder("Cómo te llamamos").fill("QA");
await page.getByPlaceholder("vos@email.com").fill(email);
await page.getByPlaceholder("Mínimo 8 caracteres").fill("test12345");
await page.getByRole("button", { name: "Crear cuenta", exact: true }).last().click();
await page.waitForTimeout(5000);
await page.screenshot({ path: "screenshots/02-tras-registro.png" });

// Seed an onboarded athlete so the app shell renders its tabs.
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
          bodyWeightKg: 80,
          heightCm: 178,
          gender: "hombre",
          birthDate: "1995-01-01",
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
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "screenshots/03-shell.png" });

// Crear (bottom tab) → Crear (sub-tab) → Añadir ejercicio → shared library.
await page.getByRole("navigation").getByRole("button", { name: "Crear" }).click();
await page.waitForTimeout(600);
await page.getByRole("button", { name: "Crear", exact: true }).last().click();
await page.waitForTimeout(600);
await page.getByRole("button", { name: /Añadir ejercicio/ }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: "screenshots/04-libreria.png" });

const names = await page.locator("ul li button span span:first-child").allInnerTexts();
const hasLocal = names.some((n) => n.includes("Press de banca (Barra)"));
const hasBuiltin = names.some((n) => n === "Press de banca");

// Search for something that only exists in the owner's catalogue.
await page.getByPlaceholder("Buscar ejercicio").fill("predicador");
await page.waitForTimeout(500);
const predicador = await page.locator("ul li button span span:first-child").allInnerTexts();
await page.screenshot({ path: "screenshots/05-busqueda.png" });

// Filter by a brand-new muscle chip.
await page.getByPlaceholder("Buscar ejercicio").fill("");
await page.waitForTimeout(300);
await page.getByRole("button", { name: "Cuádriceps", exact: true }).click();
await page.waitForTimeout(500);
const cuad = await page.locator("ul li button span span:first-child").allInnerTexts();
await page.screenshot({ path: "screenshots/06-filtro-cuadriceps.png" });

console.log(
  JSON.stringify(
    {
      totalShown: names.length,
      catalogPresent: hasLocal,
      legacyStillPresent: hasBuiltin,
      predicador: predicador.slice(0, 4),
      cuadriceps: cuad.slice(0, 5),
      consoleErrors: errors,
    },
    null,
    2,
  ),
);
await browser.close();