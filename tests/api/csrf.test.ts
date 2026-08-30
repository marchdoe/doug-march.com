import { beforeEach, describe, expect, it } from 'vitest'

import { requireSameOrigin } from '../../api/_lib/csrf'
import { GET as statusGet } from '../../api/panel/status'
import { POST as runPost } from '../../api/panel/run'
import { POST as ratePost } from '../../api/panel/rate'
import { PUT as weightsPut } from '../../api/panel/weights'

beforeEach(() => {
  // Without these, requireAuth answers 503 "not configured" and the 401
  // assertions below would be measuring the wrong thing.
  process.env.PANEL_USER = 'doug'
  process.env.PANEL_PASSWORD = 's3cret'
})

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

describe('every panel endpoint is guarded', () => {
  // This used to read each handler's source text and compare indexOf
  // positions. That passes if the two names merely appear in a comment in the
  // right order, and fails on a refactor that changes nothing about the
  // behaviour — which is exactly what happened when the shared wrapper landed.
  // Call the handlers instead and assert what a browser would actually see.
  const handlers: Array<[string, (r: Request) => Promise<Response>, string]> = [
    ['status', statusGet, 'GET'],
    ['run', runPost, 'POST'],
    ['rate', ratePost, 'POST'],
    ['weights', weightsPut, 'PUT'],
  ]

  const crossSite = (url: string, method: string) =>
    new Request(url, {
      method,
      headers: {
        'sec-fetch-site': 'cross-site',
        'content-type': 'application/json',
        // Deliberately unauthenticated AND cross-site. Provenance must be
        // decided first, so the answer is 403 and never a 401.
      },
      ...(method === 'GET' ? {} : { body: '{}' }),
    })

  it.each(handlers)(
    '/api/panel/%s answers 403, not 401, to a cross-site call',
    async (name, handler, method) => {
      const res = await handler(crossSite(`https://x/api/panel/${name}`, method))
      expect(res.status).toBe(403)
      // A 401 carries WWW-Authenticate, which pops a credential prompt on a
      // page the owner never chose to visit. That is the whole reason
      // provenance is checked before identity.
      expect(res.headers.get('WWW-Authenticate')).toBeNull()
    }
  )

  it.each(handlers)(
    '/api/panel/%s still answers 401 to a same-origin anonymous call',
    async (name, handler, method) => {
      const res = await handler(
        new Request(`https://x/api/panel/${name}`, {
          method,
          headers: { 'sec-fetch-site': 'same-origin', 'content-type': 'application/json' },
          ...(method === 'GET' ? {} : { body: '{}' }),
        })
      )
      expect(res.status).toBe(401)
      expect(res.headers.get('WWW-Authenticate')).toContain('Basic')
    }
  )
})
