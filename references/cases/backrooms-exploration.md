# Case: Backrooms Exploration

Use this case for liminal spaces, procedural corridors, first-person exploration,
maze tension, institutional horror, or "endless room" prompts. This is primarily
a procedural architecture problem, not a reason to generate a giant opaque GLB.

## Contents

- [Brief and Design DNA](#trigger-example)
- [Asset and architecture strategy](#asset-routing)
- [Image2, camera, and interaction](#image2-pack)
- [Lighting, performance, anti-patterns, and evidence](#lighting-and-audio)

## Trigger Example

> I want a playable game with a backrooms theme.

## Inferred Production Brief

- Emotional promise: mundane repetition that slowly becomes spatially wrong.
- Core loop: orient -> move -> detect anomaly/audio cue -> choose path -> reach a
  landmark or survive a short encounter.
- Spatial archetype: modular connected rooms/corridors with controlled variation.
- Hero: the environment and navigation rhythm; one optional high-value entity.
- Signature moment: geometry/light rhythm breaks and camera/audio reveal a
  spatial anomaly, not a random fullscreen image.
- Mobile: virtual move/look zones or tap-to-move depending scope; clear pause.

## Design DNA Example

- Base: nicotine yellow-green walls with a dirty neutral counterpoint; avoid a
  single flat yellow frame.
- Light: fluorescent ceiling cadence, localized failures/flicker, dim bounce,
  occasional distant cooler or warmer landmark.
- Shapes: low ceiling, repetitive rectilinear modules, irregular openings,
  occasional impossible scale/proportion.
- Materials: fibrous/stained wallpaper, worn carpet with directional pile,
  acoustic ceiling, aged plastic diffusers, damp patches, painted trim.
- Camera: first person, 58-70 degree FOV, human eye height, restrained head bob,
  no roll during normal movement.
- Motion: grounded acceleration and stop, tiny step response, no constant sway.
- Audio: fluorescent hum bands, carpet steps, distant localized events, room tone
  changes as navigation signal.
- Fog: modest distance control matching wall palette; keep next route readable.

## Asset Routing

| Asset/system | Route | Reason |
| --- | --- | --- |
| wall/floor/ceiling modules | procedural + instancing | repeat, runtime layout, culling |
| openings/trim/columns | procedural | dimensional variation and landmarks |
| fixtures/tubes | procedural instances | cadence and light ownership |
| wallpaper/carpet/ceiling | generated/curated tile textures + masks | surface identity |
| stains/leaks/signs | decals/Canvas textures | localized story variation |
| maze/layout | procedural graph with authored chunks | navigation and replay |
| player collider | Rapier capsule | stable first-person collision |
| anomaly effects | procedural geometry/shader | runtime state transformation |
| optional creature | generated rigged GLB | organic high-value hero |
| HUD/pause | DOM | accessibility and stable mobile controls |

## Procedural Architecture Contract

Build modules in world units with consistent floor/ceiling heights, wall
thickness, doorway sizes, trim sockets, fixture sockets, collider proxies, and
material UV scale. Generate layout from a graph, then instantiate visible
modules. Keep one authored route/landmark structure even if local arrangement is
procedural.

Variation layers:

1. topology: turns, rooms, columns, dead ends, openings;
2. proportion: controlled width/height changes;
3. light state: stable, failed, flicker, color landmark;
4. surface state: stain, damp, peeled, repaired;
5. prop/signature anomaly: rare and intentionally placed.

Do not randomize every parameter independently; repetition is part of the mood.

## Image2 Pack

1. 3-4 mood frames testing corridor proportion, ceiling cadence, and material
   age while preserving navigable visibility.
2. Material sheet for wallpaper, carpet, ceiling, fixture plastic/metal, dampness.
3. Default navigation, landmark, and anomaly key shots at first-person eye level.
4. Orthographic sheets only for a close hero prop or creature, not for repeated
   room modules that code can define exactly.

## Camera and Controls

- camera rides a Rapier capsule or a controller synchronized to collision;
- yaw and pitch have explicit ranges; no normal-play roll;
- head bob derives from grounded movement speed and phases smoothly to zero;
- footsteps derive from distance traveled while grounded, not a timer alone;
- camera never enters walls; near plane is tuned for close corridor geometry;
- touch look/move surfaces are stable and respect safe areas;
- pointer lock has a visible release/pause path.

## Interaction State Machine

```text
loading -> ready -> exploring
exploring -> observing-anomaly -> changed-layout -> exploring
exploring -> encounter -> escape|caught -> result -> reset
```

Keep an initial scope finishable: a short directed route with a landmark and one
signature anomaly is better than an endless empty maze.

## Lighting and Audio

- fluorescent fixtures are visible emissive geometry plus grouped practical
  lights or baked/faked pools;
- only nearby/important fixtures cast dynamic shadows;
- flicker uses infrequent designed patterns, not constant random flashing;
- audio zones crossfade hum/noise and use positional one-shots for orientation;
- anomaly states may remove one frequency/light cadence before visual reveal.

## Shader/Post Strategy

- subtle fixture flicker and material roughness variation;
- optional local distortion at impossible geometry, scoped to the event;
- restrained color grading and vignette;
- no permanent VHS stack unless the brief explicitly requests a mediated camera;
- reduced-motion mode removes aggressive pulse/shake while preserving cues.

## Performance

- instance repeated architecture and fixtures;
- frustum/distance/room-portal cull modules;
- cap visible shadow lights and decals;
- reuse tileable material sets at correct world scale;
- keep physics to nearby static colliders and one player capsule;
- use low-cost distant shell/fog instead of building unseen rooms;
- generated creature loads only before its authored encounter.

## Anti-Patterns

- a giant generated "backrooms.glb" with unusable collisions and no variation;
- a flat yellow box with fluorescent rectangles and heavy fog;
- random maze with no landmark, route logic, or completion;
- constant flicker/head bob that causes discomfort;
- generated atmospheric background replacing navigable space;
- creature shown constantly, destroying environmental tension.

## Acceptance Evidence

- complete movement/look/pause/reset works with collision;
- default frame has material and depth variation without losing navigation;
- landmark and anomaly are recognizable in captures;
- mobile controls do not move the page or overlap safe areas;
- repeated modules use stable UV/world scale and do not z-fight;
- active corridor performance and renderer counts meet the selected tier;
- console, asset, shader, and WebGL checks pass.
