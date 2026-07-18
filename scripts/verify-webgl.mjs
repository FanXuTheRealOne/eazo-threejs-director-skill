#!/usr/bin/env node

import { createRequire } from "node:module";
import { promises as fs } from "node:fs";
import path from "node:path";

const HELP = `
Verify that a page renders a visible, nonblank WebGL canvas without fatal errors.

Usage:
  node verify-webgl.mjs --url <url> [--out <dir>] [options]

Options:
  --url <url>       Page URL (required)
  --out <dir>       Output directory (default: artifacts/visual-qa)
  --selector <css>  Canvas selector (default: canvas)
  --viewport <WxH>  Viewport (default: 1280x800)
  --wait <ms>       Settle time (default: 1500)
  --timeout <ms>    Navigation timeout (default: 30000)
  --keep-eazo-overlay  Do not dismiss the Eazo handoff modal before verification
  --help            Show this help
`;

function parseViewport(value) {
  const match = /^(\d+)x(\d+)$/i.exec(value);
  if (!match) throw new Error(`--viewport must use WxH, received: ${value}`);
  return { width: Number(match[1]), height: Number(match[2]) };
}

function parseArgs(argv) {
  const args = {
    url: null,
    out: path.resolve("artifacts/visual-qa"),
    selector: "canvas",
    viewport: { width: 1280, height: 800 },
    wait: 1500,
    timeout: 30_000,
    dismissEazoOverlay: true,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--url") args.url = argv[++index];
    else if (value === "--out") args.out = path.resolve(argv[++index]);
    else if (value === "--selector") args.selector = argv[++index];
    else if (value === "--viewport") args.viewport = parseViewport(argv[++index]);
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

async function analyzeScreenshot(context, png, crop) {
  const page = await context.newPage();
  const dataUrl = `data:image/png;base64,${png.toString("base64")}`;
  await page.setContent(`<img id="source" alt="" src="${dataUrl}">`);
  const metrics = await page.evaluate(async ({ cropRect }) => {
    const image = document.querySelector("#source");
    if (!(image instanceof HTMLImageElement)) throw new Error("Screenshot image failed to mount");
    await image.decode();
    const x = Math.max(0, Math.floor(cropRect.x));
    const y = Math.max(0, Math.floor(cropRect.y));
    const width = Math.max(1, Math.min(image.naturalWidth - x, Math.floor(cropRect.width)));
    const height = Math.max(1, Math.min(image.naturalHeight - y, Math.floor(cropRect.height)));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context2d = canvas.getContext("2d", { willReadFrequently: true });
    context2d.drawImage(image, x, y, width, height, 0, 0, width, height);
    const pixels = context2d.getImageData(0, 0, width, height).data;
    const stride = Math.max(1, Math.floor(Math.sqrt((width * height) / 20_000)));
    let samples = 0;
    let sum = 0;
    let sumSquares = 0;
    let minimum = 255;
    let maximum = 0;
    const quantized = new Set();
    for (let row = 0; row < height; row += stride) {
      for (let column = 0; column < width; column += stride) {
        const index = (row * width + column) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
        sum += luminance;
        sumSquares += luminance * luminance;
        minimum = Math.min(minimum, luminance);
        maximum = Math.max(maximum, luminance);
        quantized.add(`${red >> 4},${green >> 4},${blue >> 4}`);
        samples += 1;
      }
    }
    const mean = sum / samples;
    const variance = Math.max(0, sumSquares / samples - mean * mean);
    return {
      width,
      height,
      samples,
      mean: Number(mean.toFixed(3)),
      standardDeviation: Number(Math.sqrt(variance).toFixed(3)),
      luminanceRange: Number((maximum - minimum).toFixed(3)),
      quantizedColorCount: quantized.size,
    };
  }, { cropRect: crop });
  await page.close();
  return metrics;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }
  if (!args.url) throw new Error("--url is required");
  await fs.mkdir(args.out, { recursive: true });

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: args.viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.setDefaultTimeout(args.timeout);

  const consoleErrors = [];
  const pageErrors = [];
  const failedCriticalRequests = [];
  const httpErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    if (/\.(?:glb|gltf|bin|ktx2|basis|hdr|exr|png|jpe?g|webp)(?:\?|$)/i.test(request.url())) {
      failedCriticalRequests.push({ url: request.url(), error: request.failure()?.errorText ?? "unknown" });
    }
  });
  page.on("response", (response) => {
    if (response.status() < 400) return;
    httpErrors.push({
      url: response.url(),
      status: response.status(),
      resourceType: response.request().resourceType(),
    });
  });

  let report;
  try {
    const response = await page.goto(args.url, { waitUntil: "domcontentloaded", timeout: args.timeout });
    await page.waitForLoadState("networkidle", { timeout: Math.min(args.timeout, 3_000) }).catch(() => undefined);
    await page.waitForTimeout(args.wait);
    if (args.dismissEazoOverlay) {
      const overlay = page.locator(".eazo-handoff-overlay");
      if (await overlay.isVisible().catch(() => false)) {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(120);
      }
    }

    const canvasState = await page.locator(args.selector).evaluateAll((canvases) =>
      canvases.map((candidate) => {
        if (!(candidate instanceof HTMLCanvasElement)) return { isCanvas: false };
        const rect = candidate.getBoundingClientRect();
        const style = getComputedStyle(candidate);
        const gl = candidate.getContext("webgl2") ?? candidate.getContext("webgl");
        return {
          isCanvas: true,
          visible: rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none",
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          drawingBuffer: gl ? { width: gl.drawingBufferWidth, height: gl.drawingBufferHeight } : null,
          webgl: Boolean(gl),
          contextLost: gl ? gl.isContextLost() : null,
          version: gl ? gl.getParameter(gl.VERSION) : null,
          renderer: gl ? gl.getParameter(gl.RENDERER) : null,
        };
      }),
    );

    const visibleCanvas = canvasState.find((item) => item.isCanvas && item.visible && item.webgl);
    const screenshotPath = path.join(args.out, "webgl-verification.png");
    const screenshot = await page.screenshot({ path: screenshotPath, fullPage: false });
    const pixelMetrics = visibleCanvas
      ? await analyzeScreenshot(context, screenshot, visibleCanvas.rect)
      : null;
    const telemetry = await page.evaluate(() => window.__EAZO_3D_DEBUG__ ?? null).catch(() => null);
    const shaderErrors = consoleErrors.filter((message) => /shader|webgl|program.*(?:link|compile)|gl_invalid/i.test(message));
    const severeConsoleErrors = consoleErrors.filter((message) => !/^Failed to load resource:/i.test(message));
    const criticalHttpErrors = httpErrors.filter((item) => {
      if (/(?:favicon\.ico|apple-touch-icon)/i.test(item.url)) return false;
      if (/^https:\/\/eazo\.ai\/api\/apps-open\//i.test(item.url)) return false;
      if (/\.(?:glb|gltf|bin|ktx2|basis|hdr|exr|png|jpe?g|webp|wasm)(?:\?|$)/i.test(item.url)) return true;
      return ["document", "script", "stylesheet", "font", "xhr", "fetch"].includes(item.resourceType);
    });
    const nonblank = Boolean(
      pixelMetrics &&
        pixelMetrics.standardDeviation >= 3 &&
        pixelMetrics.luminanceRange >= 18 &&
        pixelMetrics.quantizedColorCount >= 12,
    );

    const checks = {
      httpOk: Boolean(response?.ok()),
      visibleWebglCanvas: Boolean(visibleCanvas),
      contextHealthy: Boolean(visibleCanvas && !visibleCanvas.contextLost),
      nonblank,
      noPageErrors: pageErrors.length === 0,
      noConsoleErrors: severeConsoleErrors.length === 0,
      noShaderErrors: shaderErrors.length === 0,
      noFailedCriticalRequests: failedCriticalRequests.length === 0,
      noCriticalHttpErrors: criticalHttpErrors.length === 0,
    };

    report = {
      url: args.url,
      createdAt: new Date().toISOString(),
      pass: Object.values(checks).every(Boolean),
      checks,
      canvasState,
      pixelMetrics,
      telemetry,
      consoleErrors,
      severeConsoleErrors,
      shaderErrors,
      pageErrors,
      httpErrors,
      criticalHttpErrors,
      failedCriticalRequests,
      screenshot: screenshotPath,
    };
  } finally {
    await browser.close();
  }

  const reportPath = path.join(args.out, "webgl-report.json");
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  process.stdout.write(`${report.pass ? "PASS" : "FAIL"} WebGL verification: ${reportPath}\n`);
  if (!report.pass) process.exitCode = 1;
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});
