# Gameplay Maturity

A scene is not a mature game because the player can move, click, collect items,
or reach a completion overlay. Mature play creates readable goals, meaningful
decisions, changing pressure, consequences, progression, recovery, and a reason
to replay or continue.

## Contents

- [Core loop](#1-core-loop-contract)
- [Reference-game mapping](#2-reference-game-mapping)
- [Three-minute slice](#3-three-minute-vertical-slice)
- [Maturity pillars](#4-maturity-pillars)
- [Acceptance matrix](#5-acceptance-matrix)
- [Time-pressure scope](#6-scope-under-time-pressure)
- [Mistakes and red flags](#common-mistakes)

## 1. Core Loop Contract

Write the loop before full art production:

```text
verb -> challenge -> consequence -> reward -> escalation -> next decision
```

For every step record:

- what the player understands and chooses;
- what skill, resource, timing, route, or trade-off matters;
- immediate world, physical, camera, audio, and UI feedback;
- success and failure conditions;
- persistent change and the next unlocked possibility;
- interruption, recovery, reset, and replay behavior.

**Gate:** if the loop can be completed by following a marker and repeating one
input with no meaningful decision, it is a guided demo rather than a mature game.

## 2. Reference-Game Mapping

When a request names an existing game, research its interaction grammar as well
as its appearance. In `gameplay-contract.md`, map:

| Reference pillar | Evidence | Adapted system | What must remain recognizable |
| --- | --- | --- | --- |
| primary verbs | official gameplay/video | player actions | cadence and affordance |
| resources/tools | source evidence | inventory/economy | decisions and constraints |
| world response | source evidence | simulation/NPCs | consequence and feedback |
| escalation | source evidence | pacing/state changes | rising demand or risk |
| recovery/replay | source evidence | save/reset/continue | agency after result |

Preserve at least three central pillars of the named game's loop unless the user
explicitly asks for a visual-only reinterpretation. A title, blocky geometry,
or familiar HUD does not compensate for unrelated play.

For a compact Minecraft-like game, mining and placement should affect resource,
route, safety, construction, progression, or world state. Inventory/tool choices,
exploration/resource variation, build utility, and reactive creatures/NPCs should
interact. A three-item fetch quest that does not deepen mine/build decisions is
insufficient by itself.

## 3. Three-Minute Vertical Slice

Use a three-minute slice as a default maturity test for compact web games; adapt
timing only when the genre clearly requires a shorter or longer session.

| Time | Required experience |
| --- | --- |
| 0-15 s | onboarding through world affordances; first useful input works |
| 15-60 s | primary verb, goal, feedback, and one meaningful decision |
| 60-120 s | a new constraint, route, tool, enemy, resource trade-off, or system interaction |
| 120-180 s | earned payoff, failure or success, persistent result, and recovery/continue choice |

Play the slice without developer shortcuts. If content runs out, the challenge
does not change, or the result is only a DOM overlay, improve the systems before
adding decorative props.

## 4. Maturity Pillars

### Onboarding and readability

- The first goal and useful action are discoverable without a manual.
- Feedback arrives within 100 ms for direct actions or shows immediate progress.
- Landmarks, target hierarchy, and affordances remain readable during effects.

### Control and embodiment

- Movement, camera, collision, selection, and action cadence suit the fantasy.
- Input has anticipation, response, consequence, and recovery.
- Edge cases such as walls, slopes, repeated contact, pointer release, touch
  gestures, pause, and respawn are exercised.

### Meaningful decisions

- At least two valid options differ in route, timing, risk, resource, or reward.
- Tools or resources change what the player can do, not only a counter in the HUD.
- The player can learn and improve rather than merely wait or follow markers.

### Escalation and variety

- The second minute is mechanically different from the first.
- New states combine existing systems instead of only increasing item count.
- Difficulty changes through space, timing, behavior, scarcity, or coordination,
  not only larger health values or longer distances.

### Consequence, reward, and world response

- Success and failure visibly alter the world or available actions.
- NPCs/creatures react to player proximity, actions, danger, progress, or result.
- Rewards unlock capability, access, expression, efficiency, knowledge, or a
  meaningful spectacle earned by play.

### Failure, recovery, and replay

- A failure or mistake has a legible cause and bounded cost.
- The player can recover, retry, reset, or continue from every terminal state.
- A replay changes route, strategy, construction, score, timing, or world state;
  it is not only the same sequence after clearing local storage.

## 5. Acceptance Matrix

| Area | Evidence | Blocker |
| --- | --- | --- |
| onboarding | first-play capture | instructions are required before any useful action |
| core verb | three repeated trials | action is inconsistent, weightless, or dead |
| choice | decision log/telemetry | only one valid route or action sequence |
| escalation | full slice capture | pressure and mechanics never change |
| consequence | success + failure capture | result exists only in UI |
| systems | interaction matrix | mechanics do not affect one another |
| world/NPC | reaction capture | characters are static decoration |
| persistence | reload/reset tests | progress corrupts or traps play |
| desktop/mobile | real input paths | one platform cannot complete the loop |
| replay | second run | identical forced sequence with no new agency |

Automate state and edge-case assertions, but judge timing, decision quality, and
feel from real play. Unit tests prove rules; they do not prove maturity.

## 6. Scope Under Time Pressure

Protect depth before breadth:

1. keep one polished loop with interacting systems;
2. keep one complete escalation and recovery path;
3. keep fewer high-fidelity characters/levels/variants;
4. remove unrelated side features, long narrative, multiplayer, or cosmetic
   counts before removing decision quality or feedback;
5. degrade animation complexity before replacing recognizable hero assets with
   primitives.

One compact level with resources, choices, reactive NPCs, escalation, payoff,
and replay is more mature than a large empty map with many collectibles.

## Common Mistakes

- Treating WASD movement as gameplay rather than a control foundation.
- Calling a linear fetch quest a loop because it has a progress counter.
- Adding many NPC color variants without behaviors or systemic roles.
- Using a completion modal as the only reward or world change.
- Adding particles, bloom, sound, and camera shake before the decision structure.
- Testing only the happy path or using debug state to skip the actual session.
- Preserving a named game's appearance while replacing its central verbs.

## Red Flags — Stop and Rework the Loop

- no written gameplay contract
- no meaningful decision in the first minute
- second minute repeats the first without a new constraint
- no failure, cost, recovery, reset, or continue behavior
- mechanics are independent counters rather than interacting systems
- NPCs are static props with dialogue bubbles
- reward is only text/UI
- a browser automation shortcut is the only completed playthrough
