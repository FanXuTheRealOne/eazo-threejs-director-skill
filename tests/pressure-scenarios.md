# Skill Pressure Scenarios

## RED: One-line request meets a fragmented skill

### Requests

1. `做一个后室风格的交互界面。`
2. `做一个 Labubu 可爱的娃娃机。`
3. `做一个以上海为背景的互动场景。`
4. `参考纪念碑谷做一个等距视错觉解谜网页游戏。`

### Observed pre-refactor failure

The skill distributed authority across its main file and many independent
workflow, Design DNA, camera, lighting, shader, gameplay, reference, Image2,
Meshy, performance, verification, and case documents. A short request could
therefore trigger different partial paths:

- implementation began before one complete design spec existed;
- reference research and image generation were treated as one decision;
- Image2 turnarounds and Meshy were overemphasized even when procedural geometry
  was better;
- camera, mobile, performance, prewarm/reveal, and black-artifact verification
  were easy to omit because no single artifact owned the complete contract;
- build/WebGL success could coexist with generic art direction or unfinished
  camera angles.
- rule-heavy requests could ship without a solver, browser auto-play proof, or
  a negative proof that the requested mechanism is necessary.
- generic 3D builds could hide weak composition behind random background
  geometry and coarse color.

The user also observed that a detailed production prompt without forced
turnaround/model generation could outperform the more fragmented skill.

## GREEN: Unified compiler acceptance

A fresh agent receiving only the skill and one request must:

1. preserve the literal request;
2. fill one resolved design spec covering experience, hero, depth layers, art,
   camera, interaction, mechanics, motion, mobile, performance, reveal, and verification;
3. make independent per-asset decisions for references, Image2, multi-view, and
   Meshy;
4. define deliberate camera choreography, color grading, decoration budget, and
   named background props instead of static/default camera and filler shapes;
5. fill one production prompt and remove unused sections/placeholders;
6. implement and verify against that one prompt rather than assembling parallel
   mini-plans.

### Expected route: 后室

- research recognizable world/render grammar;
- procedural modular architecture and collision;
- no automatic Image2 turnaround;
- no automatic Meshy model;
- authored exploration camera, mobile/reduced-motion fallbacks, cold reveal and
  multi-angle browser inspection.

### Expected route: Labubu 娃娃机

- official identity evidence for the prominent doll;
- procedural cabinet, mechanics, glass, room, controls and physics;
- Image2 multi-view only if no faithful existing model exists and missing views
  block a close all-angle asset;
- Meshy evaluated only for that doll after the multi-view gate;
- mature grab/result/recovery/replay loop and identity comparison if generated.

### Expected route: 上海背景

- real place/era/district references for skyline, streets, material, light and
  weather;
- references may remain art direction only;
- Image2 key shot/multi-view only where it resolves a specific composition or
  landmark;
- Meshy only for a justified high-occupancy asset, not the entire skyline;
- procedural/sourced modular city construction remains the default.

### Expected route: isometric impossible-geometry puzzle

- preserve hard technical constraints such as single HTML, exact Three.js
  version, orthographic/isometric camera direction, and forbidden controls;
- model grid heights, BFS/pathing, rotations, illusion links, elevators, enemies,
  stairs, levels, win states and debug API as real executable rules;
- write a Node state-space solver that proves every level is solvable, validates
  illusion-link math, and proves the goal is unreachable without the core
  mechanism;
- browser auto-play all levels through debug hooks and manual time advancement;
- verify screenshots for start visibility, no occlusion, refined palette,
  purposeful named decorations, and no random background filler.

## Production Prompt Quality Gate

The compiled prompt is incomplete if it omits any of these:

- first-frame hero composition and foreground/midground/background roles;
- explicit technical stack/runtime/camera constraints;
- concrete mechanics/rules/state model and debug automation API;
- camera archetype, inspection envelope, all-angle completion and recovery;
- authored camera shot list with drone/crane/dolly/reveal/tracking where allowed;
- differentiated materials, motivated light, purposeful shaders/post;
- deliberate color grade, value hierarchy, temperature counterpoint and no
  meaningless background clutter;
- primary and secondary motion;
- meaningful interaction states or mature game loop;
- desktop/mobile/touch/safe-area/reduced-motion behavior;
- 60 fps target, DPR/instancing/resource budgets and measured frame-time;
- shader/texture/postprocessing prewarm and actual-frame reveal without a timer;
- cold reload captures around 0.3/1/3 seconds and first revealed frames;
- explicit inspection for black blocks, bars, veils, placeholders, safety floors
  and untextured materials;
- real browser repair loop and concise README handoff.
