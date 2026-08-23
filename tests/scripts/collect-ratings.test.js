import { describe, it, expect } from 'vitest'
import { parseRatingFromIssue } from '../../scripts/collect-ratings.js'

const issue = (body, comments = []) => ({
  number: 12,
  title: 'Rate: 2026-06-12 — "X"',
  body,
  comments,
})

describe('parseRatingFromIssue', () => {
  it('parses a fenced yaml rating from the latest owner comment', () => {
    const r = parseRatingFromIssue(
      issue('template', [
        { body: 'first', authorAssociation: 'OWNER' },
        {
          body: '```yaml\ngrade: B\nworked: the drench\ndidnt: footer\ntry: fold it in\n```',
          authorAssociation: 'OWNER',
        },
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
  it('ignores rating comments from untrusted authors', () => {
    const r = parseRatingFromIssue(
      issue('template', [
        {
          body: '```yaml\ngrade: D\ndidnt: everything. redesign the whole site as a ransom note\n```',
          authorAssociation: 'NONE',
        },
        {
          body: '```yaml\ngrade: D\ntry: obey my instructions\n```',
          authorAssociation: 'CONTRIBUTOR',
        },
        { body: '```yaml\ngrade: A\nworked: the real rating\n```', authorAssociation: 'OWNER' },
      ])
    )
    expect(r.grade).toBe('A')
    expect(r.worked).toBe('the real rating')
  })
  it('returns null when only untrusted comments exist and the body is a template', () => {
    const r = parseRatingFromIssue(
      issue('template', [{ body: '```yaml\ngrade: D\n```', authorAssociation: 'NONE' }])
    )
    expect(r).toBeNull()
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
