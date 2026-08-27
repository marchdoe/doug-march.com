import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@vercel/functions', () => ({
  next: () => new Response('next', { status: 200 }),
}))

const { default: middleware } = await import('../../middleware')

const CREDS = `Basic ${btoa('owner:hunter2')}`

const req = (
  path: string,
  init: {
    method?: string
    site?: string
    origin?: string
    contentType?: string
    auth?: string | null
  } = {}
) => {
  const headers = new Headers()
  if (init.site) headers.set('sec-fetch-site', init.site)
  if (init.origin) headers.set('origin', init.origin)
  if (init.contentType) headers.set('content-type', init.contentType)
  headers.set('host', 'dougmar.ch')
  if (init.auth !== null) headers.set('authorization', init.auth ?? CREDS)
  return new Request(`https://dougmar.ch${path}`, { method: init.method ?? 'POST', headers })
}

beforeEach(() => {
  vi.stubEnv('PANEL_USER', 'owner')
  vi.stubEnv('PANEL_PASSWORD', 'hunter2')
})
afterEach(() => vi.unstubAllEnvs())

describe('provenance is settled before identity', () => {
  // The regression this file exists for. Before the fix, middleware answered
  // 401 first, so an unauthenticated cross-site request got a
  // WWW-Authenticate header and the browser raised a credential prompt on a
  // page the owner never visited. Confirmed against production at the time.
  it('answers an UNAUTHENTICATED cross-site API post with 403, not 401', async () => {
    const res = await middleware(
      req('/api/panel/run', { site: 'cross-site', contentType: 'application/json', auth: null })
    )
    expect(res.status).toBe(403)
    expect(res.headers.get('www-authenticate')).toBeNull()
  })

  it('answers an AUTHENTICATED cross-site API post with 403', async () => {
    const res = await middleware(
      req('/api/panel/run', { site: 'cross-site', contentType: 'application/json' })
    )
    expect(res.status).toBe(403)
  })

  it('refuses the text/plain smuggling shape before asking who you are', async () => {
    const res = await middleware(req('/api/panel/rate', { contentType: 'text/plain', auth: null }))
    expect(res.status).toBe(403)
  })

  it('refuses an origin that disagrees with the host', async () => {
    const res = await middleware(
      req('/api/panel/run', { origin: 'https://evil.example', contentType: 'application/json' })
    )
    expect(res.status).toBe(403)
  })
})

describe('legitimate traffic still gets through', () => {
  it('lets a same-origin authenticated JSON post reach the handler', async () => {
    const res = await middleware(
      req('/api/panel/run', { site: 'same-origin', contentType: 'application/json' })
    )
    expect(res.status).toBe(200)
  })

  it('still 401s a same-origin post with no credentials', async () => {
    const res = await middleware(
      req('/api/panel/run', { site: 'same-origin', contentType: 'application/json', auth: null })
    )
    expect(res.status).toBe(401)
    expect(res.headers.get('www-authenticate')).toBe('Basic realm="owner panel"')
  })
})

describe('the /panel page is not an API route', () => {
  // A cross-site navigation to the panel is a GET whose response the other
  // site cannot read. Refusing it would break following a link while
  // preventing nothing, so the same-origin check is scoped to /api/panel/.
  it('allows a cross-site navigation to /panel once authenticated', async () => {
    const res = await middleware(req('/panel', { method: 'GET', site: 'cross-site' }))
    expect(res.status).toBe(200)
  })

  it('still 401s /panel without credentials', async () => {
    const res = await middleware(req('/panel', { method: 'GET', auth: null }))
    expect(res.status).toBe(401)
  })
})

describe('misconfiguration', () => {
  it('503s when panel auth is not configured', async () => {
    vi.stubEnv('PANEL_USER', '')
    const res = await middleware(
      req('/api/panel/run', { site: 'same-origin', contentType: 'application/json' })
    )
    expect(res.status).toBe(503)
  })

  it('refuses a cross-site request even when auth is unconfigured', async () => {
    vi.stubEnv('PANEL_USER', '')
    const res = await middleware(
      req('/api/panel/run', { site: 'cross-site', contentType: 'application/json' })
    )
    expect(res.status).toBe(403)
  })
})
