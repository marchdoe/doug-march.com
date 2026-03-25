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
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;500&display=swap',
      },
    ],
    scripts: [{ children: THEME_INIT_SCRIPT }],
  }),
  notFoundComponent: () => {
    return (
      <RootDocument>
        <styled.div
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          gap="4"
        >
          <styled.p fontFamily="heading" fontSize="lg">
            Page not found
          </styled.p>
          <Link to="/">Go home</Link>
        </styled.div>
      </RootDocument>
    )
  },
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
    <>
      <HeadContent />
      {children}
      <ScrollRestoration />
      <Scripts />
    </>
  )
}