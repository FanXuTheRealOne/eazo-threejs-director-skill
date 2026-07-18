"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import type {
  ExperiencePhase,
  QualityTier,
} from "../lib/scene-contract";

type DebugSnapshot = {
  phase: ExperiencePhase;
  qualityTier: QualityTier;
  camera: {
    position: [number, number, number];
    fov?: number;
  };
  renderer: {
    calls: number;
    triangles: number;
    geometries: number;
    textures: number;
  };
};

declare global {
  interface Window {
    __EAZO_3D_DEBUG__?: DebugSnapshot;
  }
}

export function DevelopmentTelemetry({
  phase,
  qualityTier,
}: {
  phase: ExperiencePhase;
  qualityTier: QualityTier;
}) {
  const { camera, gl } = useThree();
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (process.env.NODE_ENV === "production") return;
    elapsed.current += delta;
    if (elapsed.current < 0.5) return;
    elapsed.current = 0;

    window.__EAZO_3D_DEBUG__ = {
      phase,
      qualityTier,
      camera: {
        position: camera.position.toArray(),
        fov: "fov" in camera ? camera.fov : undefined,
      },
      renderer: {
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      },
    };
  });

  return null;
}
