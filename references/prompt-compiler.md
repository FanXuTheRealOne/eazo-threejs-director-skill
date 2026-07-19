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

1. **Experience:** what the user sees and does in the first five seconds.
2. **Emotional promise:** the intended feeling and the visual contradictions to
   exclude.
3. **Hero hierarchy:** focal subject, supporting elements, frame occupancy.
4. **Spatial composition:** foreground, midground, background, scale, density,
   and all-angle inspection envelope.
5. **Interaction:** inputs, state transitions, immediate feedback, consequence,
   recovery.
6. **Camera:** archetype, initial shot, controls, bounds, motion grammar, mobile.
7. **Art direction:** palette roles, shape language, material families,
   motivated lights, atmosphere, shader/post purpose.
8. **Evidence translation:** prompt fingerprint, reference roles, candidate
   compatibility, and observation-to-runtime render ledger when evidence helps.
9. **Asset route:** procedural, sourced, generated image, generated 3D, hybrid.
10. **Runtime:** platform, performance tier, reveal, responsive/accessibility.
11. **Acceptance evidence:** required screenshots, state captures, performance and cold-load
    checks.

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
