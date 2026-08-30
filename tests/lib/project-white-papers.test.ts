import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects } from '../../app/content/projects'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (p: string) => readFileSync(resolve(ROOT, p), 'utf8')

/**
 * The white-paper fields are hand-maintained content the nightly agent renders
 * but may not edit — `app/content/` is refused at the write layer. Two things
 * can rot independently: the content itself, and whether the agent has been
 * told the field exists.
 *
 * The second is this repo's recurring failure. A contract declared in one place
 * and consumed in another drifts silently: elements.tsx previewed a 404 the site
 * had stopped shipping, and the contact address was bound in the footer while the
 * sidebar hardcoded a dead one. See #190.
 */
const WHITE_PAPER_FIELDS = ['context', 'constraints', 'process', 'decisions', 'references'] as const

describe('white-paper content is well-formed', () => {
  const withFields = projects.filter((p) => WHITE_PAPER_FIELDS.some((f) => p[f] != null))

  it('at least one project uses them, or this suite is vacuous', () => {
    expect(withFields.length).toBeGreaterThan(0)
  })

  for (const p of withFields) {
    describe(p.slug, () => {
      it('only appears on a full-depth project', () => {
        // A lightweight entry is a one-liner; a white paper on one is a mistake.
        expect(p.depth).toBe('full')
      })

      it('has no empty arrays, which render as a heading with nothing under it', () => {
        for (const f of ['constraints', 'process', 'decisions', 'references'] as const) {
          const v = p[f]
          if (v != null) expect(v.length, f).toBeGreaterThan(0)
        }
      })

      it('pairs every decision with its reason', () => {
        // The pairing is the content. A claim with no reason is an assertion.
        for (const d of p.decisions ?? []) {
          expect(d.decision.trim()).not.toBe('')
          expect(d.why.trim()).not.toBe('')
        }
      })

      it('gives every process step both what it does and what it hands on', () => {
        for (const step of p.process ?? []) {
          expect(step.phase.trim()).not.toBe('')
          expect(step.does.trim()).not.toBe('')
          expect(step.produces.trim()).not.toBe('')
        }
      })

      it('has references that are real absolute URLs', () => {
        for (const r of p.references ?? []) {
          expect(r.title.trim()).not.toBe('')
          expect(() => new URL(r.url)).not.toThrow()
          expect(r.url).toMatch(/^https:\/\//)
        }
      })
    })
  }
})

describe('the agent has been told these fields exist', () => {
  // If a field is added to types.ts and not to the prompts, the nightly agent
  // silently drops it and nobody notices until a page looks thin.
  const prompts = {
    'react-engineer.md': read('scripts/prompts/react-engineer.md'),
    'design-system-reference.md': read('scripts/prompts/design-system-reference.md'),
  }

  for (const [name, src] of Object.entries(prompts)) {
    for (const field of WHITE_PAPER_FIELDS) {
      it(`${name} declares ${field}`, () => {
        // `${field}?:` and not the bare word. "context", "process" and
        // "references" are ordinary English and appear in the surrounding prose,
        // so a substring test on the word alone passes even when the declaration
        // has been deleted. Verified by deleting one and watching this fail.
        expect(src).toContain(`${field}?:`)
      })
    }
  }

  it('react-engineer.md states that process order is load-bearing', () => {
    // The one semantic the agent cannot infer from the shape alone.
    expect(prompts['react-engineer.md'].toLowerCase()).toMatch(/ordered|order must be legible/)
  })

  it('react-engineer.md forbids editing this content', () => {
    expect(prompts['react-engineer.md']).toMatch(/not yours to edit|hand-maintained/)
  })
})
