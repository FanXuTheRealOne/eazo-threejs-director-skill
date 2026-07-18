import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('named reference worlds and IP assets are locked to sourced visual truth', async () => {
  const [skill, workflow, fidelity, image2, manifest, visualBible] = await Promise.all([
    read('SKILL.md'),
    read('references/director-workflow.md'),
    read('references/reference-fidelity.md'),
    read('references/image2-art-pipeline.md'),
    read('assets/reference-memory/reference-manifest.md'),
    read('assets/reference-memory/visual-bible.md'),
  ]);

  assert.match(skill, /Reference-Locked Requests/);
  assert.match(skill, /references\/reference-fidelity\.md/);
  assert.match(workflow, /docs\/references\/<project-slug>\/reference-manifest\.md/);
  assert.match(fidelity, /official or first-party/i);
  assert.match(fidelity, /high-resolution/i);
  assert.match(fidelity, /must-match/i);
  assert.match(fidelity, /side-by-side/i);
  assert.match(image2, /source-backed turnaround/i);
  assert.match(image2, /do not redesign/i);
  assert.match(manifest, /Source URL/);
  assert.match(manifest, /Rights or usage note/);
  assert.match(visualBible, /Forbidden drift/);
  assert.match(visualBible, /Texture and pixel grammar/i);
});

test('specific organic or branded 3D assets require Image2 views and Meshy 6 multi-image generation', async () => {
  const [skill, fidelity, image2] = await Promise.all([
    read('SKILL.md'),
    read('references/reference-fidelity.md'),
    read('references/image2-art-pipeline.md'),
  ]);

  for (const document of [skill, fidelity, image2]) {
    assert.match(document, /Image2/);
    assert.match(document, /Meshy 6/);
  }

  assert.match(image2, /front, (?:left|right) side, and back/i);
  assert.match(image2, /multi-image-to-3d/);
  assert.match(image2, /image_enhancement.*false/s);
  assert.match(image2, /1 to 4 images/i);
});

test('game requests cannot complete without a mature playable loop and reference comparison evidence', async () => {
  const [skill, gameplay, verification, gameplayContract, comparisonLog] = await Promise.all([
    read('SKILL.md'),
    read('references/gameplay-maturity.md'),
    read('references/verification.md'),
    read('assets/reference-memory/gameplay-contract.md'),
    read('assets/reference-memory/comparison-log.md'),
  ]);

  assert.match(skill, /references\/gameplay-maturity\.md/);
  assert.match(gameplay, /verb -> challenge -> consequence -> reward -> escalation/i);
  assert.match(gameplay, /onboarding/i);
  assert.match(gameplay, /meaningful decision/i);
  assert.match(gameplay, /failure.*recovery/s);
  assert.match(gameplay, /three-minute/i);
  assert.match(verification, /reference-comparison/i);
  assert.match(verification, /palette/i);
  assert.match(verification, /texture filtering/i);
  assert.match(verification, /tone mapping/i);
  assert.match(gameplayContract, /Escalation/);
  assert.match(gameplayContract, /Recovery and replay/);
  assert.match(comparisonLog, /Expected reference/);
  assert.match(comparisonLog, /Observed render/);
});

test('every visual prompt drives reference search and a reference-derived render recipe', async () => {
  const [skill, workflow, lookdev, antiSlop, manifest, visualBible, comparisonLog] = await Promise.all([
    read('SKILL.md'),
    read('references/director-workflow.md'),
    read('references/prompt-reference-lookdev.md'),
    read('references/anti-ai-slop.md'),
    read('assets/reference-memory/reference-manifest.md'),
    read('assets/reference-memory/visual-bible.md'),
    read('assets/reference-memory/comparison-log.md'),
  ]);

  assert.match(skill, /prompt-reference-lookdev\.md/);
  assert.match(skill, /prompt-locked/i);
  assert.match(workflow, /verbatim prompt/i);
  assert.match(workflow, /reference search/i);

  assert.match(lookdev, /prompt fingerprint/i);
  assert.match(lookdev, /search queries/i);
  assert.match(lookdev, /candidate scorecard/i);
  assert.match(lookdev, /reference role/i);
  assert.match(lookdev, /palette/i);
  assert.match(lookdev, /shader/i);
  assert.match(lookdev, /postprocessing/i);
  assert.match(lookdev, /render translation ledger/i);
  assert.match(lookdev, /side-by-side/i);
  assert.match(antiSlop, /verbatim prompt/i);
  assert.match(antiSlop, /render translation ledger/i);

  assert.match(manifest, /Search query/);
  assert.match(manifest, /Reference role/);
  assert.match(visualBible, /Prompt Fingerprint/);
  assert.match(visualBible, /Palette Measurements/);
  assert.match(visualBible, /Render Translation Ledger/);
  assert.match(comparisonLog, /Reference role/);
});
