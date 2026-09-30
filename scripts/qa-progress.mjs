/**
 * Progress QA: seeds an onboarded account with sessions on real training days of
 * the current month plus body-weight logs spread across the month, opens the
 * Progress tab, expands the body-weight window (7d → 30d → 1y) and screenshots
 * it on a phone and a laptop.
 *
 *   node scripts/qa-progress.mjs
 *
 * Writes /screenshots/progress-{mobile,desktop}.png and prints a JSON verdict.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl } from "./browser-guard.mjs";

const URL = checkedUrl(process.env.QA_URL || "http://127.0.0.1:8080/");
// browser-guard only allows output under /workspace; on Windows that maps to the
// drive root, so fall back to a workspace-relative folder when it exists.
const OUT = existsSync("/workspace/screenshots") ? "/workspace/screenshots" : "screenshots";

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Every weekday of the current month up to today, plus a weight log on each. */
function currentMonthDates() {
  const out = [];
  const last = now.getDate();
  for (let day = 1; day <= last; day++) {
    const d = new Date(y, m, day);
    const wd = d.getDay();
    if (wd === 0 || wd === 6) continue;
    out.push(d);
  }
  return out;
}

function seedState() {
  const dates = currentMonthDates();
  const sessions = dates.slice(-14).map((d, i) => {
    const ts = new Date(y, m, d.getDate(), 19, 30).getTime();
    return {
      id: `qa-${i}`,
      routineId: "push",
      routineName: i % 3 === 0 ? "Empuje" : i % 3 === 1 ? "Piernas" : "Jalón",
      startedAt: ts - 55 * 60 * 1000,
      endedAt: ts,
      volumeKg: 6400 + i * 420,
      setsCompleted: 16 + (i % 5),
      exercises: [
        {
          exerciseId: "press-banca",
          sets: [
            { reps: 8, weightKg: 60 },
            { reps: 8, weightKg: 65 },
            { reps: 6, weightKg: 70 },
          ],
        },
      ],
      prs: [],
    };
  });

  // A gentle downward trend so the chart has a readable slope.
  const bodyLogs = dates
    .map((d, i) => ({ date: iso(d), weightKg: 82.5 - i * 0.35 }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    state: {
      profile: {
        name: "Luciano",
        goal: "hipertrofia",
        level: "intermedio",
        daysPerWeek: 4,
        unit: "kg",
        bodyWeightKg: bodyLogs.at(-1).weightKg,
        heightCm: 178,
        gender: "hombre",
        birthDate: "1995-06-15",
        onboarded: true,
      },
      settings: { theme: "dark", notifications: false, notifyHour: "08:00", keepAwake: true, vibration: true },
      customRoutines: [],
      history: sessions.sort((a, b) => b.endedAt - a.endedAt),
      records: [
        { exerciseId: "press-banca", weightKg: 92.5, reps: 6, e1rm: 111, date: iso(dates.at(-1)) },
      ],
      bodyLogs,
      session: null,
      timerMode: "descanso",
    },
    version: 1,
  };
}

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

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

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const verdict = { url: URL, viewports: {} };

try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (e) => pageErrors.push(String(e?.message || e)));

    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.evaluate((payload) => {
      localStorage.setItem("trainup-v2", JSON.stringify(payload));
    }, seedState());
    await page.reload({ waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2000);

    // Walk into the Progress tab the way a person would.
    const progressTab = page.getByRole("button", { name: /progreso/i }).first();
    if (await progressTab.count()) {
      await progressTab.click();
    } else {
      await page.getByText("Progreso", { exact: true }).first().click().catch(() => { });
    }
    await page.waitForTimeout(1500);

    const weightSection = page.locator("section", { hasText: "Peso corporal" }).first();
    const weightText = await weightSection.innerText().catch(() => "");
    const monthTicks = await weightSection
      .locator(".recharts-xAxis .recharts-cartesian-axis-tick-value")
      .allInnerTexts()
      .catch(() => []);
    const hasAreaPath = await weightSection
      .locator(".recharts-area, .recharts-area-curve")
      .count()
      .catch(() => 0);

    // Step back a full year to prove the yearly window navigates.
    const prev = page.getByRole("button", { name: "Mes anterior" }).first();
    let prevYearTicks = [];
    if (await prev.count()) {
      for (let i = 0; i < 12; i++) {
        await prev.click();
      }
      await page.waitForTimeout(1200);
      prevYearTicks = await page
        .locator("section", { hasText: "Peso corporal" })
        .first()
        .locator(".recharts-xAxis .recharts-cartesian-axis-tick-value")
        .allInnerTexts()
        .catch(() => []);
    }

    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth > el.clientWidth + 1;
    });
    const text = await page.locator("body").innerText().catch(() => "");
    await page.screenshot({ path: `${OUT}/progress-${vp.name}.png`, fullPage: false });
    verdict.viewports[vp.name] = {
      ...vp,
      overflow,
      consoleErrors,
      pageErrors,
      weightText,
      monthTicks,
      prevYearTicks,
      hasAreaPath,
      text: text.slice(0, 1200),
    };
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(verdict, null, 2));
