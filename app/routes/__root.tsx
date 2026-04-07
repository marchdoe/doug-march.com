import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

const notFoundComponent = () => (
  <styled.div
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    padding="16px"
  >
    <styled.h1 fontSize="2xl" marginBottom="16px">
      404 — Page Not Found
    </styled.h1>
    <styled.p marginBottom="24px">
      The page you're looking for doesn't exist.
    </styled.p>
    <Link to="/" className="link">
      Back to Home
    </Link>
  </styled.div>
)

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="description" content="Doug March — Portfolio" />
        <meta name="theme-color" content="#F4F5ED" />
        <title>Doug March</title>
        <script>{THEME_INIT_SCRIPT}</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=IBM+Plex+Sans:wght@300;400;500&family=IBM+Plex+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: notFoundComponent,
})