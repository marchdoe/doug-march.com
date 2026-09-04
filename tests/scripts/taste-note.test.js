import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { main } from '../../scripts/taste-note.js'

let root

beforeEach(() => {
  root = mkdtempSync(path.join(tmpdir(), 'taste-cli-'))
  mkdirSync(path.join(root, 'signals'), { recursive: true })
  writeFileSync(
    path.join(root, 'signals', 'taste.md'),
    [
      '# Owner Taste Memory',
      '',
      'Permanent, hand-curated. Edit by hand; the pipeline never writes to this',
      'file.',
      '',
      '## Gold standards — the execution bar',
      '',
      '- **2026-04-28, drenched terracotta Specimen.** A single hue.',
      '',
    ].join('\n'),
    'utf8'
  )
})

afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

function writeEvidence({ date = '2026-09-04', buildId = '100', trace } = {}) {
  const evidenceDir = path.join(root, 'docs', 'evidence', 'canary', '2026-09-04-1532')
  const buildDir = path.join(evidenceDir, 'archive', date, `build-${buildId}`)
  mkdirSync(buildDir, { recursive: true })
  writeFileSync(
    path.join(buildDir, 'trace.json'),
    JSON.stringify(
      trace ?? {
        steps: [
          {
            name: 'art-director',
            output: {
              hero_copy: 'Select a busy man.',
              chassisId: 'unbounded-figtree',
              composition: { columns: 'two-asymmetric' },
            },
          },
        ],
      }
    ),
    'utf8'
  )
  return evidenceDir
}

function collectLogs() {
  const logs = []
  const errors = []
  return {
    log: (s) => logs.push(s),
    error: (s) => errors.push(s),
    logs,
    errors,
  }
}

describe('taste-note CLI (`pnpm taste`)', () => {
  it('appends an entry carrying the evidence dir design identity and the sentence', () => {
    const evidenceDir = writeEvidence()
    const io = collectLogs()
    const code = main(['--evidence', path.relative(root, evidenceDir), 'Loved', 'the', 'flood.'], {
      root,
      ...io,
    })
    expect(code).toBe(0)
    const out = readFileSync(path.join(root, 'signals', 'taste.md'), 'utf8')
    expect(out).toContain('Select a busy man.')
    expect(out).toContain('unbounded-figtree')
    expect(out).toContain('two-asymmetric')
    expect(out).toContain('Loved the flood.')
    expect(io.errors).toEqual([])
  })

  it('prints usage and exits 2 when --evidence or the sentence is missing', () => {
    const io = collectLogs()
    expect(main([], { root, ...io })).toBe(2)
    expect(io.errors.join('\n')).toMatch(/Usage: pnpm taste/)
  })

  it('exits 1 with a clear message when the evidence dir has no archive/<date>', () => {
    const io = collectLogs()
    const code = main(['--evidence', 'docs/evidence/canary/nowhere', 'a reaction'], {
      root,
      ...io,
    })
    expect(code).toBe(1)
    expect(io.errors.join('\n')).toMatch(/no archive.*found/)
  })

  it('is idempotent across two identical invocations', () => {
    const evidenceDir = writeEvidence()
    const io = collectLogs()
    main(['--evidence', path.relative(root, evidenceDir), 'Same reaction.'], { root, ...io })
    main(['--evidence', path.relative(root, evidenceDir), 'Same reaction.'], { root, ...io })
    const out = readFileSync(path.join(root, 'signals', 'taste.md'), 'utf8')
    expect(out.split('Same reaction.').length - 1).toBe(1)
    expect(io.logs.some((l) => l.includes('already recorded'))).toBe(true)
  })

  it('refuses without writing when the target file is not in the expected shape', () => {
    writeFileSync(path.join(root, 'signals', 'taste.md'), 'not the right file\n', 'utf8')
    const evidenceDir = writeEvidence()
    const io = collectLogs()
    const code = main(['--evidence', path.relative(root, evidenceDir), 'a reaction'], {
      root,
      ...io,
    })
    expect(code).toBe(1)
    expect(io.errors.join('\n')).toMatch(/refusing to write/)
    expect(readFileSync(path.join(root, 'signals', 'taste.md'), 'utf8')).toBe(
      'not the right file\n'
    )
  })
})
