import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const read = (p) => readFileSync(resolve(ROOT, p), 'utf8')

/**
 * The 404 copy lives in two places and has to stay identical.
 *
 * `public/404.html` is what Vercel serves for a real 404 — a missing file under
 * `/og/` or `/archive/`, which #200 took out of the SPA catch-all. The
 * `notFoundComponent` in the root route covers a mistyped in-app route, where
 * the shell has already answered 200 and only the client knows the route is
 * bogus. Neither can serve the other's case, so the duplication is structural.
 *
 * It is guarded because this exact duplication already rotted once: elements.tsx
 * carried a styled 404 under a comment claiming it matched __root.tsx, long
 * after __root.tsx had stopped shipping it. See #199.
 */
const COPY = {
  code: '404',
  heading: 'The only page here that never changes.',
  body: 'Nothing lives at this address. Everything else on this site was redesigned last night.',
  link: '/archive',
}

const SOURCES = {
  'public/404.html': read('public/404.html'),
  'app/routes/__root.tsx': read('app/routes/__root.tsx'),
  'scripts/templates/__root.tsx.template': read('scripts/templates/__root.tsx.template'),
}

describe('404 copy stays identical across every surface that renders it', () => {
  for (const [file, src] of Object.entries(SOURCES)) {
    describe(file, () => {
      for (const [name, text] of Object.entries(COPY)) {
        it(`carries the ${name}`, () => {
          expect(src).toContain(text)
        })
      }

      it('sends people to the archive, not home', () => {
        // "Return home" was the old copy. The archive is the destination now:
        // it is the thing that explains what this site is.
        expect(src).not.toContain('Return home')
      })
    })
  }

  it('the generated root route matches its template', () => {
    // __root.tsx is regenerated from the template every night. If they drift,
    // tonight's build silently reverts whatever was edited in the generated file.
    const block = (src) =>
      src.slice(src.indexOf('notFoundComponent'), src.indexOf('component: RootComponent'))
    expect(block(SOURCES['app/routes/__root.tsx'])).toBe(
      block(SOURCES['scripts/templates/__root.tsx.template'])
    )
  })

  it('reads no design token, so a broken nightly preset cannot take it down', () => {
    // The whole point of #199's "static appearance" decision.
    expect(SOURCES['public/404.html']).not.toMatch(/var\(--colors-|token\(/)
  })
})
