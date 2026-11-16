// Generates responsive AVIF/WebP/JPEG versions of every photo in
// assets/image-manifest.json. Originals in assets/originals/ are only read.
// Usage: npm run images
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const manifest = JSON.parse(await readFile(path.join(root, "assets/image-manifest.json"), "utf8"));
const out = path.join(root, "public/images");
await mkdir(out, { recursive: true });

const WIDTHS = [640, 1280, 2048];
const force = process.argv.includes("--force");

async function emit(pipelineFactory, id, srcWidth) {
  for (const w of WIDTHS) {
    if (w > srcWidth + 8 && w !== WIDTHS[0]) continue;
    const width = Math.min(w, srcWidth);
    const base = path.join(out, `${id}-${w}`);
    if (!force && existsSync(`${base}.avif`)) continue;
    await pipelineFactory().resize({ width, withoutEnlargement: true }).avif({ quality: 52, effort: 5 }).toFile(`${base}.avif`);
    await pipelineFactory().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}.webp`);
    if (w === 1280) {
      await pipelineFactory().resize({ width, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${base}.jpg`);
    }
  }
  // tiny blurred placeholder, inlined by the app as a background while loading
  const lqip = await pipelineFactory().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${lqip.toString("base64")}`;
}

const placeholders = {};
for (const img of manifest.images) {
  const src = path.join(root, "assets/originals", img.original);
  placeholders[img.id] = await emit(() => sharp(src).rotate(), img.id, img.width);
  console.log("✓", img.id);
}
for (const d of manifest.derived ?? []) {
  const parent = manifest.images.find((i) => i.id === d.from);
  const src = path.join(root, "assets/originals", parent.original);
  placeholders[d.id] = await emit(() => sharp(src).rotate().extract(d.crop), d.id, d.crop.width);
  console.log("✓", d.id, "(crop)");
}

const { writeFile } = await import("node:fs/promises");
// Slim, public-safe data for the app (internal notes in the manifest stay out of the bundle)
const pick = ({ id, width, height, category, title, alt, focal, featured }) => ({ id, width, height, category, title, alt, focal, featured, lqip: placeholders[id] });
const photos = manifest.images.map(pick);
for (const d of manifest.derived ?? []) {
  photos.push({ id: d.id, width: d.crop.width, height: d.crop.height, category: "exterior", title: "Original storefront decal", alt: d.alt, focal: [50, 50], featured: false, lqip: placeholders[d.id] });
}
await writeFile(path.join(root, "src/content/photos.json"), JSON.stringify(photos, null, 1) + "\n");
console.log("Wrote src/content/photos.json");
