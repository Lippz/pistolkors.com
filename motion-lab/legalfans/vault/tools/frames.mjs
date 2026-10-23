// Saves full-size stills for review: node tools/frames.mjs <out dir> 4.5 12.3 …
// FIGMA=1 hides the cursor (for diffs against src/). Needs the motion-lab preview on :4500.
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

const [out, ...times] = process.argv.slice(2);
const cache = join(homedir(), 'Library/Caches/ms-playwright');
let exe;
for (const dir of readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse())
  for (const app of ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'])
    if (!exe && existsSync(join(cache, dir, app))) exe = join(cache, dir, app);
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1440, height: 1024 } });
page.on('pageerror', (e) => console.error('page:', e.message));
page.on('console', (m) => m.type() === 'error' && console.error('console:', m.text()));
await page.goto(`http://localhost:4500/legalfans/vault/?clean${process.env.FIGMA ? '&figma' : ''}&t=0`);
await page.waitForFunction(() => window.renderAt, null, { timeout: 8000 });
await page.waitForFunction(() => document.fonts.status === "loaded");
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
for (const t of times) {
  await page.evaluate((t) => window.renderAt(+t), t);
  await page.screenshot({ path: join(out, `t${t}.png`), clip: { x: 0, y: 0, width: 1440, height: 1024 } });
}
await browser.close();
