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
        { property: 'og:title', content: "Writing by hand is good for your brain" },
        { property: 'og:description', content: "Manuscript Scroll — \"Writing by hand is good for your brain\" set huge in Spectral on warm paper, \"by hand\" bleeding vermillion italic, the day's signals penciled as red marginalia and the nav folded flush into a bottom rail." },
        { property: 'og:image', content: "https://doug-march.com/og/2026-07-24.png" },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: "https://doug-march.com" },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: "Writing by hand is good for your brain" },
        { name: 'twitter:image', content: "https://doug-march.com/og/2026-07-24.png" },
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
