# Case: Cinematic Racer

Use this case for racing, driving, chase cameras, hero vehicles, road streaming,
speed effects, impacts, or a request where one complex mechanical subject must be
decomposed and generated with high visual fidelity.

## Contents

- [Brief and Design DNA](#trigger-example)
- [Vehicle decomposition and asset routing](#hero-vehicle-decomposition)
- [Image2, camera, and vehicle state](#image2-pack)
- [Environment, performance, failures, and evidence](#environment-direction)

## Trigger Example

> Build a cinematic arcade racer through a rainy neon city. It should feel fast
> and premium, with great camera motion and collision feedback.

## Inferred Production Brief

- Emotional promise: immediate control, planted weight, speed escalation, and a
  stylish but readable wet-city run.
- Core loop: steer/accelerate -> read route -> avoid or impact -> maintain speed
  -> reach checkpoint/result.
- Spatial archetype: forward-streamed track with authored landmark chunks.
- Hero: vehicle occupies a strong lower-center frame region; city supports speed.
- Signature moment: near miss/boost or impact transitions into a controlled
  cinematic camera/effect envelope while remaining playable.
- Mobile: landscape-first touch steering and throttle/brake or simplified
  steering; portrait fallback must be intentionally framed if supported.

## Design DNA Example

- Base: rainy neutral asphalt/concrete; use varied practical colors rather than
  an all-purple neon wash.
- Hero separation: body paint response, tail/head lights, rim highlights, road
  reflections, and value contrast.
- Shapes: low wide vehicle, directional track lines, vertical city rhythm,
  readable barriers and landmarks.
- Materials: clear-coated paint, glass, rubber, metal rims/brakes, wet asphalt,
  concrete, painted barriers, luminous signage.
- Camera: chase at 45-60 degree FOV, speed look-ahead, stable horizon, bounded
  yaw/roll, collision-aware distance; optional hood/replay states.
- Motion: chassis mass and suspension lag, wheels match speed/steer, body rolls
  slightly, impacts transfer directionally.
- Post: selected bloom, wet highlights, subtle speed streaks/DOF only above
  thresholds; avoid permanent blur.

## Hero Vehicle Decomposition

Generate and integrate separately controllable zones:

- body shell and paint material;
- glass and interior silhouette;
- front/rear lights and emissive lenses;
- four tires and rims with known radius/axle centers;
- brake details;
- front steering pivots;
- suspension anchors/travel;
- aero parts/spoiler;
- damage/scratch/decal zones if required;
- camera/look target and effects anchors;
- simplified chassis and wheel colliders.

Request named parts and known dimensions. Normalize model scale/orientation once
in a vehicle adapter.

## Asset Routing

| Asset/system | Route | Reason |
| --- | --- | --- |
| hero vehicle surfacing | generated/sourced GLB | silhouette-critical close subject |
| wheels/lights/suspension behavior | hybrid procedural hierarchy | direct animation/physics control |
| track/road/barriers | procedural modules | streaming, collision, layout |
| city massing | procedural instances + selected hero GLBs | density within budget |
| road/wetness/markings | PBR textures, decals, shader masks | scale and dynamic response |
| rain/spray/sparks/trails | pooled particles/shaders | state/speed-driven effects |
| vehicle/impact/audio | local layered assets | RPM, tire, wind, contact |
| HUD/touch controls | DOM | stable and accessible |

## Image2 Pack

1. Vehicle front/side/back/top turnaround at exact consistent dimensions.
2. Material sheet for paint, glass, rubber, rims, lights, interior silhouette.
3. Detail sheets for wheels, light assemblies, and aero parts.
4. Rainy-city default chase, boost/near-miss, impact, and result key shots.
5. Track/environment mood frames that show route readability, not only neon fog.

## Camera Rig

Chase target combines:

- chassis position/up orientation;
- velocity-derived look-ahead;
- steering lateral bias;
- speed-dependent distance/height/FOV;
- spring-damped position and target;
- obstacle/camera collision shortening;
- event trauma applied around the base rig.

Keep horizon stable. Limit roll to a readable small response. Recover FOV and
offsets after boosts/impacts. Do not bind camera directly to noisy wheel physics.

## Vehicle and Interaction State

```text
loading -> grid -> driving -> checkpoint/result
driving -> boost -> driving
driving -> impact -> recovery -> driving
driving -> disabled -> reset|result
```

- steering and throttle acknowledge input immediately;
- chassis forces, grip, damping, and center of mass create arcade-planted weight;
- wheels visually rotate and steer from authoritative vehicle state;
- suspension/body response follows surface and acceleration;
- impact magnitude/direction drives sparks, audio, damage state, and camera;
- checkpoints and reset cannot trigger repeatedly from sustained overlap.

## Environment Direction

Use authored chunks at intervals: underpass, open boulevard, tunnel, landmark,
construction pinch, finish. Stream/recycle modules around the player. City
background uses silhouette and light rhythm; only near track props need full
materials/collision. Wet reflection follows road and light positions without
turning every surface into a mirror.

## Performance

- simplify hero material slots and texture sizes while preserving paint/glass/
  tire/light separation;
- instance buildings, lamps, barriers, signs, and rain where suitable;
- stream/recycle track chunks;
- keep dynamic shadows centered near hero and key light;
- pool spray/sparks and tie count to quality tier;
- reduce reflection/post/secondary city detail on mobile before vehicle feel;
- sample frame time during boost/rain/traffic, not only at the grid.

## Anti-Patterns

- car made from a rounded box when shown close to camera;
- one-piece generated model with wheels fused to body;
- chase camera rigidly parented to chassis jitter;
- speed communicated only by extreme FOV and blur;
- all-purple wet city with no route/material separation;
- thousands of unique building meshes and lights;
- road reflections unrelated to visible sources;
- cinematic sequence that removes control for most of the session.

## Acceptance Evidence

- vehicle adapter proves correct scale, axes, ground contact, wheel pivots, and
  material zones;
- full drive/checkpoint/reset loop works on desktop and intended mobile layout;
- screenshots capture default chase, boost/near miss, impact, and result;
- camera keeps hero and route readable under steering and collision;
- body, glass, rubber, metal, lights, asphalt, and concrete read distinctly;
- performance telemetry is captured during the heaviest active state;
- no console, asset, shader, WebGL, or physics instability remains.
