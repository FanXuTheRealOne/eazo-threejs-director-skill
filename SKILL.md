---
name: eazo-threejs-director
description: Use when building or directing a realtime 3D website, game, product viewer, spatial interface, simulation, or interactive scene with Three.js, R3F, or WebGL, especially from a short or visually underspecified request.
---

# Eazo Three.js Director

Turn even a one-line request into one complete browser experience through a
single production prompt. The prompt template is the source of truth; do not
assemble competing mini-workflows for camera, art, models, gameplay, and QA.

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
hero hierarchy, camera, interaction, motion, rendering, performance, responsive
behavior, loading, and verification through informed inference. Ask only when a
missing choice would materially change the product and cannot be inferred.

Write the resolved spec to `docs/eazo-design-spec.md`. It must contain no TODO,
TBD, unused branch, or unresolved placeholder.

### 3. Route evidence and assets conditionally

Use `references/asset-routing.md`. Reference research, Image2, multi-view
generation, and Meshy are separate decisions:

- A reference image may guide composition, palette, material, light, or render
  grammar without becoming a texture or model.
- Skip Image2 when the request is visually clear, procedural construction can
  satisfy the required views, or a generated image would not reduce material
  uncertainty.
- Skip Meshy when primitives/custom geometry, existing assets, or a sourced
  model meet the intended camera distance and identity requirement.
- Generate multi-view images only when a specific asset must be inspected in 3D
  and missing views block faithful modeling.
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
2. hero silhouette and foreground/midground/background composition;
3. complete interaction state or mature game loop;
4. material separation, motivated lighting, environment depth;
5. secondary motion, signature moment, sound, shader/postprocessing;
6. all-angle completion, mobile controls, reduced motion, quality tiers;
7. cold-start, browser, performance, and visual repair loop.

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
- materials, lights, shaders, or post effects are indistinguishable, arbitrary,
  or unsupported by the resolved art direction/reference role;
- Image2, a turnaround, or Meshy was used because it was available rather than
  because the asset-routing decision required it;
- a game lacks decisions, consequences, escalation, failure/recovery, or replay;
- touch, safe areas, reduced motion, loading, error, and quality fallbacks fail;
- cold reveal flashes black, placeholders, incomplete textures, uncompiled
  materials, loading veils, safety planes, or letterbox bands;
- desktop/mobile/signature states were not personally viewed and repaired.

## Handoff

Report the URL or entry file, controls, key visual/interaction decisions,
external/generated assets actually used, verification evidence, and residual
risk. Keep the report shorter than the artifact.
