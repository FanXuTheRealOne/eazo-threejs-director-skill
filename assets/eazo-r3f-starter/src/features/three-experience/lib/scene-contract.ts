export type ExperiencePhase =
  | "boot"
  | "ready"
  | "active"
  | "signature"
  | "result"
  | "recovery";

export type QualityTier = "high" | "balanced" | "reduced";

export type CameraShot = {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  damping: number;
  portraitPosition?: [number, number, number];
  portraitTarget?: [number, number, number];
  portraitFov?: number;
};

export const CAMERA_SHOTS: Record<ExperiencePhase, CameraShot> = {
  boot: {
    position: [0, 2.4, 7.2],
    target: [0, 1, 0],
    fov: 46,
    damping: 4,
    portraitPosition: [0, 2.5, 8.8],
    portraitFov: 48,
  },
  ready: {
    position: [3.8, 2.8, 6.4],
    target: [0, 1, 0],
    fov: 42,
    damping: 5,
    portraitPosition: [0, 2.6, 8.4],
    portraitFov: 47,
  },
  active: {
    position: [2.6, 2.1, 5],
    target: [0, 0.9, 0],
    fov: 45,
    damping: 7,
    portraitPosition: [0, 2.1, 7.2],
    portraitFov: 46,
  },
  signature: {
    position: [0.6, 1.8, 4.4],
    target: [0, 1.1, 0],
    fov: 40,
    damping: 10,
    portraitPosition: [0, 1.9, 5.8],
    portraitFov: 44,
  },
  result: {
    position: [-2.8, 2.6, 5.8],
    target: [0, 1, 0],
    fov: 42,
    damping: 5,
    portraitPosition: [0, 2.5, 8],
    portraitFov: 46,
  },
  recovery: {
    position: [3.8, 2.8, 6.4],
    target: [0, 1, 0],
    fov: 42,
    damping: 5,
    portraitPosition: [0, 2.6, 8.4],
    portraitFov: 47,
  },
};
