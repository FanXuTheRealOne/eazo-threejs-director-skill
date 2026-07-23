# Realtime 3D Production Prompt Template

Fill every field from `docs/eazo-design-spec.md`, remove all bracketed guidance
and unused conditional sections, then execute the result as one contract.

---

You are an expert realtime 3D graphics engineer, 3D art director, interaction
designer, camera director, and visual QA owner. In the CURRENT working directory,
build the complete browser experience defined below. Do not stop at a plan or a
code-complete state: run it, inspect it, exercise it, capture it, and repair it.

## Literal user request

{{USER_REQUEST_VERBATIM}}

## Resolved design spec

Technical/runtime contract: {{TECHNICAL_STACK_CAMERA_LIBRARY_VERSION_DELIVERABLE_AND_FORBIDDEN_LIBRARIES}}

Experience: {{EXPERIENCE_AND_AUDIENCE}}

First-five-seconds promise: {{FIRST_FIVE_SECONDS}}

Emotional arc: {{EMOTIONAL_PROMISE_AND_ARC}}

World: {{SPATIAL_ARCHETYPE_SCALE_AND_WORLD_LOGIC}}

Hero composition: {{FOCAL_SUBJECT_FRAME_OCCUPANCY_AND_HIERARCHY}}

Foreground / midground / background: {{DEPTH_LAYER_ROLES_AND_LANDMARKS}}

Art direction: {{VISUAL_ERA_MEDIUM_SHAPE_LANGUAGE_AND_EXCLUSIONS}}

Palette: {{DOMINANT_SUPPORT_ACCENT_VALUE_AND_TEMPERATURE_RELATIONSHIPS}}

Materials: {{MATERIAL_FAMILIES_OBSERVABLE_RESPONSE_AND_DETAIL_SCALE}}

Lighting and atmosphere: {{PRACTICAL_SOURCES_DIRECTION_SHADOW_FOG_AND_EXPOSURE}}

Shader and postprocessing: {{ONLY_EFFECTS_WITH_A_DEFINED_VISUAL_JOB}}

Signature moment: {{MEMORABLE_WORLD_EVENT}}

Desktop/mobile composition: {{RESPONSIVE_CROP_AND_CONTROL_SAFE_ZONES}}

## Mechanics and rules

Core verbs and inputs: {{CORE_VERBS_INPUTS_AND_CONTROL_CONTRACT}}

Formal state model: {{STATE_MODEL_LEVELS_PHASES_ACTORS_MECHANISMS_AND_RESET}}

Rules and algorithms: {{PATHFINDING_PHYSICS_PUZZLE_ROTATION_ILLUSION_AI_OR_SIMULATION_RULES}}

Win/loss/recovery/debug API: {{WIN_LOSS_RECOVERY_RESET_AND_DEBUG_AUTOMATION_API}}

Mechanic-required proof: {{SOLVER_STATIC_PROOF_NEGATIVE_PROOF_AND_REQUIRED_MECHANISM_EVIDENCE}}

Every rule above must become executable behavior. If the request names a BFS,
state-space solver, geometric constraint, enemy blocking rule, elevator lock,
camera direction, or debug API, implement it literally and verify it. Do not
fake puzzle/game depth with animation-only transitions.

## Camera direction

Camera model and hard constraints: {{CAMERA_MODEL_ORTHOGRAPHIC_PERSPECTIVE_ISOMETRIC_FIXED_FORBIDDEN_CONTROLS}}

Initial shot and visibility: {{INITIAL_CAMERA_POSITION_TARGET_FOV_OR_ZOOM_AND_OCCLUSION_RULE}}

Shot bible: {{PHASE_PURPOSE_START_FRAME_END_FRAME_CAMERA_MOVE_SUBJECT_SIZE_DURATION_EASING_INTERRUPTION_TABLE}}

Composition per shot: {{FOREGROUND_MIDGROUND_BACKGROUND_RELATIONSHIP_FOR_EACH_CAMERA_BEAT}}

Inspection and interruption: {{USER_INSPECTION_BOUNDS_INTERRUPTION_RECOVERY_AND_MOBILE_CROP}}

Camera audit: {{REQUIRED_CAMERA_CAPTURE_STATES_AND_REPAIR_CRITERIA}}

Act as a camera director, not a default-control installer. Use authored motion
when the experience has scale, tension, discovery, transformation, traversal or
completion. Good camera work includes establishing composition, subject-leading
tracking, parallax, reveal timing, softened arrivals, deliberate holds, and
stable recovery after user input. Use concrete camera moves such as drone,
crane, dolly, orbit, tracking, push-in, pull-back, overhead reveal, and cutaway
only when they clarify scale, destination, mechanism, or payoff. If the user mandates a fixed/isometric camera,
honor that exactly and express drama through object motion, rotation, parallax,
layering, lighting and UI rhythm instead of illegal camera controls.

Do not implement camera as a few static coordinates. Before coding, write the
shot bible as a table. Each shot needs a reason, a start composition, an end
composition, movement type, subject size target, duration, easing, and what
happens if the user interrupts it. At least three camera beats must visibly
change depth relationship or scale unless the user has explicitly required a
fixed camera. Repair any shot that merely re-centers the subject without
revealing new information, scale, tension, or interaction consequence.
The shot bible must explicitly label `start composition` and `end composition`
for each camera beat.

## Visual evidence and asset decisions

Evidence route: {{NONE_USER_SUPPLIED_SEARCHED_IMAGE2_KEY_ART_IMAGE2_MULTI_VIEW}}

Prompt fingerprint: {{SUBJECT_MODIFIERS_ERA_MEDIUM_FEELING_MUST_PRESERVE_AND_FORBIDDEN_DRIFT}}

Source/reference roles and must-match observations: {{REFERENCE_CONTRACT_OR_NONE}}

Asset strategy: {{PER_ASSET_PROCEDURAL_SOURCED_GENERATED_OR_HYBRID_DECISIONS}}

Generated 3D decision: {{MESHY_DECISION_AND_REASON_OR_NONE}}

Render translation ledger: {{REFERENCE_OBSERVATION_TO_PALETTE_MATERIAL_LIGHT_CAMERA_SHADER_POST_PARAMETER_AND_VALIDATION_VIEW_OR_NONE}}

Treat references according to their declared role. A composition reference does
not authorize copied textures; a palette reference does not dictate geometry;
key art is not the live scene. If no image evidence is required, build directly
from this resolved spec. Do not generate Image2 views or a Meshy model unless the
asset decision explicitly requires them.

For any high-occupancy named landmark, tower, machine, vehicle, product, or
complex hero prop, do not proceed from a vague silhouette. Use official/source
front/side/back/top/detail references or generate Image2 multi-view evidence
when those views are missing. Then build a named component assembly in Three.js:
primary masses, structural members, cross-bracing, joints, trim, glass/openings,
lights/decals/signage, moving parts, underside and rear-facing details, and
scale cues. A procedural route still requires this part ledger; "procedural"
does not mean coarse.

When references are required, search by separate roles rather than accepting the
first attractive image. Score candidates for semantic intent, form, palette,
material, light, camera, and render grammar; reject contradictions and do not
average incompatible references into a generic style. Turn every retained
observation into an observable runtime choice: color/value/temperature
relationships; material roughness, metalness, transmission, sheen or texture
scale; key/fill/practical direction and softness; fog/exposure/tone mapping;
camera/FOV; shader behavior; and the minimum justified post stack. Start from a
neutral render, then calibrate the render translation ledger against role-matched
reference crops before adding stylization.

## Scene construction and visual quality

Build the actual experience, not a landing page describing it. Establish the
authored first frame and hero composition before secondary detail.

- Construct meaningful foreground, midground, and background layers.
- Make primary masses readable at thumbnail size, secondary forms explain
  construction/anatomy, and tertiary detail appear where camera distance can
  reveal it.
- Give every visible object plausible thickness, joints, edge treatment,
  grounding, and material zones appropriate to its screen importance.
- Distinguish major materials through valid shader response, not names or
  imaginary properties. Metal, painted metal, plastic, glass, ceramic, wood,
  cloth/fur, stone, liquid, and emissive surfaces must not collapse into one
  generic response.
- Make important lights physically or narratively motivated. Visible emissive
  sources need agreeing local illumination where appropriate.
- Use shaders and postprocessing only for behavior specified above. They may
  unify the image but must not hide weak geometry, lighting, or composition.
- Build the back, sides, undersides, room shell, and occluded areas throughout
  the declared inspection envelope. No one-sided stage set, head-on billboard,
  missing backfaces, floating object, arbitrary safety floor, or black placeholder.
- For high-occupancy heroes, create separate component files or clearly named
  builders for each part family. Validate close/detail and orbit screenshots
  against the part ledger. If the screenshot reads as a simple proxy instead of
  the named subject, return to evidence and decomposition before polishing.
- Keep background and decoration disciplined. Every decorative object must have
  a name, a visual role, a scale, and a validation view. Do not scatter random
  abstract geometry, unreadable towers, floating strips, unrelated props, or
  filler shapes just to make the scene look busy.
- Treat background as a whitelist, not a dumping ground. Use at most three
  background visual families unless the user explicitly asks for a dense world.
  Each family must support silhouette, depth, navigation, scale, or atmosphere.
  If an object is not visible in the shot bible, does not affect parallax, and
  cannot be named in the handoff, delete it before adding polish.
- Finish the grade. Define a clear value ladder, temperature counterpoint,
  saturation restraint, material-specific roughness/metalness/transmission,
  shadow softness, fog color, sky relationship, and UI glass/solid style.
  Coarse, muddy, one-note, or over-saturated color is a repair issue.

For cutaways/interiors, honor this occlusion solution:
{{AZIMUTH_LIMITS_WALL_FADE_HIDE_OR_CAMERA_COLLISION_RULE}}

## Interaction feedback

Controls: {{DESKTOP_KEYBOARD_POINTER_WHEEL_AND_TOUCH_MAPPING}}

Interaction state machine: {{BOOT_READY_ACTIVE_RESOLVING_RESULT_RECOVERY_STATES}}

For every important input define:

- immediate visible acknowledgment, preferably within 100 ms;
- object/world mutation;
- material/light/animation response;
- physical response when meaningful;
- bounded camera response;
- sound/haptic role when appropriate;
- completion, cancellation, reset, and interruption behavior.

## Playable maturity

[Keep this section only for a game or playable experience.]

Core loop: {{VERB_TO_WORLD_RESPONSE_TO_NEXT_DECISION}}

The loop must contain a meaningful decision, readable challenge, consequence,
reward/progression, escalation/variation, and next decision. Implement failure,
recovery, reset, and replay so a second run can differ. Teach the primary verb
through play rather than a blocking instruction card. Exercise a representative
three-minute slice including success, failure/recovery, and replay.

For puzzle games and rule-heavy simulations, write and run a deterministic
verification script. Model state-space using the real rules, prove every level
or scenario is solvable, validate requested math/geometric constraints, and
prove the goal is not reachable when the core mechanism is disabled.

## Motion and atmosphere

The world must not feel frozen. Implement the specified primary animation plus
natural secondary motion at different frequencies and amplitudes:

{{PRIMARY_AND_SECONDARY_MOTION_SYSTEMS}}

Use anticipation, weight, follow-through, damping, and recovery appropriate to
the material and scale. Tie strong particles, bloom, distortion, color shifts,
or shake to explicit event envelopes:

idle baseline -> anticipation -> event peak -> short hold -> recovery

Pause or reduce expensive/continuous animation when the page is hidden.

## Workspace and delivery contract

- Work only in the CURRENT working directory. Inspect and preserve existing
  repository instructions, platform integrations, and unrelated user files.
- For a blank/static deliverable, create a static site rooted here with
  `index.html` as the entry point. For an existing application, preserve its
  entry/build/deployment contract and ensure the requested final route works.
- Keep runtime assets in the project or load from pinned public CDN versions.
  Do not depend on a development-only local service in the final output.
- Choose the framework and libraries that produce the best result for the
  current repository. Do not replace a working platform shell without need.
- Provide visible loading, error, pause, and WebGL fallback states.

## Responsive, mobile, and accessibility

- Support desktop and mobile layouts without shrinking the desktop composition
  blindly. Preserve the hero, action zone, and world fantasy in the mobile crop.
- Provide touch controls with stable target sizes, safe area insets, and no
  accidental browser scroll/zoom during play.
- Support keyboard access for applicable controls and visible focus for DOM UI.
- Respect `prefers-reduced-motion`: disable idle auto-rotation, continuous shake,
  aggressive flicker, and nonessential camera/effect motion while preserving
  interaction feedback and state readability.
- Pause/recover cleanly across blur, visibility changes, resize, orientation,
  context loss, and interrupted input.

## Performance target

Target approximately 60 fps at 1080p on a typical desktop with a practical
frame-time near 16.7 ms, plus a measured mobile quality tier.

- Cap DPR/devicePixelRatio by tier instead of rendering unbounded retina
  resolution.
- Instance repeated books, bulbs, foliage, debris, architecture modules, or
  similar meshes; share geometries, materials, programs, and textures.
- Budget shadow casters, reflection updates, transparent layers, particles,
  texture resolution, draw calls, triangles, bones, and postprocessing passes.
- Use simplified colliders rather than render geometry for active physics.
- Avoid React/UI state updates every frame; update hot transforms and uniforms
  through animation/renderer state.
- Prewarm signature materials/effects and avoid runtime shader recompilation.
- Measure renderer counts and sustained frame-time; degrade secondary shadows,
  particles, reflections, DPR, and distant detail before sacrificing the hero,
  core interaction, or signature moment.

## Artifact-free loading and reveal

Never expose a partially initialized WebGL scene.

1. Keep an intentional opaque loading surface visible while critical assets,
   fonts, models, textures, environment maps, audio metadata, and scene state
   settle. It must look designed rather than like a solid black failure frame.
2. Give every material a plausible base color and safe scalar defaults so a
   delayed map never appears as a pure-black patch.
3. Pre-upload generated/critical textures with `renderer.initTexture` when
   available and force required loaders to resolve.
4. Precompile every visible material and state variant with `compileAsync` when
   supported or `renderer.compile(scene, camera)` as fallback.
5. Prewarm postprocessing passes, render targets, particles, reflections, and
   signature material variants by rendering them offscreen or under the loading
   surface.
6. Render the real scene under the overlay and count actual rendered frames.
   Reveal only after readiness checks pass and at least three stable frames have
   completed. Never reveal on a fixed timer.
7. Fade/remove the loading surface atomically, verify pointer/keyboard focus,
   and prevent a one-frame transparent/black gap.

## Verification and repair

Do not stop when the code looks correct. Actually run the final route in a real
browser, interact with it, inspect screenshots at full size and thumbnail size,
and iterate.

Required verification:

- run all available lint, type, test, and production build checks;
- run custom solver/static verification for rule-heavy games, puzzles,
  simulations, geometry constraints, generated level sets, or AI pathing;
- expose a debug automation API when browser auto-play is required, then use it
  in a real browser to complete all levels/states instead of relying on manual
  confidence;
- capture the authored default frame and every primary/signature/result state;
- capture multiple azimuths, elevations, distances, pans, and zoom levels across
  the full inspection envelope; verify finished backs/sides, contact, shadows,
  occlusion, near/far planes, and no camera clipping;
- capture desktop and mobile portrait, plus landscape when the experience uses it;
- exercise real controls, interruption, resize, pause, error, success/failure,
  recovery, reset, and second-run paths that apply;
- inspect page errors, console warnings, failed requests, shader compile/link
  errors, WebGL context loss, layout shifts, and invalid camera/physics values;
- record draw calls, triangles, textures, geometries, DPR, and sustained
  frame-time for desktop and mobile tiers;
- when visual references were used, compare role-matched source/render frames
  side-by-side for composition, palette/value distribution, material response,
  lighting/shadows, texture/render grammar, fog, tone mapping, camera, and
  identity; when none were used, compare against the resolved design spec.

Cold-reload reveal verification:

- perform a true cold reload and capture approximately 0.3 s, 1 s, and 3 s, plus
  the last loading frame and the first three revealed frames;
- before readiness, an intentional loading surface is valid; after reveal, no
  loading veil may remain;
- explicitly inspect for solid black rectangles, bands, blocks, top/bottom
  letterbox bars, transparent gaps, placeholder planes, safety floors, missing
  maps, untextured black materials, half-compiled effects, and one-frame flashes;
- remove every visible artifact and repeat the cold-reload capture.

Repair order:

1. blank/broken/reveal/interaction blockers;
2. camera, hero size, composition, clipping, unfinished angles;
3. material/light separation and reference/spec mismatch;
4. motion weight, feedback, gameplay state, mobile controls;
5. performance instability;
6. secondary polish.

## Completion and handoff

Write a short `README.md` describing what the experience shows, techniques used,
controls, quality/reduced-motion behavior, and how to run the static/final build.

Leave the deliverable runnable. Report the entry URL/file, controls, key design
and asset decisions, generated/external assets, screenshots/evidence, measured
performance, verification commands, and any remaining device risk. The rendered
experience is the primary artifact.

---
