import { describe, expect, it } from 'vitest'

import { requireSameOrigin } from '../../api/_lib/csrf'

const req = (init: {
  method?: string
  site?: string | null
  origin?: string | null
  host?: string | null
  contentType?: string | null
}) => {
  const headers = new Headers()
  if (init.site) headers.set('sec-fetch-site', init.site)
  if (init.origin) headers.set('origin', init.origin)
  if (init.host !== null) headers.set('host', init.host ?? 'doug-march.com')
  if (init.contentType) headers.set('content-type', init.contentType)
  return new Request('https://doug-march.com/api/panel/run', {
    method: init.method ?? 'POST',
    headers,
  })
}

const allowed = (r: Response | null) => r === null

describe('the panel calling itself', () => {
  it('allows a same-origin JSON post', () => {
    expect(
      allowed(requireSameOrigin(req({ site: 'same-origin', contentType: 'application/json' })))
    ).toBe(true)
  })

  it('allows a direct navigation, which is the owner opening the panel', () => {
    expect(allowed(requireSameOrigin(req({ method: 'GET', site: 'none' })))).toBe(true)
  })

  it('allows a same-origin GET with no content type, since it has no body', () => {
    expect(allowed(requireSameOrigin(req({ method: 'GET', site: 'same-origin' })))).toBe(true)
  })

  it('tolerates a charset on the content type', () => {
    expect(
      allowed(
        requireSameOrigin(
          req({ site: 'same-origin', contentType: 'application/json; charset=utf-8' })
        )
      )
    ).toBe(true)
  })
})

describe('somebody else’s page', () => {
  it('refuses a cross-site request', async () => {
    const res = requireSameOrigin(req({ site: 'cross-site', contentType: 'application/json' }))
    expect(res?.status).toBe(403)
  })

  it('refuses a same-site request from another subdomain', () => {
    expect(
      requireSameOrigin(req({ site: 'same-site', contentType: 'application/json' }))?.status
    ).toBe(403)
  })

  it('refuses when Origin disagrees with Host, even with Sec-Fetch-Site stripped', () => {
    const res = requireSameOrigin(
      req({
        origin: 'https://evil.example',
        host: 'doug-march.com',
        contentType: 'application/json',
      })
    )
    expect(res?.status).toBe(403)
  })

  it('accepts when Origin agrees with Host', () => {
    expect(
      allowed(
        requireSameOrigin(
          req({
            origin: 'https://doug-march.com',
            host: 'doug-march.com',
            contentType: 'application/json',
          })
        )
      )
    ).toBe(true)
  })

  it('refuses a malformed Origin rather than guessing', () => {
    expect(
      requireSameOrigin(req({ origin: 'not a url', contentType: 'application/json' }))?.status
    ).toBe(403)
  })

  it('answers 403, never 401 — a 401 would raise a credential prompt', async () => {
    const res = requireSameOrigin(req({ site: 'cross-site', contentType: 'application/json' }))
    expect(res?.status).toBe(403)
    expect(res?.headers.get('www-authenticate')).toBeNull()
  })
})

describe('the two shapes that were actually exploitable', () => {
  // POST /api/panel/run swallowed a JSON parse failure and continued, so a
  // plain HTML form post dispatched a real pipeline run.
  it('refuses a form post, which cannot set the JSON content type cross-origin', () => {
    const res = requireSameOrigin(
      req({ site: 'cross-site', contentType: 'application/x-www-form-urlencoded' })
    )
    expect(res?.status).toBe(403)
  })

  // POST /api/panel/rate rejected invalid JSON, but request.json() never
  // inspects Content-Type — so enctype="text/plain" smuggles valid JSON in.
  it('refuses the text/plain smuggling trick', () => {
    expect(requireSameOrigin(req({ site: 'cross-site', contentType: 'text/plain' }))?.status).toBe(
      403
    )
  })

  it('refuses text/plain even from a same-origin caller, so the rule is simple', () => {
    expect(requireSameOrigin(req({ site: 'same-origin', contentType: 'text/plain' }))?.status).toBe(
      403
    )
  })

  it('refuses a body-bearing request with no content type at all', () => {
    expect(requireSameOrigin(req({ site: 'same-origin' }))?.status).toBe(403)
  })
})

describe('every panel endpoint is guarded', async () => {
  const endpoints = ['run', 'rate', 'weights', 'status']

  it.each(endpoints)('/api/panel/%s checks provenance before identity', async (name) => {
    const src = await import('node:fs').then((fs) =>
      fs.readFileSync(new URL(`../../api/panel/${name}.ts`, import.meta.url), 'utf8')
    )
    expect(src).toContain('requireSameOrigin')
    // Order matters: a 401 from requireAuth would prompt the browser.
    expect(src.indexOf('requireSameOrigin(request)')).toBeLessThan(
      src.indexOf('requireAuth(request)')
    )
  })
})
