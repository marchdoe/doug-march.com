import { next } from '@vercel/functions'
import { checkBasicAuth, unauthorized } from './api/_lib/auth'

export const config = {
  matcher: ['/panel', '/panel/:path*', '/api/panel/:path*'],
}

export default function middleware(request: Request): Response {
  const user = process.env.PANEL_USER
  const pass = process.env.PANEL_PASSWORD
  if (!user || !pass) return new Response('Panel auth not configured', { status: 503 })
  if (!checkBasicAuth(request.headers.get('authorization'), user, pass)) {
    return unauthorized()
  }
  return next()
}
