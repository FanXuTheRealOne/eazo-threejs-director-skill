# Eazo Three.js Director

A production-oriented Coding Agent skill for turning short product prompts into
polished, playable realtime 3D web experiences.

This skill teaches an agent to make the decisions that usually separate a
working Three.js demo from a directed product: visual DNA, asset decomposition,
Image2 reference generation, procedural-vs-model routing, camera choreography,
materials, lighting, motion, physics, sound, performance, and browser-based
visual QA.

When a prompt names an existing game, visual world, brand, product, character,
or collectible, the skill switches to a reference-locked workflow: official
source research, persistent project memory, source-backed Image2 turnarounds,
Meshy 6 Multi-Image to 3D, mature gameplay gates, and side-by-side source/render
verification.

It targets the official Eazo Creator React/Next.js template, while most of the
art-direction and realtime-engineering guidance also applies to other R3F or
Three.js projects.

## What It Does

Given a prompt such as:

> Build a playable backrooms game with oppressive fluorescent lighting and one
> memorable spatial anomaly.

the skill directs the agent through one autonomous production loop:

1. Inspect the repository and preserve platform contracts.
2. For named references/IP, research official high-resolution sources and save a
   manifest, visual bible, gameplay contract, and comparison log in the project.
3. Convert the prompt and reference locks into a production brief and 3D Design DNA.
4. Decide whether each asset should be procedural, generated as an image or GLB,
   built as a hybrid, rendered in DOM, or produced as audio.
5. Generate consistent mood frames, source-backed orthographic turnarounds,
   material sheets, state sheets, and key shots with Image2.
6. Decompose complex subjects and use Meshy 6 Multi-Image to 3D when exact
   recognizable appearance matters.
7. Author the default, action, signature, result, and mobile camera shots.
8. Build a mature gameplay/interaction contract with decisions, escalation,
   consequences, progression, recovery, and replay.
9. Implement with current R3F/Three.js patterns and appropriate physics.
10. Run the app, capture desktop/mobile/signature states, compare named
    references side-by-side, inspect telemetry, and repair the highest-impact
    fidelity or gameplay mismatch.

## Design Goals

- One-shot delivery of a usable experience, not a design proposal.
- Authored camera and composition instead of default `OrbitControls`.
- High-value organic or silhouette-critical heroes generated as proper 3D
  assets rather than crude primitive assemblies.
- Procedural architecture, machines, tracks, particles, and repeated systems
  where code gives better control and performance.
- Real 3D signature moments. A character jumping toward the lens remains a 3D
  character, not a fullscreen sticker.
- Distinct material behavior, motivated practical lights, and intentional depth.
- Stable desktop/mobile interaction, quality tiers, and reduced-motion behavior.
- Browser evidence as a completion requirement.
- Named references are observable constraints, not generic inspiration.
- Real high-resolution identity sources precede Image2; approved front/side/back
  views precede Meshy 6 generation.
- Fewer source-faithful IP variants are preferred over recolors or primitive
  approximations.
- A playable game must sustain a representative three-minute slice and cannot
  rely on locomotion plus a linear fetch quest.

## Routing Examples

| Request | Recommended route |
| --- | --- |
| Backrooms exploration | Procedural architecture, generated textures, optional hero GLB |
| Cinematic racer | Generated vehicle body plus procedural wheels, physics, track, and effects |
| Horror claw machine | Procedural cabinet/claw plus generated characters and Rapier prize physics |
| Particle music visualizer | Procedural geometry, instancing, shaders, and audio analysis |
| Organic character showcase | Rigged GLB plus procedural presentation, camera, lighting, and effects |
| Named character inside a named game world | Official source memory + source-backed Image2 turnaround + Meshy 6 multi-image GLB + reference-locked world/render/gameplay contract |

The included cases are reasoning examples, not visual templates. They are
designed to preserve quality while preventing every generated app from inheriting
the same palette, props, or horror treatment.

## Runtime Stack

The current Eazo default is:

- Next.js 16 App Router
- React 19
- Three.js
- `@react-three/fiber` 9
- `@react-three/drei`
- `@react-three/rapier` 2 when physics adds product value
- `@react-three/postprocessing` when an effect has a defined visual purpose
- Framer Motion for DOM UI transitions

TroisJS is not a runtime dependency. It is an archived Vue wrapper. Its useful
declarative scene and lifecycle ideas are represented here through maintained
R3F patterns.

## Install for Codex

Clone the repository directly into the personal Codex skills directory:

```bash
git clone https://github.com/FanXuTheRealOne/eazo-threejs-director-skill.git \
  ~/.codex/skills/eazo-threejs-director
```

Restart or reload the Codex session so the skill index is refreshed. The folder
name can differ, but `SKILL.md` must remain at the installed skill root.

For a checked-out development copy, a symlink also works:

```bash
ln -s /absolute/path/eazo-threejs-director-skill \
  ~/.codex/skills/eazo-threejs-director
```

## Invoke

The metadata supports implicit invocation for realtime 3D requests. It can also
be selected explicitly:

```text
Use $eazo-threejs-director to build a playable backrooms exploration game.
```

```text
Use $eazo-threejs-director to create a rainy neon arcade racer. Generate a
consistent vehicle turnaround first, split the vehicle into controllable parts,
and make the chase camera, suspension, impacts, and mobile controls feel polished.
```

```text
Use $eazo-threejs-director to turn this product reference into a premium
interactive 3D viewer with authored detail shots and material presets.
```

The skill assumes the coding agent can call an image generator such as Image2
and a 3D asset generator when available. It still routes each requirement
independently; image or model generation is not forced when procedural code is
the stronger solution. Named organic or branded subjects are the exception: use
the source-backed Image2 and Meshy 6 route unless the user provides a faithful
model or explicitly authorizes reinterpretation.

## Repository Structure

```text
.
|-- SKILL.md                         # Core autonomous workflow and hard gates
|-- agents/openai.yaml               # Codex UI metadata and implicit trigger
|-- references/
|   |-- requirement-router.md        # 2D, direct Three.js, R3F, and hybrid routing
|   |-- director-workflow.md         # End-to-end production phases and gates
|   |-- reference-fidelity.md        # Named world/IP research, memory, and fidelity gates
|   |-- gameplay-maturity.md         # Decisions, escalation, recovery, and replay
|   |-- design-dna-3d.md             # Visual, camera, motion, and quality contract
|   |-- procedural-vs-model.md       # Asset strategy and complex-subject breakdown
|   |-- image2-art-pipeline.md        # Mood frames, turnarounds, sheets, textures
|   |-- camera-language.md            # Shot design, camera states, shake, lens moments
|   |-- lighting-materials.md         # Color pipeline, PBR response, practical lights
|   |-- motion-interaction.md         # State machines, timing, animation, feedback
|   |-- physics-feedback.md           # Rapier bodies, colliders, joints, impacts
|   |-- shaders-postfx.md             # Shader contracts and restrained postprocessing
|   |-- r3f-three-patterns.md         # Current Eazo/R3F implementation patterns
|   |-- performance.md                # Budgets, tiers, adaptation, telemetry
|   |-- anti-ai-slop.md               # Rendered-output blockers and review questions
|   |-- verification.md               # Screenshot, interaction, and WebGL QA loop
|   `-- cases/                        # Claw machine, backrooms, and racer few-shots
|-- assets/eazo-r3f-starter/          # Copyable Eazo/R3F scene architecture
|-- assets/reference-memory/          # Manifest, visual, gameplay, comparison templates
|-- tests/                            # Skill contract and pressure scenarios
`-- scripts/                          # Static scan, viewport capture, WebGL verification
```

## Starter Asset

`assets/eazo-r3f-starter` is intentionally small. It provides:

- a thin App Router page;
- a client-only full-viewport Canvas shell;
- DOM controls separated from the 3D scene;
- an authored camera state map and damped camera rig;
- responsive DPR/shadow quality selection;
- reduced-motion handling;
- development-only renderer and camera telemetry;
- a nonblank placeholder scene to replace during the first visual pass.

Merge the starter into an official Eazo template rather than replacing the
template root. Preserve `EazoProvider`, localization, SDK integration, and
environment-driven app metadata.

## Verification Scripts

The scripts resolve Playwright from the target application, keeping this skill
dependency-free. Install Playwright in the app being tested:

```bash
bun add -d playwright
bunx playwright install chromium
```

Run a static scene smell scan:

```bash
node /path/to/eazo-threejs-director-skill/scripts/inspect-scene.mjs \
  --root . \
  --json artifacts/visual-qa/static-report.json
```

Capture desktop and mobile frames:

```bash
node /path/to/eazo-threejs-director-skill/scripts/capture-viewports.mjs \
  --url http://127.0.0.1:3000 \
  --out artifacts/visual-qa
```

Verify the WebGL canvas, pixel variation, browser errors, asset failures, and
optional `window.__EAZO_3D_DEBUG__` telemetry:

```bash
node /path/to/eazo-threejs-director-skill/scripts/verify-webgl.mjs \
  --url http://127.0.0.1:3000 \
  --out artifacts/visual-qa
```

Use a step file to capture interaction states:

```json
[
  {
    "name": "signature",
    "actions": [
      { "type": "click", "selector": "[data-testid='action']" },
      { "type": "wait", "ms": 600 }
    ]
  }
]
```

```bash
node /path/to/eazo-threejs-director-skill/scripts/capture-viewports.mjs \
  --url http://127.0.0.1:3000 \
  --steps ./visual-qa-steps.json
```

Each script supports `--help`.

## Quality Philosophy

The skill treats visual quality as an engineering deliverable. A successful
build, a large codebase, many unit tests, or the presence of R3F and Rapier does
not prove that the frame is well composed or that interaction feels right.

Completion requires direct inspection of the rendered scene, responsive
captures, signature-state evidence, material and camera review, and a repair
loop. Reference-locked work additionally requires official source evidence,
identity-safe asset generation, persistent project memory, and comparable
source/render captures. The positive benchmark is intentional visual density,
coordinated feedback, mature play, and traceable fidelity; the negative
benchmark is generic primitives, tiny heroes, flat materials, default cameras,
linear fetch tasks, and postprocessing used to hide weak scene design.

## Primary References

- [Eazo Creator Next.js Template](https://github.com/EazoAI/eazo-creator-nextjs-template)
- [React Three Fiber documentation](https://r3f.docs.pmnd.rs/)
- [React Three Rapier documentation](https://pmndrs.github.io/react-three-rapier/)
- [Three.js documentation](https://threejs.org/docs/)
- [Meshy Multi-Image to 3D API](https://docs.meshy.ai/en/api/multi-image-to-3d)

## License

MIT
