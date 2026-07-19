# Realtime 3D Runtime Patterns

Use these implementation patterns only after the unified design spec and
production prompt have fixed the product, camera, art, and asset route.

## Runtime Choice

- Use the repository's existing maintained stack when viable.
- Prefer Three.js directly for a static/non-React project or a scene whose
  lifecycle is simpler without React.
- Prefer R3F for a React 19 application with declarative scene composition;
  use maintained helpers and Rapier only when real physics improves play.
- Keep DOM for accessible HUD/forms and 3D for spatial objects/events.

## Scene Boundaries

Separate the app into stable concerns: shell/loading/error, scene/world, hero,
camera rig, interaction state, asset adapters, effects/audio, HUD, and
development telemetry. Keep hot per-frame state in refs, mixers, physics bodies,
or renderer uniforms; keep React state for coarse phases and UI.

Normalize every imported model once:

- units, bounding box, origin, ground contact, forward/up axes;
- material/texture color spaces and alpha modes;
- part names, clips, bones, morphs, triangles;
- scale at default/mobile shots and simplified colliders.

## Camera

Express the camera as state, not incidental control values:

```text
state -> position/target/FOV -> bounds -> input -> damping -> exit/recovery
```

Use bounded orbit for inspection, collision-aware look for first person,
look-ahead/occlusion for chase cameras, and triggered paths for cinematic states.
Keep near/far planes tight enough for precision. Clamp polar/azimuth/distance/pan
to the actual constructed world. Test every allowed angle rather than only the
opening screenshot.

## Materials, Light, and Color

- Work in the current Three.js Linear-sRGB pipeline; mark display textures sRGB
  and data maps linear.
- Start from plausible neutral material values, then tune against the design
  spec or role-specific reference crops.
- Use Standard/Physical materials when roughness, metalness, transmission,
  sheen, or clearcoat are real requirements; do not attach unsupported values to
  a shader that ignores them.
- Build surface variation at broad, construction, and local-use scales.
- Establish one motivated key/shadow solution before adding fills, rims, state
  lights, fog, reflections, and postprocessing.
- Use custom shaders only for a defined surface, transition, or whole-frame
  behavior that built-in materials cannot express cleanly.
- Centralize time/resolution/pointer/state uniforms and update without material
  recreation.

## Motion and Feedback

Use explicit phases and envelopes. Important input should acknowledge quickly,
then communicate weight through acceleration, damping, anticipation,
follow-through, sound, material/light response, and bounded camera response.
Continuous motion systems need different frequencies/amplitudes so the whole
world does not sway in synchrony.

For physics:

- use simple box/sphere/capsule/compound colliders;
- use kinematic bodies for authored mechanisms and dynamic bodies for meaningful
  response;
- add hysteresis/debouncing to contact-driven results;
- let bodies sleep and avoid rebuilding colliders every frame;
- define reset/recovery rather than leaving unstable piles or joints.

## Performance and Quality Tiers

Measure before optimizing. Expose development-only telemetry such as:

```js
window.__EAZO_3D_DEBUG__ = {
  phase,
  camera: { position, target, fov },
  qualityTier,
  renderer: {
    calls: renderer.info.render.calls,
    triangles: renderer.info.render.triangles,
    geometries: renderer.info.memory.geometries,
    textures: renderer.info.memory.textures,
  },
};
```

Prioritize:

1. DPR cap and viewport-sized post targets;
2. shared geometry/materials and instancing;
3. shadow-caster/light count;
4. transparent overdraw, particles, reflections, post passes;
5. texture resolution/compression and generated-model polygon count;
6. distant detail and dormant updates.

Desktop and mobile quality tiers must preserve the hero, core interaction, and
signature moment. Degrade secondary density/effects first.

## Artifact-Free Reveal

Track explicit readiness:

```text
assets ready
+ shaders/material variants compiled
+ textures uploaded
+ post/render targets warmed
+ scene rendered for >= 3 stable frames
= reveal allowed
```

Use `compileAsync` when supported or `renderer.compile` as fallback; call
`initTexture` for critical textures when available; render post/effect variants
under the intentional loading surface. Do not use a timeout as readiness. Keep
safe base colors and nonzero material values throughout load/error paths.

## Failure Fallbacks

- Show a designed loading state, not a black canvas.
- Surface asset/network errors with a usable retry or simplified fallback.
- Provide a WebGL fallback that explains the requirement without pretending the
  3D experience loaded.
- Recover from resize/orientation/context loss when practical.
- Pause hot loops and audio on hidden tabs; restore without duplicating events.
