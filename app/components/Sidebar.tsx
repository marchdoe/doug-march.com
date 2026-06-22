import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  background: 'transparent',
  transition: 'background 0.3s ease, border-color 0.3s ease',
  borderBottom: '1px solid transparent',
  _hover: {
    background: 'bg',
    borderColor: 'border',
  },
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const logoText = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'accent',
  textDecoration: 'none',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '11px',
  fontWeight: 'medium',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '10px 0',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={logoArea} style={{ textDecoration: 'none' }}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={logoText}>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}