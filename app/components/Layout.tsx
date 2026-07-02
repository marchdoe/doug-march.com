import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const wrapperStyle = css({
  maxWidth: 'none',
  padding: '0 min(4vw, 64px)',
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
  alignItems: 'baseline',
  padding: '16px 0',
  borderTop: '1px solid',
  borderColor: 'border',
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  flexWrap: 'wrap',
  gap: '8px 24px',
  marginTop: 'auto',
})

const footerLinkStyle = css({
  color: 'textMuted',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={wrapperStyle}>
      <Sidebar />
      <main className={mainStyle}>
        {children}
      </main>
      <footer className={footerStyle}>
        <span>Waning Gibbous · 89%</span>
        <span>Wet Leg · My Morning Jacket</span>
        <a href="/archive" className={footerLinkStyle}>Archive</a>
        <span>© 2026</span>
      </footer>
    </div>
  )
}