import type { IncomingMessage, ServerResponse } from 'node:http'

// Localhost-only guard for every dev API endpoint.
//
// The Vite dev server can bind to 0.0.0.0 (via --host), and these endpoints
// spawn processes with live secrets and write files that steer the next
// pipeline run. Without this, anyone on the network could trigger a run.
// Three checks, because each closes a different door:
//
// - The peer is loopback. Stops the LAN.
// - The Host header names this machine. Stops DNS rebinding, where a page
//   on evil.example resolves its own name to 127.0.0.1 and the browser
//   sends a same-origin-looking request with `Host: evil.example`. Vite's
//   own host validation covers this only until someone sets `server.https`
//   or `allowedHosts: true`.
// - Sec-Fetch-Site, when present, is same-origin or none; and Origin, when
//   present, names a local page. A missing Origin used to be treated as
//   same-origin, but browsers omit Origin on no-cors subresource GETs, so an
//   <img src="http://127.0.0.1:5173/api/collect-signals"> on any page the
//   developer visited spawned the collector with .env loaded (#322).
//   Sec-Fetch-Site is sent on those. Same pattern as api/_lib/csrf.ts.
//
// This is security code, and until #227 it had no test — it lived inline
// in vite.config.ts.

/** Cap on request bodies, so a buggy or hostile client cannot grow memory unbounded. */
export const MAX_BODY_SIZE = 64 * 1024

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1'])
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

/** The TCP peer is this machine. */
export function isLocalRequest(req: Pick<IncomingMessage, 'socket'>): boolean {
  const addr = req.socket?.remoteAddress
  return typeof addr === 'string' && LOOPBACK.has(addr)
}

/** The hostname in a Host or Origin value, or null when it does not parse. */
function hostnameOf(value: string): string | null {
  try {
    return new URL(value.includes('://') ? value : `http://${value}`).hostname
  } catch {
    return null
  }
}

/** The Host header names this machine. */
export function isLocalHost(req: Pick<IncomingMessage, 'headers'>): boolean {
  const host = req.headers.host
  if (typeof host !== 'string' || !host) return false
  const name = hostnameOf(host)
  return name !== null && LOCAL_HOSTS.has(name)
}

/**
 * The request came from a local page, or from the address bar.
 *
 * Sec-Fetch-Site decides when the browser sent it: `same-origin` is the panel
 * calling its own API, `none` is the owner typing the URL. `cross-site` and
 * `same-site` are somebody else's page, whether or not an Origin came along.
 * Origin, when present, must then also name a local page. Neither header at
 * all is a non-browser client (curl, the tests) on loopback, and is allowed.
 */
export function isAllowedOrigin(req: Pick<IncomingMessage, 'headers'>): boolean {
  const site = req.headers['sec-fetch-site']
  if (typeof site === 'string' && site !== 'same-origin' && site !== 'none') return false

  const origin = req.headers.origin || ''
  if (!origin) return true
  const name = hostnameOf(origin)
  return name !== null && LOCAL_HOSTS.has(name)
}

/**
 * Refuse with 403 unless both checks pass. Returns whether the handler may
 * continue; the response has already been written when it returns false.
 */
export function guardRequest(req: IncomingMessage, res: ServerResponse): boolean {
  if (!isLocalRequest(req)) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Forbidden: dev API is localhost-only' }))
    return false
  }
  if (!isLocalHost(req)) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Forbidden: host is not local' }))
    return false
  }
  if (!isAllowedOrigin(req)) {
    res.writeHead(403, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Forbidden: invalid origin' }))
    return false
  }
  return true
}

/** Read a request body, rejecting once it passes MAX_BODY_SIZE. */
export function readBodyLimited(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    let total = 0
    req.on('data', (chunk: Buffer) => {
      total += chunk.length
      if (total > MAX_BODY_SIZE) {
        reject(new Error(`Request body exceeds ${MAX_BODY_SIZE} bytes`))
        req.destroy()
        return
      }
      body += chunk.toString()
    })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

/** Write a JSON response. */
export function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}
