import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '48px',
  borderBottom: '1px solid',
  borderColor: 'border',
  padding: '0 6vw',
  background: 'bgMasthead',
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '24px',
  height: '24px',
})

const nameStyle = css({
  fontFamily: 'display',
  fontSize: '22px',
  letterSpacing: '0.1em',
  color: 'accent',
  textDecoration: 'none',
  lineHeight: '1',
  _hover: { color: 'accentHover' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'letter-spacing 120ms ease, color 120ms ease',
  padding: '12px 0',
  _hover: {
    letterSpacing: '0.09em',
    color: 'text',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const separator = css({
  color: 'textMuted',
  fontSize: '13px',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <a href="/" className={nameStyle}>DOUG MARCH</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <span className={separator} aria-hidden="true">·</span>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}