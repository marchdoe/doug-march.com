import '../styles/panda.css'
import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import { styled } from '../../styled-system/jsx'

const THEME_INIT_SCRIPT = `(function(){
  var s=localStorage.getItem('theme');
  var p=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
  document.documentElement.classList.add(p);
})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    ],
    title: 'Doug March',
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
    scripts: [
      { children: THEME_INIT_SCRIPT },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}

const Wrap = styled('div', {
  base: { paddingTop: '12' },
})

const Code = styled('div', {
  base: {
    fontSize: '2xs',
    fontFamily: 'mono',
    letterSpacing: 'widest',
    color: 'text.dim',
    opacity: '0.4',
    marginBottom: '4',
  },
})

const Heading = styled('div', {
  base: {
    fontSize: 'xl',
    fontWeight: 'regular',
    fontStyle: 'italic',
    letterSpacing: 'tight',
    color: 'text',
    lineHeight: 'tight',
    marginBottom: '3',
  },
})

const Message = styled('p', {
  base: {
    fontSize: 'sm',
    color: 'text.dim',
    lineHeight: 'normal',
    marginBottom: '8',
  },
})

const BackLink = styled(Link, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: 'xs',
    fontFamily: 'mono',
    color: 'text.dim',
    letterSpacing: 'wide',
    transitionProperty: 'color',
    transitionDuration: 'base',
    transitionTimingFunction: 'default',
    _hover: { color: 'accent' },
  },
})

function NotFound() {
  return (
    <Layout>
      <Wrap>
        <Code>404</Code>
        <Heading>Not Found</Heading>
        <Message>The page you're looking for doesn't exist or has been moved.</Message>
        <BackLink to={'/' as any}>← back to work</BackLink>
      </Wrap>
    </Layout>
  )
}
