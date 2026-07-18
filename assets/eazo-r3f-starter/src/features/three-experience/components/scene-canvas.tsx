"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import type {
  ExperiencePhase,
  QualityTier,
} from "../lib/scene-contract";
import { CAMERA_SHOTS } from "../lib/scene-contract";
import { CameraRig } from "./camera-rig";
import { DevelopmentTelemetry } from "./development-telemetry";
import { Scene } from "./scene";

export function SceneCanvas({
  phase,
  qualityTier,
  reducedMotion,
}: {
  phase: ExperiencePhase;
  qualityTier: QualityTier;
  reducedMotion: boolean;
}) {
  const dpr: [number, number] = qualityTier === "high" ? [1, 1.8] : [1, 1.35];

  return (
    <Canvas
      dpr={dpr}
      shadows={qualityTier !== "reduced" ? "percentage" : false}
      camera={{ position: [0, 2.4, 7.2], fov: 46, near: 0.05, far: 120 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1;
      }}
      fallback={<div role="alert">3D rendering is unavailable.</div>}
    >
      <Suspense fallback={null}>
        <Scene
          phase={phase}
          qualityTier={qualityTier}
          reducedMotion={reducedMotion}
        />
        <CameraRig shot={CAMERA_SHOTS[phase]} />
        <DevelopmentTelemetry phase={phase} qualityTier={qualityTier} />
      </Suspense>
    </Canvas>
  );
}
