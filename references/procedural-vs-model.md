# Procedural, Model, and Hybrid Routing

Route per object, not per project. A polished experience usually mixes all three
approaches.

## Contents

- [Decision questions](#decision-questions)
- [Procedural, GLB, and hybrid routes](#prefer-procedural-code)
- [Complex-subject decomposition](#complex-subject-decomposition)
- [Decision record and failures](#asset-decision-record)

## Decision Questions

For each asset ask:

1. Is its identity primarily silhouette, anatomy, or authored surface curvature?
2. Does it need arbitrary close inspection?
3. Does it repeat, tile, vary, or change dimensions at runtime?
4. Does gameplay need direct control over parts or topology?
5. Does it need skinning, expressions, or authored clips?
6. Can simple geometry plus excellent material/light treatment meet the shot?
7. What is its maximum screen occupancy?

## Prefer Procedural Code

Use primitives, custom `BufferGeometry`, instancing, curves, CSG, particles, or
shaders for:

- modular rooms, corridors, tunnels, tracks, rails, stairs, doors, shelves;
- cabinets, frames, pipes, cables, platforms, pistons, levers, claws;
- repeated props, debris, vegetation clusters, lights, ceiling grids;
- abstract forms, portals, force fields, water surfaces, trails, visualizers;
- runtime-generated levels and objects whose dimensions must change;
- collision proxies and invisible sensors.

Procedural does not mean raw boxes. Refine silhouette with bevels, profiles,
trim, thickness, joints, cut lines, layered parts, decals, and material zones.

## Prefer Generated or Sourced GLB

Use a model for:

- people, faces, hands, creatures, furred characters, clothing;
- hero vehicles/products with recognizable surfacing;
- exact historical or branded objects;
- complex furniture or props shown close to camera;
- characters requiring a skeleton, face states, or authored animation;
- topology whose visual identity is expensive to approximate in code.

For a named organic/branded subject, "generated" means the source-backed route:
real high-resolution reference research -> Codex Image2 identity-locked
turnaround -> Meshy 6 Multi-Image to 3D -> neutral turntable comparison. Do not
use text-to-3D or primitive anatomy when source photography exists. Reduce the
number of variants or animation complexity before reducing identity fidelity.

Validate every GLB:

- units and bounding box;
- origin, ground contact, forward/up axes;
- hierarchy and useful mesh names;
- material count and texture color spaces;
- normals, tangents, UVs, alpha modes, and duplicated surfaces;
- triangles, bones, morph targets, and animation clips;
- scale in default and mobile shots;
- simplified collider plan.

Do not place a model and compensate for unknown scale with random transform
values. Normalize it once in an asset adapter component.

## Prefer Hybrid Construction

Use hybrid when generated visual identity needs procedural control:

- character model + procedural eyes, particles, state effects, and proxy body;
- car body + procedural wheels, suspension, lights, trail, track, and colliders;
- claw-machine cabinet + generated prizes + procedural claw, rails, glass, and
  physics;
- generated product + procedural studio rig, turntable, annotations, and
  material controls;
- modular architecture + one generated hero creature or prop.

## Complex Subject Decomposition

Never send an opaque "make the whole thing" prompt when controllable parts
matter.

### Vehicle

Separate body shell, windows, lights, tires, rims, brake details, aero parts,
interior silhouette, steering front axle, suspension pivots, damage parts,
effects anchors, and collider chassis. Define wheel radius and axle positions.

### Character or collectible

Separate body, head/face, eyes/mouth, garment/fur shell, hands/feet, accessories,
expression or horror states, skeleton/clips, camera target, grab anchor, and
capsule/compound colliders.

### Machine

Separate structural shell, glass, mechanical rails, moving head/tool, controls,
doors, prize/output zone, practical lights, cables, grime/decal layers, audio
emitters, and interaction sensors.

### Architecture

Separate floor/wall/ceiling modules, trims, openings, fixtures, navigation
colliders, lighting modules, decals, prop sockets, occluders, and distant shell.

## Asset Decision Record

```text
Name:
Role and maximum screen occupancy:
Views/states required:
Strategy: procedural | image/texture | GLB | hybrid | DOM | audio
Reason:
Parts/material zones:
Motion/rig:
Collider/sensors:
Source or generation prompt:
Fallback:
Validation evidence:
```

## Avoid

- using a hero GLB for a distant 20-pixel prop;
- generating a unique model for repeated architecture that should instance;
- building anatomy from spheres/capsules for a close-up hero;
- merging parts that must animate, light, break, or change material separately;
- using high-poly render geometry as dynamic trimesh colliders;
- assuming the 3D generator creates game-ready pivots, UVs, clips, or colliders.
- calling recolored procedural characters authentic variants of a named IP;
- generating a recognizable subject from text alone because one-shot delivery
  makes source research feel slower.
