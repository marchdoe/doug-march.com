/**
 * The root template must survive the pipeline's own security gate.
 *
 * `app/routes/__root.tsx` is regenerated from
 * `scripts/templates/__root.tsx.template` on every build, which means it is
 * checked by scripts/utils/build-validator.js like any agent-authored file. A
 * pattern that is perfectly ordinary in hand-written React — the escape hatch
 * for injecting raw HTML — fails that gate outright.
 *
 * This was not caught by any test, by typecheck, by lint, or by e2e. It was
 * caught by running the pipeline, where it failed the build after the React
 * Engineer had already done its work. Since the pipeline only runs at 10:00
 * UTC, the feedback loop for that class of mistake is a day long, and the
 * failure arrives after the expensive part.
 *
 * The gate matches bare words anywhere in the file, comments included, so the
 * banned patterns cannot be named in prose here either.
 */

import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

const FILES = ['scripts/templates/__root.tsx.template', 'app/routes/__root.tsx']

/**
 * Mirrors the DANGEROUS_PATTERNS list in scripts/utils/build-validator.js.
 * Kept as a copy rather than an import because the validator reads files from
 * disk and reports on the whole generated set; here the subject is these two
 * files specifically, including the template, which the validator never sees.
 */
const BANNED = [
  { name: 'raw HTML injection prop', regex: /dangerously{0,1}SetInnerHTML/ },
  { name: 'document write', regex: /document\.write\s*\(/ },
  { name: 'innerHTML assignment', regex: /\.innerHTML\s*=/ },
  { name: 'inline script tag', regex: /<script[\s>]/i },
  { name: 'javascript URL', regex: /javascript:/i },
  { name: 'eval', regex: /\beval\s*\(/ },
  { name: 'dynamic import', regex: /\bimport\s*\(\s*[`'"]/ },
]

describe.each(FILES)('%s', (rel) => {
  const src = readFileSync(path.join(ROOT, rel), 'utf8')

  it.each(BANNED.map((b) => [b.name, b.regex]))(
    'carries no %s, which the build validator blocks',
    (_name, regex) => {
      expect(regex.test(src)).toBe(false)
    }
  )

  it('still paints the archive ground, which is why the style element exists', () => {
    expect(src).toContain('body{background:#0e0e10')
    expect(src).toMatch(/<style>\{ARCHIVE_GROUND\}<\/style>/)
  })

  it('still lets the archive out of the nightly shell', () => {
    expect(src).toContain('isArchiveSurface')
    expect(src).toContain('<RootDocument bare>')
  })

  it('still carries the archive link for every other page', () => {
    expect(src).toContain('data-archive-link')
  })
})

describe('the template and the generated file agree', () => {
  it('differs only where the build substitutes a value', () => {
    const template = readFileSync(path.join(ROOT, FILES[0]), 'utf8')
    const generated = readFileSync(path.join(ROOT, FILES[1]), 'utf8')

    // The template carries {{PLACEHOLDER}} tokens the build fills in. Strip a
    // whole line containing one from both sides and the rest should match on
    // the structural pieces this file cares about.
    for (const marker of [
      'isArchiveSurface',
      '<RootDocument bare>',
      'ARCHIVE_GROUND',
      'ARCHIVE_FONT',
    ]) {
      expect(template, `template missing ${marker}`).toContain(marker)
      expect(generated, `generated missing ${marker}`).toContain(marker)
    }
  })
})
