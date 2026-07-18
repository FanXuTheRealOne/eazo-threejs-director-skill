# Physics and Feedback

Use Rapier when physical behavior is part of the fantasy: grabbing, stacking,
collisions, suspension, joints, projectiles, doors, falling prizes, or character
movement. Do not add a physics engine only to animate predetermined transforms.

## Contents

- [Runtime, bodies, and colliders](#1-current-eazo-pairing)
- [Tuning, joints, and collisions](#4-physical-tuning)
- [Claw and vehicle patterns](#7-grabbing-and-claw-mechanics)
- [Feedback and failures](#9-feedback-coordination)

## 1. Current Eazo Pairing

For React 19 and R3F 9, use `@react-three/rapier` v2. Wrap `<Physics>` in
`Suspense` because Rapier initializes lazily.

```tsx
<Suspense fallback={null}>
  <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} colliders={false}>
    {children}
  </Physics>
</Suspense>
```

The default Rapier timestep is fixed at 60 Hz. Prefer fixed stepping for stable
gameplay. Use variable stepping only with a measured reason.

## 2. Body Strategy

- `fixed`: world geometry and static colliders;
- `dynamic`: simulated props, prizes, debris, vehicle bodies;
- `kinematicPosition`: authored mechanisms moved by next kinematic transforms;
- `kinematicVelocity`: velocity-driven platforms where appropriate;
- sensors: triggers, pickup zones, finish lines, interaction volumes.

Move a kinematic body through Rapier APIs, not by changing the child mesh behind
the physics body.

## 3. Collider Strategy

Default to explicit simple colliders:

- cuboid for walls, shelves, chassis, platforms;
- ball for round objects and wheels where approximation is acceptable;
- capsule for characters and plush bodies;
- compound colliders for machines and vehicles;
- convex hull for irregular dynamic props after inspection;
- trimesh mainly for fixed concave world geometry.

Avoid dynamic trimesh colliders for detailed render meshes. Keep center of mass
near the rigid body origin. Visualize colliders with `debug` during development.

## 4. Physical Tuning

Tune as a system:

- mass and center of mass communicate scale;
- friction controls grip and sliding;
- restitution controls bounce, usually lower than intuition for heavy objects;
- linear/angular damping prevents endless toy-like motion;
- CCD prevents fast small bodies from tunneling;
- sleeping reduces cost for settled piles;
- solver iterations increase only for unstable important bodies.

Test at low and high frame rates. Provide a reset when a body leaves playable
bounds or becomes irrecoverably stuck.

## 5. Joints

Use the mechanism-appropriate joint:

- fixed for assembled parts;
- revolute for hinges and wheels;
- prismatic for rails, pistons, claws, sliders;
- spherical for ball joints;
- spring for suspension and compliant links;
- rope for maximum-distance constraints.

Do not fake a constrained machine with independent free rigid bodies. Define
limits, motors, damping, and end-stop feedback.

## 6. Collision Events

Use contact force or collision events for gameplay and feedback, but throttle
repeated contacts. Convert impact magnitude into a normalized intensity band:

```text
micro: surface tick only
small: sound + tiny particle/material response
medium: sound + particles + object recoil + camera impulse
heavy: stronger world response + bounded camera + persistent consequence
```

Do not trigger a full effect every simulation step while bodies remain touching.
Track cooldowns or collision-enter transitions.

## 7. Grabbing and Claw Mechanics

For a claw/machine interaction:

1. drive rail and claw head as kinematic constrained mechanisms;
2. close fingers around simplified prize colliders;
3. attach with a joint or controlled constraint only after contact/containment;
4. preserve believable swing using a spring/rope/impulse response;
5. release cleanly into a result chute or failure pile;
6. transition the won 3D model into the cinematic layer only after the physical
   result is resolved.

Avoid silently parenting a prize to the claw at arbitrary distance.

## 8. Vehicle Basics

Separate visual wheel motion from chassis physics but keep transforms coherent.
Define wheel radius, axle positions, suspension travel, spring stiffness,
damping, tire grip, steering limit, motor/brake forces, and chassis center of
mass. Use raycast/rigid wheel strategy intentionally. Add speed cues only after
handling is stable.

## 9. Feedback Coordination

Physics is one channel. On impact also consider:

- local material/emissive change;
- particles or decal at the contact point;
- positional audio with intensity mapping;
- camera trauma constrained by shot;
- HUD/score/state update once;
- haptic request where Eazo/device capability supports it.

Keep physical truth readable: effects should originate from contact location and
direction.

## 10. Avoid

- visual mesh and rigid body each owning different transforms;
- high restitution and low damping making every object rubbery;
- arbitrary masses across objects of similar scale;
- collision callbacks causing React updates every frame;
- no collision groups, causing sensors/effects to hit everything;
- physics continuing behind pause/result overlays;
- result logic based on a single noisy contact without hysteresis.
