# Camera Language

The camera is part of gameplay and art direction. Treat it as an explicit state
machine with composition constraints, not a freely moving utility.

## Contents

- [Relationship and numeric shot](#1-choose-the-relationship)
- [Composition and camera state](#3-compose-in-layers)
- [R3F rig, shake, and lens moments](#5-r3f-rig-pattern)
- [Failure modes](#8-avoid)

## 1. Choose the Relationship

| Experience | Camera default | Primary risk |
| --- | --- | --- |
| First-person exploration | body/capsule-relative, damped look | nausea, clipping, no orientation |
| Third-person action | spring chase + look-ahead | losing hero, wall penetration |
| Racer | chase/hood states + speed FOV | jitter, horizon instability |
| Fixed machine/tabletop | authored fixed/dolly states | dead frame, weak depth |
| Product viewer | bounded orbit + detail presets | generic demo feel |
| Cinematic rail | spline/shot states + limited steering | no agency, abrupt cuts |
| Jumpscare/reveal | subject-to-camera motion plus bounded camera reaction | clipping, unreadable closeup |

## 2. Establish the Shot Numerically

Record:

- position and look target;
- vertical FOV and allowed range;
- camera height relative to hero and ground;
- hero bounding-box occupancy as percentage of viewport height/width;
- safe margins for HUD and mobile controls;
- near/far planes tightly enough for depth precision;
- movement bounds and collision behavior.

Useful starting ranges, not universal presets:

- intimate/telephoto object: 25-40 degrees;
- natural authored view: 40-55 degrees;
- first person/action: 55-75 degrees;
- speed burst: increase base FOV by 4-12 degrees, then ease back;
- avoid extreme wide angles unless distortion serves the brief.

## 3. Compose in Layers

- Foreground frames motion or creates parallax without blocking the interaction.
- Midground holds hero and gameplay-readable geometry.
- Background establishes scale, direction, and atmosphere.
- Keep the look target near the interaction, not always the hero origin.
- Leave intentional lead room in the direction of travel or gaze.
- Verify composition at actual desktop and mobile aspect ratios.

## 4. Camera State Contract

```ts
type CameraMode =
  | "establishing"
  | "play"
  | "action"
  | "signature"
  | "result"
  | "recovery";

type CameraShot = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration: number;
  damping: number;
  maxShake: [number, number, number];
};
```

Transitions require a trigger, duration, easing/damping, interruption rule, and
recovery target.

## 5. R3F Rig Pattern

Keep target transforms in refs. Smooth with frame-rate-independent damping.

```tsx
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useRef } from "react";

const desiredPosition = new Vector3();
const desiredTarget = new Vector3();

export function CameraRig({ shot }: { shot: CameraShot }) {
  const { camera } = useThree();
  const look = useRef(new Vector3(...shot.target));

  useFrame((_, delta) => {
    desiredPosition.set(...shot.position);
    desiredTarget.set(...shot.target);
    const lambda = Math.max(0.01, shot.damping);
    camera.position.x = MathUtils.damp(camera.position.x, desiredPosition.x, lambda, delta);
    camera.position.y = MathUtils.damp(camera.position.y, desiredPosition.y, lambda, delta);
    camera.position.z = MathUtils.damp(camera.position.z, desiredPosition.z, lambda, delta);
    look.current.lerp(desiredTarget, 1 - Math.exp(-lambda * delta));
    if ("fov" in camera) {
      camera.fov = MathUtils.damp(camera.fov, shot.fov, lambda, delta);
      camera.updateProjectionMatrix();
    }
    camera.lookAt(look.current);
  });
  return null;
}
```

Adapt rather than copying global vectors when multiple rigs may mount.

## 6. Shake and Impact

Use trauma/impulse envelopes, not random displacement forever:

1. add trauma from an event based on impact strength;
2. decay trauma over 150-600 ms;
3. sample deterministic noise;
4. scale position and rotation below shot-specific maxima;
5. apply around the authored base transform;
6. return exactly to the base shot.

Suggested readable envelopes:

- button/mechanical latch: 20-80 ms micro impulse;
- medium collision: 120-250 ms;
- heavy crash/reveal: 250-600 ms with lower-frequency rotation;
- mobile/reduced-motion: reduce translation/rotation, keep light/sound response.

## 7. Jumpscare or Subject-to-Lens Moment

When a character must jump to camera:

- animate the actual 3D character or a high-quality clone of its current state;
- move along a controlled path toward a point in camera space;
- increase screen occupancy while preserving face readability;
- switch expression/material/mesh state before or during approach;
- add a short light and sound event plus bounded camera kick;
- stop before near-plane clipping;
- hold 100-300 ms, then recover or cut according to the brief;
- use a separate render layer only when world occlusion would make the event
  impossible, while keeping the object genuinely 3D.

## 8. Avoid

- per-frame React state for camera transforms;
- hardcoded desktop composition with no mobile shot;
- look-at target snapping separately from camera position;
- shake applied before smoothing, which can be damped away unpredictably;
- camera FOV pumping continuously;
- uncontrolled `OrbitControls` in authored gameplay;
- camera paths that enter walls or hero geometry.
