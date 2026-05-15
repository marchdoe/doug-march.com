import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '52px',
  background: '{colors.neutral.900}',
  borderBottom: '1px solid {colors.neutral.700}',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 4vw',
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  height: '24px',
  width: '24px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: '{colors.neutral.300}',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: '500',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
})

const navLink = css({
  color: '{colors.neutral.400}',
  textDecoration: 'none',
  padding: '12px 8px',
  transition: 'color 0.2s ease',
  _hover: {
    color: '{colors.neutral.50}',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.primary.400}',
    outlineOffset: '2px',
  },
})

const dotSep = css({
  width: '3px',
  height: '3px',
  borderRadius: '9999px',
  background: '{colors.primary.400}',
  flexShrink: 0,
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <span className={nameStyle}>Doug March</span>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <span className={dotSep} aria-hidden="true" />
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}