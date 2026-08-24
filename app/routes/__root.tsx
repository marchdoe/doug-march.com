import '../styles/panda.css'
import {
  createRootRoute,
  Link,
  Outlet,
  HeadContent,
  ScrollRestoration,
  Scripts,
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

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <a href="/archive" className={archiveLink} data-archive-link>
          Archive — 123 designs
        </a>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
