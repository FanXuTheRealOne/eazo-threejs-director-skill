# Requirement Router

Use this router when the user describes an outcome without naming a rendering
technology. Select the cheapest medium that can deliver the intended experience
at the required quality.

## 1. Detect the Spatial Need

Choose realtime 3D when at least one is central:

- the user navigates or looks around a space;
- objects must rotate, collide, stack, grab, deform, or reveal depth;
- lighting, reflection, parallax, or camera perspective carries the effect;
- the same scene must react continuously to input;
- a product or character must be inspected from arbitrary views;
- gameplay depends on a spatial relationship.

Choose 2D/DOM/canvas when:

- all meaningful states can be authored as fixed frames;
- typography, data, or editorial layout is primary;
- motion is planar and no depth-dependent interaction exists;
- the desired effect is a short linear clip rather than an interactive world.

Choose a hybrid when 3D is the primary experience but DOM is better for HUD,
menus, accessible labels, forms, or platform controls.

## 2. Select the Rendering Layer

| Situation | Default |
| --- | --- |
| Eazo/React application | R3F v9 |
| Existing vanilla Three.js scene | Direct Three.js |
| Vue application with a maintained local stack | Follow that stack; prefer TresJS over archived TroisJS |
| Tiny isolated shader/visual embedded in non-React code | Direct Three.js |
| Declarative scene with React UI/state | R3F |

Do not introduce Vue or TroisJS into the official React Eazo template.

## 3. Identify Experience Archetype

Classify one primary archetype, then add secondary traits:

- **first-person exploration:** mouse/touch look, collision capsule, head motion,
  readable navigation, environmental audio;
- **third-person/chase:** hero movement, camera lag and collision, look-ahead,
  speed or action feedback;
- **fixed cabinet/tabletop:** authored camera, bounded controls, mechanical
  interaction, strong foreground framing;
- **product/object viewer:** orbital inspection, detail presets, material/light
  control, annotations only when requested;
- **cinematic rail experience:** authored shots, state-triggered camera tracks,
  limited user steering;
- **physics toy/sandbox:** direct manipulation, stable fixed-step simulation,
  reset/recovery;
- **abstract visualizer:** instancing/points/shaders, audio or pointer mapping,
  controlled postprocessing;
- **spatial hero:** one strong first-viewport interaction; avoid building a fake
  full game when no loop was requested.

## 4. Complexity Gate

Before committing to 3D, answer:

1. What is the one spatial behavior impossible or significantly worse in 2D?
2. What occupies the first viewport?
3. What is the user's first meaningful input?
4. What visual change proves the input worked?
5. Can mobile input preserve the same fantasy?

If question 1 has no strong answer, use 2D. If questions 2-5 are unanswered,
the problem is not yet directed enough to code.

## 5. Output Decision

Record the route in one sentence:

```text
Use [R3F/direct Three/2D/hybrid] because [spatial requirement]; build
[archetype] with [camera relationship], and reserve [DOM/image/model] for
[specific responsibilities].
```

