# Realtime Performance

Performance is part of interaction quality. Measure representative active and
signature states; an empty opening frame is not a useful benchmark.

## Contents

- [Targets and quality tiers](#1-establish-targets)
- [Geometry, textures, CPU, and physics](#3-geometry-and-draw-calls)
- [Shaders and adaptive quality](#7-shaders-and-postprocessing)
- [Measurement](#9-measure)

## 1. Establish Targets

Choose targets from the actual audience and device:

```text
Desktop target FPS/frame time:
Mobile target FPS/frame time:
Maximum DPR:
Draw calls:
Visible triangles:
Texture memory/size policy:
Dynamic shadow lights:
Postprocessing passes:
Physics body/collider count:
Particle count/overdraw:
```

Reasonable initial budgets for a compact Eazo experience:

| Metric | Desktop starting target | Mobile starting target |
| --- | ---: | ---: |
| DPR | 1-2 | 1-1.5 |
| draw calls | under 200 | under 100 |
| visible triangles | under 500k | under 200k |
| shadow-casting lights | 1-2 | 0-1 |
| full-screen expensive passes | 1-3 | 0-1 |

These are diagnostic targets, not universal limits. Measure and adjust by scene.

## 2. Quality Tier Order

Degrade in this order while preserving the fantasy:

1. DPR and antialiasing strategy;
2. shadow map resolution, update frequency, secondary shadow casters;
3. reflections, AO, DOF, motion blur, volumetric effects;
4. particle count, transparent overdraw, decal density;
5. distant props/LOD and texture resolution;
6. secondary animation and decorative physics bodies.

Preserve input semantics, core physics, hero silhouette, state readability,
primary light, and signature interaction.

## 3. Geometry and Draw Calls

- instance repeated modules/props;
- merge static geometry only when material, culling, and update behavior agree;
- use LOD for assets with meaningful distance change;
- keep distant shells simple and avoid hidden backfaces/interiors;
- reduce material slots on generated GLBs;
- disable shadows per mesh unless they add visible value;
- avoid hundreds of unique materials with tiny parameter differences.

## 4. Textures

- size by maximum screen pixels, not source availability;
- use compressed formats and mipmaps;
- share atlases for small props/decals when practical;
- cap anisotropy rather than maxing every texture;
- avoid many transparent 4K overlays;
- release render targets and temporary textures;
- inspect generated assets for duplicate embedded textures.

## 5. CPU and React

- do not set React state every frame;
- reuse math objects and avoid hot-loop allocations;
- throttle expensive raycasts and telemetry;
- keep event listeners stable and clean them up;
- pause or reduce simulation when hidden, paused, or in result screens;
- use spatial partitioning or distance checks for large scenes;
- avoid mounting/unmounting the whole Canvas for ordinary state changes.

## 6. Physics

- use simple explicit colliders;
- allow settled bodies to sleep;
- limit active debris and recycle it;
- use collision groups to avoid irrelevant pairs;
- keep fixed timestep and cap catch-up work;
- use sensors instead of detailed collision for zone detection;
- reduce secondary bodies on mobile tiers.

## 7. Shaders and Postprocessing

- avoid dynamic shader recompilation;
- prewarm signature materials;
- reduce full-screen resolution for blur/volumetric passes;
- limit transparency and particles filling the entire viewport;
- use event-driven effects rather than permanent maximum intensity;
- verify the post stack on integrated/mobile GPUs.

## 8. Adaptive Quality

Base adaptation on sustained frame time, not one slow loading frame. Use
hysteresis so quality does not oscillate:

```text
sample 2-5 seconds -> downgrade after sustained misses -> cooldown -> upgrade
only after a longer stable period
```

Persist user-selected quality. Honor reduced motion separately from performance.

## 9. Measure

Collect:

- `gl.info.render` calls/triangles/points/lines;
- `gl.info.memory` geometries/textures;
- frame-time percentile or rolling average during active play;
- loaded asset sizes and failed requests;
- browser console/shader warnings;
- WebGL context loss;
- screenshot evidence that reduced tiers still preserve composition.

Do not optimize blind. Fix the dominant bottleneck, then remeasure.
