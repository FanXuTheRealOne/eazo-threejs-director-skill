# Anti-AI-Slop Gates

Run these gates on screenshots and interaction, not only source code. Any failed
blocker requires repair or an explicit product reason.

## Blockers

### Reference fidelity

- A named game, world, brand, product, character, or IP was rendered from memory
  without an official/first-party source manifest and project visual bible.
- "Inspired by" is used to excuse different geometry, palette, texture/pixel
  grammar, material response, lighting, fog, tone mapping, camera, or play.
- A recognizable organic/branded 3D subject was approximated with primitives,
  recolors, or text-to-3D when real source photography, Image2, and Meshy 6
  Multi-Image to 3D were available.
- Image2 changed identity features while inventing missing views, or a generated
  GLB was never compared in a neutral turntable.
- The final frame has no comparable source/render capture or mismatch log.

### Composition

- The requested app opens on a marketing card, feature list, or instructions
  instead of the usable experience.
- The hero occupies less than the intended shot contract or cannot be inspected.
- Large empty pure-color planes dominate the frame.
- Foreground objects accidentally cover controls or the hero.
- All detail sits in the center while frame edges and depth have no purpose.
- Mobile crop loses the hero, action zone, or essential controls.

### Geometry and assets

- Hero geometry reads as unrefined primitives at the intended camera distance.
- Complex subjects are one undifferentiated mesh despite needing movable parts.
- GLBs float, clip, face the wrong direction, or use arbitrary corrective scales.
- Repeated objects are individual high-cost meshes when instancing is suitable.
- Generated images fake a 3D object the user must spatially manipulate.

### Materials and light

- Unrelated materials share one shader response.
- Parameters are assigned to a material that ignores them. For example,
  `roughness` in `userData` does not make `MeshToonMaterial` physically rough.
- Every surface is clean and uniform despite a weathered/detailed brief.
- Every light is ambient/frontal; no practical source explains the scene.
- Emissive surfaces illuminate visually but the surrounding light does not agree.
- Bloom, darkness, fog, or chromatic aberration hides poor modeling.

### Camera and motion

- `OrbitControls` is the only camera direction for a game or cinematic scene.
- Camera position, FOV, and target have no authored state.
- Shake is continuous, unbounded, or moves the focal target off-screen.
- Animation is linear, weightless, has no anticipation/follow-through, or snaps
  because coarse React state drives every frame.
- The signature moment is a DOM sticker when the event should happen in 3D.

### Interaction and feedback

- The first meaningful input is unclear or does nothing immediately.
- Collision/selection changes state but has no visible, physical, audio, or
  camera consequence.
- Success/failure cannot recover or reset.
- Touch controls conflict with browser scroll/zoom or safe areas.
- Controls resize or shift as dynamic labels change.
- A game consists of locomotion plus one repeated action or linear fetch quest,
  with no meaningful decision, escalation, consequence, progression,
  failure/recovery, or replay variation.
- NPCs are decoration with dialogue but no reaction to player action or world
  state.

### Verification

- The agent did not open the rendered page.
- No desktop and mobile screenshots exist.
- Signature states were not exercised and captured.
- Console, shader, asset-loading, or WebGL errors remain.
- "Build passed," line count, dependency count, or unit-test count is used as
  evidence of visual quality.
- A WebGL, performance, or screenshot-existence pass is used as evidence that a
  named reference was faithfully reproduced.

## Quality Questions

Answer from the rendered frame:

1. What is the first thing the eye sees, and is that intentional?
2. Can the hero silhouette be recognized at thumbnail size?
3. Can metal, glass, plastic, cloth/fur, stone, and wet surfaces be distinguished
   without reading code?
4. Does each light appear to come from somewhere?
5. What changed in the first 100 ms after input?
6. Does motion communicate weight?
7. Does the camera preserve orientation and subject visibility?
8. Is there meaningful foreground, midground, and background depth?
9. Does mobile preserve the same fantasy rather than merely shrink desktop?
10. Is the memorable moment created by the world itself?

## Negative Baseline Lesson

The local Beijing football project demonstrates that extensive R3F/Rapier code
can still produce a flat frame: tiny player, primitive city blocks, pure-color
sky/ground, accidental tree occlusion, generic toon response, and no visual
browser QA. Prevent this by locking a shot target early, building the hero and
camera first, assigning real material classes, and reviewing screenshots after
each visual pass.

## Positive Baseline Lesson

The local claw machine demonstrates transferable process: one dominant machine,
authored fixed framing, layered background props, motivated warm/green/red light,
different surface responses, procedural grime, bounded event camera motion, and
an actual 3D prize entering the camera for the scare. Match the level of
intentionality, not its horror palette or props.
