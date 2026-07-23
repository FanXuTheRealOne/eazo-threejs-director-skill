# Eazo Realtime 3D Design Spec

## Request Grounding

Literal user request:

Resolved design spec:

- Technical/runtime contract:
- Product/experience:
- Prompt fingerprint (subject, adjectives, era/medium, feeling, interaction,
  must-preserve phrases, forbidden drift):
- Audience and session length:
- First-five-seconds promise:
- Emotional arc:
- Explicit exclusions:
- Existing repository/platform contracts:
- Supported inferences:

## Mechanics and Rules

- Core verbs and inputs:
- Formal state model:
- Navigation/pathfinding/physics rules:
- Rotations/transforms/illusion rules:
- Dynamic platforms, switches, locks, or mechanisms:
- Enemies/agents/obstacles:
- Win/loss/recovery/reset:
- Debug and automation API:
- Mechanic-required proof:

## World and Composition

- Spatial archetype and scale:
- Hero subject and target frame occupancy:
- Foreground role:
- Midground role:
- Background role:
- Background whitelist, maximum three visual families:
- Hero part decomposition ledger:
- Required hero views/evidence (front/side/back/top/detail or justified subset):
- Shape and edge language:
- Density and negative-space rule:
- Inspection envelope and all-angle completion rule:
- Desktop composition:
- Mobile composition:
- Signature visual moment:
- Decoration budget and named prop list:
- Delete-before-polish list:
- Forbidden background filler:

## Art Direction

- Visual era/medium/render grammar:
- Palette roles and value hierarchy:
- Color grading and tone curve:
- Temperature counterpoint:
- Hero/background separation:
- Material families and observable responses:
- Per-face/per-part material separation:
- Texture/wear/detail scale:
- Motivated light sources and shadow character:
- Atmosphere/fog/background:
- Tone mapping/exposure:
- Shader requirements and purpose:
- Postprocessing requirements and purpose:
- Forbidden effects:

## Camera Direction

- Camera model and hard constraints:
- Initial shot and subject visibility:
- Shot bible table (phase, purpose, start frame, end frame, camera move, subject size, duration, easing, interruption):
- Drone/crane/dolly/orbit/reveal moves and why each is needed:
- Composition rule for each shot (foreground/midground/background relationship):
- Look target, horizon, parallax and scale cues:
- Bounds, collision, occlusion and recovery:
- Mobile crop and safe zones:
- Reduced-motion camera behavior:
- Camera audit captures:

## Visual Evidence Decision

- Evidence route: none | user-supplied | searched sources | Image2 key art |
  Image2 multi-view | generated 3D
- Why visual evidence is or is not needed:
- Source/reference roles:
- Reference scorecard (source, role, semantic/form/palette/material/light/camera/
  render-grammar match, keep/reject reason):
- Must-match observations:
- Permitted adaptations:
- Comparison views/crops:
- Multi-view requirement decision:

### Render Translation Ledger

Remove this table when the evidence route is `none`.

| Reference observation | Runtime decision | Observable parameter/range | Validation view |
| --- | --- | --- | --- |
|  | palette/material/light/camera/shader/post |  |  |

## Asset Route

| Asset/system | Screen importance | Required views/states | Part decomposition | Route | Image2? | Multi-view? | Meshy 6? | Materials/motion | Fallback | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hero |  |  | primary masses / structure / joints / trim / lights / underside-back | procedural/sourced/generated/hybrid | no/yes + reason | no/yes + reason | no/yes + reason |  |  |  |

## Camera and Interaction

- Controls:
- Idle behavior and user takeover:
- State-triggered shots and recovery:
- Mobile/touch mapping:
- Reduced-motion behavior:
- Interaction state machine:
- Input acknowledgment under 100 ms:
- Persistent world consequence:

## Game/Playable Loop

- Core verb:
- Challenge and meaningful decision:
- Consequence:
- Reward/progression:
- Escalation/variation:
- Failure and recovery:
- Replay/reset difference:
- Onboarding:

Remove this section when the request is not a game or playable loop.

## Motion and Sound

- Primary motion weight:
- Secondary motion systems:
- Anticipation/follow-through/recovery:
- Event-driven effect envelopes:
- Ambient/interaction/result sound roles:
- Pause/background-tab behavior:

## Runtime, Performance, and Reveal

- Runtime/framework and reason:
- Desktop target and frame-time budget:
- Mobile target and quality tier:
- DPR cap:
- Instancing/shared-resource plan:
- Shadow/reflection/transparency budget:
- Texture/geometry budget:
- Loading/error fallback:
- Shader/texture/postprocessing prewarm:
- Actual-frame reveal condition:

## Verification Matrix

- Build/type/lint commands:
- Solver/static proof commands:
- Browser auto-play commands:
- Desktop states and camera views:
- Mobile states and orientation:
- Screenshot beauty/visibility checks:
- Cold reload captures:
- Black-artifact inspection:
- Console/network/WebGL checks:
- Interaction success/failure/recovery path:
- Reference comparison when applicable:
- Frame-time and renderer metrics:
- Completion blockers:
