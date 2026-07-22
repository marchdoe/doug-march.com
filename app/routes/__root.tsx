import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent, ScrollRestoration, Scripts } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'
import type { ReactNode } from 'react'

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
        { property: 'og:title', content: "NO CHOICE BUT TO LIVE IT" },
        { property: 'og:description', content: "Deep-water teal Specimen — Kamal Ravikant's \"NO CHOICE BUT TO LIVE IT\" drenched huge in Bricolage, \"LIVE IT\" surfacing in electric aqua, nav folded to a left spine and the day's signals pinned quiet down the right margin." },
        { property: 'og:image', content: "https://doug-march.com/og/2026-07-22.png" },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: "https://doug-march.com" },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: "NO CHOICE BUT TO LIVE IT" },
        { name: 'twitter:image', content: "https://doug-march.com/og/2026-07-22.png" },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Manrope:wght@400;500;700&display=swap',
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
