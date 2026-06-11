import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const footerBar = css({
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '4vw',
  paddingRight: '4vw',
  borderTop: '1px solid',
  borderColor: 'border',
  background: 'bg',
  zIndex: '100',
  '@media (prefers-reduced-motion: reduce)': {
    '& a': {
      transition: 'none !important',
    },
  },
})

const signalStrip = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  color: 'textMuted',
  flexShrink: '1',
  minWidth: '0',
  overflow: 'hidden',
})

const signalItem = css({
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
})

const signalAccent = css({
  color: 'accent',
})

const navStrip = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  textTransform: 'uppercase',
  letterSpacing: '0.22em',
  flexShrink: '0',
})

const navLink = css({
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 200ms ease, letter-spacing 200ms ease',
  padding: '12px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  _hover: {
    color: 'accent',
    letterSpacing: '0.14em',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

const logoLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: '44px',
  minWidth: '44px',
  padding: '8px 0',
  flexShrink: '0',
})

const mobileHide = css({
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'flex',
  },
})

export function Sidebar() {
  return (
    <nav className={footerBar} aria-label="Main navigation">
      <div className={css({ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: '1', minWidth: '0', overflow: 'hidden' })}>
        <a href="/" className={logoLink} aria-label="Home">
          <img src={logoSvg} alt="Doug March logo" style={{ height: '20px', width: 'auto' }} />
        </a>
        <div className={`${signalStrip} ${mobileHide}`}>
          <span className={signalItem}>
            RBC Open — Lebioda / Sloan / Mitchell — <span className={signalAccent}>E</span>
          </span>
          <span className={signalItem}>
            DET 4 · 6 MIN
          </span>
          <span className={signalItem}>
            <span className={signalAccent}>πFS · HN 784 ↑</span>
          </span>
          <span className={signalItem}>
            ◑ 10%
          </span>
        </div>
      </div>
      <div className={navStrip}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
        <a href="https://github.com" className={navLink}>GitHub</a>
      </div>
    </nav>
  )
}