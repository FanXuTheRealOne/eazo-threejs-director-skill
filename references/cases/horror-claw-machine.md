# Case: Horror Claw Machine

Use this case for fixed-machine games, crane/claw mechanics, prize piles,
collectible transformations, or a requested 3D jumpscare. Transfer the reasoning
and finish level; do not copy a name, palette, exact cabinet, or character IP.

## Contents

- [Brief and Design DNA](#trigger-example)
- [Asset and Image2 routing](#asset-routing)
- [Shots and physics](#shot-contract)
- [Look, performance, and acceptance](#material-and-lighting-details)

## Trigger Example

> Build a horror claw-machine game. The prizes look cute during play. When the
> player wins one, that same doll turns frightening and jumps toward the camera.

## Inferred Production Brief

- Emotional arc: curiosity -> tactile control -> tension -> apparent reward ->
  abrupt betrayal.
- Core loop: move claw -> drop -> physical grab -> lift/release -> result.
- Spatial archetype: fixed cabinet with authored three-quarter camera.
- Hero hierarchy: cabinet first, claw/prize action second, chosen doll third,
  environmental storytelling around the frame.
- Signature moment: the won physical prize transforms and enters lens space as a
  real 3D object.
- Mobile: stable directional controls and one drop button; no tiny drag target.

## Design DNA Example

- Base: dark neutral room, readable cabinet silhouette, damp floor reflections.
- Practical roles: warm maintenance bulb outside, sick green cabinet light,
  restrained red warning/output light.
- Counterpoint: cute prizes use softer mid-value colors before transformation.
- Shapes: heavy rectangular cabinet, thin mechanical claw, round plush prizes,
  irregular background cables and fixtures.
- Materials: oxidized painted steel, dirty glass, worn plastic controls, soft fur,
  wet floor, emissive tubes/screens.
- Camera: 38-48 degree FOV, cabinet fills roughly 65-80% viewport height, slight
  high three-quarter view into the pile, minimal idle drift.
- Motion: machine is heavy/damped; prizes are soft and swing; scare approach is
  fast after a short hold.
- Post: subtle bloom on practical lights, light vignette/grain only if readable;
  stronger event pulse during scare, then recovery.

## Asset Routing

| Asset/system | Route | Reason |
| --- | --- | --- |
| cabinet/frame/glass | procedural | exact dimensions, layered construction, collision |
| rails/claw/cable | procedural hierarchy + Rapier joints | controllable mechanical motion |
| hero prizes | generated GLB | close organic silhouette, face, fur |
| secondary prizes | lower-detail GLB variants or simplified procedural | pile density with lower screen value |
| room/walls/floor/fixtures | procedural + generated tileable textures | modular, cheap, art-directable |
| grime/scratches/labels | Canvas textures/decals | localized variation |
| atmosphere/sparks/dust | instanced particles/shader | event-driven motion |
| controls/HUD | DOM | accessibility and stable touch layout |
| sound | local assets/Web Audio layers | motors, impact, win, scare |

### Prize decomposition

For each hero collectible specify body, head/face, eyes/mouth, fur/garment shell,
ears/accessories, hands/feet, grab anchor, cute state, horror state, clips/morphs,
camera target, and capsule/compound colliders. Use legally cleared original
characters or user-provided licensed assets; do not reproduce protected IP by
default.

## Image2 Pack

1. Cabinet mood frame showing the playable camera, room dressing, and practical
   light locations.
2. Same-character front/side/back turnaround in cute state.
3. Same-character horror state sheet with only face/surface/state changes.
4. Fur, face, eye, tooth, stitch, and garment material closeups.
5. Default, claw-action, and lens-approach key shots.

The horror turnaround must preserve body proportions and attachment points so
the transformation can use mesh swaps, morph targets, or layered parts without
teleporting into a different character.

## Reference-to-Render Breakdown

The public [FilthyFrost/claw-machine-game](https://github.com/FilthyFrost/claw-machine-game)
repository is useful process evidence:
it keeps a separate `美术参考/` pack, while the live game rebuilds the look with
procedural geometry, Canvas textures, lights, fog, and a screen-space shader.
The runtime does not use the reference images as backgrounds.

Do not infer an original generation prompt from those images: the repository
does not preserve prompt provenance or verifiable image-generation metadata.
Instead, transfer the observable mapping pattern:

| Reference observation | Runtime translation |
| --- | --- |
| compressed retro horror image | reduced internal render size, quantization and Bayer-style dither |
| unstable CRT/analog surface | scan modulation, rolling band, restrained grain and edge aberration |
| dirty institutional enclosure | procedural concrete/rust/grime textures with role-specific scale |
| sick green, rust orange, warning red | fog/background, practical lights, emissive accents, UI color roles |
| decayed cabinet and glass | separate metal, dark metal, dirty glass, label, and control materials |
| brief supernatural disruption | event-driven glitch/flash envelope that returns to baseline |

The lesson is not to copy that palette or filter. Preserve the user's verbatim
prompt, search and approve matching reference roles, then build an equally
traceable ledger for the requested look. For a warm pink/cream machine, the same
mechanisms may require soft shadows and restrained highlight rolloff instead of
CRT degradation.

## Shot Contract

### Ready

- fixed three-quarter cabinet view;
- claw and pile visible behind glass;
- cabinet occupies most of frame without clipping controls;
- background props create depth but remain lower contrast.

### Drop/grab

- small target-follow shift or push, never losing cabinet orientation;
- mechanical light and motor sound respond immediately;
- camera impulse only on hard end stops/contact.

### Result

- successful prize visibly travels through the machine/result path;
- brief reward framing establishes ownership before horror change.

### Scare

1. lock game input and preserve won prize identity;
2. switch/morph to horror state under a 100-300 ms light/audio anticipation;
3. clone or move the actual 3D character into a controlled camera-relative layer;
4. accelerate toward a point before the near plane;
5. hold face readable at high occupancy for 100-250 ms;
6. add bounded camera trauma and audio transient;
7. fade/drop/retract and enter result/recovery state.

No flat sticker or unrelated overlay may substitute for the 3D subject.

## Physics State Machine

```text
ready -> aiming -> dropping -> closing -> evaluating
evaluating -> lifting(success) | retracting(failure)
lifting -> chute/result -> transforming -> scare -> recovery -> ready
```

- rails and claw head: kinematic/prismatic constrained;
- fingers: authored hinge/prismatic motion with contact proxies;
- prize pile: dynamic capsules/balls/compound colliders with damping and sleep;
- winning: containment/contact criteria plus hysteresis, then temporary
  constraint; do not parent instantly from arbitrary distance;
- chute: sensor confirms result once.

## Material and Lighting Details

- dirty glass uses controlled roughness/normal variation and must not obscure the
  prize pile;
- painted metal separates intact paint from exposed metallic chips;
- fur silhouette and broad soft highlight must remain readable in cute and horror
  lighting;
- emissive tubes/screens have nearby light agreement;
- wet floor reflections remain localized and lower priority than cabinet action.

## Performance

- reuse prize materials/geometries where possible;
- use simple colliders and sleeping bodies;
- update reflection/floor effects sparingly;
- cap active particles and shadow-casting prizes;
- prewarm horror materials/model before the result;
- reduce secondary prize count/shadows/post on mobile, not core claw physics.

## Acceptance Evidence

- desktop and portrait ready frames keep cabinet/action legible;
- complete success and failure loops are playable;
- won doll identity remains consistent through transformation;
- scare capture proves a 3D model occupies lens space without near clipping;
- glass, metal, plastic, fur, and floor read as different materials;
- console/WebGL/shader/asset checks pass;
- reset returns to a stable physical pile and controls.
