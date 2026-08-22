import { describe, it, expect } from 'vitest'
import { parseRatingFromIssue } from '../../scripts/collect-ratings.js'

const issue = (body, comments = []) => ({
  number: 12,
  title: 'Rate: 2026-06-12 — "X"',
  body,
  comments,
})

describe('parseRatingFromIssue', () => {
  it('parses a fenced yaml rating from the latest comment', () => {
    const r = parseRatingFromIssue(
      issue('template', [
        { body: 'first' },
        { body: '```yaml\ngrade: B\nworked: the drench\ndidnt: footer\ntry: fold it in\n```' },
      ])
    )
    expect(r).toEqual({
      date: '2026-06-12',
      grade: 'B',
      worked: 'the drench',
      didnt: 'footer',
      try: 'fold it in',
    })
  })
  it('falls back to the issue body when no comment has yaml', () => {
    const r = parseRatingFromIssue(issue('```yaml\ngrade: A\nworked: ""\ndidnt: ""\ntry: ""\n```'))
    expect(r.grade).toBe('A')
  })
  it('returns null for an unfilled template (no valid grade)', () => {
    expect(parseRatingFromIssue(issue('```yaml\ngrade: \nworked: ""\n```'))).toBeNull()
  })
  it('returns null when the title has no date', () => {
    const r = parseRatingFromIssue({
      number: 1,
      title: 'nonsense',
      body: '```yaml\ngrade: A\n```',
      comments: [],
    })
    expect(r).toBeNull()
  })
})
