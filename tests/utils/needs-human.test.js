import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { buildNeedsHumanSection, readNeedsHumanEntries } from '../../scripts/utils/needs-human.js'

let archiveDir

function writeBuild(date, buildId, files) {
  const dir = join(archiveDir, date, `build-${buildId}`)
  mkdirSync(dir, { recursive: true })
  for (const [name, content] of Object.entries(files)) writeFileSync(join(dir, name), content)
  return dir
}

beforeEach(() => {
  archiveDir = mkdtempSync(join(tmpdir(), 'needs-human-'))
})

afterEach(() => {
  rmSync(archiveDir, { recursive: true, force: true })
})

describe('readNeedsHumanEntries', () => {
  it('returns the NEEDS-HUMAN verdicts and drops everything else', () => {
    writeBuild('2026-09-06', '100', {
      'verdicts.json': JSON.stringify([
        { critic: 'screenshot-critic', verdict: 'SHIP' },
        {
          critic: 'surface-gate',
          verdict: 'NEEDS-HUMAN',
          feedback: 'Authored routes outside MUTABLE_FILES failed the gate: /work',
        },
      ]),
    })

    const entries = readNeedsHumanEntries(archiveDir, '2026-09-06')
    expect(entries).toEqual([
      {
        critic: 'surface-gate',
        verdict: 'NEEDS-HUMAN',
        feedback: 'Authored routes outside MUTABLE_FILES failed the gate: /work',
      },
    ])
  })

  it('returns [] when the date has no build', () => {
    expect(readNeedsHumanEntries(archiveDir, '2026-09-06')).toEqual([])
  })

  it('returns [] when the build has no verdicts.json', () => {
    writeBuild('2026-09-06', '100', { 'brief.md': '# 2026-09-06' })
    expect(readNeedsHumanEntries(archiveDir, '2026-09-06')).toEqual([])
  })

  it('returns [] rather than throwing on malformed verdicts.json', () => {
    writeBuild('2026-09-06', '100', { 'verdicts.json': '{not json' })
    expect(readNeedsHumanEntries(archiveDir, '2026-09-06')).toEqual([])
  })

  it('returns [] when no verdict in the file is NEEDS-HUMAN', () => {
    writeBuild('2026-09-06', '100', {
      'verdicts.json': JSON.stringify([
        { critic: 'screenshot-critic', verdict: 'SHIP' },
        { critic: 'surface-gate', verdict: 'SHIP' },
      ]),
    })
    expect(readNeedsHumanEntries(archiveDir, '2026-09-06')).toEqual([])
  })
})

describe('buildNeedsHumanSection', () => {
  it('renders one line per entry under a heading and a one-sentence context note', () => {
    const section = buildNeedsHumanSection([
      { feedback: 'Authored routes outside MUTABLE_FILES failed the gate: /work' },
      { feedback: 'Authored routes outside MUTABLE_FILES failed the gate: /experiments' },
    ])

    expect(section).toContain('## Needs a human')
    expect(section).toContain(
      "These routes are outside the agents' ownership and will be reported again every night until a person fixes them."
    )
    expect(section).toContain('/work')
    expect(section).toContain('/experiments')
  })

  it('returns an empty string for no entries, so the caller leaves the body unchanged', () => {
    expect(buildNeedsHumanSection([])).toBe('')
    expect(buildNeedsHumanSection(undefined)).toBe('')
  })

  it('skips an entry with no feedback text', () => {
    expect(buildNeedsHumanSection([{ feedback: '' }, { feedback: '   ' }])).toBe('')
  })
})
