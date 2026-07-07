import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  height: '56px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 6vw',
  background: 'rgba(3,13,8,0.92)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
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

const siteName = css({
  fontFamily: 'display',
  fontSize: '1rem',
  color: 'text',
  textDecoration: 'none',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  lineHeight: '1',
  _hover: {
    color: 'accentLight',
  },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  color: 'textSecondary',
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  fontWeight: 'medium',
  lineHeight: '1',
  padding: '10px 0',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accentLight',
    outlineOffset: '4px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <a href="/" className={logoArea} aria-label="Doug March home">
        <img src={logoSvg} alt="" className={logoImg} />
        <span className={siteName}>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}