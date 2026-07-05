import type { ReactNode } from 'react'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

const layoutWrap = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  minHeight: '100vh',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '62fr 38fr',
  },
})

const leftPanel = css({
  background: 'bgHeroPanel',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '48px 6vw 32px',
  minHeight: '60vh',
  position: 'relative',
  '@media (min-width: 768px)': {
    minHeight: '100vh',
    padding: '96px 6vw 64px',
    position: 'sticky',
    top: '0',
    height: '100vh',
  },
})

const heroPhrase = css({
  fontFamily: 'display',
  fontSize: 'clamp(2.5rem, 5vw, 6.5rem)',
  lineHeight: 'tight',
  letterSpacing: 'normal',
  color: 'textOnIndigo',
  textTransform: 'uppercase',
  maxWidth: '720px',
})

const attribution = css({
  fontFamily: 'body',
  fontSize: '0.6875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textOnIndigo',
  opacity: 0.6,
  position: 'absolute',
  bottom: '32px',
  left: '6vw',
  '@media (min-width: 768px)': {
    bottom: '64px',
  },
})

const rightPanel = css({
  background: 'bg',
  padding: '32px 5vw 48px',
  overflowY: 'auto',
  '@media (min-width: 768px)': {
    padding: '48px 5vw',
    minHeight: '100vh',
  },
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <div className={leftPanel}>
        <h1 className={heroPhrase}>
          If you're a button, you have one job.
        </h1>
        <span className={attribution}>
          Hacker News, July 5 · 236 points
        </span>
      </div>
      <div className={rightPanel}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}