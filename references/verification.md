# Browser Verification and Repair

The rendered browser output is the evidence. Source review, build success, and a
nonblank canvas cannot prove composition, material response, camera safety,
interaction, cold reveal, or mobile quality.

## Start and Instrument

Run the repository's lint/type/test/build commands, start the final route on a
free port, and inspect it in a real browser. Collect:

- page/console errors and warnings;
- failed requests and asset MIME/CORS issues;
- shader compile/link errors and WebGL context loss;
- canvas size and pixel variation;
- camera/phase/quality telemetry;
- draw calls, triangles, geometries, textures, DPR, and sustained frame-time.

For rule-heavy games or simulations, run a deterministic proof script before
browser QA. The proof should use the real level/rule data, check solvability,
validate requested math constraints, and include a negative case proving that
the core mechanism is actually required.

Use the bundled scripts when compatible:

```bash
node /path/to/skill/scripts/inspect-scene.mjs --root .
node /path/to/skill/scripts/capture-viewports.mjs --url http://127.0.0.1:3000 --out artifacts/visual-qa
node /path/to/skill/scripts/verify-webgl.mjs --url http://127.0.0.1:3000 --out artifacts/visual-qa
```

## Capture Matrix

Capture at minimum:

| State/view | Desktop | Mobile |
| --- | --- | --- |
| intentional loading | required | required |
| first revealed frame | required | required |
| authored default | required | required |
| primary interaction | required | required |
| signature moment | required | required |
| result/error/recovery | required when applicable | required when applicable |
| inspection extremes | required | required |

For free cameras, sample multiple azimuths, elevations, distances, pans, and zoom
limits. Inspect back/sides/undersides, room shells, cutaway edges, occluder
behavior, ground contact, shadows, transparency order, near/far clipping,
backfaces, and control recovery. For authored cameras, capture every state path
plus interruption and return.

For authored camera work, audit the shot bible in the browser: capture the start
and end of every major camera beat, then confirm the shot changes subject scale,
depth relationship, destination, mechanism, hazard, or payoff. A camera that only
slides to another centered view fails the audit.

## Visual Review

Inspect full-size and thumbnail captures for:

- intentional focal hierarchy and hero occupancy;
- foreground/midground/background depth;
- readable silhouette and construction detail;
- distinct material families;
- motivated light, contact shadow, emissive spill, fog/background agreement;
- palette/value/temperature balance;
- shader/postprocessing purpose and restraint;
- refined color grade, no muddy/one-note palette, and no over-saturated effects;
- every decorative/background object being identifiable and purposeful;
- no more than the declared background visual families, unless explicitly
  justified by the spec;
- stable HUD, text, safe areas, and mobile crop;
- clipping, z-fighting, floating props, blank planes, accidental occlusion.

When references were used, place role-matched source and render frames
side-by-side. Compare only what each reference proves: composition, silhouette,
palette, material, lighting, texture/render grammar, tone mapping, fog, camera,
or identity. When no images were needed, compare the render against the resolved
design spec and shot/state contract.

## Interaction Review

Exercise the real controls rather than debug shortcuts:

- first input acknowledgment and state transition;
- pointer, keyboard, touch, pan/zoom/orbit/look bounds;
- collision/selection/physics events occurring once;
- signature state entry, interruption, completion, and recovery;
- success, failure, reset, and second run for games;
- resize, orientation, blur/visibility, reduced motion, loading and error paths;
- no unintended page scroll, zoom, stuck pointer lock, or duplicated audio.

When the request requires complete playthrough proof, expose a debug API such as
`window.__APP_DEBUG__` with deterministic actions and manual time advancement.
Use it from a real browser to finish every level/state. Do not accept a solver
alone when animation, blocking, UI, or camera could still fail in the browser.

## Cold-Reload Reveal

Perform a cold reload with cache disabled when practical. Capture approximately
0.3 s, 1 s, and 3 s, the final loading frame, and the first three revealed
frames.

Before readiness, a designed opaque loading surface is valid. After reveal,
inspect explicitly for:

- solid black rectangles, bands, blocks, letterbox bars, or transparent gaps;
- leftover loading veils or one-frame overlay flashes;
- placeholder/safety planes and unfinished room shells;
- pure-black or missing textures/materials;
- half-compiled shaders, post passes, particles, reflections, or GLB variants;
- layout shifts, camera jumps, invalid exposure, or stale fallback UI.

Any artifact requires repair and another cold-reload capture. A fixed timer is
not evidence of readiness.

## Performance Review

Check sustained rather than single-frame performance at default, densest,
signature, and camera-extreme states. Verify approximately 60 fps/16.7 ms on the
desktop target and the declared mobile tier. Record renderer counts and identify
spikes from compilation, asset upload, physics, reflection, transparency,
particles, or React/UI updates.

Reduce secondary shadows, reflections, particles, distant density, DPR, and post
quality before reducing hero quality or core feedback.

## Repair Order

1. blank, broken, black/reveal, asset, or blocked-interaction failures;
2. camera, hero scale, composition, clipping, unfinished angles;
3. material/light/palette/reference or design-spec mismatch;
4. interaction feedback, motion weight, game recovery, mobile controls;
5. sustained performance and memory instability;
6. secondary detail.

Repeat affected captures and interactions after every repair. Completion
requires current evidence, not screenshots from before the fix.
