import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const shellDesktop = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  minHeight: '100vh',
  maxWidth: 'none',

  '@media (min-width: 768px)': {
    gridTemplateColumns: '58fr 42fr',
  },
})

const leftPanel = css({
  background: 'bg',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '32px 24px 32px 24px',
  minHeight: '70vh',
  borderRight: 'none',
  position: 'relative',

  '@media (min-width: 768px)': {
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflow: 'hidden',
    padding: '64px 48px 64px 6vw',
    borderRight: '1px solid',
    borderColor: 'border',
    minHeight: 'unset',
  },
})

const openQuote = css({
  fontFamily: 'display',
  fontSize: '80px',
  lineHeight: 1,
  color: 'accent',
  opacity: 0.2,
  marginBottom: '4',
  userSelect: 'none',

  '@media (max-width: 767px)': {
    fontSize: '48px',
  },
})

const heroPhrase = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(36px, 5.8vw, 84px)',
  lineHeight: 'tight',
  letterSpacing: '-0.02em',
  color: 'text',
  maxWidth: '18ch',
  textWrap: 'balance',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: 'clamp(13px, 1vw, 15px)',
  lineHeight: '1.3',
  color: 'accent',
  marginTop: '5',
})

const rightPanel = css({
  background: 'bgCard',
  minHeight: '100vh',
  overflowY: 'auto',
  padding: '32px 24px 80px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',

  '@media (min-width: 768px)': {
    padding: '32px 6vw 80px 48px',
  },
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={shellDesktop}>
      <div className={leftPanel}>
        <div className={openQuote} aria-hidden="true">"</div>
        <h1 className={heroPhrase}>
          We are willing to believe anything other than the truth.
        </h1>
        <p className={attribution}>— Carlos Ruiz Zafón</p>
      </div>
      <div className={rightPanel}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}