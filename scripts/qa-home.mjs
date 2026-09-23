/**
 * Home QA: seeds an onboarded account with a couple of finished sessions plus a
 * mid-recovery history, then screenshots Home on a phone and a laptop.
 *
 *   node scripts/qa-home.mjs
 *
 * Writes /screenshots/home-{mobile,desktop}.png and prints a JSON verdict with
 * per-viewport console/page errors and horizontal-overflow flags.
 */
import { existsSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import { checkedUrl } from "./browser-guard.mjs";

const URL = checkedUrl(process.env.QA_URL || "http://127.0.0.1:8080/");
const OUT = "screenshots";

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

/** Sessions at fixed offsets from "now" so recovery bars land mid-way. */
function seedState() {
  const sessions = [
    { id: "qa-1", name: "Empuje", agoMs: 20 * 60 * 60 * 1000, volume: 8420, sets: 18, muscles: ["pressanca", "press-inclinado", "press-hombro-mancuernas", "extension-triceps"] },
    { id: "qa-2", name: "Piernas", agoMs: 3.5 * DAY, volume: 11250, sets: 21, muscles: ["sentadilla", "rumano", "prensa", "curl-femoral"] },
    { id: "qa-3", name: "Jalón", agoMs: 5 * DAY, volume: 7150, sets: 16, muscles: ["peso-muerto", "dominadas", "remo-barra", "curl-biceps"] },
  ];
  return {
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
      history: sessions.map((s) => ({
        id: s.id,
        routineId: s.name.toLowerCase().replace("ó", "o"),
        routineName: s.name,
        startedAt: now - s.agoMs - 55 * 60 * 1000,
        endedAt: now - s.agoMs,
        volumeKg: s.volume,
        setsCompleted: s.sets,
        exercises: s.muscles.map((exerciseId, i) => ({
          exerciseId,
          sets: Array.from({ length: i === 0 ? 4 : 3 }, (_, k) => ({ reps: 8 + k, weightKg: 40 + i * 15 })),
        })),
        prs: ["press-banca"],
      })),
      records: [
        { exerciseId: "press-banca", weightKg: 92.5, reps: 6, e1rm: 111, date: new Date(now).toISOString().slice(0, 10) },
      ],
      bodyLogs: [{ date: new Date(now).toISOString().slice(0, 10), weightKg: 78 }],
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

// This machine has the Chrome build but not the headless-shell package this
// Playwright version expects, so point at a real Chromium when present.
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
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => pageErrors.push(String(e?.message || e)));

    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45000 });
    // Seed the persisted store the app reads on boot, then reload into it.
    await page.evaluate((payload) => {
      localStorage.setItem("trainup-v2", JSON.stringify(payload));
    }, seedState());
    await page.reload({ waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);

    // Also exercise the real path a person takes: walk the onboarding, then
    // inject history through the store so Home has something to show.
    await page.evaluate((payload) => {
      const raw = localStorage.getItem("trainup-v2");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      parsed.state.profile.onboarded = true;
      parsed.state.profile.name = "Luciano";
      parsed.state.history = payload.state.history;
      parsed.state.records = payload.state.records;
      localStorage.setItem("trainup-v2", JSON.stringify(parsed));
    }, seedState());
    await page.reload({ waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(2500);

    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth > el.clientWidth + 1;
    });
    const storage = await page.evaluate(() => {
      const raw = localStorage.getItem("trainup-v2");
      return raw ? JSON.parse(raw)?.state?.profile?.onboarded : null;
    });
    const text = await page.locator("body").innerText().catch(() => "");
    await page.screenshot({ path: `${OUT}/home-${vp.name}.png`, fullPage: false });
    verdict.viewports[vp.name] = {
      ...vp,
      overflow,
      onboardedInStorage: storage,
      consoleErrors,
      pageErrors,
      text: text.slice(0, 900),
    };
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify(verdict, null, 2));
