# Reference Fidelity and Named IP

When a request names an existing game, film, artwork, product, brand, character,
or collectible, the reference is a constraint rather than a mood word. Research
and preserve its visual grammar before inventing a style.

## 1. Trigger and Core Rule

This workflow is mandatory when the user says or implies:

- "a version of," "in the style/world of," "recreate," "restore," "像," or
  "还原" a named work;
- a recognizable branded or organic subject must exist as 3D;
- a reference image, URL, product name, or real object defines visual truth;
- the result will be judged by resemblance rather than only by function.

**Core rule:** do not rely on model memory for a named reference. Search the web,
prefer official or first-party sources, record what each source proves, and
compare the rendered result against those sources.

"Inspired by" is not permission to replace a requested visual grammar with a
generic pastel, toon, neon, cinematic, or PBR house style.

## Contents

- [Persistent project memory](#2-persistent-project-reference-memory)
- [Source research](#3-source-research)
- [Fidelity contract](#4-extract-a-fidelity-contract)
- [Named IP 3D pipeline](#5-named-ip-3d-asset-pipeline)
- [Comparison and blockers](#6-comparison-gate)
- [Worked crossover example](#7-worked-example-character-ip-in-a-voxel-sandbox)
- [Rationalizations and red flags](#common-rationalizations)

## 2. Persistent Project Reference Memory

Before the production brief, copy the templates from
`assets/reference-memory/` into:

```text
docs/references/<project-slug>/
  reference-manifest.md
  visual-bible.md
  gameplay-contract.md       # required for games
  comparison-log.md
  source-images/             # only when local retention is permitted
  generated-turnarounds/
  model-turntables/
  comparison/
```

The directory is project memory. Update it as decisions change; do not leave
important findings only in chat or temporary downloads. If copying a source
image is not licensed or authorized, store its URL, creator/publisher,
resolution, access date, and purpose instead of redistributing the file.

**Gate:** implementation cannot establish a palette, model prompt, material
system, texture filter, camera, or global grade until the manifest and visual
bible contain evidence for those decisions.

## 3. Source Research

### Source tiers

1. Official product pages, first-party press kits, official game galleries,
   original creators, brand videos, museum/archival records.
2. Reputable retailers, licensed partners, editorial photography, documented
   turntables, and high-quality real-world video frames.
3. Fan wikis, reviews, and community posts only as leads or gap-fillers.

Reject AI-generated fan art, bootleg product listings, unattributed image
aggregators, compressed thumbnails, and images that visibly redesign the subject
as primary identity evidence.

### Minimum evidence pack

For a named world or game, collect high-resolution evidence for:

- default outdoor and indoor views;
- primary action and result states;
- geometry/grid or architectural proportions;
- palette and time-of-day behavior;
- texture resolution, texel scale, filtering, and edge treatment;
- lighting, shadow softness, fog/background, tone mapping, and saturation;
- camera height, FOV, horizon, HUD density, and subject occupancy;
- the original interaction grammar and pacing.

For a named character, product, or collectible, collect:

- a clean front or front three-quarter hero image;
- left/right profile and rear evidence where available;
- close views of face, hands/feet, accessories, seams, materials, and patterns;
- multiple official variants only when each is genuinely distinct;
- neutral-light product photos in addition to campaign photography.

Do not use one small front image as proof of rear geometry. Record uncertainty
and resolve missing views through additional research before Image2 synthesis.

## 4. Extract a Fidelity Contract

Write a must-match table in `visual-bible.md`:

| Dimension | Source evidence | Must match | May adapt | Validation |
| --- | --- | --- | --- | --- |
| silhouette/anatomy | source IDs | feature count, proportions | rig topology | masks + landmarks |
| world geometry | source IDs | grid, edge language, scale | draw distance | fixed shot |
| palette | source IDs | dominant roles and value range | accessibility UI | sampled swatches |
| textures | source IDs | pixel/texel grammar, filtering | original artwork | close crop |
| rendering | source IDs | exposure, tone, fog, shadow | quality tier | fixed shot |
| camera | source IDs | height, FOV family, horizon | mobile crop | telemetry |
| motion/play | source IDs | weight, timing, loop pillars | input mapping | playtest |

For a named game, describe its engine-visible grammar rather than merely its
genre. A voxel world can still be wrong if it uses smooth gradients, arbitrary
pastels, rounded bevels, soft PBR highlights, or cinematic grading where the
reference uses crisp pixel textures, cubic silhouettes, restrained material
response, and a different sky/fog pipeline.

No global filter or postprocessing preset is allowed unless the reference pack
supports it. Start from neutral color management, then reproduce the source's
contrast, saturation, tone mapping, fog, bloom, and shadow response.

## 5. Named IP 3D Asset Pipeline

Use this route for a specific person, character, creature, collectible, product,
vehicle, or branded object whose identity depends on anatomy, silhouette, face,
surface curvature, pattern, or accessories.

1. Search for real, high-resolution source photography first.
2. Record an identity lock: feature counts, landmark ratios, color zones,
   materials, asymmetry, accessories, and forbidden changes.
3. Use Codex Image2 in reference/edit mode to create a source-backed turnaround.
   Generate front, side, and back as separate clean images or a strictly aligned
   sheet. Do not start from a text-only invention.
4. Reject any Image2 view that changes the face, silhouette, feature count,
   garment, accessory, pattern, color blocking, or material identity. Image2
   fills missing views; it does not redesign the IP.
5. Send 1-4 consistent views to Meshy 6 Multi-Image to 3D. Prefer the explicit
   `meshy-6` model and preserve exact source appearance when enhancement would
   introduce style drift.
6. Inspect the GLB in a neutral turntable at front/right/back/left. Compare it
   to the approved views before integrating it into styled lighting.
7. Regenerate or repair identity-critical mismatches. Do not hide them with
   distance, fog, bloom, toon shading, or a flattering camera.

Procedural geometry remains appropriate for collision proxies, distant LODs,
simple detachable parts, particles, and world systems. It is not an acceptable
substitute for a close, recognizable organic IP merely because it is faster.

## 6. Comparison Gate

Capture the reference target and browser render side-by-side at the same or
closest reproducible camera. Add an overlay or difference image where useful.
Compare in this order:

1. silhouette, proportions, grid, and composition;
2. identity landmarks and feature counts;
3. palette roles and value distribution;
4. texture filtering, pixel/texel scale, and surface response;
5. light direction, shadow character, fog, tone mapping, and grade;
6. animation weight and gameplay-state readability;
7. secondary decoration.

Record each mismatch in `comparison-log.md` with expected reference, observed
render, cause, repair, and recapture path. Passing build, WebGL, console,
performance, or screenshot-existence checks never proves fidelity.

### Blockers

- no source manifest or only unattributed thumbnails;
- a named world represented by generic genre primitives;
- a recognizable IP built from a text-only 3D prompt when source images exist;
- an Image2 turnaround with identity or cross-view drift;
- a Meshy model accepted without neutral turntable comparison;
- palette, texture filtering, tone mapping, or fog chosen from agent preference;
- comparison screenshots taken from unrelated cameras or only after heavy grade.

## 7. Worked Example: Character IP in a Voxel Sandbox

For a request such as a Labubu version of Minecraft:

- research official Minecraft screenshots for cubic grid, pixel texture atlas,
  nearest-neighbor filtering, block-scale color variation, sky, fog, first-person
  FOV, HUD rhythm, and mine/build interaction; create original compatible assets
  rather than copying proprietary textures;
- research official POP MART/THE MONSTERS product photography for each selected
  Labubu variant and lock ear silhouette, face, eyes, mouth/teeth, proportions,
  fur/vinyl response, clothing, accessories, and color blocking;
- use Image2 to extend those real sources into identity-consistent orthographic
  views without adding "cute" details or changing anatomy;
- use Meshy 6 Multi-Image to 3D, then validate turntable views before instancing
  the models as villagers;
- make mining, building, inventory/resources, exploration, world reactions, and
  progression support the loop. A generic voxel village plus a linear fetch
  quest is not a mature Minecraft-like game.

## Quick Reference

| Request condition | Required evidence before build |
| --- | --- |
| named visual world | manifest + visual bible + world key shots |
| exact organic/branded 3D subject | real high-res sources + identity lock + Image2 turnaround |
| Meshy-generated IP model | Meshy 6 multi-image task + neutral turntable comparison |
| named game mechanics | researched pillar mapping + gameplay contract |
| completion claim | fixed-state reference comparisons + repaired blockers |

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The user only said version of, so inspired is enough." | A named reference defines observable constraints unless the user explicitly invites reinterpretation. |
| "Text-to-3D is faster." | Speed does not excuse changing a recognizable identity; reduce variant count instead. |
| "Procedural recolors create variety." | Color swaps are not distinct real variants when anatomy, clothing, or accessories define them. |
| "I know what the game looks like." | Memory cannot serve as stored, reviewable evidence or catch palette/render drift. |
| "The screenshots look polished." | Polish can amplify the wrong art direction; compare to sources. |
| "References can be added later." | References added after design merely rationalize decisions already made. |

## Red Flags — Stop and Re-ground

- "inspired is close enough"
- text-only prompt for a recognizable IP
- one image for a multi-view organic model
- no URLs or source confidence in project memory
- generic pastel/toon/neon grade without source evidence
- multiple recolors presented as authentic variants
- build/WebGL/performance results used as fidelity evidence
- references assembled after the final render

Any red flag means stop asset or look-development work, complete the reference
memory, and recapture the comparison before continuing.
