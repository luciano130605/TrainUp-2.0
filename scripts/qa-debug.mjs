/** Debug: what the app actually sees in localStorage vs after rehydrate. */
import { chromium } from "playwright";
import { checkedUrl } from "./browser-guard.mjs";

const URL = checkedUrl(process.env.QA_URL || "http://127.0.0.1:8080/");
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "C:/Users/lucia/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe",
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("console", (m) => console.log("[console:" + m.type() + "]", m.text()));
page.on("pageerror", (e) => console.log("[pageerror]", e.message));

// Installed before every document, so it also covers the post-reload boot.
await page.addInitScript(() => {
  const orig = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    if (k === "trainup-v2") {
      const stack = new Error().stack?.split("\n").slice(1, 6).join(" | ") ?? "";
      console.log("WRITE " + String(v).slice(0, 55) + " <<< " + stack);
    }
    return orig.apply(this, [k, v]);
  };
});
await page.goto(URL, { waitUntil: "domcontentloaded" });
const probe = await page.evaluate(async () => {
  const out = {};
  try {
    const r = await fetch("/__app-env");
    out.appEnv = await r.json();
  } catch (e) {
    out.appEnvError = String(e);
  }
  try {
    const r2 = await fetch("/api/auth/get-session", { credentials: "include" });
    out.sessionStatus = r2.status;
    out.sessionBody = (await r2.text()).slice(0, 200);
  } catch (e) {
    out.sessionError = String(e);
  }
  return out;
});
console.log("PROBE", JSON.stringify(probe, null, 2));

await page.evaluate(() => {
  localStorage.setItem(
    "trainup-v2",
    JSON.stringify({
      state: {
        profile: { name: "Luciano", onboarded: true },
        settings: { theme: "dark" },
        history: [],
        records: [],
        bodyLogs: [],
        customRoutines: [],
        session: null,
        timerMode: "descanso",
      },
      version: 1,
    }),
  );
});
console.log(
  "before reload:",
  await page.evaluate(() => localStorage.getItem("trainup-v2")),
);
await page.reload({ waitUntil: "domcontentloaded" });
for (const ms of [0, 50, 200, 600, 1500, 3000]) {
  if (ms) await page.waitForTimeout(ms);
  const snap = await page.evaluate(() => {
    const raw = localStorage.getItem("trainup-v2");
    if (!raw) return "<empty>";
    try {
      return JSON.parse(raw).state.profile.onboarded + "|" + JSON.parse(raw).state.profile.name;
    } catch {
      return "<bad json>";
    }
  });
  console.log(`t+${ms}ms onboarded|name =`, snap);
}

await browser.close();
