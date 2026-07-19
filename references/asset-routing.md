# Conditional Evidence and Asset Routing

Decide separately whether the build needs visual research, Image2, multi-view
images, and Meshy. Availability is not justification.

## Decision Table

| Decision | Use when | Skip when | Output |
| --- | --- | --- | --- |
| searched references | named place/world/IP or unresolved visual grammar affects fidelity | the user's supplied evidence and spec already resolve the look | source URLs + observations |
| Image2 key art | one coherent target frame would resolve composition/light/material ambiguity | the design spec and real references already provide a sufficient target | inspected mood/key shot |
| Image2 multi-view | a specific asset needs true 3D inspection and missing views block its construction | the asset is procedural, distant, abstract, already modeled, or not inspected from multiple sides | consistent approved views |
| Meshy 6 | a generated 3D asset is required and multi-view evidence is consistent | procedural/custom geometry or an existing/sourced model is more controllable or faithful | validated GLB |

Reference search and image generation are not the same decision. A source image
may remain art direction only. Image2 output may remain a key-shot target only.
Multi-view images do not imply that Meshy must be used.
No Image2 does not mean no reference: searched evidence can still lock palette,
form, material, light, camera, shader, and render grammar.

## Route Per Asset

For each meaningful asset record:

```text
Role and maximum screen occupancy:
Required views and states:
Identity/silhouette/surface risk:
Gameplay-controlled parts:
Candidate route: procedural | sourced | Image2 | Meshy | hybrid
Why this route improves the browser result:
Fallback:
Validation evidence:
```

Prefer procedural/custom geometry for modular architecture, rooms, cabinets,
tracks, rails, claws, lights, shelves, repeated props, particles, abstract
effects, changing dimensions, and collision proxies. Procedural does not mean
unbeveled boxes: refine profiles, thickness, joints, trim, cut lines, decals,
material zones, and contact detail at the intended camera distance.

Prefer an existing or generated model for close organic characters, faces,
hands, clothing/fur, complex curved products, identifiable vehicles, landmark
props, or assets requiring a skeleton/expressions/authored clips.

Use hybrid construction when generated identity needs procedural control:
character/model plus procedural eyes/effects/colliders; product shell plus
lights/annotations; machine cabinet plus generated prizes and procedural
mechanics.

## Visual Evidence Gate

Use real high-resolution official or first-party evidence for named people,
characters, products, architecture, cities, games, brands, or recognizable
worlds. Record what each source proves: form, palette, material, light, camera,
texture/render grammar, or interaction.

For original requests, visual research is useful only when it reduces a real
design uncertainty. Do not force web image search, a reference dossier, or a
generated mood frame when the user's request and the resolved spec already
define an implementable look.

When research is needed, preserve a prompt fingerprint, search by separate
reference roles, and score candidates for semantic intent, form, palette,
material, light, camera, and render grammar. Keep the smallest compatible set
that explains the target. Do not average incompatible references into a generic
style. Translate each retained observation into a runtime decision and a
validation crop in the design spec's render translation ledger.

## Image2 Gate

Skip Image2 when any of these is true:

- the subject is architectural, mechanical, abstract, or modular and procedural
  construction can satisfy every required view;
- the asset is small/distant enough that a generated image would not improve its
  readable silhouette or material response;
- the user supplied sufficient visual evidence;
- an existing cleared model already satisfies the identity and camera needs;
- the output would be used only to justify decisions the design spec already
  resolved.

Use Image2 key art when a coherent target frame materially improves composition,
palette, light, material response, or camera direction. Do not mistake the key
art for the interactive 3D scene.

Generate multi-view images only when all are true:

1. one specific asset must be inspected from multiple sides;
2. its identity depends on silhouette, anatomy, curvature, pattern, or parts;
3. available source views are incomplete;
4. procedural construction or an existing model cannot meet the target;
5. consistent additional views will directly improve modeling.

Reject cross-view changes in feature count, face, silhouette, pattern, material
zones, accessories, dimensions, or ground line.

## Meshy Gate

Skip Meshy when the generated model would be harder to control, animate, light,
collide, optimize, or keep faithful than procedural/custom geometry.

Use Meshy 6 only when the asset decision explicitly requires a generated 3D
model. Submit 1-4 consistent views of the same object, keep credentials in the
environment, and never place keys in prompts, metadata, source control, logs, or
screenshots. Validate the GLB's silhouette, scale, axes, origin, ground contact,
materials, textures, UVs, normals, part separation, triangles, clips, and
colliders before integration.

Loading successfully is not acceptance. Compare neutral front/right/back/left
turntable views to the approved evidence when identity matters.

## Worked Routes

### 后室交互界面

- Evidence: researched Backrooms geometry, fluorescent light, carpet/wall
  material, fog, camera and render grammar.
- Geometry: procedural modules and collision.
- Image2: Skip Image2; it does not solve a missing hero asset.
- Meshy: Skip Meshy; modular procedural construction is more controllable.

### Labubu 娃娃机

- Evidence: official Labubu product images plus real claw-machine construction.
- Geometry: cabinet, glass, claw, rails, controls, room and physics procedural.
- Image2: use multi-view only if no faithful cleared Labubu model exists and the
  doll is large enough for identity drift to matter.
- Meshy: evaluate only for the doll after the multi-view gate passes.

### 上海背景

- Evidence: real 上海 skyline/street/architecture/light/weather references for
  the specified district and era.
- Image2: optional key shot or multi-view evidence when it resolves a particular
  landmark or composition; not mandatory for a procedural skyline.
- Meshy: use Meshy 6 only when a high-occupancy landmark/prop needs a standalone
  model and procedural/sourced geometry cannot satisfy it.

## Red Flags

- “Image2 is available, so generate a turnaround first.”
- “Multi-view images exist, so they must become a Meshy model.”
- “Named background means the entire environment should be one generated GLB.”
- “A flattering camera can hide model mismatch.”
- “Generated means game-ready pivots, UVs, clips, and colliders.”

Any red flag means return to the per-asset decision record.
