// One-time asset optimizer for /public raster images.
//
// Requires sharp (a dev-only tool, not part of the runtime build):
//   npm i -D sharp && node scripts/optimize-images.mjs
//
// For each JPEG/PNG it writes a size-capped, recompressed version in place and
// emits a matching .webp sibling that <OptImage> serves to supporting browsers.
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const DIR = 'public';

// Per-file max width. Maps are huge battlemaps; cap them generously for retina
// while still cutting multi-MB files down dramatically. Everything else is
// shown small, so 1024 is plenty.
const widthFor = (name) => {
  if (name.startsWith('map_')) return 1800;
  if (name.startsWith('cover')) return 1600;
  if (name.startsWith('hero')) return 1400;
  return 1024;
};

const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const src = join(DIR, file);
  const before = statSync(src).size;
  beforeTotal += before;

  const maxWidth = widthFor(file);
  const meta = await sharp(src).metadata();
  const resize = meta.width && meta.width > maxWidth ? { width: maxWidth, withoutEnlargement: true } : undefined;

  // Recompress in place, but only keep it if it actually saves bytes —
  // re-encoding an already-tight small JPEG can make it larger.
  const ext = extname(file).toLowerCase();
  const optimized =
    ext === '.png'
      ? await sharp(src).resize(resize).png({ compressionLevel: 9, palette: true }).toBuffer()
      : await sharp(src).resize(resize).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  if (optimized.length < before) {
    writeFileSync(src, optimized);
  }

  // WebP sibling — keep only if smaller than the (possibly already small) source.
  const webpPath = join(DIR, `${basename(file, ext)}.webp`);
  const webpBuf = await sharp(src).resize(resize).webp({ quality: 78 }).toBuffer();
  const after = statSync(src).size;
  let webp = 0;
  if (webpBuf.length < after) {
    writeFileSync(webpPath, webpBuf);
    webp = webpBuf.length;
  }
  afterTotal += after;
  const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
  console.log(
    `${file.padEnd(34)} ${kb(before).padStart(8)} -> jpeg ${kb(after).padStart(8)} · webp ${webp ? kb(webp).padStart(8) : '   (skip)'}`,
  );
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
console.log(`\nOriginal JPEG/PNG total: ${mb(beforeTotal)} -> recompressed: ${mb(afterTotal)}`);
