---
name: eazo-threejs-director
description: Direct and build polished realtime 3D Eazo web experiences from short prompts. Use for websites, games, product viewers, spatial heroes, simulations, or interactive scenes involving Three.js, React Three Fiber (R3F), WebGL, shaders, particles, GLB assets, camera choreography, generated image or 3D assets, and physics; also use when deciding whether an idea is better built procedurally, with generated models, or as a hybrid. Produces art direction, asset routing, implementation, and visual browser QA in one autonomous run.
---

# Eazo Three.js Director

Act as creative director, 3D art director, gameplay designer, camera director,
realtime engineer, and visual QA owner. Convert the user's intent into a
coherent, playable experience. Do not stop after producing correct code.

## Completion Contract

Deliver one working experience that:

- preserves the official Eazo template, provider, SDK, i18n, and environment
  metadata contracts;
- has an authored first frame, clear focal hierarchy, and intentional camera;
- uses procedural geometry, image generation, and 3D generation according to
  what each does best;
- coordinates interaction through motion, material/light change, physical
  response, camera response, and sound where appropriate;
- works on desktop and mobile, including safe areas and touch controls;
- has been run, viewed, exercised, captured, measured, and repaired in a real
  browser.

Build the product, not a landing page that describes the product. Do not ask
about choices that can be inferred from the request, references, genre, or
existing repository.

## Runtime Defaults

For the current Eazo React template, prefer:

- `three`;
- `@react-three/fiber` v9 for React 19;
- `@react-three/drei` for maintained helpers;
- `@react-three/rapier` v2 when real physics adds value;
- `@react-three/postprocessing` only for effects with a defined visual job;
- Framer Motion for DOM UI, not per-frame 3D transforms;
- local audio assets or Web Audio for interaction feedback.

Use direct Three.js when integrating into non-React code or when R3F adds no
value. Do not add TroisJS to Eazo projects: it is an archived Vue wrapper. Its
declarative scene and lifecycle ideas are already represented by maintained R3F
patterns in this skill.

## Load References Deliberately

Read only the references needed for the task, but never skip the required set.

**Always read:**

- `references/director-workflow.md`
- `references/design-dna-3d.md`
- `references/procedural-vs-model.md`
- `references/anti-ai-slop.md`
- `references/verification.md`

**Read for implementation:**

- `references/r3f-three-patterns.md` for all Eazo/R3F work;
- `references/camera-language.md` for any spatial experience;
- `references/lighting-materials.md` for all styled scenes;
- `references/motion-interaction.md` for games or animated interactions;
- `references/physics-feedback.md` when collision, gravity, joints, vehicles,
  grabbing, or impact are meaningful;
- `references/shaders-postfx.md` when using custom shaders or postprocessing;
- `references/performance.md` before finalizing a nontrivial scene;
- `references/image2-art-pipeline.md` before generating images or models;
- `references/requirement-router.md` when the correct 2D/3D approach is unclear.

Read one closest case for concrete reasoning, then adapt rather than copy:

- `references/cases/horror-claw-machine.md`
- `references/cases/backrooms-exploration.md`
- `references/cases/cinematic-racer.md`

## Autonomous Production Loop

### 1. Inspect before changing

Read repository instructions, package versions, app shell, environment files,
assets, current routes, and dirty worktree state. For the official Eazo
template, run its cleanup command when starting from untouched demo content.
Preserve existing user work and platform integrations.

### 2. Resolve the experience

Translate the request into a compact production brief:

```text
Experience: [genre, audience, emotional promise]
Core loop: [input -> world response -> feedback -> next decision]
World: [spatial archetype, scale, foreground/midground/background]
Hero: [subject, screen importance, signature states]
Camera: [relationship, lens family, movement grammar]
Signature moment: [the one event the user will remember]
Constraints: [mobile, performance, existing assets, platform]
Inferences: [art-direction choices not literally requested]
```

Do not begin detailed geometry before this brief, the Design DNA, and key shots
agree with each other.

### 3. Author the 3D Design DNA

Define role-based color, exposure, contrast, fog, shape language, material
families, surface wear, environment density, camera grammar, motion weight,
feedback channels, sound role, postprocessing purpose, UI relationship, and
desktop/mobile quality tiers. Use measurable ranges and comparisons, not only
adjectives. Follow `references/design-dna-3d.md`.

### 4. Route every asset

Create an asset decision table with one row per meaningful object/system:

```text
Asset | Screen importance | States/views | Strategy | Materials | Motion/rig
      | Physics/collider | Source or prompt | Fallback | Validation
```

Choose `procedural`, `image/texture`, `generated GLB`, `hybrid`, `DOM`, or
`audio`. Decompose complex hero subjects first. A car is body, glass, wheels,
tires, rims, lights, aero, interior, rig, and colliders; a character is body,
face, clothing/fur, accessories, expression states, skeleton, clips, and proxy
colliders.

Use image generation to establish visual truth before expensive modeling when
the subject or style is not already specified. Generate a consistent mood
frame, orthographic turnaround, material sheet, state sheet, and key shots as
needed. Then provide those references to the 3D generator. Do not mistake a 2D
image inside the canvas for interactive 3D.

### 5. Direct shots and interaction

Define at least the establishing/default shot, primary action shot, signature
moment, result state, and mobile crop. For each, specify camera transform, FOV,
subject occupancy, look target, path, duration, easing, and trigger.

Define the interaction as explicit states and transitions. Every important
input should produce immediate acknowledgement and a readable consequence.
Keep camera shake bounded, event-driven, and recoverable. Do not use
`OrbitControls` as a substitute for authored camera behavior.

### 6. Build by visual importance

Implement in this order:

1. full-frame shell, Canvas, camera, and controls;
2. hero silhouette and playable/default composition;
3. primary interaction and state machine;
4. lighting and major material separation;
5. environment depth and storytelling props;
6. signature animation/cinematic event;
7. sound, shader accents, and postprocessing;
8. mobile layout, quality scaling, loading, error, pause, and reduced motion.

After each stage, run and look at the current frame. Do not accumulate thousands
of lines before validating the visual premise.

Use React state for coarse product state. Use refs, animation mixers, Rapier
bodies, and `useFrame` for hot 3D state. Never call a React state setter every
frame. Share geometry/materials, instance repetition, and use simplified
colliders.

### 7. Verify, compare, repair

Run lint/build plus browser verification. Capture desktop, mobile, and every
signature state. Exercise the real interaction path. Check console/page/WebGL
errors, canvas pixel variation, framing, UI bounds, asset requests, draw calls,
triangles, textures, and practical frame time.

Compare the result with the brief, Design DNA, and shot contract. Repair the
highest-impact mismatch and rerun. Continue until no blocker in
`references/anti-ai-slop.md` remains.

Use the bundled scripts from the target app root when Playwright is installed:

```bash
node /path/to/skill/scripts/inspect-scene.mjs --root .
node /path/to/skill/scripts/capture-viewports.mjs --url http://127.0.0.1:3000 --out artifacts/visual-qa
node /path/to/skill/scripts/verify-webgl.mjs --url http://127.0.0.1:3000 --out artifacts/visual-qa
```

## Non-Negotiable Gates

Do not claim completion when any of these are true:

- the hero is too small, hidden, or visually weaker than filler scenery;
- a generic card or marketing hero replaces the requested experience;
- primitives remain visibly generic where silhouette or surface identity
  matters;
- unrelated surfaces share one material response;
- selected material classes ignore the properties being tuned;
- camera behavior is default, unbounded, nauseating, or loses the subject;
- postprocessing hides weak modeling or destroys readability;
- generated GLBs have unchecked scale, axis, origin, ground contact, materials,
  clips, or colliders;
- desktop works but mobile framing or controls fail;
- interaction has no physical/audio/camera consequence;
- the browser output has not been personally inspected.

## Handoff

Report the playable URL or local file, the visual/interaction decisions made,
assets generated or reused, verification performed, and any measured residual
risk. Keep the report concise; the rendered experience is the primary artifact.

