/**
 * Regenerates the PWA icon set (public/icon-192.png, public/icon-512.png and
 * the Apple touch icon under public/__grok/) from the app's own brand mark:
 * a barbell with a mint accent bar, on the app's near-black chassis colour.
 *
 * Pure node (no canvas / sharp dependency): rasterises the mark directly into
 * an RGBA buffer and encodes via the PNG helpers already used by the plugin.
 *
 * Run: node scripts/make-brand-icons.mjs
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { encodePng } from "./pwa-icons.mjs";

const BG = [0x09, 0x0a, 0x09];
const FG = [0xed, 0xee, 0xe9];
const ACCENT = [0x6e, 0xe7, 0xb7];

/** Anti-aliased coverage of a rounded rect at (x0,y0,w,h,r) for pixel centre. */
function roundRectCoverage(px, py, x0, y0, w, h, r) {
  const x = Math.min(Math.max(px, x0 + r), x0 + w - r);
  const y = Math.min(Math.max(py, y0 + r), y0 + h - r);
  const dx = px - x;
  const dy = py - y;
  if (dx * dx + dy * dy <= r * r) return 1;
  return 0;
}

/** Soft-edged bar along an axis; `vertical` bars are the plates. */
function barCoverage(px, py, x0, y0, w, h, radius) {
  return roundRectCoverage(px, py, x0, y0, w, h, radius);
}

/**
 * Draws the mark into an RGBA buffer at `size`. Everything is expressed as a
 * fraction of `size` so the mark keeps its proportions at any resolution.
 */
function renderMark(size) {
  const data = Buffer.alloc(size * size * 4);
  const S = size;
  const corner = S * 0.22;

  // Layout (fractions of the canvas), mirroring public/favicon.svg.
  const barCx = S * 0.5;
  const barY = S * 0.72;
  const barW = S * 0.62;
  const barH = S * 0.105;
  const plateW = S * 0.085;
  const plateH = S * 0.30;

  const plates = [
    { x: S * 0.16 },
    { x: S * 0.16 + plateW * 1.5 },
    { x: S * 0.84 - plateW * 2.5 },
    { x: S * 0.84 - plateW },
  ];

  // Accent "G" rise: two diagonal strokes and a dot, read as a rep arc.
  const accentW = S * 0.115;

  for (let y = 0; y < S; y += 1) {
    for (let x = 0; x < S; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const idx = (y * S + x) * 4;

      // Chassis plate: rounded square, the shape iOS/Android mask expects.
      const bg = roundRectCoverage(px, py, 0, 0, S, S, corner);
      if (bg === 0) continue;

      let r = BG[0];
      let g = BG[1];
      let b = BG[2];

      const paint = (colour, coverage) => {
        if (coverage <= 0) return;
        r = r + (colour[0] - r) * coverage;
        g = g + (colour[1] - g) * coverage;
        b = b + (colour[2] - b) * coverage;
      };

      // Back bar + plates (light).
      paint(FG, barCoverage(px, py, barCx - barW / 2, barY, barW, barH, barH / 2));
      for (const p of plates) {
        paint(FG, barCoverage(px, py, p.x, barY + barH / 2 - plateH / 2, plateW, plateH, plateW * 0.32));
      }

      // Accent rep arc: an up-stroke, a plateau, then a down-stroke.
      const topY = S * 0.30;
      const midY = S * 0.44;
      const leftX = S * 0.30;
      const midX = S * 0.47;
      const rightX = S * 0.66;
      const seg = (ax, ay, bx, by) => {
        const dx = bx - ax;
        const dy = by - ay;
        const len2 = dx * dx + dy * dy;
        const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
        const cx = ax + t * dx;
        const cy = ay + t * dy;
        const d = Math.hypot(px - cx, py - cy);
        return Math.max(0, Math.min(1, accentW / 2 + 0.75 - d));
      };
      paint(ACCENT, seg(leftX, midY, midX, topY));
      paint(ACCENT, seg(midX, topY, rightX, midY));
      // The "dot" head of the rep.
      const dotR = accentW * 0.62;
      const dotD = Math.hypot(px - S * 0.735, py - S * 0.335);
      paint(ACCENT, Math.max(0, Math.min(1, dotR + 0.75 - dotD)));

      data[idx] = Math.round(r);
      data[idx + 1] = Math.round(g);
      data[idx + 2] = Math.round(b);
      data[idx + 3] = 255;
    }
  }

  return { width: size, height: size, data };
}

const root = process.cwd();
for (const [size, rel] of [
  [512, "public/icon-512.png"],
  [192, "public/icon-192.png"],
  [180, "public/__grok/icon-180.png"],
]) {
  const png = encodePng(renderMark(size));
  writeFileSync(join(root, rel), png);
  console.log(`${rel}  ${size}x${size}  ${png.length} bytes`);
}

// Favicon: keep the SVG mark in step with the raster one.
writeFileSync(
  join(root, "public/favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#090A09"/>
  <path d="M7 23h18" stroke="#EDEEE9" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M6.5 17.5v9M9.6 15.8v12.4M22.4 15.8v12.4M25.5 17.5v9" stroke="#EDEEE9" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M9.6 14.1 15 8.7l6.4 6.6" fill="none" stroke="#6EE7B7" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="23.5" cy="10.7" r="2.6" fill="#6EE7B7"/>
</svg>
`,
);
console.log("public/favicon.svg");