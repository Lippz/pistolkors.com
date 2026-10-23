// Renders a motion-lab animation frame by frame and encodes it for the site.
//
//   node motion-lab/export.mjs linkhms/new-visit            → public/motion/linkhms-new-visit.mp4 + .jpg
//   node motion-lab/export.mjs linkhms/new-visit --fps 60 --crf 18 --poster 11.2
//
// Animations live in <project>/<name>/; the files are named <project>-<name>.
//
// Each frame is drawn with window.renderAt(t), so the video is exact: no dropped frames, no
// timing drift, a seamless loop. The poster is the frame at window.POSTER (set by the player's
// `poster` option) unless --poster is given. Needs ffmpeg on PATH and a Playwright Chromium.
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { homedir } from 'node:os';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const LAB = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(LAB, '..');

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--') && !/^[\d.]+$/.test(a))?.replace(/\/+$/, '');
const opt = (key, def) => {
  const i = args.indexOf(`--${key}`);
  return i >= 0 ? args[i + 1] : def;
};
if (!name || !existsSync(join(LAB, name, 'index.html'))) {
  console.error('Usage: node motion-lab/export.mjs <project>/<name> [--fps 30] [--crf 20] [--poster <s>] [--out public/motion]');
  process.exit(1);
}
const outName = name.replaceAll('/', '-'); // linkhms/new-visit → linkhms-new-visit
const fps = +opt('fps', 30);
const crf = opt('crf', '20');
const outDir = resolve(ROOT, opt('out', 'public/motion'));

// Static server for motion-lab, so export doesn't depend on a running preview.
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const server = createServer((req, res) => {
  let file = join(LAB, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!file.startsWith(LAB) || !existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}/${name}/`;

// Playwright wants its own Chromium build; fall back to any build already in the cache.
async function launch() {
  try {
    return await chromium.launch();
  } catch {
    const cache = join(homedir(), 'Library/Caches/ms-playwright');
    for (const dir of readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
      for (const app of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
        const exe = join(cache, dir, app);
        if (existsSync(exe)) return chromium.launch({ executablePath: exe });
      }
    }
    throw new Error('No Chromium found. Run: npx playwright install chromium');
  }
}

const browser = await launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.goto(base + '?clean&t=0');
await page.waitForFunction(() => window.renderAt && document.fonts.status === 'loaded');
const { duration, poster, width, height } = await page.evaluate(() => {
  const s = document.querySelector('.stage');
  return { duration: window.DURATION, poster: window.POSTER, width: s.offsetWidth, height: s.offsetHeight };
});
await page.setViewportSize({ width, height });
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));

const frames = Math.round(duration * fps);
const mp4 = join(outDir, `${outName}.mp4`);
const ffmpeg = spawn('ffmpeg', [
  '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', crf, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4,
], { stdio: ['pipe', 'inherit', 'inherit'] });
const done = new Promise((r, j) => ffmpeg.on('close', (c) => (c ? j(new Error(`ffmpeg exited ${c}`)) : r())));

const clip = { x: 0, y: 0, width, height };
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.renderAt(t), i / fps);
  const png = await page.screenshot({ clip, type: 'png' });
  if (!ffmpeg.stdin.write(png)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
  if (i % fps === 0) process.stdout.write(`\r${name}: ${(i / fps).toFixed(0)} / ${duration} s`);
}
ffmpeg.stdin.end();
await done;

const posterT = +opt('poster', poster ?? 0);
await page.evaluate((t) => window.renderAt(t), posterT);
const jpg = join(outDir, `${outName}.jpg`);
await page.screenshot({ clip, type: 'jpeg', quality: 85, path: jpg });

await browser.close();
server.close();
const mb = (f) => (statSync(f).size / 1e6).toFixed(2) + ' MB';
console.log(`\r${name}: ${frames} frames at ${fps} fps → ${mp4} (${mb(mp4)}), poster at ${posterT} s → ${jpg} (${mb(jpg)})`);
