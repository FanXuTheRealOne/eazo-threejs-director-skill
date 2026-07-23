import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('one-line requests compile through one central design spec and production prompt', async () => {
  const [skill, compiler, spec, prompt] = await Promise.all([
    read('SKILL.md'),
    read('references/prompt-compiler.md'),
    read('assets/design-spec-template.md'),
    read('assets/realtime-3d-production-prompt.md'),
  ]);

  assert.match(skill, /single production prompt/i);
  assert.match(skill, /assets\/realtime-3d-production-prompt\.md/);
  assert.match(skill, /assets\/design-spec-template\.md/);
  assert.match(compiler, /one-line request/i);
  assert.match(compiler, /fill every required field/i);
  assert.match(compiler, /remove unused/i);
  assert.match(compiler, /后室/);
  assert.match(compiler, /Labubu/i);
  assert.match(spec, /Literal user request/i);
  assert.match(spec, /Resolved design spec/i);
  assert.match(prompt, /Literal user request/i);
  assert.match(prompt, /Resolved design spec/i);
});

test('the production prompt closes visual, camera, performance, reveal, mobile, and QA gaps', async () => {
  const prompt = await read('assets/realtime-3d-production-prompt.md');

  assert.match(prompt, /CURRENT working directory/);
  assert.match(prompt, /index\.html/);
  assert.match(prompt, /hero composition/i);
  assert.match(prompt, /Technical\/runtime contract/i);
  assert.match(prompt, /Mechanics and rules/i);
  assert.match(prompt, /Camera direction/i);
  assert.match(prompt, /foreground.*midground.*background/is);
  assert.match(prompt, /inspection envelope/i);
  assert.match(prompt, /all.*angles/is);
  assert.match(prompt, /camera director/i);
  assert.match(prompt, /drone|crane|dolly/i);
  assert.match(prompt, /Shot bible/i);
  assert.match(prompt, /start composition/i);
  assert.match(prompt, /end composition/i);
  assert.match(prompt, /subject size/i);
  assert.match(prompt, /Camera audit/i);
  assert.match(prompt, /secondary motion/i);
  assert.match(prompt, /desktop.*mobile/is);
  assert.match(prompt, /touch/i);
  assert.match(prompt, /safe area/i);
  assert.match(prompt, /prefers-reduced-motion/i);

  assert.match(prompt, /60\s*fps/i);
  assert.match(prompt, /DPR|devicePixelRatio/i);
  assert.match(prompt, /instanc/i);
  assert.match(prompt, /frame[- ]time/i);
  assert.match(prompt, /compileAsync|renderer\.compile/);
  assert.match(prompt, /initTexture/);
  assert.match(prompt, /prewarm.*postprocessing/is);
  assert.match(prompt, /actual rendered frames/i);
  assert.match(prompt, /fixed timer/i);
  assert.match(prompt, /plausible base color/i);
  assert.match(prompt, /solver|state-space/i);
  assert.match(prompt, /debug automation API/i);
  assert.match(prompt, /random.*geometry|filler shapes|abstract geometry/is);
  assert.match(prompt, /background.*whitelist/is);
  assert.match(prompt, /at most three/i);
  assert.match(prompt, /value ladder|temperature counterpoint/i);

  assert.match(prompt, /cold reload/i);
  assert.match(prompt, /0\.3.*1.*3/is);
  assert.match(prompt, /black rectangles/i);
  assert.match(prompt, /multiple azimuths/i);
  assert.match(prompt, /README\.md/);
});

test('Image2, multi-view generation, and Meshy are independent conditional decisions', async () => {
  const [skill, routing] = await Promise.all([
    read('SKILL.md'),
    read('references/asset-routing.md'),
  ]);

  assert.match(skill, /conditional/i);
  assert.match(skill, /Skip Image2/i);
  assert.match(skill, /Skip Meshy/i);
  assert.match(routing, /art direction only/i);
  assert.match(routing, /Skip Image2/i);
  assert.match(routing, /Skip Meshy/i);
  assert.match(routing, /multi-view.*only when/is);
  assert.match(routing, /Meshy 6.*only when/is);
  assert.match(routing, /上海/);
  assert.match(routing, /Labubu/i);
  assert.match(routing, /procedural/i);
});

test('the unified template preserves mature interaction and reference-derived rendering when applicable', async () => {
  const [prompt, spec, routing, verification] = await Promise.all([
    read('assets/realtime-3d-production-prompt.md'),
    read('assets/design-spec-template.md'),
    read('references/asset-routing.md'),
    read('references/verification.md'),
  ]);

  assert.match(spec, /camera/i);
  assert.match(spec, /Technical\/runtime contract/i);
  assert.match(spec, /Mechanics and Rules/i);
  assert.match(spec, /Camera Direction/i);
  assert.match(spec, /Shot bible table/i);
  assert.match(spec, /Camera audit captures/i);
  assert.match(spec, /Background whitelist/i);
  assert.match(spec, /Delete-before-polish/i);
  assert.match(spec, /Debug and automation API/i);
  assert.match(spec, /Mechanic-required proof/i);
  assert.match(spec, /Decoration budget/i);
  assert.match(spec, /Forbidden background filler/i);
  assert.match(spec, /Color grading/i);
  assert.match(spec, /prompt fingerprint/i);
  assert.match(spec, /reference scorecard/i);
  assert.match(spec, /render translation ledger/i);
  assert.match(spec, /palette/i);
  assert.match(spec, /material/i);
  assert.match(spec, /shader/i);
  assert.match(spec, /postprocessing/i);
  assert.match(spec, /asset route/i);
  assert.match(prompt, /decision.*consequence.*reward.*escalation/is);
  assert.match(prompt, /failure.*recovery.*replay/is);
  assert.match(prompt, /prompt fingerprint/i);
  assert.match(prompt, /score.*semantic.*form.*material.*light.*camera.*render/is);
  assert.match(prompt, /render translation ledger/i);
  assert.match(prompt, /neutral.*render.*calibrat/is);
  assert.match(routing, /official|first-party/i);
  assert.match(routing, /no Image2.*does not mean no reference/is);
  assert.match(routing, /do not average incompatible references/i);
  assert.match(verification, /side-by-side/i);
  assert.match(verification, /palette/i);
  assert.match(verification, /material/i);
  assert.match(verification, /tone mapping/i);
  assert.match(verification, /debug API/i);
  assert.match(verification, /negative case/i);
  assert.match(verification, /shot bible/i);
  assert.match(verification, /declared background visual families/i);
});

test('the main skill and reference surface stay deliberately small', async () => {
  const skill = await read('SKILL.md');
  const references = (await readdir(new URL('../references/', import.meta.url)))
    .filter((name) => name.endsWith('.md'))
    .sort();

  assert.ok(skill.split('\n').length <= 200, `SKILL.md has ${skill.split('\n').length} lines`);
  assert.deepEqual(references, [
    'asset-routing.md',
    'prompt-compiler.md',
    'runtime-patterns.md',
    'verification.md',
  ]);
  assert.doesNotMatch(skill, /director-workflow|prompt-reference-lookdev|design-dna-3d/);
});
