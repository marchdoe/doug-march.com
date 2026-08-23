import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { buildLessonsBlock } from '../../scripts/utils/lessons.js'

function seed(archiveDir, date, { verdicts, rating } = {}) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  if (verdicts) writeFileSync(path.join(buildDir, 'verdicts.json'), JSON.stringify(verdicts))
  if (rating)
    writeFileSync(
      path.join(archiveDir, date, `rating-${Date.parse(date)}.json`),
      JSON.stringify(rating)
    )
}

describe('buildLessonsBlock', () => {
  let archiveDir
  beforeEach(() => {
    archiveDir = mkdtempSync(path.join(tmpdir(), 'lessons-'))
  })
  afterEach(() => {
    rmSync(archiveDir, { recursive: true, force: true })
  })

  it('collects REVISE feedback and rating critiques, newest first, capped', () => {
    seed(archiveDir, '2026-06-09', {
      verdicts: [
        { critic: 'mockup-critic', verdict: 'REVISE', feedback: 'utilization ~45% vs floor 70' },
      ],
    })
    seed(archiveDir, '2026-06-10', {
      rating: { grade: 'C', didnt: 'footer felt bolted on', try: 'fold footer into the rail' },
    })
    const block = buildLessonsBlock(archiveDir, { limit: 7 })
    expect(block).toContain('## Recent Lessons')
    expect(block).toContain('utilization ~45%')
    expect(block).toContain('footer felt bolted on')
    expect(block.indexOf('footer felt')).toBeLessThan(block.indexOf('utilization')) // newest first
  })

  it('ignores SHIP/APPROVE verdicts and returns empty string with no material', () => {
    seed(archiveDir, '2026-06-10', {
      verdicts: [
        { critic: 'screenshot-critic', verdict: 'SHIP', feedback: 'fine' },
        { critic: 'mockup-critic', verdict: 'APPROVE', feedback: 'strong' },
        { critic: 'spec-critic', verdict: 'APPROVED', feedback: 'ok' },
      ],
    })
    expect(buildLessonsBlock(archiveDir, { limit: 7 })).toBe('')
  })

  it('respects the limit', () => {
    for (let d = 1; d <= 9; d++) {
      const date = `2026-06-0${d}`
      seed(archiveDir, date, {
        verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: `flaw-${d}` }],
      })
    }
    const block = buildLessonsBlock(archiveDir, { limit: 3 })
    expect(block).toContain('flaw-9')
    expect(block).not.toContain('flaw-1')
    expect((block.match(/^- /gm) || []).length).toBe(3)
  })

  it('caps by ENTRY count, not date count — mixed sources on one date', () => {
    seed(archiveDir, '2026-06-10', {
      verdicts: [
        { critic: 'mockup-critic', verdict: 'REVISE', feedback: 'round-0 utilization low' },
        { critic: 'screenshot-critic', verdict: 'REVISE', feedback: 'render diverged from mockup' },
      ],
      rating: { grade: 'C', didnt: 'hero too quiet', try: '' },
    })
    seed(archiveDir, '2026-06-09', {
      verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: 'older flaw' }],
    })
    const block = buildLessonsBlock(archiveDir, { limit: 3 })
    // three entries from 06-10 fill the cap; 06-09's entry is cut
    expect((block.match(/^- /gm) || []).length).toBe(3)
    expect(block).toContain('hero too quiet')
    expect(block).toContain('utilization low')
    expect(block).not.toContain('older flaw')
  })

  it('escalates substantially-similar complaints across ≥2 builds to RECURRING, folded into one entry', () => {
    seed(archiveDir, '2026-06-08', {
      rating: { grade: 'C', didnt: 'the header is messed up and cramped', try: '' },
    })
    seed(archiveDir, '2026-06-10', {
      rating: { grade: 'C', didnt: 'header still messed up, cramped again', try: '' },
    })
    seed(archiveDir, '2026-06-11', {
      verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: 'unrelated spacing nit' }],
    })
    const block = buildLessonsBlock(archiveDir, { limit: 7 })
    expect(block).toContain('RECURRING (2x):')
    // folded to one line, not two
    expect((block.match(/RECURRING/g) || []).length).toBe(1)
    // uses the newest occurrence's text
    expect(block).toContain('header still messed up, cramped again')
  })

  it('sorts RECURRING lessons before non-recurring ones regardless of date', () => {
    seed(archiveDir, '2026-06-05', {
      rating: { grade: 'C', didnt: 'brand lockup is a placeholder gray box', try: '' },
    })
    seed(archiveDir, '2026-06-06', {
      rating: { grade: 'C', didnt: 'brand lockup still a placeholder gray box', try: '' },
    })
    seed(archiveDir, '2026-06-12', {
      verdicts: [
        {
          critic: 'screenshot-critic',
          verdict: 'REVISE',
          feedback: 'a totally distinct one-off nit',
        },
      ],
    })
    const block = buildLessonsBlock(archiveDir, { limit: 7 })
    expect(block.indexOf('RECURRING')).toBeLessThan(block.indexOf('distinct one-off nit'))
  })

  it('does not mark a single occurrence as RECURRING', () => {
    seed(archiveDir, '2026-06-10', {
      rating: { grade: 'C', didnt: 'footer felt bolted on', try: '' },
    })
    const block = buildLessonsBlock(archiveDir, { limit: 7 })
    expect(block).not.toContain('RECURRING')
  })
})
