import { requireAuth } from './auth.js'
import { requireSameOrigin } from './csrf.js'
import { json } from './http.js'
import { GitHubError } from './github.js'

/**
 * The prologue and epilogue every panel handler needs, written once.
 *
 * All four handlers opened with the same same-origin/auth pair and closed with
 * the same GitHubError mapping. The ordering invariant — provenance before
 * identity, so a cross-site request gets 403 and never a 401 with
 * WWW-Authenticate that pops a credential prompt on a page the owner did not
 * choose to visit — was enforced by a test that read the source text and
 * compared indexOf positions. That test passes if the two strings appear in a
 * comment in the right order and fails on a harmless refactor. Doing it in one
 * place makes it a property of the code instead.
 *
 * The bodies had drifted too: run.ts swallowed a malformed body
 * (`catch { body = {} }`) and dispatched a real workflow run anyway, while
 * rate.ts and weights.ts returned 400. csrf.ts names that exact shape as one
 * of the two that was exploitable.
 *
 * Anything that is not a GitHubError became an unhandled throw, which Vercel
 * renders as its generic HTML 500 — so the panel's `res.json()` got nothing to
 * display. Every exit from here is JSON.
 */

interface PanelContext {
  request: Request
  /** Parsed JSON body; `undefined` for methods that carry none. */
  body: Record<string, unknown>
}

type PanelHandler = (ctx: PanelContext) => Response | Promise<Response>

const BODYLESS = new Set(['GET', 'HEAD', 'OPTIONS'])

export function withPanelGuards(handler: PanelHandler): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    const foreign = requireSameOrigin(request)
    if (foreign) return foreign

    const denied = requireAuth(request)
    if (denied) return denied

    let body: Record<string, unknown> = {}
    if (!BODYLESS.has(request.method.toUpperCase())) {
      try {
        const parsed: unknown = await request.json()
        body = parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
      } catch {
        return json({ error: 'Invalid JSON body' }, 400)
      }
    }

    try {
      return await handler({ request, body })
    } catch (err) {
      if (err instanceof GitHubError) {
        return json({ error: `GitHub error (${err.status}) — try again` }, 502)
      }
      // Log for the platform, return a shape the panel can render.
      console.error('panel handler failed', err)
      return json({ error: 'Internal error' }, 500)
    }
  }
}
