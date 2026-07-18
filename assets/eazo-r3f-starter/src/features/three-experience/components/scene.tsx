"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import type {
  ExperiencePhase,
  QualityTier,
} from "../lib/scene-contract";

export function Scene({
  phase,
  qualityTier,
  reducedMotion,
}: {
  phase: ExperiencePhase;
  qualityTier: QualityTier;
  reducedMotion: boolean;
}) {
  const hero = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!hero.current || reducedMotion) return;
    const target = phase === "signature" ? 0.18 : 0;
    hero.current.rotation.y += (target - hero.current.rotation.y) * Math.min(1, delta * 4);
    hero.current.position.y = 0.95 + Math.sin(state.clock.elapsedTime * 1.2) * 0.025;
  });

  return (
    <>
      <color attach="background" args={["#111412"]} />
      <fog attach="fog" args={["#111412", 10, 28]} />

      <ambientLight intensity={0.22} color="#9db2a0" />
      <directionalLight
        castShadow={qualityTier !== "reduced"}
        color="#f3d7ad"
        intensity={2.2}
        position={[4, 7, 5]}
        shadow-mapSize-width={qualityTier === "high" ? 2048 : 1024}
        shadow-mapSize-height={qualityTier === "high" ? 2048 : 1024}
      />
      <pointLight color="#62d69a" intensity={12} distance={8} position={[-3, 2, 1]} />

      <group ref={hero} position={[0, 0.95, 0]}>
        <RoundedBox args={[2.2, 1.8, 2.2]} radius={0.16} smoothness={4} castShadow>
          <meshStandardMaterial color="#59645c" roughness={0.42} metalness={0.45} />
        </RoundedBox>
        <mesh position={[0, 0, 1.12]}>
          <circleGeometry args={[0.42, 48]} />
          <meshStandardMaterial
            color={phase === "signature" ? "#ff574d" : "#8ff0bb"}
            emissive={phase === "signature" ? "#ff1808" : "#1b7f51"}
            emissiveIntensity={phase === "signature" ? 3 : 1.2}
            roughness={0.28}
          />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#202522" roughness={0.82} metalness={0.05} />
      </mesh>
    </>
  );
}
