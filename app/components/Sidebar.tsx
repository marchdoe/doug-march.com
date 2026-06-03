import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 5vw',
  zIndex: 100,
  transition: 'background 0.3s ease, border-color 0.3s ease',
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImg = css({
  width: '20px',
  height: '20px',
})

const siteName = css({
  fontFamily: 'display',
  fontSize: '14px',
  letterSpacing: '0.20em',
  color: 'textMuted',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  textDecoration: 'none',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: {
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={logoArea}>
        <a href="/" className={siteName} aria-label="Doug March home">
          <img src={logoSvg} alt="" className={logoImg} />
        </a>
        <a href="/" className={siteName}>
          Doug March
        </a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}