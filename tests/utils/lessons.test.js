import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import path from 'path'
import { buildLessonsBlock } from '../../scripts/utils/lessons.js'

function seed(archiveDir, date, { verdicts, rating } = {}) {
  const buildDir = path.join(archiveDir, date, `build-${Date.parse(date)}`)
  mkdirSync(buildDir, { recursive: true })
  if (verdicts) writeFileSync(path.join(buildDir, 'verdicts.json'), JSON.stringify(verdicts))
  if (rating) writeFileSync(path.join(archiveDir, date, `rating-${Date.parse(date)}.json`), JSON.stringify(rating))
}

describe('buildLessonsBlock', () => {
  let archiveDir
  beforeEach(() => { archiveDir = mkdtempSync(path.join(tmpdir(), 'lessons-')) })
  afterEach(() => { rmSync(archiveDir, { recursive: true, force: true }) })

  it('collects REVISE feedback and rating critiques, newest first, capped', () => {
    seed(archiveDir, '2026-06-09', {
      verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: 'utilization ~45% vs floor 70' }],
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
    seed(archiveDir, '2026-06-10', { verdicts: [{ critic: 'screenshot-critic', verdict: 'SHIP', feedback: 'fine' }] })
    expect(buildLessonsBlock(archiveDir, { limit: 7 })).toBe('')
  })

  it('respects the limit', () => {
    for (let d = 1; d <= 9; d++) {
      const date = `2026-06-0${d}`
      seed(archiveDir, date, { verdicts: [{ critic: 'mockup-critic', verdict: 'REVISE', feedback: `flaw-${d}` }] })
    }
    const block = buildLessonsBlock(archiveDir, { limit: 3 })
    expect(block).toContain('flaw-9')
    expect(block).not.toContain('flaw-1')
    expect((block.match(/^- /gm) || []).length).toBe(3)
  })
})
