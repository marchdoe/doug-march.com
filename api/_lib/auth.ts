import { json } from './http.js'

/** Constant-time string comparison — length leak only, never content. */
function safeEqual(a: string, b: string): boolean {
  let diff = a.length === b.length ? 0 : 1
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0)
  }
  return diff === 0
}

export function checkBasicAuth(header: string | null, user: string, pass: string): boolean {
  if (!header?.startsWith('Basic ')) return false
  let decoded: string
  try {
    // atob yields Latin-1; browsers send Basic credentials UTF-8 encoded
    // (RFC 7617). Decoding as Latin-1 meant a password with any non-ASCII
    // character could never match, and the owner would be locked out with no
    // diagnostic anywhere.
    const bytes = Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0))
    decoded = new TextDecoder().decode(bytes)
  } catch {
    return false
  }
  const idx = decoded.indexOf(':')
  if (idx === -1) return false
  return safeEqual(decoded, `${user}:${pass}`)
}

export function unauthorized(): Response {
  // JSON body so the panel can render the reason; the WWW-Authenticate header
  // is what actually drives the browser's credential prompt.
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: {
      'content-type': 'application/json',
      'WWW-Authenticate': 'Basic realm="owner panel"',
    },
  })
}

/** Returns null when the request is authorized, otherwise the Response to send. */
export function requireAuth(request: Request): Response | null {
  const user = process.env.PANEL_USER
  const pass = process.env.PANEL_PASSWORD
  // text/plain here meant the panel's `res.json().catch(() => null)` threw
  // this message away and showed "Request failed (503)" instead — the one
  // error whose text tells the owner exactly what to fix.
  if (!user || !pass) return json({ error: 'Panel auth not configured' }, 503)
  return checkBasicAuth(request.headers.get('authorization'), user, pass) ? null : unauthorized()
}
