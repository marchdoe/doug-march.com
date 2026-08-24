import '../styles/panda.css'
import {
  createRootRoute,
  Link,
  Outlet,
  HeadContent,
  ScrollRestoration,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { css } from '../../styled-system/css'
import type { ReactNode } from 'react'

/**
 * The archive link lives here, outside <Layout>, because Layout.tsx and
 * Sidebar.tsx are written by the React Engineer each night and the composition
 * grammar is allowed to delete the whole shell (`shell_posture: none`,
 * `footer: none`). It did: the link vanished on 2026-07-12, the day the shell
 * became a declared Art Director choice, and was absent for 16 consecutive
 * builds before anyone noticed. See issue #155.
 *
 * Only `text`, `bg`, and `accent` are used. Semantic tokens are not guaranteed
 * across nightly presets — `textMuted` is missing from roughly one preset in
 * five — so the quiet tone comes from opacity, not from a dimmer token. Font
 * size comes from the chassis ramp, which the orchestrator owns.
 *
 * Regenerated from scripts/templates/__root.tsx.template on every build.
 */
const archiveLink = css({
  display: 'block',
  background: 'bg',
  color: 'text',
  opacity: 0.55,
  fontSize: 'xs',
  letterSpacing: '0.08em',
  textAlign: 'center',
  textDecoration: 'none',
  padding: '28px 16px',
  minHeight: '44px',
  transition: 'opacity 0.2s ease, color 0.2s ease',
  _hover: { opacity: 1, color: 'accent' },
})

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        property: 'og:title',
        content: 'Confidence is what you have before you understand the problem.',
      },
      {
        property: 'og:description',
        content:
          "Front-page swagger — Woody Allen's confidence aphorism as a Spectral broadsheet lead, drenched in plum-black and hot magenta, the Tigers' 14–0 shutout pinned in the almanac column.",
      },
      { property: 'og:image', content: 'https://doug-march.com/og/2026-07-29.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: 'https://doug-march.com' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:title',
        content: 'Confidence is what you have before you understand the problem.',
      },
      { name: 'twitter:image', content: 'https://doug-march.com/og/2026-07-29.png' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Albert+Sans:wght@400;500;600&display=swap',
      },
    ],
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
  notFoundComponent: () => (
    <div>
      <p>Page not found.</p>
      <Link to="/">Return home</Link>
    </div>
  ),
  component: RootComponent,
})

/**
 * The archive renders outside <Layout>.
 *
 * Layout.tsx, Sidebar.tsx, and Footer.tsx are rewritten by the React Engineer
 * every night, and the composition grammar may delete the shell entirely. An
 * archive wearing that shell wears a different face each morning, which is the
 * one thing #152 says it must not do. The surfaces carry their own chrome and
 * their own tokens instead — see the `archive.*` tokens in panda.config.ts.
 *
 * Regenerated from scripts/templates/__root.tsx.template on every build.
 */
function isArchiveSurface(pathname: string) {
  return pathname === '/archive' || pathname.startsWith('/archive/') || pathname.startsWith('/how/')
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  if (isArchiveSurface(pathname)) {
    return (
      <RootDocument bare>
        <Outlet />
      </RootDocument>
    )
  }

  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

/**
 * `bare` is the archive: no nightly shell, no nightly footer link, and the
 * archive's own webfont instead of the day's.
 *
 * The font is declared here rather than in the route's `head` because the
 * nightly `head` block above is regenerated every morning with that day's
 * chassis fonts, and a route-level link would arrive after it in the cascade
 * with no way to guarantee ordering. See the `archive.*` font tokens in
 * panda.config.ts.
 */
const ARCHIVE_FONT =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap'

/**
 * The archive's ground, applied to `body` itself.
 *
 * The surfaces paint their own background, but `body` keeps whatever the
 * nightly preset gave it, and that colour shows through wherever the surface
 * does not reach — the overscroll gutter above and below the page. Caught by
 * reading the computed style: #120d08 on a morning the design was warm brown.
 *
 * The literal matches `archive.bg` in panda.config.ts. It is written out
 * because this rule has to exist before any component mounts.
 */
const ARCHIVE_GROUND = 'body{background:#0e0e10;color:#e8e8ea}'

function RootDocument({ children, bare = false }: { children: ReactNode; bare?: boolean }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {bare ? (
          <>
            <link rel="stylesheet" href={ARCHIVE_FONT} />
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a static literal, no interpolation */}
            <style dangerouslySetInnerHTML={{ __html: ARCHIVE_GROUND }} />
          </>
        ) : null}
      </head>
      <body>
        {children}
        {bare ? null : (
          <a href="/archive" className={archiveLink} data-archive-link>
            Archive — 123 designs
          </a>
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
