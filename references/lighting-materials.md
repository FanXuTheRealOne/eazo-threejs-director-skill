# Lighting and Materials

Build visual quality through coherent physical response and motivated lighting.
Postprocessing cannot repair undirected look development.

## Contents

- [Color and light roles](#1-color-pipeline)
- [Material families and surface construction](#3-material-families)
- [Shadows, reflections, environment, and fog](#5-shadows-and-reflections)
- [Look-development order and failures](#7-look-development-order)

## 1. Color Pipeline

Three.js works in Linear-sRGB and displays through the renderer output color
space. For current Three.js/R3F:

- keep display color textures such as base color and emissive in sRGB;
- keep data textures such as normal, roughness, metalness, AO, and masks linear;
- use a deliberate tone-mapping choice and calibrate exposure in the final
  postprocessing path;
- ensure custom shaders include the correct output color transform when they
  produce final display color;
- avoid manually gamma-correcting textures already handled by the loader.

Start with a neutral look-dev shot before stylizing. Check light and dark values
on both desktop and mobile displays.

## 2. Light by Role

Use a small number of explainable roles:

- **ambient/environment:** reveals unlit forms without flattening them;
- **key practical:** dominant fixture/window/sun/machine light;
- **fill/bounce:** supports shadow readability and local color spill;
- **rim/separation:** separates hero from background when physically plausible;
- **state light:** appears only for danger, success, power, or interaction;
- **emissive surface:** visible source whose nearby illumination agrees.

Place visible fixtures for important local lights. Match color, position, falloff,
and intensity. Use light helpers during development and remove them for delivery.

## 3. Material Families

Choose valid material classes:

- `MeshStandardMaterial`: most PBR surfaces; roughness and metalness work;
- `MeshPhysicalMaterial`: clearcoat, transmission, sheen, iridescence, or advanced
  hero materials; budget carefully;
- `MeshToonMaterial`: deliberate stepped lighting; it does not expose Standard
  material roughness/metalness behavior;
- `MeshBasicMaterial`: UI-like unlit surfaces, masks, debugging, selective glow;
- `ShaderMaterial`: only when built-in materials cannot express the effect.

Do not store imaginary surface parameters in `userData` and call the material
finished. Tune properties that the shader actually consumes.

## 4. Surface Construction

For every major family provide variation at three scales:

1. broad color/roughness variation across the object;
2. construction detail such as seams, panels, grout, weave, pores, grain;
3. local wear linked to use: edges, handles, floor traffic, leaks, joints.

Wear follows story and contact. Random noise distributed equally everywhere
looks synthetic. Use vertex color, decals, masks, secondary geometry, Canvas
textures, or authored texture maps according to camera distance.

### Example ranges for initial look development

These are starting points, not style rules:

- painted metal: metalness `0-0.25` at intact paint, exposed chips `0.7-1`,
  roughness `0.25-0.65`;
- raw/oxidized metal: metalness `0.6-1`, roughness `0.3-0.8` with patch breakup;
- hard plastic: metalness `0`, roughness `0.25-0.65`;
- cloth/fur base: metalness `0`, roughness `0.65-1`, silhouette/fiber strategy;
- wet patches: lower roughness than surrounding dry material, not necessarily
  mirror-like;
- glass: thickness-aware physical material or controlled transparent standard
  material; avoid stacking many transparent layers.

## 5. Shadows and Reflections

- Cast shadows only from lights and objects that materially improve depth.
- Use one strong shadow-casting key before enabling every light.
- Tune bias/normalBias against acne and floating contact shadows.
- Bake or fake static ambient grounding where dynamic shadows are too expensive.
- Update static reflection probes only when needed.
- Scope planar or realtime reflections to hero moments and quality tiers.
- Provide contact grounding for every hero/model.

## 6. Environment and Fog

Fog must support depth, scale, and palette. Match fog color to the far-field
environment so geometry does not fade into an unrelated color. Use density or
near/far ranges that retain gameplay landmarks. In horror, obscure distant
certainty without hiding the next playable decision.

## 7. Look-Development Order

1. neutral material values and correct texture color spaces;
2. key light and exposure;
3. environment/ambient fill;
4. hero-background separation;
5. practical fixtures and local pools;
6. surface breakup and wear;
7. fog and atmosphere;
8. restrained postprocessing.

Capture the same camera after each pass. If materials are indistinguishable
without bloom, fix lighting/materials first.

## 8. Common Failures

- ambient intensity so high that normals and shadows become irrelevant;
- pure black shadows with no bounce or readable form;
- colored lights with no visible source;
- every material using the same roughness and clean base color;
- excessive transmission/clearcoat on background props;
- wrong texture color space making albedo too dark or data maps incorrect;
- a dark scene made "cinematic" only by reducing exposure;
- one global noise map applied at incompatible world scales.
