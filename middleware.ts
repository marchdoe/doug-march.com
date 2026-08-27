import { next } from '@vercel/functions'
import { requireAuth } from './api/_lib/auth'
import { requireSameOrigin } from './api/_lib/csrf'

export const config = {
  matcher: ['/panel', '/panel/:path*', '/api/panel/:path*'],
}

/**
 * Gate every panel route.
 *
 * Provenance before identity, for the reason `csrf.ts` gives: a 401 carries
 * `WWW-Authenticate`, so answering an unauthenticated cross-site request with
 * one makes the browser raise a credential prompt on a page the owner never
 * chose to visit. The handlers already order their own guards that way, but
 * this middleware runs first and used to answer 401 before they were reached —
 * which meant the ordering they were written for could not take effect for the
 * exact case it was written for. Verified against production before this
 * change: a cross-site POST to /api/panel/run returned
 * `401 www-authenticate: Basic realm="owner panel"`.
 *
 * The same-origin check is scoped to the API routes, matching where the
 * handler-level guard already applies. `/panel` itself is a page, and a
 * cross-site *navigation* to it is a GET whose response the other site cannot
 * read; refusing those would break following a link to the panel while
 * preventing nothing.
 *
 * The handler guards stay. This is defence in depth, not a replacement: the
 * API routes are also reachable in local dev, where no middleware runs.
 */
export default function middleware(request: Request): Response {
  if (new URL(request.url).pathname.startsWith('/api/panel/')) {
    const foreign = requireSameOrigin(request)
    if (foreign) return foreign
  }

  const denied = requireAuth(request)
  if (denied) return denied

  return next()
}
