import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutStyle = css({
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background: 'bg',
  color: 'text',
})

const mainStyle = css({
  flex: '1',
})

const footerStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 5vw',
  borderTop: '2px solid',
  borderColor: 'border',
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  flexWrap: 'wrap',
  gap: '8px',
})

const footerLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
  padding: '8px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutStyle}>
      <Sidebar />
      <main className={mainStyle}>
        {children}
      </main>
      <footer className={footerStyle}>
        <span>© 2026 Doug March · Product Designer & Developer</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
      </footer>
    </div>
  )
}