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
  if (!header || !header.startsWith('Basic ')) return false
  let decoded: string
  try {
    decoded = atob(header.slice(6))
  } catch {
    return false
  }
  const idx = decoded.indexOf(':')
  if (idx === -1) return false
  return safeEqual(decoded, `${user}:${pass}`)
}

export function unauthorized(): Response {
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="owner panel"' },
  })
}

/** Returns null when the request is authorized, otherwise the Response to send. */
export function requireAuth(request: Request): Response | null {
  const user = process.env.PANEL_USER
  const pass = process.env.PANEL_PASSWORD
  if (!user || !pass) return new Response('Panel auth not configured', { status: 503 })
  return checkBasicAuth(request.headers.get('authorization'), user, pass) ? null : unauthorized()
}
