import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '100',
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  background: 'rgba(16,9,4,0.92)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 0.3s ease',
})

const logoLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  color: 'textSecondary',
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '1.125rem',
  letterSpacing: '-0.02em',
  '&:hover': { color: 'accent' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLink = css({
  color: 'textMuted',
  fontFamily: 'body',
  fontSize: '0.8125rem',
  fontWeight: 'medium',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  padding: '12px 0',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': { color: 'accentLight' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
    borderRadius: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={logoLink}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span>DM</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}