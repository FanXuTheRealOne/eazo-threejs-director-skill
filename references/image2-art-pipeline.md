# Image2 Art Pipeline

Use image generation as visual development and asset input, not as decoration.
Do not generate images when the user already supplied sufficient references or
when procedural geometry has a clear established language.

## Contents

- [Reference pack](#1-build-a-reference-pack)
- [Consistency protocol](#2-consistency-protocol)
- [Textures and decals](#3-texture-and-decal-generation)
- [3D handoff and failure modes](#4-3d-generation-handoff)

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

Use for characters, vehicles, machines, exact props, and any hero going to a 3D
generator.

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

## 5. Failure Modes

- Perspective "three-view" sheets produce mismatched geometry.
- Cinematic shadows in modeling sheets hide topology.
- Decorative text becomes baked into generated geometry/textures.
- Multiple mood frames silently redesign the hero.
- A single front image is treated as enough for a silhouette-critical model.
- Generated texture scale conflicts with world units.
- The Agent accepts a poor generated asset because generation is already done.
