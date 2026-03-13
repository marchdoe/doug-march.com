#!/usr/bin/env node
/**
 * Restores the canonical (v2 baseline) design to the working tree.
 * Run from the repo root: node scripts/restore-canonical.js
 *
 * Sources from: themes/canonical/
 * Writes to:    elements/preset.ts, app/components/*, app/routes/*
 */

import { copyFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const FILES = [
  ['themes/canonical/preset.ts',                        'elements/preset.ts'],
  ['themes/canonical/components/Layout.tsx',            'app/components/Layout.tsx'],
  ['themes/canonical/components/Sidebar.tsx',           'app/components/Sidebar.tsx'],
  ['themes/canonical/components/SectionHead.tsx',       'app/components/SectionHead.tsx'],
  ['themes/canonical/components/MobileFooter.tsx',      'app/components/MobileFooter.tsx'],
  ['themes/canonical/components/ProjectRow.tsx',        'app/components/ProjectRow.tsx'],
  ['themes/canonical/components/FeaturedProject.tsx',   'app/components/FeaturedProject.tsx'],
  ['themes/canonical/components/SelectedWork.tsx',      'app/components/SelectedWork.tsx'],
  ['themes/canonical/components/Experiments.tsx',       'app/components/Experiments.tsx'],
  ['themes/canonical/components/Bio.tsx',               'app/components/Bio.tsx'],
  ['themes/canonical/components/Timeline.tsx',          'app/components/Timeline.tsx'],
  ['themes/canonical/components/Capabilities.tsx',      'app/components/Capabilities.tsx'],
  ['themes/canonical/components/Personal.tsx',          'app/components/Personal.tsx'],
  ['themes/canonical/routes/__root.tsx',                'app/routes/__root.tsx'],
  ['themes/canonical/routes/index.tsx',                 'app/routes/index.tsx'],
  ['themes/canonical/routes/about.tsx',                 'app/routes/about.tsx'],
  ['themes/canonical/routes/work.$slug.tsx',            'app/routes/work.$slug.tsx'],
];

console.log('Restoring canonical theme...\n');

for (const [src, dest] of FILES) {
  const from = resolve(root, src);
  const to   = resolve(root, dest);
  await copyFile(from, to);
  console.log(`  ✓ ${dest}`);
}

console.log('\nDone. Run `pnpm build` to verify, or `pnpm dev` to preview.');
