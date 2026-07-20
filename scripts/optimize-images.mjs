// Resizes + recompresses every raster image under public/ in place.
// Same filename/path/extension in, smaller bytes out — no code changes needed.
// Re-run any time new images are dropped into public/.
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");
const RASTER_RE = /\.(jpe?g|png)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (RASTER_RE.test(entry.name)) files.push(full);
  }
  return files;
}

function maxWidthFor(file) {
  return file.replace(/\\/g, "/").includes("/banners/") ? 1920 : 1400;
}

async function encode(image, ext) {
  if (ext === ".png") {
    return image.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toBuffer();
  }
  try {
    return await image.jpeg({ quality: 78, progressive: true, mozjpeg: true }).toBuffer();
  } catch {
    return image.jpeg({ quality: 78, progressive: true }).toBuffer();
  }
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(1) + "KB";
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let changed = 0;

  for (const file of files) {
    const input = await fs.readFile(file); // buffer input avoids sharp holding a file handle open on Windows
    const before = input.length;
    const ext = path.extname(file).toLowerCase();
    const maxWidth = maxWidthFor(file);

    let pipeline = sharp(input).rotate(); // rotate() auto-applies EXIF orientation, then strips it
    const meta = await sharp(input).metadata();
    if (meta.width && meta.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    const buf = await encode(pipeline, ext);

    totalBefore += before;
    if (buf.length < before) {
      await fs.writeFile(file, buf);
      totalAfter += buf.length;
      changed++;
      console.log(`${path.relative(PUBLIC_DIR, file)}: ${fmt(before)} -> ${fmt(buf.length)}`);
    } else {
      totalAfter += before;
    }
  }

  console.log("\n---");
  console.log(`Files scanned: ${files.length}, optimized: ${changed}`);
  console.log(`Total: ${fmt(totalBefore)} -> ${fmt(totalAfter)} (saved ${fmt(totalBefore - totalAfter)})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
