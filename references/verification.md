# Visual and Interaction Verification

The Agent must view the output. Source review, lint, build, and unit tests cannot
prove camera framing, material response, WebGL output, interaction timing, or
mobile composition.

## Contents

- [Server and capture matrix](#1-start-cleanly)
- [WebGL and telemetry](#3-webgl-verification)
- [Interaction and screenshot review](#5-interaction-assertions)
- [Repair, static scan, and evidence](#7-repair-loop)

## 1. Start Cleanly

From the target app:

1. install dependencies with the repository package manager;
2. run lint/typecheck/build as available;
3. start the dev server on a free port and keep the session alive;
4. wait for the route to return successfully;
5. note any pre-existing server rather than killing it without reason.

## 2. Capture Matrix

Capture at minimum:

| State | Desktop | Mobile |
| --- | --- | --- |
| loading/fallback | when visible | when visible |
| ready/default | required | required |
| primary action | required | required |
| signature moment | required | required |
| success/failure/result | required | required |
| error fallback | exercise when practical | exercise when practical |

Recommended viewports:

- desktop: 1440 x 900 or the product's primary target;
- mobile portrait: 390 x 844;
- add landscape for games intended to use it.

Use the bundled capture script:

```bash
node /path/to/skill/scripts/capture-viewports.mjs \
  --url http://127.0.0.1:3000 \
  --out artifacts/visual-qa
```

For non-default states, use `--steps path/to/steps.json`. The JSON contains a
list of named captures with Playwright actions:

```json
[
  {
    "name": "signature",
    "actions": [
      { "type": "click", "selector": "[data-testid='start']" },
      { "type": "wait", "ms": 800 },
      { "type": "click", "selector": "[data-testid='action']" },
      { "type": "wait", "ms": 1200 }
    ]
  }
]
```

Supported actions are documented by `--help` in the script.

## 3. WebGL Verification

Run:

```bash
node /path/to/skill/scripts/verify-webgl.mjs \
  --url http://127.0.0.1:3000 \
  --out artifacts/visual-qa
```

Require:

- at least one visible canvas;
- a WebGL context;
- nonzero canvas dimensions;
- pixel luminance/color variance above the blank-frame threshold;
- no uncaught page errors;
- no severe console errors, shader compile/link errors, or context loss;
- successful critical model/texture requests;
- stable layout after loading.

Treat pixel analysis as a blank-frame detector, not an aesthetic score.

## 4. Scene Telemetry

Prefer exposing development-only data:

```ts
window.__EAZO_3D_DEBUG__ = {
  phase,
  camera: { position, target, fov },
  qualityTier,
  renderer: {
    calls: gl.info.render.calls,
    triangles: gl.info.render.triangles,
    geometries: gl.info.memory.geometries,
    textures: gl.info.memory.textures,
  },
};
```

The verification script will collect this object when present. Do not expose
private user data.

## 5. Interaction Assertions

Use Playwright to verify the actual loop:

- controls are visible, stable, and clickable/touchable;
- first input changes visual or state telemetry quickly;
- phase transitions occur in the intended order;
- physics/result events occur once rather than every contact frame;
- camera remains finite and inside expected bounds;
- signature state returns or ends intentionally;
- reset restores a playable state;
- pointer lock can be released;
- touch input does not scroll the page unintentionally.

## 6. Screenshot Review Rubric

Inspect every capture at full size and thumbnail size:

- focal subject and silhouette;
- hero screen occupancy;
- foreground/midground/background separation;
- material differentiation;
- motivated lighting and readable shadows;
- atmosphere without hidden gameplay;
- camera horizon, perspective, and target;
- HUD contrast, overlap, safe areas, and text fit;
- state-specific motion/effect readability;
- unintended blank regions, clipping, z-fighting, or floating assets.

Use browser screenshots rather than relying on a generated mood frame.

## 7. Repair Loop

For each mismatch write:

```text
Evidence:
Expected contract:
Observed problem:
Likely cause:
Smallest high-impact repair:
Reverification state/viewports:
```

Repair camera/scale/light/material hierarchy before secondary props and effects.
Rerun affected interactions and both responsive viewports.

## 8. Static Smell Scan

Run:

```bash
node /path/to/skill/scripts/inspect-scene.mjs --root .
```

Review warnings for unsupported material parameters, per-frame state updates,
unbounded controls, extreme renderer settings, and missing responsive/full-height
contracts. Warnings require judgment; they are not substitutes for screenshots.

## 9. Completion Evidence

Report:

- test/build commands and results;
- browser URL;
- paths to desktop/mobile/signature screenshots;
- main interaction steps exercised;
- WebGL pixel/console result;
- renderer telemetry and practical frame-time sample when available;
- residual visual or device risk.
