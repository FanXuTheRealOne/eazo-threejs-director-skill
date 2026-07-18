---
name: eazo-threejs-director
description: Use when building or directing a realtime 3D website, game, product viewer, spatial interface, simulation, or interactive scene with Three.js, R3F, or WebGL, especially when the prompt specifies a visual style, palette, mood, art reference, existing world, game, brand, character, product, or other IP whose appearance or play must be faithfully reproduced.
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
- stores the user's verbatim visual prompt, prompt fingerprint, searched art
  references, and reference-to-render decisions before look development;
- stores source-backed reference memory inside the project whenever a named
  world, work, product, character, or IP defines visual truth;
- proves palette, materials, lighting, shader, tone, and filter choices against
  role-assigned art references rather than agent taste or a generic preset;
- proves reference fidelity with comparable captures rather than treating a
  passing build, WebGL check, or attractive self-authored frame as evidence;
- for games, delivers a mature playable loop with decisions, escalation,
  consequences, progression, recovery, and replay—not only movement and a task.

Build the product, not a landing page that describes the product. Do not ask
about choices that can be inferred from the request, references, genre, or
existing repository.

## Prompt-Locked Look Development

Every visually directed request is prompt-locked, including original requests
that name no existing IP. Before choosing palette, material response, lighting,
fog, shader technique, tone mapping, or postprocessing:

1. preserve the user's verbatim prompt and extract a prompt fingerprint without
   replacing literal requirements with style synonyms;
2. turn the fingerprint into targeted image search queries for overall art
   direction, palette, form/material, lighting, camera/composition, and
   shader/postprocessing grammar;
3. inspect full-resolution candidates, score semantic fit, reject conflicts,
   and assign each approved image one or more explicit reference roles;
4. write palette measurements and a render translation ledger in the project
   visual bible;
5. calibrate the live render in neutral-to-styled passes and compare it
   side-by-side with the approved role references.

Use one coherent anchor plus the smallest supporting pack that covers missing
roles. If no single image matches the whole prompt, combine compatible
role-specific references instead of accepting a near-match or letting one
reference silently override the user. Follow
`references/prompt-reference-lookdev.md`.

## Reference-Locked Requests

When the user names an existing game, visual world, brand, product, character,
collectible, or other IP, fidelity is mandatory unless the user explicitly asks
for reinterpretation.

Before art direction or asset generation:

1. research real high-resolution sources on the web, preferring official or
   first-party pages, product photography, galleries, and gameplay footage;
2. copy `assets/reference-memory/` into
   `docs/references/<project-slug>/` and complete the manifest, visual bible,
   gameplay contract for games, and comparison log;
3. extract must-match rules for silhouette, anatomy/feature counts, geometry or
   grid, palette, texture/pixel grammar, materials, lighting, fog, tone mapping,
   camera, motion, and core gameplay pillars;
4. use those rules as the brief and QA baseline, not as post-hoc inspiration.

When a specific organic, character, collectible, product, or branded object must
be 3D and the user has not supplied a faithful model:

1. find real high-resolution identity images;
2. use Codex Image2 with those images to generate an identity-locked front,
   side, and back turnaround without changing features;
3. reject cross-view drift;
4. generate the GLB with Meshy 6 Multi-Image to 3D;
5. compare neutral turntable views to the approved sources before integration.

Text-to-3D, primitive anatomy, recolors, and a flattering camera are not
acceptable substitutes for this route. Reduce the number of variants before
reducing identity fidelity. Follow `references/reference-fidelity.md` and
`references/image2-art-pipeline.md`.

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
- `references/prompt-reference-lookdev.md`
- `references/design-dna-3d.md`
- `references/procedural-vs-model.md`
- `references/anti-ai-slop.md`
- `references/verification.md`

**Always read when the prompt names an existing visual reference or IP:**

- `references/reference-fidelity.md`

**Read for implementation:**

- `references/r3f-three-patterns.md` for all Eazo/R3F work;
- `references/camera-language.md` for any spatial experience;
- `references/lighting-materials.md` for all styled scenes;
- `references/motion-interaction.md` for games or animated interactions;
- `references/gameplay-maturity.md` for every game or explicitly playable
  experience;
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

For every visually directed request, preserve the verbatim prompt, research the
art-reference pack, and persist prompt/reference memory now. For a named world
or IP, apply the stricter source rules in `reference-fidelity.md`. Do not
postpone sources until after blockout, model generation, palette, materials, or
postprocessing have already been chosen.

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
Prompt lock: [verbatim prompt, fingerprint, approved reference IDs by role]
Reference lock: [named sources, must-match dimensions, permitted adaptations]
```

Do not begin detailed geometry before this brief, the Design DNA, and key shots
agree with each other.

### 3. Author the 3D Design DNA

Define role-based color, exposure, contrast, fog, shape language, material
families, surface wear, environment density, camera grammar, motion weight,
feedback channels, sound role, postprocessing purpose, UI relationship, and
desktop/mobile quality tiers. Derive visual values from the approved references
and record the mapping in the render translation ledger. Use measurable ranges
and comparisons, not only adjectives. Follow `references/design-dna-3d.md`.

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
the subject or style is original. For a named IP, visual truth comes from
real sourced images: Image2 extends them into a consistent source-backed
turnaround and Meshy 6 Multi-Image to 3D consumes the approved views. Generate
the mood frame, material/state sheet, and key shots needed by the asset and
reference contract. Do not mistake a 2D image inside the canvas for interactive
3D.

### 5. Direct shots and interaction

Define at least the establishing/default shot, primary action shot, signature
moment, result state, and mobile crop. For each, specify camera transform, FOV,
subject occupancy, look target, path, duration, easing, and trigger.

Define the interaction as explicit states and transitions. Every important
input should produce immediate acknowledgement and a readable consequence.
Keep camera shake bounded, event-driven, and recoverable. Do not use
`OrbitControls` as a substitute for authored camera behavior.

For games, complete `references/gameplay-maturity.md` before declaring the loop.
The playable contract is:

```text
verb -> challenge -> consequence -> reward -> escalation -> next decision
```

Exercise a representative three-minute vertical slice without debug shortcuts.

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

Compare the result with the brief, Design DNA, shot contract, gameplay contract,
and prompt/source-backed visual bible. Capture comparable role-reference/render
pairs and record mismatches in the project comparison log; for named work or IP,
use source-aligned views and the stricter identity comparison gate.
Repair the highest-impact mismatch and rerun. Continue until no blocker in
`references/anti-ai-slop.md`, `references/reference-fidelity.md`, or
`references/gameplay-maturity.md` remains.

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
- palette, material, lighting, shader, tone-mapping, or filter choices cannot be
  traced to an approved art-reference role and render translation entry;
- visual references are merely collected but never inspected, scored, assigned
  roles, translated into runtime parameters, or compared with the final render;
- camera behavior is default, unbounded, nauseating, or loses the subject;
- postprocessing hides weak modeling or destroys readability;
- generated GLBs have unchecked scale, axis, origin, ground contact, materials,
  clips, or colliders;
- a named world has generic geometry, palette, texture filtering, material
  response, lighting, fog, tone mapping, camera, or gameplay grammar;
- a named character or branded 3D subject was built from memory, text-to-3D, or
  primitives when source photography and Image2/Meshy 6 were available;
- project reference memory, identity lock, or comparable reference/render
  captures are missing;
- a game offers controls and a linear task but no meaningful decision,
  escalation, consequence, progression, failure/recovery, or replay;
- desktop works but mobile framing or controls fail;
- interaction has no physical/audio/camera consequence;
- the browser output has not been personally inspected.

## Handoff

Report the playable URL or local file, the visual/interaction decisions made,
assets generated or reused, project reference-memory path, comparison evidence,
gameplay slice exercised, verification performed, and any measured residual
risk. Keep the report concise; the rendered experience is the primary artifact.
