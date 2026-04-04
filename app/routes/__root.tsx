import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent, ScrollRestoration, Scripts } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

const NotFoundComponent = () => (
  <styled.div
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    padding="32px"
    textAlign="center"
  >
    <styled.h1 fontSize="2xl" marginBottom="16px">
      404 - Page Not Found
    </styled.h1>
    <styled.p marginBottom="32px" color="text-secondary">
      The page you're looking for doesn't exist or has been moved.
    </styled.p>
    <Link
      to="/"
      className="button-primary"
      style={{
        padding: '12px 28px',
        backgroundColor: 'var(--colors-accent)',
        color: 'white',
        borderRadius: '28px',
        border: 'none',
        textDecoration: 'none',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
      }}
    >
      Go Home
    </Link>
  </styled.div>
)

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

function RootDocument({ children }: { children: string }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Doug March</title>
        <meta name="description" content="Portfolio of Doug March" />
        <script>{THEME_INIT_SCRIPT}</script>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ({ error }) => (
    <styled.div
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="32px"
      textAlign="center"
    >
      <styled.h1 fontSize="2xl" marginBottom="16px" color="text">
        Error
      </styled.h1>
      <styled.p
        marginBottom="32px"
        color="text-secondary"
        maxWidth="600px"
      >
        {(error as Error)?.message || 'An unexpected error occurred'}
      </styled.p>
      <Link
        to="/"
        style={{
          padding: '12px 28px',
          backgroundColor: 'var(--colors-accent)',
          color: 'white',
          borderRadius: '28px',
          border: 'none',
          textDecoration: 'none',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
        }}
      >
        Go Home
      </Link>
    </styled.div>
  ),
})

// Components from TanStack Router

