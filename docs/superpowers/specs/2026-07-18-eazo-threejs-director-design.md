# Eazo Three.js Director Skill Design

**Date:** 2026-07-18  
**Status:** Draft for user review  
**Source directory:** `/Users/xufan/Desktop/Eazo_work/eazo-threejs-director-skill`

## 1. Objective

Create a reusable Coding Agent skill that turns a short request into a polished,
playable, responsive 3D web experience in one autonomous production run.

The skill must teach the agent to behave as all of the following:

- creative director;
- 3D art director;
- technical director;
- gameplay and interaction designer;
- camera and motion director;
- realtime rendering engineer;
- visual QA owner.

The target is not merely correct Three.js code. The target is a coherent final
experience with strong composition, intentional camera work, differentiated
materials, useful detail, responsive interaction, credible physical feedback,
sound, and verified desktop/mobile rendering.

## 2. Product Context

The generated app runs in the official Eazo Creator template:

- Bun;
- Next.js App Router;
- React 19;
- TypeScript;
- Tailwind CSS;
- Framer Motion;
- Eazo SDK and its required providers/localization shell.

The default realtime stack is:

- `three` for the renderer and low-level 3D APIs;
- `@react-three/fiber` v9 for the React renderer;
- `@react-three/drei` for maintained helpers;
- `@react-three/rapier` v2 when actual physics improves the experience;
- `@react-three/postprocessing` when postprocessing is justified;
- Web Audio or approved local audio assets for sound feedback.

TroisJS is not a runtime dependency. It is archived and Vue-specific. Its useful
declarative scene, render-loop, raycasting, loader, and postprocessing patterns
may be translated into maintained R3F or direct Three.js patterns.

## 3. Quality Baselines

### 3.1 Positive baseline: GRAB claw machine

The local claw machine project is a positive process and visual-density
reference, not a style template to copy:

`/Users/xufan/Desktop/Eazo_work/claw-machine-game-work/claw-machine-game`

Reusable quality lessons:

- the primary object dominates the first viewport;
- foreground, subject, and background have explicit visual roles;
- environment props tell the story without becoming floating cards;
- warm, green, and red practical lights separate depth and function;
- walls, floors, metal, glass, fur, and screens use different material logic;
- procedural canvas textures add surface variation without external assets;
- the camera begins with an authored composition instead of default controls;
- camera shake and pushes are event-driven and bounded;
- the jumpscare moves the actual 3D character into the camera, not a sticker;
- shader effects unify the art direction instead of replacing scene design;
- core interaction remains legible while visual effects intensify.

The skill must reproduce this level of intentional detail across different art
directions. It must not turn every generated project into the same horror scene.

### 3.2 Negative baseline: Beijing football runner

The local Beijing football project is an explicit anti-pattern reference:

`/Users/xufan/Desktop/Eazo_work/app-07-beijing-football`

Observed failure modes:

- more than 12,000 lines of game code did not create commensurate visual value;
- no proper visual asset set supported a city-scale experience;
- large primitive blocks and flat color fields dominated the frame;
- the subject occupied too little of the screen;
- foreground trunks occluded rather than framed the action;
- the opening experience used a generic product-card composition;
- the city reused one toon-material language across unrelated surfaces;
- roughness and metalness values stored in `userData` did not affect
  `MeshToonMaterial` rendering;
- engineering tests passed without visual browser QA;
- complexity accumulated before a visual target and shot contract existed.

The skill must explicitly block the idea that build success, test count, source
line count, or the presence of R3F/Rapier demonstrates visual quality.

## 4. Skill Architecture

Use one orchestration skill with progressive disclosure.

```text
eazo-threejs-director/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── references/
│   ├── requirement-router.md
│   ├── director-workflow.md
│   ├── design-dna-3d.md
│   ├── procedural-vs-model.md
│   ├── image2-art-pipeline.md
│   ├── camera-language.md
│   ├── lighting-materials.md
│   ├── motion-interaction.md
│   ├── physics-feedback.md
│   ├── shaders-postfx.md
│   ├── r3f-three-patterns.md
│   ├── performance.md
│   ├── anti-ai-slop.md
│   ├── verification.md
│   └── cases/
│       ├── horror-claw-machine.md
│       ├── backrooms-exploration.md
│       └── cinematic-racer.md
├── assets/
│   └── eazo-r3f-starter/
└── scripts/
    ├── verify-webgl.mjs
    ├── capture-viewports.mjs
    └── inspect-scene.mjs
```

`SKILL.md` stays below 500 lines and contains only routing, mandatory workflow,
quality gates, and reference-loading instructions. Detailed APIs and examples
live in references and are loaded only when applicable.

## 5. Trigger Contract

The metadata description must trigger for requests involving:

- 3D websites, scenes, games, experiences, hero sections, or product viewers;
- Three.js, R3F, WebGL, shaders, particles, 3D physics, or GLB assets;
- requests whose visual or interaction intent is better expressed as realtime
  graphics even when the user does not name a 3D technology;
- converting a reference image or idea into an interactive spatial experience;
- deciding between procedural code, image generation, and 3D model generation.

The description must remain concise because Agent skill metadata has a shared
context budget. It must not contain the complete director prompt.

## 6. Autonomous Director Workflow

The skill defaults to autonomy. It must not ask the user about implementation
details that can be resolved from the prompt, references, Eazo template, or
reasonable art direction. It asks only when a missing answer materially changes
the product and cannot be inferred safely.

### Phase 0: Inspect and preserve

- Read the checked-out Eazo template `AGENTS.md`, `package.json`, `.env.example`,
  and `src/app/layout.tsx`.
- Inspect existing assets, source, routes, and dirty worktree state.
- Preserve Eazo providers, localization, environment metadata, and SDK rules.
- Reuse an existing framework and style system instead of replacing it.

### Phase 1: Interpret the request

Convert the short user request into a production brief containing:

- experience type and audience;
- emotional promise and gameplay fantasy;
- primary interaction loop;
- spatial archetype;
- subject and environment hierarchy;
- camera relationship to the subject;
- visual references implied by the genre;
- required states and signature moment;
- mobile control and performance implications.

The brief must distinguish literal requirements from inferred art direction.

### Phase 2: Generate 3D Design DNA

Before implementation, define:

- palette by lighting role, not only a list of hex values;
- exposure, contrast, saturation, fog, and tone-mapping intent;
- shape language and silhouette rules;
- material families and micro-surface behavior;
- environment density by foreground/midground/background;
- focal hierarchy for each key state;
- camera lens, height, distance, target, movement grammar, and shake grammar;
- motion weight, acceleration, damping, anticipation, follow-through, and idle;
- interaction feedback across visual, physical, audio, and camera channels;
- postprocessing purpose and intensity;
- typography/UI relationship to the 3D scene;
- desktop/mobile quality budgets.

### Phase 3: Decompose assets and systems

Create an asset decision table. Every meaningful object or system receives one
of these implementation strategies:

1. procedural Three.js/R3F;
2. generated 2D image or texture;
3. generated or sourced GLB;
4. hybrid construction;
5. CSS/DOM overlay;
6. audio asset or procedural Web Audio.

Complex subjects must be decomposed before generation. A car, machine, creature,
or building must not be treated as one undifferentiated prompt.

The table records:

- visual importance and expected screen size;
- required views and animation states;
- geometry/material/rig/physics requirements;
- implementation strategy and reason;
- fallback strategy;
- validation evidence.

### Phase 4: Image2 art pipeline

Assume the Agent has image-generation capability called image2.

Use image2 when visual planning or texture creation improves the result. The
default art pack for a high-value subject contains:

- one style/mood frame;
- one orthographic front/side/back turnaround;
- additional top or detail views when topology needs them;
- a material and color callout sheet;
- cute/horror, clean/damaged, closed/open, or other state sheets when the
  experience requires transformation;
- two or more key-shot frames that define camera and lighting intent.

Image prompts must enforce same-subject consistency, neutral presentation,
unobstructed silhouette, fixed proportions, and no decorative text for modeling
views. Key-shot prompts may be cinematic.

Generated images are references or textures. They do not become 3D merely by
being placed behind a canvas.

### Phase 5: 3D generation pipeline

Assume the Agent can generate 3D assets and has no artificial generation budget.

Use 3D generation for high-value organic, branded, or silhouette-critical
subjects that would look crude as primitive assemblies. Provide the generated
turnaround and material sheet to the 3D generator.

Inspect generated assets for:

- silhouette and proportions;
- scale, origin, forward axis, and ground contact;
- hierarchy and mesh naming;
- material slots and texture color spaces;
- normals, UVs, transparency, and duplicated geometry;
- triangle, material, bone, and texture budgets;
- animation clips and loop behavior;
- collider strategy;
- mobile rendering viability.

Generate complex objects in meaningful parts when it improves control. For a
racing car, separate body shell, glass, wheels, tires, rims, lights, aero parts,
and simplified interior instead of requesting an opaque one-piece asset.

### Phase 6: Shot and interaction design

Author key shots before writing detailed geometry:

- establishing frame;
- playable/default frame;
- primary action frame;
- success/failure frame;
- signature cinematic moment;
- mobile crop.

For each shot define camera transform, lens/FOV, subject occupancy, foreground
framing, look target, motion path, duration, easing, and transition trigger.

Do not default to OrbitControls for games or authored experiences. Select camera
behavior from the product fantasy: first person, chase, side-follow, fixed
cabinet, orbital product inspection, rail, dolly, handheld, or hybrid.

Every important user action must create coordinated feedback:

- immediate visual state change;
- physical response when appropriate;
- sound cue;
- bounded camera response;
- persistent state update;
- clear recovery or continuation.

### Phase 7: Implementation

- Keep `src/app/page.tsx` thin.
- Put the realtime experience in client components under a feature directory.
- Keep one exported component per file in the Eazo template.
- Isolate the R3F Canvas from DOM HUD and Eazo SDK UI.
- Use React state for coarse product state and refs/frame loops for hot 3D state.
- Never call React state setters every render frame.
- Prefer shared geometry/materials and instancing for repeated objects.
- Dispose resources or rely on R3F lifecycle correctly.
- Use real PBR material properties only when the material supports them.
- Use fixed-step physics for gameplay-sensitive behavior.
- Keep colliders simpler than visible geometry unless precision is necessary.
- Add loading, error, paused, completed, and reduced-motion behavior.

### Phase 8: Visual verification and repair

The Agent must run the app and inspect it. Build/test success is insufficient.

Minimum evidence:

- desktop screenshot;
- mobile screenshot;
- screenshot or frame for every signature interaction;
- Playwright execution of the main interaction loop;
- no uncaught page, console, WebGL, or shader errors;
- nonblank canvas pixel statistics;
- HUD bounds and safe-area checks;
- camera framing checks;
- scene telemetry for renderer, geometry, texture, and draw-call budgets;
- practical FPS sample or stable frame-time evidence;
- asset request and loading verification.

The Agent compares output against the production brief and key-shot contract,
repairs the highest-impact mismatch, and reruns verification. It may iterate
without an artificial call budget.

## 7. Procedural Versus Model Router

Prefer procedural code for:

- architectural modules and rooms;
- machines, tracks, rails, pipes, platforms, and mechanical props;
- abstract forms, particles, fields, portals, waves, and data visualization;
- repeated geometry and destructible/physical props;
- stylized low-poly background objects;
- effects whose identity comes from motion or shaders.

Prefer generated or sourced GLB for:

- humans, faces, hands, creatures, clothing, and nuanced organic anatomy;
- hero vehicles or products with silhouette-critical surfacing;
- exact objects requiring complex topology;
- characters requiring skinning, facial states, or authored animation.

Prefer a hybrid for:

- machines with an organic prize or operator;
- vehicles with generated bodywork and procedural wheels/effects/track;
- architectural scenes with one hero creature;
- product viewers with generated product assets and procedural presentation;
- games where gameplay objects need simple physical proxies.

Screen importance governs effort. A tiny background prop must not consume more
resources than the primary playable subject.

## 8. Few-Shot Case System

Few-shot cases teach reasoning and quality, not fixed visual style. Each case
contains:

- triggering prompt patterns;
- inferred production brief;
- 3D Design DNA;
- asset decomposition table;
- image2 prompt strategy;
- procedural/model/hybrid decisions;
- key-shot and camera plan;
- lighting and material strategy;
- interaction and physics state machine;
- shader/postprocessing stack;
- performance strategy;
- anti-patterns;
- acceptance evidence.

Initial cases:

1. horror claw machine: fixed cabinet composition, physical prizes, tri-color
   practical lighting, procedural grime, real 3D jumpscare;
2. backrooms exploration: modular procedural architecture, first-person camera,
   fluorescent rhythm, liminal material variation, navigation and audio tension;
3. cinematic racer: decomposed hero vehicle, chase camera, suspension and tire
   response, track streaming, speed cues, impact feedback, mobile controls.

Cases explicitly warn the Agent not to copy names, palettes, props, or horror
treatment into unrelated experiences.

## 9. Anti-AI-Slop Quality Gates

The following block completion unless intentionally justified by the brief:

- a generic centered card covers the primary 3D experience;
- the subject is too small to inspect or play;
- large empty pure-color planes dominate the final frame;
- unrelated surfaces share one material response;
- a material specification names properties the selected shader ignores;
- the scene uses primitives without silhouette refinement or surface detail;
- postprocessing hides crude geometry instead of supporting it;
- every light is ambient or frontal and the scene has no motivated practicals;
- OrbitControls are used as a substitute for camera direction;
- camera movement has no state, damping, bounds, or focal target;
- foreground props accidentally occlude the main interaction;
- GLB assets appear at arbitrary scale/orientation or float above the ground;
- generated images are used as fake 3D where spatial interaction was requested;
- visual effects overlap controls or destroy readability;
- the desktop frame works but the mobile crop loses the subject or controls;
- the Agent declares visual completion without viewing rendered output;
- code volume or test count is presented as evidence of aesthetic quality.

## 10. Performance and Graceful Degradation

Quality includes stable interaction.

- Cap DPR based on device capability and measured frame time.
- Preserve gameplay physics and input semantics when reducing quality.
- Degrade shadow resolution, particle count, postprocessing, reflection quality,
  secondary props, and texture resolution before degrading core interaction.
- Keep expensive realtime reflections and dynamic shadows tightly scoped.
- Use KTX2/Draco/Meshopt when justified and supported by the asset pipeline.
- Provide a visible fallback or error state for failed critical assets.
- Respect `prefers-reduced-motion` without removing necessary game feedback.

## 11. Validation Strategy

### Static validation

- validate required skill files and frontmatter;
- verify every referenced file exists;
- scan examples for forbidden TroisJS runtime dependencies;
- scan Eazo starter assets for required client boundaries;
- lint scripts and starter code;
- check that version-sensitive examples identify their expected stack.

### Forward tests

Run independent Agent tasks with only the skill and task-local context:

1. “Create a playable backrooms exploration game.”
2. “Create a cinematic arcade racer through a rainy neon city.”
3. “Create a horror claw machine with a transforming collectible.”
4. “Create an interactive abstract particle music visualizer.”
5. “Create a detailed organic character showcase.”

Expected routing:

- backrooms: procedural-heavy;
- racer: hybrid;
- claw machine: hybrid;
- visualizer: procedural/shader-heavy;
- organic character: model-heavy.

Evaluate whether each run:

- selects the correct asset strategy;
- creates image2 references only where valuable;
- authors a genre-appropriate camera plan;
- avoids copying the claw-machine style;
- uses valid R3F/Three APIs;
- produces runnable output;
- completes visual browser verification;
- meets anti-slop gates.

## 12. Acceptance Criteria

The skill is ready when:

1. Metadata reliably triggers for explicit and implicit realtime 3D requests.
2. The main `SKILL.md` stays concise and uses progressive disclosure.
3. The Agent defaults to the official Eazo React/Next template and R3F stack.
4. TroisJS is treated only as an audited pattern source.
5. CloudAI-X material is selectively rewritten, version-checked, and not copied
   as ten oversized API manuals.
6. The workflow assumes image2 and 3D generation are available.
7. Complex subjects are decomposed before image or 3D generation.
8. The Agent emits a 3D Design DNA and key-shot camera contract before coding.
9. The Agent makes an explicit procedural/model/hybrid decision per asset.
10. Camera, material, lighting, motion, physical feedback, audio, and mobile
    composition are first-class design concerns.
11. The Beijing football failure patterns are explicitly blocked.
12. The GRAB project informs quality level without becoming a universal style.
13. Browser-based visual verification is mandatory.
14. Backrooms, racer, claw-machine, visualizer, and organic-character forward
    tests route correctly and expose no structural Skill failure.

## 13. Sources

- Eazo template: <https://github.com/EazoAI/eazo-creator-nextjs-template>
- React Three Fiber: <https://r3f.docs.pmnd.rs/>
- React Three Rapier: <https://pmndrs.github.io/react-three-rapier/>
- Three.js: <https://threejs.org/docs/>
- TroisJS pattern source: <https://github.com/troisjs/trois>
- CloudAI-X reference skills: <https://github.com/CloudAI-X/threejs-skills>
