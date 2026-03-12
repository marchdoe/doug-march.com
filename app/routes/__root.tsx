import '../styles/global.css'
import { createRootRoute, Link, Outlet, HeadContent } from '@tanstack/react-router'
import { Layout } from '../components/Layout'
import styles from './not-found.module.css'

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
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
      },
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

function NotFound() {
  return (
    <Layout>
      <div className={styles.wrap}>
        <div className={styles.code}>404</div>
        <div className={styles.heading}>NOT FOUND</div>
        <p className={styles.message}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.back}>← BACK TO WORK</Link>
      </div>
    </Layout>
  )
}
