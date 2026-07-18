#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const HELP = `
Inspect a Three.js/R3F source tree for common visual and runtime mistakes.

Usage:
  node inspect-scene.mjs [--root .] [--json report.json] [--strict]

Options:
  --root <dir>   Target project root (default: current directory)
  --json <file>  Also write a machine-readable report
  --strict       Exit nonzero when warnings are present
  --help         Show this help
`;

function parseArgs(argv) {
  const result = { root: process.cwd(), json: null, strict: false, help: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--root") result.root = path.resolve(argv[++index]);
    else if (value === "--json") result.json = path.resolve(argv[++index]);
    else if (value === "--strict") result.strict = true;
    else if (value === "--help" || value === "-h") result.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }
  return result;
}

const SOURCE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".glsl",
  ".vert",
  ".frag",
]);

const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "dist",
  "node_modules",
  "out",
]);

async function collectFiles(directory) {
  const files = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRECTORIES.has(entry.name)) files.push(...(await collectFiles(absolute)));
    } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(absolute);
    }
  }
  return files;
}

function lineAt(source, offset) {
  return source.slice(0, offset).split("\n").length;
}

function addMatch(findings, file, source, rule) {
  const match = rule.pattern.exec(source);
  rule.pattern.lastIndex = 0;
  if (!match) return;
  findings.push({
    severity: rule.severity,
    rule: rule.id,
    file,
    line: lineAt(source, match.index),
    message: rule.message,
  });
}

const RULES = [
  {
    id: "archived-trois-runtime",
    severity: "error",
    pattern: /(?:from\s+["']troisjs["']|require\(["']troisjs["']\))/,
    message: "TroisJS is archived and must not be added to the React Eazo runtime.",
  },
  {
    id: "removed-three-api",
    severity: "error",
    pattern: /\b(?:Face3|THREE\.Geometry|new\s+Geometry\s*\()/,
    message: "Removed legacy Three.js Geometry/Face3 API detected.",
  },
  {
    id: "deprecated-output-encoding",
    severity: "error",
    pattern: /\b(?:outputEncoding|gammaOutput|gammaFactor)\b/,
    message: "Deprecated color-output API detected; audit current outputColorSpace handling.",
  },
  {
    id: "disabled-color-management",
    severity: "error",
    pattern: /ColorManagement\.enabled\s*=\s*false/,
    message: "Three.js color management is explicitly disabled.",
  },
  {
    id: "preserve-drawing-buffer",
    severity: "warning",
    pattern: /preserveDrawingBuffer\s*:\s*true/,
    message: "preserveDrawingBuffer can reduce performance; keep it only for a required capture path.",
  },
  {
    id: "unbounded-device-dpr",
    severity: "warning",
    pattern: /(?:dpr\s*=\s*\{?\s*window\.devicePixelRatio|setPixelRatio\(\s*window\.devicePixelRatio)/,
    message: "Raw devicePixelRatio is unbounded; cap DPR or use a quality tier.",
  },
  {
    id: "react-state-in-frame-loop",
    severity: "warning",
    pattern: /useFrame\s*\([^)]*=>\s*\{[\s\S]{0,1600}\bset[A-Z]\w*\s*\(/,
    message: "A React-style setter appears inside useFrame; publish only guarded coarse transitions.",
  },
  {
    id: "hot-loop-allocation",
    severity: "warning",
    pattern: /useFrame\s*\([^)]*=>\s*\{[\s\S]{0,1200}new\s+(?:Vector[234]|Quaternion|Color|Matrix4|Raycaster)\s*\(/,
    message: "Three.js math allocation appears inside useFrame; reuse objects in hot loops.",
  },
  {
    id: "toon-pbr-mismatch",
    severity: "warning",
    pattern: /MeshToonMaterial[\s\S]{0,1200}(?:roughness|metalness)|(?:roughness|metalness)[\s\S]{0,1200}MeshToonMaterial/,
    message: "MeshToonMaterial appears near PBR roughness/metalness tuning; verify the selected shader consumes those properties.",
  },
  {
    id: "unbounded-orbit-controls",
    severity: "warning",
    pattern: /<OrbitControls(?![\s\S]{0,500}(?:maxPolarAngle|maxDistance|enablePan))/,
    message: "OrbitControls appears without nearby bounds; authored experiences need explicit camera constraints.",
  },
  {
    id: "dynamic-trimesh-risk",
    severity: "warning",
    pattern: /<RigidBody(?![^>]*type=["']fixed["'])[^>]*[\s\S]{0,800}(?:colliders=["']trimesh["']|TrimeshCollider)/,
    message: "A non-fixed rigid body may use a trimesh collider; prefer simple or convex compound colliders.",
  },
];

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }

  const files = await collectFiles(args.root);
  const findings = [];
  let combined = "";

  for (const absolute of files) {
    const stat = await fs.stat(absolute);
    if (stat.size > 5_000_000) continue;
    const source = await fs.readFile(absolute, "utf8");
    const relative = path.relative(args.root, absolute);
    combined += `\n${source}`;
    for (const rule of RULES) addMatch(findings, relative, source, rule);
  }

  const projectChecks = [
    {
      condition: !/<Canvas\b/.test(combined),
      severity: "warning",
      rule: "missing-r3f-canvas",
      message: "No R3F Canvas found; ignore if this is an intentional vanilla Three.js project.",
    },
    {
      condition: /<Canvas\b/.test(combined) && !/(?:100dvh|100svh|safe-area-inset)/.test(combined),
      severity: "warning",
      rule: "missing-mobile-shell-contract",
      message: "Canvas exists but no dynamic viewport/safe-area contract was found.",
    },
    {
      condition: /\.(?:glb|gltf)["'`]/.test(combined) && !/(?:useGLTF\.preload|preload\()/.test(combined),
      severity: "warning",
      rule: "missing-model-preload",
      message: "Model assets are referenced without an obvious critical-path preload.",
    },
    {
      condition: /<Canvas\b/.test(combined) && !/(?:ErrorBoundary|fallback=|role=["']alert)/.test(combined),
      severity: "warning",
      rule: "missing-render-fallback",
      message: "No obvious Canvas/error fallback was found.",
    },
  ];

  for (const check of projectChecks) {
    if (check.condition) findings.push({ ...check, file: null, line: null, condition: undefined });
  }

  const counts = {
    errors: findings.filter((item) => item.severity === "error").length,
    warnings: findings.filter((item) => item.severity === "warning").length,
  };
  const report = {
    root: args.root,
    filesScanned: files.length,
    counts,
    findings,
  };

  for (const finding of findings) {
    const location = finding.file ? `${finding.file}:${finding.line}` : "project";
    process.stdout.write(`${finding.severity.toUpperCase()} ${finding.rule} ${location}\n  ${finding.message}\n`);
  }
  process.stdout.write(`Scanned ${files.length} files: ${counts.errors} errors, ${counts.warnings} warnings.\n`);

  if (args.json) {
    await fs.mkdir(path.dirname(args.json), { recursive: true });
    await fs.writeFile(args.json, `${JSON.stringify(report, null, 2)}\n`);
  }

  if (counts.errors > 0 || (args.strict && counts.warnings > 0)) process.exitCode = 1;
}

main().catch((error) => {
  process.stderr.write(`${error.stack ?? error.message}\n`);
  process.exitCode = 1;
});

