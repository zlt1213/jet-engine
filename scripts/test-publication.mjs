import { readFile, writeFile, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import matter from 'gray-matter';

const directory = 'src/content/blog/en';
const draft = `${directory}/publication-draft-fixture.md`;
const preview = `${directory}/publication-preview-fixture.md`;
const original = matter(await readFile(`${directory}/starting-the-project.md`, 'utf8'));
function run() {
  for (const script of ['build', 'verify']) {
    const result = spawnSync('npm', ['run', script], { stdio: 'inherit' });
    if (result.status !== 0) throw new Error(`${script} failed`);
  }
}
let draftCreated = false;
let previewCreated = false;
try {
  await writeFile(draft, matter.stringify('TEMPORARY_DRAFT_FIXTURE_DO_NOT_PUBLISH', { ...original.data, translationKey: 'publication-draft-fixture', tags: ['testing'], status: 'draft' }), { flag: 'wx' });
  draftCreated = true;
  const fields = { ...original.data, translationKey: 'publication-preview-fixture', tags: ['testing'], status: 'editorial-preview' };
  await writeFile(preview, matter.stringify('Temporary publication transition fixture.', fields), { flag: 'wx' });
  previewCreated = true;
  run();
  await writeFile(preview, matter.stringify('Temporary publication transition fixture.', { ...fields, status: 'published' }));
  run();
} finally {
  if (draftCreated || previewCreated) {
    if (draftCreated) await unlink(draft);
    if (previewCreated) await unlink(preview);
    run();
  }
}
console.log('Draft exclusion and preview-to-published transition passed. Fixtures removed; final clean build verified.');
