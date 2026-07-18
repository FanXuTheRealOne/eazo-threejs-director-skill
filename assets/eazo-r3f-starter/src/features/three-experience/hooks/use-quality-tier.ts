"use client";

import { useEffect, useState } from "react";
import type { QualityTier } from "../lib/scene-contract";

export function useQualityTier() {
  const [tier, setTier] = useState<QualityTier>("balanced");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const update = () => {
      const shouldReduceMotion = motion.matches;
      const constrained = coarse.matches || (typeof memory === "number" && memory <= 4);
      setReducedMotion(shouldReduceMotion);
      setTier(constrained ? "reduced" : "high");
    };

    update();
    motion.addEventListener("change", update);
    coarse.addEventListener("change", update);

    return () => {
      motion.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  return { tier, reducedMotion };
}
