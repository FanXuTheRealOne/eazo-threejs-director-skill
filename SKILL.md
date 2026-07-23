---
name: eazo-threejs-director
description: Use when building or directing a realtime 3D website, game, product viewer, spatial interface, simulation, or interactive scene with Three.js, R3F, or WebGL, especially from a short or visually underspecified request.
---

# Eazo Three.js Director

Turn even a one-line request into one complete browser experience through a
single production prompt. The prompt template is the source of truth; do not
assemble competing mini-workflows for camera, art, models, gameplay, and QA.
Every request must be expanded with scaffold-level precision: runtime contract,
interaction/game systems, camera direction, visual finish, asset route, and
verification proof.

## Required Files

Read these in order for every build:

1. `references/prompt-compiler.md`
2. `assets/design-spec-template.md`
3. `references/asset-routing.md`
4. `assets/realtime-3d-production-prompt.md`
5. `references/runtime-patterns.md`
6. `references/verification.md`

## The One Pipeline

### 1. Inspect

Inspect repository instructions, framework, versions, existing work, assets,
environment files, dirty state, commands, and deployment contract. Preserve the
platform shell and unrelated user changes. For a blank/static task, keep the
deliverable rooted in the current directory with `index.html` as its entry.

### 2. Compile the request

Preserve the user's exact words. Fill `assets/design-spec-template.md` using
`references/prompt-compiler.md`. Resolve missing art direction, spatial design,
hero hierarchy, camera grammar, interaction/game mechanics, motion, rendering,
palette, decoration discipline, performance, responsive behavior, loading, and
verification through informed inference. Ask only when a missing choice would
materially change the product and cannot be inferred.

Write the resolved spec to `docs/eazo-design-spec.md`. It must contain no TODO,
TBD, unused branch, or unresolved placeholder.

### 3. Route evidence and assets conditionally

Use `references/asset-routing.md`. Reference research, Image2, multi-view
generation, and Meshy are separate decisions:

- A reference image may guide composition, palette, material, light, or render
  grammar without becoming a texture or model.
- High-occupancy named architecture, landmarks, vehicles, machines, towers,
  product hardware, or complex hero props must not be built as one coarse
  procedural silhouette. First gather official/reference views or generate
  Image2 multi-view evidence when views are missing, then write a part
  decomposition ledger and build the hero as named Three.js components.
- Skip Image2 when the request is visually clear, procedural construction can
  satisfy the required views at the intended screen size, or a generated image
  would not reduce form/material uncertainty.
- Skip Meshy when primitives/custom geometry, existing assets, or a sourced
  model meet the intended camera distance and identity requirement.
- Generate multi-view images only when a specific asset must be inspected in 3D
  and missing views block faithful modeling; for a high-occupancy hero, treat
  unclear sides/back/detail proportions as blocking.
- Use Meshy 6 only after deciding that the generated 3D asset will improve the
  final browser experience more than procedural or existing geometry.

Named people, characters, products, places, architecture, games, or visual
worlds require real source research. They do not automatically require Image2
or Meshy.

### 4. Fill the single production prompt

Fill every field in `assets/realtime-3d-production-prompt.md` from the resolved
spec and asset decisions. Remove unused conditional text and all placeholders.
Save the result to `docs/eazo-production-prompt.md`, then use that single prompt
as the implementation and acceptance contract.

Do not dilute it with parallel plans. If implementation reveals a necessary
change, update the design spec and compiled production prompt first.

### 5. Build by visible importance

Implement in this order:

1. app shell, authored first camera, controls, loading/reveal path;
2. hero silhouette and purposeful foreground/midground/background composition;
3. high-occupancy hero part breakdown: primary masses, structural members,
   joints, trims, surface zones, lights/decals, back/underside and scale cues;
4. complete interaction state, puzzle model, simulation, or mature game loop;
5. camera choreography as a director: establishing shot, tracking, reveal,
   orbit/inspection, cutaway/drone/crane moves, recovery, and mobile crop;
6. refined palette, material separation, motivated lighting, atmosphere, and
   restrained decoration that identifies itself and serves the scene;
7. secondary motion, signature moment, sound, shader/postprocessing;
8. all-angle completion, mobile controls, reduced motion, quality tiers;
9. cold-start, browser, performance, and visual repair loop.

Run and inspect the scene after every major pass. Code volume, a successful
build, or a visible canvas is not visual evidence.

### 6. Verify and repair

Follow `references/verification.md` and the compiled prompt. Exercise real input,
capture required states and camera angles, verify cold reveal, inspect console,
assets, WebGL, mobile layout, frame time, and visible artifacts, then repair the
highest-impact mismatch and rerun.

When references were used, compare only the roles they define. When no image
reference was needed, verify against the resolved spec, hero composition, shot
contract, material/light rules, and interaction states.

## Completion Gates

Do not finish when any of these is true:

- the one-line request was implemented before being expanded into the unified
  design spec and production prompt;
- the opening frame has no focal hierarchy or the requested experience opens as
  a marketing card;
- camera behavior is default, clips geometry, loses the hero, or exposes an
  unfinished back/side inside its inspection envelope;
- visually important objects remain generic primitives where silhouette or
  surface identity matters;
- a high-occupancy named hero is implemented as a coarse monolith instead of a
  decomposed assembly with evidence-backed proportions, parts, joints, material
  zones, and side/back detail;
- missing front/side/back/top reference views were not resolved through official
  evidence, Image2 multi-view generation, sourced models, or a clearly justified
  procedural part ledger;
- the background contains random filler geometry, abstract clutter, or shapes
  that do not read as an intended prop, architecture, landscape, UI, or effect;
- materials, lights, shaders, or post effects are indistinguishable, arbitrary,
  or unsupported by the resolved art direction/reference role;
- camera work is a static default view when the experience calls for authored
  motion, reveal, scale, tension, inspection, or cinematic progression;
- camera work lacks a shot bible with purpose, start/end composition, movement,
  subject size, duration, easing, interruption and browser capture audit;
- the background exceeds its declared whitelist or includes objects that do not
  support silhouette, depth, navigation, scale, atmosphere, or interaction;
- palette and tone mapping feel coarse, muddy, over-saturated, or one-note
  instead of deliberately graded with clear value and temperature hierarchy;
- Image2, a turnaround, or Meshy was used because it was available rather than
  because the asset-routing decision required it;
- a game, puzzle, or simulator lacks rules, decisions, consequences,
  state-space reasoning, failure/recovery, replay, or required proof;
- touch, safe areas, reduced motion, loading, error, and quality fallbacks fail;
- cold reveal flashes black, placeholders, incomplete textures, uncompiled
  materials, loading veils, safety planes, or letterbox bands;
- desktop/mobile/signature states were not personally viewed and repaired.

## Handoff

Report the URL or entry file, controls, key visual/interaction decisions,
external/generated assets actually used, verification evidence, and residual
risk. Keep the report shorter than the artifact.
