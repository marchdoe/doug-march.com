import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { css } from '../../styled-system/css'

const layoutWrap = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  minHeight: '100vh',
  '@media (min-width: 768px)': {
    gridTemplateColumns: '58vw 1fr',
  },
})

const heroPanel = css({
  background: 'bgHero',
  padding: '8vw 6vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  minHeight: '70vh',
  '@media (min-width: 768px)': {
    minHeight: '100vh',
    position: 'sticky',
    top: 0,
    padding: '5vw 6vw',
  },
})

const heroH1 = css({
  fontFamily: 'display',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  color: 'textOnHero',
})

const heroLine = css({
  display: 'block',
})

const heroAttribution = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textOnHeroMuted',
  marginTop: '7',
  '@media (min-width: 768px)': {
    position: 'absolute',
    bottom: '5vw',
    left: '6vw',
    marginTop: '0',
  },
})

const rightPanel = css({
  background: 'bg',
  padding: '24px 20px',
  overflowY: 'auto',
  borderLeft: 'none',
  '@media (min-width: 768px)': {
    padding: '48px 40px',
    borderLeft: '1px solid',
    borderColor: 'border',
    minHeight: '100vh',
  },
})

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={layoutWrap}>
      <div className={heroPanel}>
        <h1 className={heroH1}>
          <span className={heroLine} style={{ fontSize: 'clamp(5.5rem, 11vw, 14rem)' }}>
            90/100.
          </span>
          <span className={heroLine} style={{ fontSize: 'clamp(4rem, 8vw, 10rem)' }}>
            Oh wait, 74.
          </span>
          <span className={heroLine} style={{ fontSize: 'clamp(5rem, 10vw, 13rem)' }}>
            No — 88.
          </span>
        </h1>
        <p className={heroAttribution}>— HackerRank ATS open-source review · Jun 29, 2026</p>
      </div>
      <div className={rightPanel}>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}