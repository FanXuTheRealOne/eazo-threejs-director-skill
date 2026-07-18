# 3D Design DNA

Write this compact contract before detailed implementation. Replace subjective
words with observable rules, ranges, and relationships.

## Contents

- [DNA template](#dna-template)
- [Derivation rules](#derivation-rules)
- [Coherence test](#coherence-test)

## DNA Template

```text
Emotional promise:
Visual era / world logic:
Named reference source IDs:
Must-match dimensions:
Permitted adaptations:
Forbidden drift:

COLOR AND LIGHT
Base/environment:
Hero separation:
Practical light roles:
Danger/success/accent roles:
Exposure / contrast / saturation:
Fog color + near/far or density:
Tone mapping:
Texture filtering / texel scale:

SHAPE AND DENSITY
Hero silhouette:
Primary shape family:
Secondary/detail shape family:
Edge language:
Foreground density:
Midground density:
Background density:
Negative-space rule:

MATERIAL FAMILIES
Hero:
Architecture:
Mechanical:
Organic:
Glass/liquid/emissive:
Wear logic and scale:

CAMERA
Default archetype:
FOV/lens range:
Camera height and subject distance:
Hero screen occupancy:
Look target:
Movement grammar:
Shake grammar and maximum envelope:
Mobile crop:
Reference-comparison shots:

MOTION
Weight class:
Acceleration/deceleration:
Damping / overshoot:
Anticipation:
Follow-through / secondary motion:
Idle behavior:

INTERACTION FEEDBACK
Input acknowledgment latency:
Visual response:
Physical response:
Camera response:
Sound response:
Persistent state response:

POSTPROCESSING
Required effects and purpose:
Forbidden effects:

UI
Information hierarchy:
Scene relationship:
Control-safe zones:

QUALITY TIERS
Desktop target:
Mobile target:
First degradation steps:
```

## Derivation Rules

### Palette by role

Do not derive a scene from five arbitrary hex colors. Assign colors to physical
and narrative roles:

- ambient/environment establishes adaptation and atmosphere;
- key/practical lights explain where illumination comes from;
- hero separation uses hue, value, rim, or material contrast;
- interactive states reserve one or two signals;
- UI samples the world but maintains accessible contrast.

Limit a dominant hue family. Use at least one temperature or value counterpoint
unless the brief explicitly requires monochrome.

### Shape hierarchy

Use three scales:

- primary masses readable as a thumbnail;
- secondary forms explain construction or anatomy;
- tertiary detail appears only where camera distance can reveal it.

Avoid adding equal-detail noise everywhere. Concentrate detail around interaction
zones, face/hero features, and camera-visible edges.

### Material identity

Define each family through response, not labels:

```text
painted steel = medium roughness + edge chips + local grime + restrained specular
aged plastic = high roughness + broad color variation + softened edges
wet tile = low roughness patches + reflection breakup + darkened joints
fur = silhouette breakup + directional fibers + soft broad highlights
```

Specify real scale for texture features. A scratch that is 2 cm on a cabinet
must not become a 1 m stripe on a wall.

### Camera grammar

Define which moves are allowed and what they mean. Example:

- slow 2-4 second dolly establishes place;
- 150-300 ms impulse acknowledges impact;
- 600-1000 ms push-in marks a reveal;
- roll stays within 0-2 degrees during play;
- FOV changes only during speed or signature states and returns predictably.

### Motion grammar

Choose a weight class and enforce it across objects. Heavy motion uses slower
acceleration, small overshoot, delayed secondary motion, lower-frequency sound,
and restrained camera response. Light/toy motion can snap faster and overshoot
more, but still requires damping and recovery.

## Coherence Test

Read each section against the emotional promise. Reject contradictions such as:

- "heavy industrial" with instant undamped movement;
- "soft plush" with hard mirror highlights;
- "claustrophobic" with an ultra-wide camera and empty room;
- "premium product" with uncontrolled grime and fisheye distortion;
- "fast racer" with no look-ahead, speed cues, or suspension response.

For reference-locked work, also read every section against the project visual
bible. Reject agent-preferred pastel, toon, neon, cinematic, or PBR treatment
when the named source uses different geometry, palette, texture/pixel grammar,
lighting, fog, tone mapping, camera, or motion.
