import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent, ScrollRestoration, Scripts } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

const notFoundComponent = () => (
  <RootComponent>
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Start Over</Link>
      </p>
    </div>
  </RootComponent>
)

const RootComponent = ({ children }: { children: React.ReactNode }) => (
  <RootDocument>
    <Layout>{children}</Layout>
  </RootDocument>
)

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
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

function head() {
  return {
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=IBM+Plex+Sans:wght@400;500&display=swap',
      },
    ],
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }
}

function Root() {
  return (
    <RootComponent>
      <Outlet />
    </RootComponent>
  )
}

export const Route = createRootRoute({
  head,
  component: Root,
  notFoundComponent,
})

export { ScrollRestoration, Scripts } from '@tanstack/react-router'