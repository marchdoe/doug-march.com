import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
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
    padding="48px"
    textAlign="center"
  >
    <styled.h1 fontSize="2xl" marginBottom="16px">
      404 - Page Not Found
    </styled.h1>
    <styled.p marginBottom="32px">The page you're looking for doesn't exist.</styled.p>
    <Link to="/" className="[&]:underline">
      Go back home
    </Link>
  </styled.div>
)

const RootComponent = () => (
  <RootDocument>
    <Outlet />
  </RootDocument>
)

const RootDocument = ({ children }: { children: React.ReactNode }) => (
  <>
    <HeadContent>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0,1&family=Work+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
    </HeadContent>
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
    <Layout>{children}</Layout>
  </>
)

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
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0,1&family=Work+Sans:wght@300;400;500;600&display=swap',
      },
    ],
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
})