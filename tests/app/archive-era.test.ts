import { describe, it, expect } from 'vitest'
import { ERA_ORDER, FIELD_ERA, absenceNote, predates } from '../../app/lib/archive-era'

// These two functions decide what the explainer says when a field is missing,
// and site-health.spec.ts asserts on that copy end to end. They had no unit
// tests of their own, so a wrong sentence surfaced only as a failed E2E run.

describe('predates', () => {
  it('is true when the day is older than the concept', () => {
    // composition arrived in the grammar era; a prose-era day cannot have one
    expect(predates('composition', 'prose')).toBe(true)
    expect(predates('shell', 'traced')).toBe(true)
  })

  it('is false once the concept exists', () => {
    expect(predates('composition', 'grammar')).toBe(false)
    expect(predates('brief', 'prose')).toBe(false)
  })

  it('treats an unknown or missing era as newer than everything', () => {
    // A record with no era is a modern one that failed to stamp it — a bug,
    // not a fact about March — so nothing "predates" it.
    expect(predates('composition', null)).toBe(false)
    expect(predates('composition', 'not-an-era')).toBe(false)
  })

  it('every FIELD_ERA value is a real era', () => {
    for (const [field, era] of Object.entries(FIELD_ERA)) {
      expect(ERA_ORDER, `${field} points at unknown era "${era}"`).toContain(era)
    }
  })
})

describe('absenceNote', () => {
  it('blames the era when the pipeline had no such concept', () => {
    expect(absenceNote('composition', 'prose', 'composition tuple')).toBe(
      'No composition tuple. The pipeline had no such concept in the prose era.'
    )
  })

  it('blames the day when the pipeline could have recorded it and did not', () => {
    expect(absenceNote('composition', 'grammar', 'composition tuple')).toBe(
      'No composition tuple was recorded that day.'
    )
  })

  it('does not blame an era for a record that never stamped one', () => {
    expect(absenceNote('lane', null, 'lane')).toBe('No lane was recorded that day.')
  })
})
