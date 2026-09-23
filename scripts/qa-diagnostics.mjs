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

await page.goto("http://127.0.0.1:8080/", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(3000);

// Register a throwaway account so the diagnostics server fn runs authenticated.
const email = `diag${Date.now()}@example.com`;
await page.getByRole("button", { name: "Crear cuenta" }).first().click();
await page.waitForTimeout(400);
await page.getByPlaceholder("Cómo te llamamos").fill("Diag");
await page.getByPlaceholder("vos@email.com").fill(email);
await page.getByPlaceholder("Mínimo 8 caracteres").fill("test12345");
await page.getByRole("button", { name: "Crear cuenta", exact: true }).last().click();
await page.waitForTimeout(5000);
await page.screenshot({ path: "screenshots/diag-01-shell.png" });

// Visit the diagnostics route.
await page.goto("http://127.0.0.1:8080/diagnostico", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(6000);
await page.screenshot({ path: "screenshots/diag-02-report.png", fullPage: true });

const body = await page.locator("body").innerText();

console.log(
  JSON.stringify(
    {
      showsBackend: /PGLite|Neon/.test(body),
      showsTables: body.includes("custom_routines"),
      snippet: body.split("\n").filter(Boolean).slice(0, 24),
      consoleErrors: errors,
    },
    null,
    2,
  ),
);
await browser.close();