import '../styles/panda.css'
import { createRootRoute, Outlet, Link, HeadContent, ScrollRestoration, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Layout } from '../components/Layout'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=DM+Sans:wght@300;400&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INIT_SCRIPT,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function notFoundComponent() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Page not found</p>
        <Link to="/">Go home</Link>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
  }),
})