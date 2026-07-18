# Shaders and Postprocessing

Use shaders to express a specific material, transition, or atmospheric behavior.
Use postprocessing to unify the rendered image. Neither replaces geometry,
lighting, composition, or material separation.

For a visually styled prompt, no shader or post effect enters the stack until
`prompt-reference-lookdev.md` records the reference role/crop, observed behavior,
runtime translation, valid range, fallback, and comparison shot.

## Contents

- [Tool and shader contract](#1-choose-the-smallest-tool)
- [Color output and realtime effects](#3-correct-output)
- [Postprocessing and event envelopes](#5-postprocessing-stack)
- [Performance and failures](#7-performance)

## 1. Choose the Smallest Tool

Use built-in material parameters first. Then consider:

- `onBeforeCompile` or material plugins for a small extension to PBR behavior;
- `ShaderMaterial` for fully custom surfaces/effects;
- points/instanced attributes for large particle fields;
- screen-space postprocessing for whole-frame effects;
- DOM/CSS for interface transitions that are not spatial.

Do not rewrite lighting in a custom shader just to add a scrolling mask.

## 2. Shader Contract

Before coding, specify:

```text
Visual purpose:
Reference role/IDs and crop:
Observed reference behavior:
Geometry/domain:
Uniforms and valid ranges:
Vertex deformation:
Fragment/color behavior:
World/view/screen space choice:
Transparency/depth/blending:
Color-space and tone-mapping path:
Mobile fallback:
Performance risk:
Comparison shot/crop:
```

Keep time, resolution, pointer, camera, and state uniforms centralized. Update
uniform values through refs in `useFrame`; do not recreate materials every
render.

## 3. Correct Output

Current Three.js renders in a Linear-sRGB working space and converts for display.
Custom final-color shaders must participate in tone mapping and output color
conversion when appropriate. Prefer Three shader chunks or maintained helper
materials over copied old snippets that manually apply gamma.

Data textures remain linear. Base color and emissive beauty textures use sRGB.
Test custom shader output with and without postprocessing to detect double color
conversion.

## 4. Useful Realtime Effects

### Surface reveal/transformation

Use a stable object-space or UV mask, edge band, and state uniform. The edge may
drive emission, particles, or displacement. Keep the underlying geometry/state
change real if silhouette must transform.

### Grime/wetness variation

Blend roughness and color through world-position/UV masks plus contact/use logic.
Avoid one global noise frequency across all object scales.

### Hologram/CRT/spectral effect

Use scan modulation, fresnel, controlled noise, and limited channel separation.
Preserve silhouette and interaction readability. Provide a reduced effect on
mobile and reduced-motion modes.

### Particles

Prefer GPU-friendly points or instancing. Define spawn source, lifetime,
trajectory, size-over-life, color-over-life, depth behavior, and pooling. Do not
allocate new objects every frame.

## 5. Postprocessing Stack

Add the fewest effects that serve the Design DNA and approved render references:

- antialiasing/SMAA when needed by the chosen renderer path;
- ambient occlusion only when it materially improves contact/detail and budget
  allows;
- bloom for selected emissive values, not all bright surfaces;
- color grading/tone mapping for final palette cohesion;
- vignette only when it supports focus and stays subtle;
- depth of field mainly for authored shots, not active gameplay;
- motion blur/chromatic aberration only for brief event states with accessible
  fallback.

Order matters. Verify the final stack's color output and transparent objects.
If an effect has no visible evidence in the approved reference pack, omit it.

## 6. Event-Driven Intensity

Tie effect intensity to explicit state with an envelope:

```text
idle baseline -> anticipation ramp -> event peak -> short hold -> recovery
```

Examples: brief bloom increase on power-up, distortion pulse at portal crossing,
desaturation on failure, speed streaks above a velocity threshold. Always return
to a stable baseline.

## 7. Performance

- avoid full-resolution multi-pass effects on low tiers;
- cap particle count and overdraw;
- reduce transparent layers;
- share shader programs and use defines sparingly;
- avoid dynamic shader recompiles during play;
- prewarm signature materials/effects before the event;
- expose quality toggles for SSAO, reflections, particles, and DOF.

## 8. Avoid

- full-screen noise, scanlines, bloom, and aberration all at high intensity;
- `ShaderMaterial` copied from an old Three version without color-space audit;
- transparent effects that disable depth incorrectly and show through walls;
- visual effects overlapping HUD/control safe zones;
- shader uniforms updated by React state every frame;
- postprocessing used to make a blank scene feel detailed.
