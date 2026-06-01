import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
  padding: '0 5vw',
  background: '{colors.stone.900}',
  position: 'relative',
  zIndex: 10,
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

const siteName = css({
  fontFamily: 'display',
  fontSize: '20px',
  letterSpacing: '0.06em',
  color: '{colors.stone.50}',
  lineHeight: 'tight',
  textDecoration: 'none !important',
  '&:hover': {
    color: '{colors.magenta.400} !important',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.stone.400}',
  textDecoration: 'none !important',
  padding: '12px 0',
  transition: 'color 0.1s ease',
  '&:hover': {
    color: '{colors.magenta.400} !important',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '{colors.magenta.400}',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <a href="/" className={siteName}>DOUG MARCH</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}