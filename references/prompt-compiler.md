# Prompt Compiler

Convert a one-line request into a complete design spec and one executable
production prompt. Do not make the user discover every art, camera, engineering,
and QA requirement themselves.

## Compilation Contract

1. Preserve the literal one-line request unchanged.
2. Separate literal requirements, supported inferences, and exclusions.
3. Fill every required field in `assets/design-spec-template.md`.
4. Run the independent decisions in `asset-routing.md`.
5. Fill `assets/realtime-3d-production-prompt.md` from the spec.
6. Remove unused conditional sections, examples, comments, and placeholders.
7. Save the spec and compiled prompt before implementation.

Do not present a long questionnaire. Infer genre-standard decisions from the
request, existing repository, device target, and visual evidence. Ask one short
question only when two plausible answers create materially different products
and neither can be safely inferred.

## Required Inference Order

Resolve missing information in this order so later choices agree with earlier
ones:

1. **Runtime contract:** deliverable shape, framework/library versions, camera
   constraints, forbidden libraries, deployment surface, debug/test hooks.
2. **Experience:** what the user sees and does in the first five seconds.
3. **Interaction/game rules:** explicit state, inputs, algorithms, constraints,
   blockers, unlocks, AI/enemies, puzzle rules, proof obligations.
4. **Emotional promise:** the intended feeling and visual contradictions to
   exclude.
5. **Hero hierarchy:** focal subject, supporting elements, frame occupancy.
6. **Spatial composition:** foreground, midground, background, scale, density,
   and all-angle inspection envelope.
7. **Camera direction:** archetype, initial shot, authored motion beats,
   drone/crane/dolly/orbit/reveal grammar, bounds, recovery, mobile crop.
8. **Art direction:** palette roles, value ladder, temperature counterpoint,
   shape language, material families, motivated lights, atmosphere, shader/post
   purpose, decoration budget.
9. **Evidence translation:** prompt fingerprint, reference roles, candidate
   compatibility, and observation-to-runtime render ledger when evidence helps.
10. **Asset route:** procedural, sourced, generated image, generated 3D, hybrid.
11. **Runtime finish:** performance tier, reveal, responsive/accessibility.
12. **Acceptance evidence:** solver/static proof, browser auto-play,
    screenshots, state captures, performance and cold-load checks.

Use numeric ranges and observable relationships when they improve execution.
Avoid invented precision that has no visual or technical purpose.

## Camera Resolution

Choose the camera from the experience, not from a default library control:

- **free inspection:** bounded orbit/pan/zoom, finished geometry throughout the
  inspection envelope, optional idle auto-rotate that yields immediately;
- **first person:** authored height/FOV, collision, pointer/touch look, release;
- **third person:** follow target, look-ahead, damping, collision/occlusion;
- **fixed/tabletop:** strong default composition plus bounded inspection;
- **cinematic/state camera:** explicit shots with trigger, duration, easing, exit,
  and recovery.

For cutaways, decide whether azimuth is limited or walls fade/hide. Never demand
unrestricted 360-degree orbit around an interior that is only built as a
front-facing stage.

## Scaffold Precision

When a user provides a detailed scaffold, preserve its headings as the minimum
quality bar. For future prompts, generate the same level of detail even if the
user is brief:

- **Technical stack:** exact runtime, camera model, libraries to use/avoid,
  coordinate convention, debug API, build shape.
- **Core mechanics:** every rule must be stated as executable logic, including
  pathfinding, physics, puzzle constraints, AI blocking, rotations, elevators,
  state machines, win/loss and reset.
- **Camera:** specify shot list and motion grammar as if directing a film:
  establishing, guided tracking, reveal, drone/crane/dolly/parallax, inspection,
  interruption and recovery. Default camera controls are not direction.
- **Shot bible:** for every important phase, write purpose, start frame, end
  frame, movement type, subject size, duration, easing, foreground/midground/
  background relationship, and interruption behavior. If that table is weak,
  improve it before coding.
- **Visual finish:** palette per scene/state, face/material separation, light
  sources, tone mapping, fog/sky integration, water/particles/effects, UI style,
  and decoration roles.
- **Verification:** include algorithmic proof for puzzles/games when feasible,
  browser auto-play/debug hooks, screenshot matrix, visibility and obstruction
  checks, and negative proof that the core mechanism is actually required.

Background decoration must be intentional and sparse. Treat it as a whitelist:
normally no more than three visual families, each serving silhouette, depth,
navigation, scale, or atmosphere. Do not add random floating geometry, orbs,
meaningless ruins, filler towers, abstract strips, or shapes that cannot be
named in the spec and validated in screenshots.

## Examples

### “做一个后室风格的交互界面”

- Preserve the recognizable Backrooms spatial and rendering grammar through
  researched sources.
- Use procedural modular architecture, authored lights, fog, repeating surface
  variation, collision, and a suitable first-person or bounded exploration
  camera.
- No Image2 turnaround and no Meshy model are inherently needed.

### “做一个 Labubu 可爱的娃娃机”

- Research official Labubu product imagery and lock identity if a recognizable
  doll appears prominently.
- Build the cabinet, claw, rails, glass, lighting, controls, and physics
  procedurally.
- Use Image2 multi-view and Meshy only if a faithful existing model is unavailable
  and the close, all-angle doll asset justifies generation.

### “做一个以上海为背景的互动场景”

- Research real Shanghai skyline, street, signage, material, light, weather, and
  camera evidence appropriate to the requested era and district.
- Use those images as art direction first. Generate a coherent key shot or
  multi-view evidence only when it resolves missing geometry or composition.
- Evaluate Meshy separately for a high-occupancy landmark/prop; do not generate
  an entire skyline as one opaque model when modular/procedural construction is
  more controllable.

## Compiler Self-Check

Before implementation confirm:

- every user requirement appears once in the resolved spec;
- every inference serves the same emotional promise;
- camera and geometry agree on the allowed inspection envelope;
- hero prominence survives desktop and mobile crops;
- every important input has immediate acknowledgment and a consequence;
- every major material has a distinct observable response;
- every light has a source or explicit environmental role;
- every shader/post effect has a defined visual job;
- retained references are compatible, role-labeled, and translated into runtime
  parameters rather than copied as a vague mood;
- asset generation is justified per asset, not per project;
- the compiled production prompt contains no unresolved placeholder.
