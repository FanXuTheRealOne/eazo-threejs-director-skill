# Director Workflow

This is the production sequence for turning a short request into a finished 3D
experience. Each phase has an artifact and a gate. Keep artifacts compact; use
them to make decisions, not to delay implementation.

## Contents

- [Audit, references, brief, and Design DNA](#0-repository-audit)
- [Assets, visual development, and shots](#4-asset-and-system-decomposition)
- [Interaction and implementation passes](#7-interaction-contract)
- [Verification and delivery](#9-verification-loop)

## 0. Repository Audit

Inspect:

- local `AGENTS.md` and repository instructions;
- framework and exact package versions;
- app shell, providers, routing, localization, and environment metadata;
- existing assets, licenses, and model/texture formats;
- existing visual system and responsive rules;
- dirty git state and user-owned edits;
- current dev-server commands and occupied ports.

**Gate:** explain which contracts must remain untouched.

## 1. Prompt/Reference Lock and Project Memory

For every visually directed request, follow `prompt-reference-lookdev.md` before
writing the production brief:

1. preserve the user's verbatim prompt in project memory;
2. extract the literal constraints, exclusions, and prompt fingerprint;
3. run role-specific reference search queries for overall direction, palette,
   form/material, light, camera/composition, and shader/postprocessing;
4. inspect full-resolution candidates, complete the candidate scorecard, and
   assign approved references explicit roles;
5. add palette measurements and the render translation ledger to the visual
   bible.

Copy the templates from `assets/reference-memory/` into
`docs/references/<project-slug>/` for styled experiences even when the prompt is
original. If licensing prevents local retention, preserve URLs, source/query
provenance, measurements, and the decision record.

If the request names an existing game, world, artwork, brand, product,
character, collectible, person, vehicle, or other recognizable subject, follow
the stricter `reference-fidelity.md` source rules as well:

1. search the web for real high-resolution official or first-party sources;
2. copy the templates from `assets/reference-memory/` into
   `docs/references/<project-slug>/`;
3. complete `docs/references/<project-slug>/reference-manifest.md` and
   `visual-bible.md`; complete `gameplay-contract.md` for games;
4. record source confidence, must-match dimensions, forbidden drift, permitted
   adaptations, and rights/retention notes;
5. save authorized source images, generated Image2 views, model turntables, and
   comparison captures under the same stable project-memory directory.

Do not choose a palette, filter, material family, texture sampling mode, camera,
model prompt, or gameplay simplification before prompt/reference evidence
exists.

**Gate:** every visual decision points to an approved reference role and render
translation entry. Every named-reference decision additionally points to a
recorded authoritative source or an explicit user-authorized adaptation.

## 2. Production Brief

Resolve:

- audience and emotional promise;
- 20-second core loop;
- environment archetype and scale;
- hero object and supporting hierarchy;
- primary input on desktop and mobile;
- signature moment;
- success, failure, reset, loading, and error states;
- expected session length and device tier.
- verbatim prompt, prompt fingerprint, and approved art references by role.

Separate literal user requirements from inferred direction. Inferences should be
specific enough to implement: "oppressive institutional liminal horror" is more
useful than "cool and cinematic."

**Gate:** describe what the user sees and does in the first five seconds.

## 3. Design DNA

Fill the contract in `design-dna-3d.md`. Establish numeric camera and rendering
ranges plus material and motion rules.

**Gate:** the palette, camera, material, motion, and environment rules all serve
the same emotional promise.

## 4. Asset and System Decomposition

List every visible system by first-frame importance. Route it using
`procedural-vs-model.md`. For complex heroes, identify separate controllable
parts, material zones, state variants, rig needs, and collider proxies.

Order asset effort:

1. hero silhouette and state-changing parts;
2. interaction-critical geometry and colliders;
3. environment modules that establish scale and depth;
4. supporting props that tell the story;
5. effects and distant dressing.

**Gate:** no high-value organic or silhouette-critical hero is left as a vague
"make it with primitives" task.

## 5. Visual Development

Use existing user references first. For named IP, use real source images and
follow the source-backed Image2 route in `reference-fidelity.md` and
`image2-art-pipeline.md`. For original subjects, keep searched role references
as the look-development truth and use Image2 only where a coherent synthesized
target is still needed:

1. generate mood-frame candidates;
2. select/extract a stable visual DNA;
3. generate orthographic and material/state references for hero assets;
4. generate key shots for camera and lighting;
5. generate textures/decals only with known UV and tiling needs;
6. generate GLBs from consistent references when models outperform code; use
   Meshy 6 Multi-Image to 3D for recognizable named subjects.

Inspect all generated output. Mark generated references separately from found
sources. Regenerate weak views rather than coding around a bad reference.

**Gate:** the default and signature shots have visual targets, and every palette,
material, light, shader, and post choice has a reference-backed runtime mapping.

## 6. Shot Contract

For each required shot record:

```text
Name / trigger / duration
Camera position + target + FOV
Hero frame occupancy and screen position
Foreground / midground / background roles
Movement path, easing, damping, shake envelope
Lighting or post-effect changes
Mobile crop and control-safe region
Exit and recovery
```

Do this for establishing, playable/default, primary action, signature, result,
and mobile states. Use `camera-language.md`.

**Gate:** every camera transition has a trigger, target, duration, and recovery.

## 7. Interaction Contract

Describe a state machine rather than disconnected event handlers:

```text
boot -> ready -> active -> resolving -> success|failure -> recovery -> ready
```

Add product-specific substates. For every transition define:

- permitted input;
- immediate visual acknowledgment;
- world/physics mutation;
- animation and camera response;
- sound cue and haptics if the platform supports them;
- completion condition;
- cancellation, reset, and interruption behavior.

For games, complete the maturity contract in `gameplay-maturity.md` and exercise
the three-minute slice. Controls plus a fetch counter do not satisfy this gate.

**Gate:** there is no dead input or unrecoverable state, and the loop contains a
meaningful decision, escalation, consequence, reward/progression, recovery, and
replay/continue path.

## 8. Implementation Passes

Build in visually testable slices:

### Pass A: framing

Create full-height shell, Canvas, fallback, camera rig, control map, and a blockout
with the final relative scale. Capture desktop and mobile.

### Pass B: loop

Implement the complete core interaction with proxy geometry and explicit states.
Verify the user can start, act, receive a result, and reset.

### Pass C: prompt/source-locked look development

Replace hero assets, establish material families, practical lights, shadow logic,
fog, background depth, and calibrated tone mapping.

Calibrate in the order recorded by the render translation ledger: camera and
major masses, palette/value hierarchy, material response, motivated lights,
fog/atmosphere, shader behavior, then postprocessing. Capture comparable crops
for each reference role. For named references, also capture the same camera as
the target and repair geometry, texture filtering/texel scale, and identity
drift before proceeding.

### Pass D: signature moment

Build the memorable transformation, collision, reveal, launch, or camera move.
Use the actual 3D object when the moment is spatial.

### Pass E: finish

Add environmental details, decals, particles, audio, postprocessing, loading,
errors, pause, reduced motion, responsive HUD, and quality tiers.

**Gate after each pass:** run the app and inspect the rendered result. Fix framing
or visual direction before increasing detail.

## 9. Verification Loop

Follow `verification.md`. The repair order is:

1. blank/broken/blocked interaction;
2. wrong camera or hero scale;
3. unreadable lighting/material separation;
4. wrong motion weight or feedback timing;
5. mobile crop/control failures;
6. performance instability;
7. secondary polish.

Do not tune tiny details while the camera, silhouette, or core loop is wrong.

Prompt-locked work requires role-specific side-by-side captures and an updated
`comparison-log.md`. Named reference-locked work additionally requires
source-aligned captures. A build, WebGL, performance, or self-authored
screenshot pass cannot override a reference mismatch.

## 10. Delivery

Leave the dev server running when a server is required. Report:

- URL;
- core interaction and control map;
- generated/local assets and their locations;
- project reference-memory and comparison-evidence paths;
- the real gameplay slice completed and its recovery/replay result;
- verification commands and key measured results;
- known limitations that remain after repair.
