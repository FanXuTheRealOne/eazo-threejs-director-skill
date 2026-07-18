"use client";

/* eslint-disable react-hooks/immutability -- R3F cameras are imperative scene objects updated inside the render loop. */

import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";
import { useRef } from "react";
import type { CameraShot } from "../lib/scene-contract";

const desiredPosition = new Vector3();
const desiredTarget = new Vector3();

export function CameraRig({ shot }: { shot: CameraShot }) {
  const { camera, size } = useThree();
  const lookTarget = useRef(new Vector3(...shot.target));

  useFrame((_, delta) => {
    const portrait = size.height > size.width * 1.15;
    const position = portrait && shot.portraitPosition ? shot.portraitPosition : shot.position;
    const target = portrait && shot.portraitTarget ? shot.portraitTarget : shot.target;
    const fov = portrait && shot.portraitFov ? shot.portraitFov : shot.fov;

    desiredPosition.set(...position);
    desiredTarget.set(...target);

    camera.position.x = MathUtils.damp(
      camera.position.x,
      desiredPosition.x,
      shot.damping,
      delta,
    );
    camera.position.y = MathUtils.damp(
      camera.position.y,
      desiredPosition.y,
      shot.damping,
      delta,
    );
    camera.position.z = MathUtils.damp(
      camera.position.z,
      desiredPosition.z,
      shot.damping,
      delta,
    );

    lookTarget.current.lerp(
      desiredTarget,
      1 - Math.exp(-shot.damping * delta),
    );

    if (camera instanceof PerspectiveCamera) {
      camera.fov = MathUtils.damp(
        camera.fov,
        fov,
        shot.damping,
        delta,
      );
      camera.updateProjectionMatrix();
    }

    camera.lookAt(lookTarget.current);
  });

  return null;
}
