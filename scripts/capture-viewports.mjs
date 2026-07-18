#!/usr/bin/env node

import { createRequire } from "node:module";
import { promises as fs } from "node:fs";
import path from "node:path";

const HELP = `
Capture desktop/mobile screenshots and optional interaction states with Playwright.

Usage:
  node capture-viewports.mjs --url <url> --out <dir> [options]

Options:
  --url <url>           Page URL (required)
  --out <dir>           Output directory (default: artifacts/visual-qa)
  --steps <json>        Named capture/action sequence JSON
  --desktop <WxH>       Desktop viewport (default: 1440x900)
  --mobile <WxH>        Mobile viewport (default: 390x844)
  --wait <ms>           Settle time after navigation (default: 1200)
  --timeout <ms>        Action/navigation timeout (default: 30000)
  --keep-eazo-overlay   Do not dismiss the Eazo handoff modal before capture
  --help                Show this help

Step actions:
  {"type":"click","selector":"..."}
  {"type":"click","x":100,"y":200}
  {"type":"tap","selector":"..."}
  {"type":"wait","ms":500}
  {"type":"press","key":"Space","selector":"body"}
  {"type":"fill","selector":"input","value":"text"}
  {"type":"hover","selector":"..."}
  {"type":"drag","from":{"x":10,"y":10},"to":{"x":200,"y":100},"steps":12}
`;

function parseViewport(value, name) {
  const match = /^(\d+)x(\d+)$/i.exec(value);
  if (!match) throw new Error(`${name} must use WxH, received: ${value}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

function parseArgs(argv) {
  const args = {
    url: null,
    out: path.resolve("artifacts/visual-qa"),
    steps: null,
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
    wait: 1200,
    timeout: 30_000,
    dismissEazoOverlay: true,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--url") args.url = argv[++index];
    else if (value === "--out") args.out = path.resolve(argv[++index]);
    else if (value === "--steps") args.steps = path.resolve(argv[++index]);
    else if (value === "--desktop") args.desktop = parseViewport(argv[++index], "desktop");
    else if (value === "--mobile") args.mobile = parseViewport(argv[++index], "mobile");
    else if (value === "--wait") args.wait = Number(argv[++index]);
    else if (value === "--timeout") args.timeout = Number(argv[++index]);
    else if (value === "--keep-eazo-overlay") args.dismissEazoOverlay = false;
    else if (value === "--help" || value === "-h") args.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

function loadPlaywright() {
  try {
    const requireFromTarget = createRequire(path.join(process.cwd(), "package.json"));
    return requireFromTarget("playwright");
  } catch {
    throw new Error(
      "Playwright is not installed in the target project. Install it with `bun add -d playwright` and run `bunx playwright install chromium`.",
    );
  }
}

function safeName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "capture";
}

async function runAction(page, action) {
  switch (action.type) {
    case "click":
      if (action.selector) await page.locator(action.selector).click({ force: Boolean(action.force) });
      else await page.mouse.click(action.x, action.y);
      break;
    case "tap":
      if (action.selector) await page.locator(action.selector).tap({ force: Boolean(action.force) });
      else await page.touchscreen.tap(action.x, action.y);
      break;
    case "wait":
      await page.waitForTimeout(action.ms ?? 250);
      break;
    case "press":
      if (action.selector) await page.locator(action.selector).press(action.key);
      else await page.keyboard.press(action.key);
      break;
    case "fill":
      await page.locator(action.selector).fill(action.value ?? "");
      break;
    case "hover":
      await page.locator(action.selector).hover();
      break;
    case "drag":
      await page.mouse.move(action.from.x, action.from.y);
      await page.mouse.down();
      await page.mouse.move(action.to.x, action.to.y, { steps: action.steps ?? 10 });
      await page.mouse.up();
      break;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

async function navigate(page, args) {
  const response = await page.goto(args.url, { waitUntil: "domcontentloaded", timeout: args.timeout });
  if (!response?.ok()) {
    throw new Error(`Navigation failed with HTTP ${response?.status() ?? "unknown"}: ${args.url}`);
  }
  await page.waitForLoadState("networkidle", { timeout: Math.min(args.timeout, 3_000) }).catch(() => undefined);
  await page.waitForTimeout(args.wait);
  if (args.dismissEazoOverlay) {
    const overlay = page.locator(".eazo-handoff-overlay");
    if (await overlay.isVisible().catch(() => false)) {
      await page.keyboard.press("Escape");
      await page.waitForTimeout(120);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }
  if (!args.url) throw new Error("--url is required");
  if (!Number.isFinite(args.wait) || !Number.isFinite(args.timeout)) throw new Error("--wait and --timeout must be numbers");

  const steps = args.steps ? JSON.parse(await fs.readFile(args.steps, "utf8")) : [];
  if (!Array.isArray(steps)) throw new Error("--steps JSON must be an array");
  await fs.mkdir(args.out, { recursive: true });

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const report = { url: args.url, createdAt: new Date().toISOString(), captures: [], errors: [], warnings: [] };

  try {
    const profiles = [
      { name: "desktop", viewport: args.desktop, isMobile: false, hasTouch: false },
      { name: "mobile", viewport: args.mobile, isMobile: true, hasTouch: true },
    ];

    for (const profile of profiles) {
      const context = await browser.newContext({
        viewport: profile.viewport,
        isMobile: profile.isMobile,
        hasTouch: profile.hasTouch,
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      page.setDefaultTimeout(args.timeout);
      page.on("pageerror", (error) => report.errors.push({ profile: profile.name, type: "pageerror", message: error.message }));
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const target = /^Failed to load resource:/i.test(message.text()) ? report.warnings : report.errors;
        target.push({ profile: profile.name, type: "console", message: message.text() });
      });

      await navigate(page, args);
      const defaultPath = path.join(args.out, `${profile.name}-default.png`);
      await page.screenshot({ path: defaultPath, fullPage: false });
      report.captures.push({ profile: profile.name, state: "default", path: defaultPath });

      for (const capture of steps) {
        await navigate(page, args);
        for (const action of capture.actions ?? []) await runAction(page, action);
        await page.waitForTimeout(capture.settleMs ?? 250);
        const outputPath = path.join(args.out, `${profile.name}-${safeName(capture.name)}.png`);
        await page.screenshot({ path: outputPath, fullPage: false });
        report.captures.push({ profile: profile.name, state: capture.name, path: outputPath });
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(args.out, "capture-report.json");
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`Captured ${report.captures.length} screenshots in ${args.out}\n`);
  if (report.errors.length > 0) {
    process.stderr.write(`Captured with ${report.errors.length} page/console errors. See ${reportPath}\n`);
    process.exitCode = 1;
  } else if (report.warnings.length > 0) {
    process.stdout.write(`Recorded ${report.warnings.length} nonfatal browser warnings in ${reportPath}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
