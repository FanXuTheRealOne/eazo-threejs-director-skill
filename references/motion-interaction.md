# Motion and Interaction

Design movement as communication. Every important action needs anticipation,
response, consequence, and recovery appropriate to its weight.

## Contents

- [State and update-speed boundaries](#1-state-first)
- [Motion and input contracts](#3-motion-grammar)
- [Feedback and GLB animation](#5-feedback-matrix)
- [Signature timing and failures](#7-signature-moment-timing)

## 1. State First

Model interaction as explicit states:

```ts
type Phase = "boot" | "ready" | "active" | "resolving" | "result" | "recovery";
```

Add domain substates rather than boolean combinations such as `isMoving &&
isScary && !isDone`. Define permitted inputs and transition ownership. Ignore,
queue, or cancel input deliberately during cinematics.

## 2. Separate State Speeds

- React state/store: phase, score, selected item, settings, result.
- Refs: target transforms, velocities, impulses, animation weights, shake trauma.
- Rapier: physical pose, contacts, forces, joints.
- AnimationMixer: authored GLB clips and crossfades.
- Framer Motion: DOM HUD, menus, result transitions.

Never call a React state setter every `useFrame`. Mutate refs/objects in the hot
loop and publish coarse events only on meaningful transitions.

## 3. Motion Grammar

For each moving system define:

- mass/weight impression;
- acceleration and braking time;
- maximum speed and travel bounds;
- overshoot and damping;
- anticipation pose or sound;
- secondary motion delay;
- interruption and recovery.

Use frame-rate-independent interpolation:

```ts
const alpha = 1 - Math.exp(-lambda * delta);
current.lerp(target, alpha);
```

Use springs when overshoot carries meaning. Use GSAP or authored timelines for
deterministic cinematics, but keep gameplay state authoritative and kill/replace
timelines on interruption.

## 4. Input Contract

Support only controls that fit the fantasy:

- pointer/touch raycasting for direct selection;
- keyboard + virtual joystick for movement;
- drag planes or constrained axes for manipulation;
- buttons for discrete machine actions;
- pointer lock only when first-person control justifies it.

For touch:

- prevent unwanted page gesture only within the active control surface;
- place controls outside safe-area insets;
- keep stable control dimensions;
- support simultaneous look/move only if ergonomically necessary;
- include a visible pause/release path for pointer lock or continuous play.

## 5. Feedback Matrix

For each major event fill:

| Event | 0-100 ms | World/physics | Camera | Audio | Persistent result |
| --- | --- | --- | --- | --- | --- |
| select | highlight/pose | optional | tiny focus | tick | selected id |
| impact | flash/deform/particles | impulse/bounce | trauma | transient | damage/score |
| success | state color/animation | settle/release | authored push | motif | progress |
| failure | readable miss | recovery motion | restrained response | cue | retry state |

Avoid firing every channel at maximum intensity. Assign a dominant channel and
supporting channels.

## 6. GLB Animation

- List available clips and inspect duration/loop intent.
- Normalize clip names in an adapter rather than scattering raw names.
- Crossfade locomotion and state clips; do not hard cut unless the style wants it.
- Use additive or layered animation only when the source clips support it.
- Keep model root transform separate from skeleton animation.
- Use procedural secondary motion for eyes, accessories, suspension, recoil, or
  camera targets when it provides control.

Character motion does not require a GLB, but nuanced organic deformation usually
benefits from a rigged model. Mechanical and abstract motion is often cleaner in
procedural object hierarchies.

## 7. Signature Moment Timing

Build a readable sequence:

1. anticipation: 100-600 ms;
2. onset: fast state or light change;
3. primary motion: clear trajectory and silhouette;
4. peak: short hold or impact;
5. follow-through: secondary motion, particles, audio tail;
6. recovery: controlled return or new stable state.

The exact timing follows genre. Horror often delays onset then accelerates;
premium product reveals move slowly with small easing; arcade impact is rapid
and exaggerated.

## 8. Avoid

- transform updates split across competing frame loops and timelines;
- animation speed tied to raw frame count;
- input listeners recreated every render;
- no cancellation when the component unmounts or phase changes;
- physics body teleports while visible mesh interpolates independently;
- idle animation so large it changes layout or camera framing;
- long cinematic lockout with no skip/recovery when repeated.
