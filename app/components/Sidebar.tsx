import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '56px',
  padding: '0 5vw',
  background: 'bgSidebar',
  borderBottom: '2px solid',
  borderColor: 'borderAccent',
  position: 'relative',
  zIndex: 10,
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  lineHeight: 'snug',
  '@media (max-width: 480px)': {
    display: 'none',
  },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  lineHeight: 'snug',
  padding: '12px 0',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'text',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const dateLine = css({
  fontFamily: 'body',
  fontSize: '11px',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textMuted',
  display: 'none',
  '@media (min-width: 768px)': {
    display: 'block',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        </a>
        <span className={nameStyle}>Doug March</span>
        <span className={dateLine}>May 22, 2026</span>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}