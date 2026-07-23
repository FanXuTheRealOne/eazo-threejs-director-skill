# Eazo Three.js Director

A Codex skill that expands a short realtime-3D request into one resolved design
spec and one production-grade implementation prompt, then builds and verifies the
browser result.

## Core Workflow

```text
one-line request
-> resolved design spec
-> mechanics/camera/visual scaffold contract
-> conditional evidence/asset decisions
-> one production prompt
-> browser implementation
-> solver/static proof when rules require it
-> browser auto-play, screenshots, cold-start, mobile and performance repair loop
```

The single production prompt owns scene composition, camera, interaction,
materials, light, motion, shaders, postprocessing, responsive behavior,
performance, artifact-free reveal, and visual QA. Supporting references do not
define competing workflows.

## Scaffold-Level Expansion

Every request is expanded with the same precision as a strong production
scaffold:

- technical stack, camera model, forbidden controls/libraries, debug hooks;
- executable mechanics, state machines, pathing/physics/puzzle rules and reset;
- camera direction with authored establishing, reveal, tracking, drone/crane,
  dolly/orbit/inspection and recovery beats where allowed;
- refined palette, value hierarchy, temperature counterpoint, material/face
  separation, fog/sky/water/effect integration and UI style;
- verification through solver/static proof for rule-heavy work, browser
  auto-play/debug APIs, screenshot review, visibility checks and negative proof
  that the core mechanism is required.

Background detail must be intentional. The prompt now rejects random filler
geometry, abstract clutter, and unidentifiable shapes that cannot be named in
the spec and validated in screenshots.

## Conditional Media Generation

Reference research, Image2, multi-view generation, and Meshy are independent
decisions made per asset.

- A Backrooms environment normally uses researched visual grammar plus
  procedural modular construction; it does not need an automatic turnaround or
  Meshy model.
- A high-occupancy landmark, tower, machine, vehicle, or product hero needs
  source/reference coverage or Image2 multi-view evidence before modeling, then
  a part-by-part Three.js assembly. Procedural is allowed only when it is
  detailed procedural construction, not a coarse stand-in.
- A Labubu claw machine uses procedural cabinet/mechanics and official identity
  evidence; multi-view Image2/Meshy are considered only if a prominent faithful
  doll model is otherwise unavailable.
- A Shanghai background uses real place/era references first; Image2 may resolve
  a key shot or missing landmark view, while Meshy is reserved for a justified
  high-occupancy asset.

Images may remain art direction only. Multi-view images do not automatically
become generated 3D.

## Repository Structure

```text
SKILL.md                              # One compiler/build/verification pipeline
agents/openai.yaml                    # Codex metadata
assets/design-spec-template.md        # Unified spec filled from the user request
assets/realtime-3d-production-prompt.md # Single implementation contract
assets/eazo-r3f-starter/              # Optional maintained scene starter
references/prompt-compiler.md         # One-line request expansion
references/asset-routing.md           # Conditional references/Image2/Meshy
references/runtime-patterns.md        # Concise Three.js/R3F engineering rules
references/verification.md            # Browser, reveal, mobile and performance QA
scripts/                              # Static/WebGL/capture helpers
tests/                                # Skill contract and pressure scenarios
```

## Install

```bash
git clone https://github.com/FanXuTheRealOne/eazo-threejs-director-skill.git \
  ~/.codex/skills/eazo-threejs-director
```

Reload Codex so the skill index refreshes.

## Invoke

```text
Use $eazo-threejs-director to make a Backrooms-style interactive experience.
```

```text
Use $eazo-threejs-director to build a cute Labubu claw-machine game.
```

The agent writes `docs/eazo-design-spec.md` and
`docs/eazo-production-prompt.md` in the target project, removes unresolved
placeholders, implements from that single contract, and verifies the live scene.

## Verification Scripts

```bash
node /path/to/skill/scripts/inspect-scene.mjs --root .
node /path/to/skill/scripts/capture-viewports.mjs \
  --url http://127.0.0.1:3000 --out artifacts/visual-qa
node /path/to/skill/scripts/verify-webgl.mjs \
  --url http://127.0.0.1:3000 --out artifacts/visual-qa
```

The final gate includes real interaction, solver/static proof when applicable,
desktop/mobile captures, camera extremes, reference/spec comparison, sustained
frame time, deliberate color/decoration review, and cold-reload inspection for
black blocks, bars, loading veils, placeholder geometry, untextured materials,
and half-compiled effects.
