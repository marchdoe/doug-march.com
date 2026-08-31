import type { IncomingMessage, ServerResponse } from 'node:http'

// Localhost-only guard for every dev API endpoint.
//
// The Vite dev server can bind to 0.0.0.0 (via --host), and these endpoints
// spawn processes with live secrets and write files that steer the next
// pipeline run. Without this, anyone on the network could trigger a run;
// without the Origin check, a page on any site could do it through the
// visitor's browser (DNS rebinding). This is security code, and until #227
// it had no test — it lived inline in vite.config.ts.

/** Cap on request bodies, so a buggy or hostile client cannot grow memory unbounded. */
export const MAX_BODY_SIZE = 64 * 1024

const LOOPBACK = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1'])
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

/** The TCP peer is this machine. */
export function isLocalRequest(req: Pick<IncomingMessage, 'socket'>): boolean {
  const addr = req.socket?.remoteAddress
  return typeof addr === 'string' && LOOPBACK.has(addr)
}

/**
 * The Origin header, when present, names a local page. No header is a
 * same-origin request (the panel fetching its own API) and is allowed.
 */
export function isAllowedOrigin(req: Pick<IncomingMessage, 'headers'>): boolean {
  const origin = req.headers.origin || ''
  if (!origin) return true
  try {
    return LOCAL_HOSTS.has(new URL(origin).hostname)
  } catch {
    return false
  }
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
