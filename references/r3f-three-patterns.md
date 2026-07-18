# R3F and Three.js Patterns

Use these patterns with the official Eazo React 19 template. Confirm exact local
versions before relying on version-sensitive APIs.

## Contents

- [Dependencies and Eazo structure](#1-dependency-pairing)
- [Canvas and state boundaries](#3-canvas-shell)
- [GLB, allocation, and loading](#5-glb-adapter)
- [Events, textures, and telemetry](#8-raycasting-and-events)
- [Vanilla Three.js and maintainability](#11-vanilla-threejs)

## 1. Dependency Pairing

For React 19:

```bash
bun add three @react-three/fiber@^9 @react-three/drei \
  @react-three/rapier@^2 @react-three/postprocessing postprocessing
bun add -d @types/three playwright
```

Install Rapier/postprocessing/Playwright only when used. R3F 9 pairs with React
19; R3F 8 pairs with React 18.

## 2. Eazo Structure

Keep `src/app/page.tsx` thin:

```tsx
import { ThreeExperience } from "@/features/three-experience/components/three-experience";

export default function HomePage() {
  return <ThreeExperience />;
}
```

Place Canvas and realtime code in client components under a feature directory.
Keep DOM HUD outside Canvas. Preserve `EazoProvider`, `UserSyncEffect`, i18n,
metadata environment variables, SDK patterns, `100dvh`, and safe-area insets.

## 3. Canvas Shell

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";

export function SceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.2, 6], fov: 45, near: 0.05, far: 250 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
      fallback={<div role="alert">3D rendering is unavailable.</div>}
    >
      <Scene />
    </Canvas>
  );
}
```

Calibrate these values for the project. Avoid `preserveDrawingBuffer` unless a
specific capture workflow requires it.

## 4. State Boundaries

- Product/UI state: React state or a small store.
- Per-frame transforms: refs and `useFrame`.
- Loaded immutable assets: Drei loaders and Suspense.
- Physics state: Rapier bodies/events.
- DOM transitions: Framer Motion.

Do not call state setters inside `useFrame` except on a threshold crossing with
an explicit guard.

## 5. GLB Adapter

Create one adapter per hero asset:

```tsx
"use client";

import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { useMemo } from "react";

export function HeroModel(props: GroupProps) {
  const gltf = useGLTF("/models/hero.glb");
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/hero.glb");
```

Normalize orientation, scale, ground offset, material overrides, clip mapping,
shadows, and named anchors inside this adapter. Clone skinned or independently
mutated instances correctly. Do not mutate the cached source scene globally.

## 6. Repetition and Allocation

- Reuse geometry/material objects with `useMemo` or module constants.
- Use `InstancedMesh`/Drei `Instances` for many repeated static objects.
- Reuse vectors, quaternions, colors, and raycast targets in hot loops.
- Pool particles and debris.
- Avoid creating arrays/objects inside every `useFrame` when preventable.
- Let R3F dispose owned resources; set `dispose={null}` only when deliberately
  sharing externally managed resources.

## 7. Loading and Errors

Use Suspense for model/texture loading plus a DOM loading state that does not
destroy layout. Add an error boundary around the Canvas/experience. Verify all
asset URLs in production base paths. Preload only critical first-frame assets;
stream or lazy-load secondary/signature assets with a planned fallback.

## 8. Raycasting and Events

R3F pointer events bubble through the scene. Stop propagation only when overlap
semantics require it. Increase interaction hit area with invisible simple proxy
meshes rather than tiny detailed geometry. Keep pointer cursor and selected state
consistent with actual affordances.

## 9. Texture Rules

- set color space according to semantic channel;
- configure wrapping/repeat intentionally;
- choose anisotropy based on renderer capability and camera angle;
- avoid uncompressed 4K textures for small mobile props;
- resize images to GPU-friendly dimensions and compress production assets;
- use KTX2 where pipeline support and payoff justify it.

## 10. Renderer Telemetry

Read after a representative frame:

```ts
const { calls, triangles, points, lines } = gl.info.render;
const { geometries, textures } = gl.info.memory;
```

Expose development telemetry through `window.__EAZO_3D_DEBUG__` or a hidden debug
panel so browser scripts can inspect state, renderer counts, camera, and quality
tier. Remove visible debug UI from production.

## 11. Vanilla Three.js

Use direct Three when the host is not React. Own renderer creation, resize,
requestAnimationFrame, loaders, event listeners, resource disposal, and context
loss handling explicitly. Do not use old APIs such as `Geometry`/`Face3` or
unverified `examples/jsm` imports.

## 12. Maintainability

- one exported component per file where the Eazo template requires it;
- group by feature, not by generic type alone;
- isolate camera, physics, hero adapter, environment, effects, audio, HUD, and
  state machine responsibilities;
- keep shader strings in dedicated modules;
- centralize tuning constants and quality tiers;
- comment only non-obvious coordinate, physics, or shader assumptions.
