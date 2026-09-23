/**
 * Generic PNG → PNG resize/re-encode, used to derive the full PWA icon set
 * (platform 180/192/512, maskable, Apple touch icon, app-navigation icons)
 * from public/icon-512.png without any native image dependency.
 *
 * Pure ESM + node:zlib so `node --test` and the Vite plugin can both import it.
 */
import { deflateSync, inflateSync } from "node:zlib";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

export const ICON_SIZES = [48, 72, 96, 128, 144, 152, 180, 192, 256, 384, 512];

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i += 1) {
    crc ^= buf[i];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "latin1");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([length, typeBuf, data, crc]);
}

/** @returns {{ width: number, height: number, data: Buffer }} RGBA8 pixels. */
export function decodePng(buf) {
  if (!buf.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("not a PNG file");
  }
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  let palette = null;
  let transparency = null;
  /** @type {Buffer[]} */
  const idat = [];

  while (offset + 8 <= buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString("latin1", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "PLTE") {
      palette = Buffer.from(data);
    } else if (type === "tRNS") {
      transparency = Buffer.from(data);
    } else if (type === "IDAT") {
      idat.push(Buffer.from(data));
    } else if (type === "IEND") {
      break;
    }
  }

  if (!width || !height) throw new Error("PNG has no IHDR");
  if (bitDepth !== 8) throw new Error(`unsupported PNG bit depth ${bitDepth}`);
  if (interlace !== 0) throw new Error("interlaced PNG is not supported");
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`unsupported PNG color type ${colorType}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const lines = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[pos];
    pos += 1;
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const out = lines.subarray(y * stride, (y + 1) * stride);
    const prev = y === 0 ? null : lines.subarray((y - 1) * stride, y * stride);
    for (let x = 0; x < stride; x += 1) {
      const left = x >= channels ? out[x - channels] : 0;
      const up = prev ? prev[x] : 0;
      const upLeft = prev && x >= channels ? prev[x - channels] : 0;
      const value = line[x];
      let restored;
      switch (filter) {
        case 0:
          restored = value;
          break;
        case 1:
          restored = value + left;
          break;
        case 2:
          restored = value + up;
          break;
        case 3:
          restored = value + ((left + up) >> 1);
          break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          const predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
          restored = value + predictor;
          break;
        }
        default:
          throw new Error(`unsupported PNG filter ${filter}`);
      }
      out[x] = restored & 0xff;
    }
  }

  const data = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i += 1) {
    const src = i * channels;
    let r;
    let g;
    let b;
    let a = 255;
    if (colorType === 0) {
      r = g = b = lines[src];
    } else if (colorType === 2) {
      r = lines[src];
      g = lines[src + 1];
      b = lines[src + 2];
    } else if (colorType === 3) {
      const index = lines[src];
      r = palette[index * 3];
      g = palette[index * 3 + 1];
      b = palette[index * 3 + 2];
      if (transparency && index < transparency.length) a = transparency[index];
    } else if (colorType === 4) {
      r = g = b = lines[src];
      a = lines[src + 1];
    } else {
      r = lines[src];
      g = lines[src + 1];
      b = lines[src + 2];
      a = lines[src + 3];
    }
    const dst = i * 4;
    data[dst] = r;
    data[dst + 1] = g;
    data[dst + 2] = b;
    data[dst + 3] = a;
  }

  return { width, height, data };
}

/** @returns {Buffer} an 8-bit RGBA PNG. */
export function encodePng({ width, height, data }) {
  const stride = width * 4;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    data.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    PNG_SIGNATURE,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Box-filter downscale — good enough for flat, geometric icon art. */
export function resizePng(image, size) {
  const { width, height, data } = image;
  const out = Buffer.alloc(size * size * 4);
  const scaleX = width / size;
  const scaleY = height / size;

  for (let y = 0; y < size; y += 1) {
    const y0 = Math.floor(y * scaleY);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * scaleY));
    for (let x = 0; x < size; x += 1) {
      const x0 = Math.floor(x * scaleX);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * scaleX));
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      let count = 0;
      for (let sy = y0; sy < y1; sy += 1) {
        for (let sx = x0; sx < x1; sx += 1) {
          const src = (sy * width + sx) * 4;
          const alpha = data[src + 3];
          r += data[src] * alpha;
          g += data[src + 1] * alpha;
          b += data[src + 2] * alpha;
          a += alpha;
          count += 1;
        }
      }
      const dst = (y * size + x) * 4;
      if (a === 0) continue;
      out[dst] = Math.round(r / a);
      out[dst + 1] = Math.round(g / a);
      out[dst + 2] = Math.round(b / a);
      out[dst + 3] = Math.round(a / count);
    }
  }

  return { width: size, height: size, data: out };
}

/** Decode once, emit every requested size (up to 512×512). */
export function deriveIconPngs(sourceBuffer, sizes = [180, 192, 512]) {
  const source = decodePng(sourceBuffer);
  return sizes.map((size) => [size, encodePng(resizePng(source, size))]);
}