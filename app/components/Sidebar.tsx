import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  width: '100%',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
  backdropFilter: 'blur(12px)',
  background: 'rgba(15, 3, 8, 0.9)',
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const logoImg = css({
  width: '22px',
  height: '22px',
})

const siteName = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '14px',
  color: 'text',
  letterSpacing: 'normal',
  textDecoration: 'none',
  '&:hover': { color: 'accent' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
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
  fontWeight: 'medium',
  fontSize: '13px',
  color: 'textMuted',
  textDecoration: 'none',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  transition: 'color 150ms ease',
  padding: '12px 0',
  '&:hover': { color: 'accent' },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={logoArea} aria-label="Doug March — Home">
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