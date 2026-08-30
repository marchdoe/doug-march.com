/**
 * Refuse requests a browser made on behalf of another site.
 *
 * The panel authenticates with HTTP Basic. Once the owner has authenticated,
 * the browser attaches those credentials to any same-origin request it is told
 * to make — including one initiated by a form on someone else's page. Auth
 * alone therefore proves who the user is, not that the user asked for this.
 *
 * Two endpoints were reachable that way:
 *
 *   - `POST /api/panel/run` swallowed a JSON parse failure and continued
 *     (`catch { body = {} }`), so a plain form post triggered a real pipeline
 *     run — a workflow dispatch that costs money and writes to main.
 *   - `POST /api/panel/rate` rejected invalid JSON, but `request.json()` never
 *     inspects Content-Type, so a form with `enctype="text/plain"` can smuggle
 *     a valid JSON body through and post issue comments.
 *
 * `PUT /api/panel/weights` was already out of reach: a form cannot send PUT,
 * and a cross-origin fetch would need a preflight that never succeeds. It is
 * guarded anyway, because relying on a method to stay non-simple is the kind
 * of assumption that quietly stops being true.
 *
 * The response is 403 rather than 401 on purpose. A 401 carries
 * `WWW-Authenticate`, which makes the browser raise a credential prompt on a
 * page the owner did not choose to visit.
 */

import { json } from './http.js'

/** Methods that do not change state. Their responses are unreadable cross-origin. */
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

function forbidden(reason: string): Response {
  return json({ error: `Forbidden: ${reason}` }, 403)
}

/** Returns null when the request came from this site, otherwise the Response to send. */
export function requireSameOrigin(request: Request): Response | null {
  // Every browser that matters states where a request came from. `same-origin`
  // is the panel calling itself; `none` is the owner typing the URL or opening
  // a bookmark. `cross-site` and `same-site` are somebody else's page.
  const site = request.headers.get('sec-fetch-site')
  if (site !== null && site !== 'same-origin' && site !== 'none') {
    return forbidden('cross-site request')
  }

  // Fallback for anything that strips Sec-Fetch-Site. An Origin that disagrees
  // with the Host is another site regardless of what else it claims.
  const origin = request.headers.get('origin')
  if (origin && origin !== 'null') {
    const host = request.headers.get('host')
    let originHost: string
    try {
      originHost = new URL(origin).host
    } catch {
      return forbidden('malformed origin')
    }
    if (!host || originHost !== host) return forbidden('origin does not match host')
  }

  // A cross-origin form cannot set this Content-Type without a preflight, and
  // the preflight would be refused. Requiring it closes the text/plain
  // smuggling route into handlers that parse the body as JSON regardless.
  if (!SAFE_METHODS.has(request.method.toUpperCase())) {
    const contentType = (request.headers.get('content-type') ?? '').split(';')[0].trim()
    if (contentType.toLowerCase() !== 'application/json') {
      return forbidden('expected application/json')
    }
  }

  return null
}
