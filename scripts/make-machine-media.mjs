/**
 * Draws the technique plates for the three machine movements.
 *
 * The rest of the catalogue ships studio photos on white; on a dark workout
 * screen those glare. These are generated flat-on-black line art instead, so the
 * media plate in the session view frames them without any fade trickery.
 *
 * Run: node scripts/make-machine-media.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "media");

const BG = "#131513";
const FRAME = "#2a2e2a";
const BODY = "#6b736a";
const LIGHT = "#a7b0a4";
const ACCENT = "#6ee7b7";
const LINE = "#3a403a";

function svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" role="img">
  <rect width="640" height="360" fill="${BG}"/>
  <g stroke="${LINE}" stroke-width="2" fill="none">
    <path d="M24 24h592v312H24z"/>
  </g>
${inner}
</svg>
`;
}

const common = `
  <g stroke="${FRAME}" stroke-width="10" stroke-linecap="round" fill="none">
    <path d="M96 300h448"/>
  </g>`;

// ── Aperturas en máquina (peck deck) ──────────────────────────────────────────
const aperturas = svg(`
  ${common}
  <g fill="${FRAME}">
    <rect x="250" y="112" width="140" height="176" rx="14"/>
    <rect x="236" y="96" width="168" height="34" rx="12"/>
    <rect x="300" y="272" width="40" height="34" rx="8"/>
  </g>
  <g stroke="${BODY}" stroke-width="16" stroke-linecap="round" fill="none">
    <path d="M320 268V196"/>
    <path d="M320 206l-64 6"/>
    <path d="M320 206l64 6"/>
  </g>
  <g stroke="${LIGHT}" stroke-width="12" stroke-linecap="round" fill="none">
    <path d="M256 212l-52 26"/>
    <path d="M384 212l52 26"/>
  </g>
  <g fill="${FRAME}">
    <rect x="180" y="228" width="34" height="52" rx="12"/>
    <rect x="426" y="228" width="34" height="52" rx="12"/>
  </g>
  <circle cx="320" cy="120" r="26" fill="${BODY}"/>
  <g stroke="${ACCENT}" stroke-width="5" stroke-linecap="round" fill="none">
    <path d="M214 152c22-30 66-40 106-30"/>
    <path d="M426 152c-22-30-66-40-106-30"/>
  </g>
  <g fill="${ACCENT}">
    <path d="M320 104l0 0"/>
  </g>
  <g stroke="${ACCENT}" stroke-width="4" fill="none">
    <path d="M300 118l20-8 20 8"/>
  </g>
`);

// ── Aperturas inversas en máquina ─────────────────────────────────────────────
const inversas = svg(`
  ${common}
  <g fill="${FRAME}">
    <rect x="252" y="108" width="136" height="180" rx="14"/>
    <rect x="238" y="92" width="164" height="32" rx="12"/>
    <rect x="300" y="272" width="40" height="34" rx="8"/>
  </g>
  <g stroke="${BODY}" stroke-width="16" stroke-linecap="round" fill="none">
    <path d="M320 268V200"/>
    <path d="M320 210l-58 22"/>
    <path d="M320 210l58 22"/>
  </g>
  <g stroke="${LIGHT}" stroke-width="12" stroke-linecap="round" fill="none">
    <path d="M262 232l-46 20"/>
    <path d="M378 232l46 20"/>
  </g>
  <circle cx="320" cy="118" r="26" fill="${BODY}"/>
  <g stroke="${ACCENT}" stroke-width="5" stroke-linecap="round" fill="none">
    <path d="M212 258c-14-26-10-56 6-74"/>
    <path d="M428 258c14-26 10-56-6-74"/>
  </g>
  <g stroke="${ACCENT}" stroke-width="4" fill="none">
    <path d="M198 202l8-18 16 12"/>
    <path d="M442 202l-8-18-16 12"/>
  </g>
`);

// ── Press de pecho en máquina ─────────────────────────────────────────────────
const press = svg(`
  ${common}
  <g fill="${FRAME}">
    <rect x="252" y="110" width="136" height="178" rx="14"/>
    <rect x="238" y="94" width="164" height="32" rx="12"/>
    <rect x="300" y="272" width="40" height="34" rx="8"/>
    <rect x="160" y="176" width="60" height="26" rx="10"/>
    <rect x="420" y="176" width="60" height="26" rx="10"/>
  </g>
  <g stroke="${BODY}" stroke-width="16" stroke-linecap="round" fill="none">
    <path d="M320 268V202"/>
    <path d="M320 212l-56 4"/>
    <path d="M320 212l56 4"/>
  </g>
  <g stroke="${LIGHT}" stroke-width="12" stroke-linecap="round" fill="none">
    <path d="M264 216l-58 2"/>
    <path d="M376 216l58 2"/>
  </g>
  <g fill="${FRAME}">
    <rect x="196" y="204" width="26" height="42" rx="10"/>
    <rect x="418" y="204" width="26" height="42" rx="10"/>
  </g>
  <circle cx="320" cy="120" r="26" fill="${BODY}"/>
  <g stroke="${ACCENT}" stroke-width="5" stroke-linecap="round" fill="none">
    <path d="M224 152c30-18 162-18 192 0"/>
  </g>
  <g stroke="${ACCENT}" stroke-width="4" fill="none">
    <path d="M416 138l14 12-16 8"/>
  </g>
`);

mkdirSync(OUT, { recursive: true });
const files = [
  ["aperturas-maquina.svg", aperturas],
  ["aperturas-posteriores-maquina.svg", inversas],
  ["press-pecho-maquina.svg", press],
];
for (const [name, content] of files) {
  writeFileSync(resolve(OUT, name), content, "utf8");
  console.log("wrote", name);
}