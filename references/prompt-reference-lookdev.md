# Prompt-to-Reference Look Development

Treat the user's visual prompt as the primary contract and art references as
evidence that makes the contract executable. Search before styling. A reference
pack is complete only when its observations have been translated into runtime
render decisions and compared with the browser output.

## Contents

- [Preserve and parse the prompt](#1-prompt-fingerprint)
- [Search and select references](#2-reference-search)
- [Translate evidence into Three.js](#4-render-translation-ledger)
- [Calibrate and compare the live render](#5-calibration-order)
- [Worked claw-machine query](#7-worked-original-prompt)

## 1. Prompt Fingerprint

Store the verbatim prompt before paraphrasing it. Then extract:

```text
Literal subject/product:
Experience and interaction:
Audience/emotional promise:
Style/medium/era:
Shape and proportion words:
Palette and temperature words:
Material and surface words:
Lighting/time/atmosphere words:
Camera/composition words:
Rendering/shader/filter words:
Motion/weight words:
Explicit exclusions:
Missing evidence:
Agent inferences (clearly marked):
```

Preserve ambiguity instead of silently resolving it. For example, “奶白” is a
warm low-chroma material/color cue, not permission to make every surface pure
white. “可爱” does not automatically mean toon outlines, glossy plastic,
pastels, or miniature proportions. References must disambiguate these choices.

Separate three truth levels:

1. **literal:** the user's words and supplied images;
2. **evidence-backed:** observations from approved references;
3. **inferred:** decisions required to make the experience coherent.

An inference may fill a gap. It may not override literal requirements.

## 2. Reference Search

Convert the fingerprint into targeted image search queries. Do not search only
the entire prompt as one sentence. Use 4-8 queries that each resolve a visual
decision:

| Query family | Query shape | Required evidence |
| --- | --- | --- |
| anchor | subject + style/era + emotional cue + medium | coherent overall world |
| palette | subject/context + palette words + lighting temperature | color/value hierarchy |
| form | subject + shape/proportion/construction cue | silhouette and part language |
| material | named material/surface + object/context + close-up | roughness, wear, translucency |
| lighting | space/object + practical source + time/mood | direction, ratio, falloff, shadow |
| camera | experience + viewpoint/lens/composition | height, FOV family, occupancy, depth |
| render | medium/engine-era + shader/filter cue | texture filtering, tone, fog, post |
| state | action/result/signature moment | appearance and feedback changes |

For original art direction, prefer high-resolution product photography,
interior/industrial photography, production design, established illustration or
game-art portfolios, and real shipped-game captures. For named worlds and IP,
apply `reference-fidelity.md` and prefer official or first-party sources.

Inspect the full-resolution page or asset. Search thumbnails are leads, not
evidence. Record the search query, source URL, publisher/creator, resolution,
access date, rights note, and what the image proves. Reject unattributed AI
aggregator images, compressed thumbnails, watermarked reposts, and references
whose main style conflicts with the prompt.

### Candidate Scorecard

Score candidates before adopting them. Use `0` = conflicts, `1` = weak,
`2` = useful, `3` = strong. Weight dimensions from the prompt rather than using
one universal threshold.

| Candidate | Search query | Proposed reference role | Subject/form | Mood | Palette/value | Material/light | Camera/render grammar | Conflict or uncertainty | Rights/retention | Decision |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |
| REF-001 |  | anchor |  |  |  |  |  |  |  | approve/reject |

Reject a candidate when it strongly contradicts a literal high-priority
dimension, even if its aggregate score is high. Record the reason so it does not
return later as unexamined inspiration.

### Reference Roles

Use one coherent anchor plus the smallest supporting pack that fills gaps:

- **anchor:** overall world, hierarchy, and emotional read;
- **form:** silhouette, construction, proportion, density, edge language;
- **palette:** dominant/support/accent colors and value relationships;
- **material:** surface response, texture scale, wear, glass/fur/metal/plastic;
- **lighting:** practical sources, direction, contrast, shadow, atmosphere;
- **camera:** lens family, horizon, viewpoint, occupancy, depth layers;
- **render:** pixel/texture grammar, shader character, tone mapping, fog, grade;
- **state/motion/UI:** action, feedback, transition, HUD/world relationship.

One image may serve several compatible roles. Do not average incompatible packs
into a style soup. When no exact anchor exists, build a compatible composite
contract from role references. Generate an Image2 mood frame only after the
source pack is defined; mark it as generated synthesis, never discovered truth.

## 3. Extract Measurable Evidence

Write observations before implementation values.

### Palette Measurements

Measure role colors from approved references at representative crops:

```text
Role: environment base | hero base | secondary | interaction accent | warning
Source IDs and crop:
sRGB sample(s):
OKLCH or hue/value/chroma relationship:
Frame-area share:
Lightest readable highlight / darkest readable shadow:
Hero-background value or hue separation:
Temperature counterpoint:
Allowed runtime adaptation:
```

Do not use five arbitrary hex swatches. Preserve proportions and relationships:
dominant-to-accent area, warm-to-cool balance, saturation hierarchy, highlight
rolloff, and shadow color. Convert display samples through the renderer's color
management rather than manually gamma-correcting them twice.

### Form, Material, Light, and Camera

Record:

- primary, secondary, and tertiary shape scales;
- edge profile, bevel frequency, part thickness, negative space, and density;
- material family, broad response, construction detail, local wear, and real
  feature scale;
- visible practical sources, key/fill/rim roles, direction, softness, falloff,
  contrast ratio, shadow color, fog/background agreement;
- camera height, distance, target, FOV family, horizon, subject occupancy,
  foreground/midground/background landmarks, and mobile crop.

Do not infer numeric PBR maps from a beauty image as if it were laboratory
measurement. Use the reference to establish observable response, then tune
valid Three.js material properties under a controlled light rig.

## 4. Render Translation Ledger

Create this ledger in `visual-bible.md` before look-development code:

| Reference role/IDs | Observed evidence | Runtime system | Initial values/range | Quality fallback | Comparison shot/crop | Status |
| --- | --- | --- | --- | --- | --- | --- |
| palette |  | colors, exposure, fog |  |  |  | open |
| material |  | material class/maps |  |  |  | open |
| lighting |  | fixtures/lights/shadows |  |  |  | open |
| camera |  | camera rig/lens |  |  |  | open |
| render |  | shader/texture filtering |  |  |  | open |
| post |  | tone mapping/effect stack |  |  |  | open |

Every shader and postprocessing effect needs a reference-backed visual job:

```text
Reference role and crop:
Observed visual behavior:
Smallest rendering technique that reproduces it:
Uniforms/settings and valid range:
Color-space/tone-mapping position:
Event envelope or stable baseline:
Mobile/reduced-motion fallback:
Comparison method:
```

Examples of evidence-to-technique translation:

| Observed evidence | Candidate technique | Validation |
| --- | --- | --- |
| crisp pixel blocks and stepped colors | low internal resolution, nearest sampling, quantization/dither | close crop + edge/palette comparison |
| broad soft cream highlight on plastic | Standard/Physical material with tuned roughness, large area light | highlight width and value crop |
| light haze that preserves silhouettes | fog matched to far field, restrained density | landmark contrast by depth |
| glow localized around a practical sign | emissive surface + agreeing local light + selective bloom | source and spill crop |
| print/CRT instability | scan modulation, bounded grain/aberration, event tears | full frame and HUD-safe crop |

Do not begin with a fashionable post stack and search for justification later.
If the reference has no visible bloom, vignette, aberration, outline, grain, or
depth of field, omit it.

## 5. Calibration Order

Use the same authored camera and capture after each pass:

1. neutral color management, ungraded output, and correct texture spaces;
2. camera, horizon, subject occupancy, and major shape hierarchy;
3. environment/hero palette and value separation;
4. material family response under a simple controlled key/fill;
5. motivated practical lighting, shadows, reflections, and fog;
6. reference-required material shaders and texture filtering;
7. tone mapping, exposure, color grade, and the minimum post stack;
8. event-driven effect envelopes and mobile quality fallbacks.

Fix the earliest mismatching pass before adding the next. Postprocessing cannot
compensate for the wrong camera, proportions, palette, material, or lights.

## 6. Comparison Gate

Create side-by-side reference/render pairs for every approved reference role.
Match the relevant state, crop, camera, scale, and lighting as closely as the
interactive experience permits.

Review in this order:

1. silhouette, construction, composition, and subject occupancy;
2. palette roles, area proportions, value range, and temperature balance;
3. material response, texture scale/filtering, wear, and contact grounding;
4. practical light direction, shadow, fog, exposure, and highlight rolloff;
5. shader behavior, tone mapping, grade, and filter intensity;
6. action/state readability and mobile preservation.

Use palette samples, histograms, edge/silhouette overlays, landmarks, or
perceptual difference only where they clarify a mismatch. A global pixel score
cannot judge different but role-equivalent original geometry. Record expected,
observed, cause, repair, recapture path, and status in `comparison-log.md`.

## 7. Worked Original Prompt

Prompt: “做一个可爱风格的抓娃娃机游戏，粉白、奶白色，温暖的感觉。”

Prompt fingerprint:

- literal: playable claw machine; cute; pink/white and warm milky cream;
- unresolved: rounded vs realistic cabinet, plush vs plastic dominance, retail
  photography vs stylized realtime rendering, camera relationship;
- exclusions implied by coherence: cold blue showroom light, horror grime,
  neon cyberpunk grade, hard black shadows, generic saturated candy rainbow.

Reference search queries:

1. `pastel pink cream claw machine interior warm lighting product photography`;
2. `kawaii arcade crane game rounded cabinet pink white`;
3. `warm cream ABS plastic soft pink material close up`;
4. `pastel plush toy pile warm retail display lighting`;
5. `cute claw machine game three quarter camera UI`;
6. `warm pastel realtime 3D soft shadow color grading`.

Select one anchor for cabinet/world coherence, then separate material, lighting,
camera, and render references only where the anchor lacks evidence. Sample the
approved pink/cream/value ratios; map cream plastic, painted pink metal, glass,
plush, and emissive UI to distinct materials; place visible warm practical
sources; keep bloom, vignette, LUT/grade, and shader treatment only when the
render reference proves them. The final browser captures must be compared with
those role references, not merely described as “cute” or “warm.”

## 8. Blockers and Rationalizations

| Rationalization | Reality |
| --- | --- |
| “The prompt is enough; I can imagine the look.” | Adjectives do not specify material response, lens, value ratios, or render grammar. |
| “I found a pretty picture.” | A candidate without provenance, score, role, and runtime translation is inspiration, not a contract. |
| “One mood frame covers everything.” | A beauty frame often hides rear form, material scale, camera alternatives, and interaction states. |
| “I will tune colors by eye in the browser.” | Tune against sampled role relationships and comparable captures. |
| “A cinematic preset makes it cohesive.” | Cohesion comes from reference-backed shape, palette, material, light, and camera before post. |
| “The build and WebGL checks pass.” | Technical validity does not prove art-direction fidelity. |

Stop look development when the verbatim prompt is missing, references conflict,
the candidate scorecard is absent, palette/material/light/shader/post choices
have no ledger entry, or the final render has no role-specific comparison.
