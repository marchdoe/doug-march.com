import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '60px',
  padding: '0 24px',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const wordmark = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textMuted',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const logoImg = css({
  width: '24px',
  height: '24px',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '400',
  letterSpacing: '0.20em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  padding: '12px 0',
  _hover: {
    color: 'accentGlow',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const separator = css({
  color: 'textMuted',
  fontSize: '11px',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={wordmark} aria-label="Doug March — Home">
        <img src={logoSvg} alt="" className={logoImg} />
        <span>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <span className={separator} aria-hidden="true">·</span>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}