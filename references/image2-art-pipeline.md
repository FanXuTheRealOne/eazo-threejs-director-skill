# Image2 Art Pipeline

Use image generation as visual development and asset input, not as decoration.
For a named IP or exact real subject, first follow `reference-fidelity.md` and
use Codex Image2 in reference/edit mode. If the user supplied complete,
consistent multi-view photography, use it directly rather than redrawing it. If
views are missing, Image2 must extend the sourced identity without redesigning
it. Text-only invention is reserved for original subjects.

## Contents

- [Reference pack](#1-build-a-reference-pack)
- [Consistency protocol](#2-consistency-protocol)
- [Textures and decals](#3-texture-and-decal-generation)
- [3D handoff and failure modes](#4-3d-generation-handoff)

## 0. Source-Backed Turnaround for Named IP

Before prompting Image2:

1. collect real high-resolution official/first-party photographs and record them
   in the project's reference manifest;
2. define an identity lock for silhouette, feature counts, landmark ratios,
   color/pattern zones, materials, asymmetry, clothing, and accessories;
3. select one primary identity image and supporting profile/rear evidence;
4. use the actual images as references to Image2 rather than describing the IP
   from memory;
5. request front, left or right side, and back views at identical scale, neutral
   pose, one ground line, neutral light, and clean background;
6. generate separate single-view images when the downstream 3D generator expects
   one object per input image.

Prompt contract:

```text
Using the attached real source photographs as immutable identity references,
create an orthographic [front|side|back] model view of the exact same subject.
Preserve [identity-lock list] exactly. Do not redesign, stylize, beautify,
recolor, add or remove features, change feature counts, alter proportions,
replace clothing/accessories, or invent hidden details unsupported by the source.
Match the approved views at identical scale and ground line. Neutral pose,
85-120 mm orthographic-like camera, flat neutral studio light, clean background,
single unobstructed object, no text or labels.
```

Compare every generated view to the source pack. A changed face, ear, tooth,
limb, seam, pattern, material boundary, accessory, or color zone blocks 3D
generation. Regenerate the weak view; do not average conflicting views.

## 1. Build a Reference Pack

Generate only the sheets needed by the asset route.

### A. Mood frames

Generate 3-6 candidates that test composition, palette, material response,
environment density, camera height, and atmosphere. Keep the requested product
and interaction visible; avoid atmospheric images where the actual subject
cannot be inspected.

Prompt structure:

```text
[literal experience and hero], [spatial archetype], [camera/lens and subject
occupancy], [foreground/midground/background construction], [motivated light
sources and palette roles], [material families and wear], [atmosphere],
[interaction state], high-detail realtime 3D art-direction frame, physically
coherent lighting, readable controls area, no text, no logo, no collage.
```

Extract from the selected frame: dominant masses, light-source positions,
palette roles, hero/background value separation, lens family, and detail scale.
Do not copy accidental artifacts.

### B. Orthographic turnaround

Use for original characters, vehicles, machines, exact props, and any hero going
to a 3D generator. For named IP, use the stricter source-backed turnaround above.

Prompt template:

```text
Create a consistent orthographic model sheet of the same [subject]. Show exact
front, left side, and back views at identical scale and neutral pose, aligned to
one ground line. [List fixed proportions, parts, expression/state, construction,
materials, colors]. Flat neutral studio lighting, 85-120 mm orthographic-like
view, unobstructed silhouette, no perspective exaggeration, no cropped parts,
no extra accessories, no labels, no decorative background. Preserve identical
identity, dimensions, colors, and part placement across all views.
```

Add right side, top, underside, hand/face closeups, wheel details, or mechanism
exploded views only where asymmetry or topology requires them.

### C. Material callout sheet

```text
Create a material and color callout sheet for the exact same [subject]. Show
isolated closeups of [named zones]. Make surface construction legible: base
color variation, roughness response, edge wear, seams, fibers, pores, scratches,
paint thickness, glass tint, emissive parts. Neutral calibrated studio light,
consistent scale, no text, no redesign, no new accessories.
```

The Agent later translates observed response into valid Three.js material types;
the image is not a numeric PBR truth source.

### D. State sheet

Use when appearance changes: cute/horror, clean/damaged, closed/open,
powered/unpowered, dry/wet, calm/angry.

```text
Show [N] states of the exact same [subject] from the same front three-quarter
camera, identical pose, framing, proportions, garment/part placement, and base
materials. Only change [explicit state variables]. Neutral background and
consistent light. The transformation must be mechanically/anatomically
explainable and suitable for separate meshes, morph targets, or material swaps.
```

### E. Key shots

Generate default, action, signature, and mobile frames. Unlike turnarounds, these
may be cinematic. Include exact lens, camera relationship, subject occupancy,
world layers, light sources, and interaction state. Use them as shot contracts,
not final backgrounds.

## 2. Consistency Protocol

For multi-image generation:

1. choose one identity reference;
2. repeat invariant features explicitly in every prompt;
3. reference the prior approved image when the tool supports it;
4. change one variable per generation pass;
5. reject outputs with silhouette drift, accessory drift, view mismatch, or
   unmodelable intersections;
6. store approved images in a stable project asset/reference directory with
   purpose-based filenames.

Do not feed inconsistent views to a 3D generator. Regenerate the weakest view.

## 3. Texture and Decal Generation

Generate textures only after deciding geometry scale, UV behavior, and material
class.

For tileable textures request:

```text
seamless square [surface], orthographic top-down capture, uniform diffuse light,
no directional shadows, no perspective, physically plausible feature scale,
edges tile perfectly, no objects, no text
```

Generate separate grayscale masks for grime, wear, decals, emission, or alpha
when control matters. Do not pretend a shaded beauty image is a normal or
roughness map. Derive technical maps with a proper material tool or generate
them explicitly and inspect channel meaning.

Assign color spaces correctly:

- base color/emissive beauty textures: sRGB;
- normal, roughness, metalness, AO, height, and masks: linear/no color space;
- HDR environment maps: linear HDR pipeline.

## 4. 3D Generation Handoff

Provide:

- selected orthographic views;
- material sheet;
- fixed dimensions and unit scale;
- list of separately movable/material-swappable parts;
- neutral pose and forward/up axes;
- rig/clip requirements;
- polygon and texture budget by device;
- forbidden additions;
- output format GLB with named parts where supported.

Inspect the returned model in a neutral turntable before integrating it into the
styled scene.

### Meshy 6 Multi-Image contract for named IP

For a recognizable subject, use Meshy 6 Multi-Image to 3D rather than a
text-to-3D approximation. The current API accepts 1 to 4 images of the same
object. Submit separate consistent front, side, back, and optional opposite-side
images through `POST /openapi/v1/multi-image-to-3d`.

Recommended starting payload for reference fidelity:

```json
{
  "image_urls": ["<front>", "<right-side>", "<back>", "<left-side>"],
  "ai_model": "meshy-6",
  "should_texture": true,
  "enable_pbr": true,
  "image_enhancement": false,
  "remove_lighting": true,
  "target_formats": ["glb"]
}
```

- `image_enhancement: false` prevents style processing when the approved Image2
  views already encode the exact appearance.
- `remove_lighting: true` is appropriate when the model will be lit in Three.js;
  verify the unlit base color still matches the source.
- Enable PBR only for material families that benefit from it; a deliberately
  pixel/unlit subject may need a simpler material adapter after export.
- Set topology, polygon, texture, pose, scale/origin, and rig requirements from
  the target device and gameplay contract rather than maximizing every option.
- Keep the API key in a process environment variable. Never put it in prompts,
  manifests, generated asset metadata, source control, or screenshots.

After generation, render front/right/back/left neutral turntable captures.
Compare silhouette masks, identity landmarks, feature counts, color/pattern
zones, material boundaries, ground contact, and scale against the approved
Image2 views. Loading successfully is not acceptance.

Official references:

- <https://docs.meshy.ai/en/api/multi-image-to-3d>
- <https://help.meshy.ai/en/articles/12634481-how-to-use-multi-view>

## 5. Failure Modes

- Perspective "three-view" sheets produce mismatched geometry.
- Cinematic shadows in modeling sheets hide topology.
- Decorative text becomes baked into generated geometry/textures.
- Multiple mood frames silently redesign the hero.
- A single front image is treated as enough for a silhouette-critical model.
- A named IP is sent to text-to-3D even though real source photography exists.
- Image2 silently changes identity while inventing missing views.
- A Meshy 6 output is accepted without source-aligned turntable comparison.
- Generated texture scale conflicts with world units.
- The Agent accepts a poor generated asset because generation is already done.
