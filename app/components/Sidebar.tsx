import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

const navWrap = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  background: 'transparent',
  transition: 'background 300ms ease, backdrop-filter 300ms ease',
  '@supports (backdrop-filter: blur(12px))': {
    _hover: {},
  },
})

const logoLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'text',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const logoText = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.06em',
  color: 'textSecondary',
  textTransform: 'uppercase',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '13px',
  letterSpacing: '0.06em',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 200ms ease',
  padding: '12px 0',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px', borderRadius: 'sm' },
})

export function Sidebar() {
  return (
    <nav className={navWrap} style={{ background: 'rgba(7,7,26,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <a href="/" className={logoLink}>
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