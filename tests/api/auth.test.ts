import { describe, it, expect, beforeEach } from 'vitest'
import { checkBasicAuth, requireAuth, unauthorized } from '../../api/_lib/auth'

const header = (user: string, pass: string) => `Basic ${btoa(`${user}:${pass}`)}`

describe('checkBasicAuth', () => {
  it('accepts correct credentials', () => {
    expect(checkBasicAuth(header('doug', 's3cret'), 'doug', 's3cret')).toBe(true)
  })
  it('rejects wrong password', () => {
    expect(checkBasicAuth(header('doug', 'wrong'), 'doug', 's3cret')).toBe(false)
  })
  it('rejects wrong user', () => {
    expect(checkBasicAuth(header('bob', 's3cret'), 'doug', 's3cret')).toBe(false)
  })
  it('rejects missing header', () => {
    expect(checkBasicAuth(null, 'doug', 's3cret')).toBe(false)
  })
  it('rejects non-Basic scheme', () => {
    expect(checkBasicAuth('Bearer abc', 'doug', 's3cret')).toBe(false)
  })
  it('rejects malformed base64', () => {
    expect(checkBasicAuth('Basic %%%not-base64%%%', 'doug', 's3cret')).toBe(false)
  })
  it('rejects payload without colon', () => {
    expect(checkBasicAuth(`Basic ${btoa('nocolon')}`, 'doug', 's3cret')).toBe(false)
  })
  it('handles password containing colons', () => {
    expect(checkBasicAuth(header('doug', 'a:b:c'), 'doug', 'a:b:c')).toBe(true)
  })
})

describe('unauthorized', () => {
  it('returns 401 with WWW-Authenticate challenge', () => {
    const res = unauthorized()
    expect(res.status).toBe(401)
    expect(res.headers.get('www-authenticate')).toBe('Basic realm="owner panel"')
  })
})

describe('requireAuth', () => {
  beforeEach(() => {
    process.env.PANEL_USER = 'doug'
    process.env.PANEL_PASSWORD = 's3cret'
  })
  it('returns null when authorized', () => {
    const req = new Request('https://x/api/panel/status', {
      headers: { authorization: header('doug', 's3cret') },
    })
    expect(requireAuth(req)).toBeNull()
  })
  it('returns 401 Response when unauthorized', () => {
    const req = new Request('https://x/api/panel/status')
    expect(requireAuth(req)?.status).toBe(401)
  })
  it('returns 503 when env is not configured', () => {
    delete process.env.PANEL_USER
    const req = new Request('https://x/api/panel/status')
    expect(requireAuth(req)?.status).toBe(503)
  })
})

describe('non-ASCII credentials', () => {
  // atob yields Latin-1, but browsers send Basic credentials UTF-8 encoded
  // (RFC 7617). Decoding as Latin-1 meant a password with any non-ASCII
  // character could never match — the owner locked out with no diagnostic.
  const utf8Basic = (user: string, pass: string) => {
    const bytes = new TextEncoder().encode(`${user}:${pass}`)
    return `Basic ${btoa(String.fromCharCode(...bytes))}`
  }

  it('accepts a password with non-ASCII characters', () => {
    expect(checkBasicAuth(utf8Basic('doug', 'pässwörd-ü'), 'doug', 'pässwörd-ü')).toBe(true)
  })

  it('accepts a password with an emoji', () => {
    expect(checkBasicAuth(utf8Basic('doug', 'correct-horse-🐎'), 'doug', 'correct-horse-🐎')).toBe(
      true
    )
  })

  it('still rejects the wrong non-ASCII password', () => {
    expect(checkBasicAuth(utf8Basic('doug', 'pässwörd-ü'), 'doug', 'pässwörd-x')).toBe(false)
  })
})
