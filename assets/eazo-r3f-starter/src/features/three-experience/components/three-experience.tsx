"use client";

import { Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useQualityTier } from "../hooks/use-quality-tier";
import type { ExperiencePhase } from "../lib/scene-contract";
import { SceneCanvas } from "./scene-canvas";

export function ThreeExperience() {
  const [phase, setPhase] = useState<ExperiencePhase>("ready");
  const { tier, reducedMotion } = useQualityTier();

  useEffect(() => {
    if (phase !== "signature") return;
    const timeout = window.setTimeout(() => setPhase("result"), reducedMotion ? 250 : 900);
    return () => window.clearTimeout(timeout);
  }, [phase, reducedMotion]);

  return (
    <main className="relative h-[100dvh] min-h-0 overflow-hidden bg-black text-white [.eazo-app-area-scroller_&]:h-full">
      <div className="absolute inset-0">
        <SceneCanvas phase={phase} qualityTier={tier} reducedMotion={reducedMotion} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]">
        <div className="pointer-events-auto flex h-12 items-center gap-2 border border-white/20 bg-black/55 p-1.5 backdrop-blur-md">
          <button
            type="button"
            data-testid="action"
            title="Play signature action"
            aria-label="Play signature action"
            className="grid size-9 place-items-center bg-emerald-300 text-black transition-colors hover:bg-emerald-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setPhase("signature")}
          >
            <Play aria-hidden="true" className="size-4" fill="currentColor" />
          </button>
          <button
            type="button"
            data-testid="reset"
            title="Reset scene"
            aria-label="Reset scene"
            className="grid size-9 place-items-center text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => setPhase("ready")}
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
