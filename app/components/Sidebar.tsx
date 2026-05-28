import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  zIndex: 10,
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
  fontFamily: 'display',
  fontWeight: 'semibold',
  fontSize: '18px',
  color: '{colors.stone.50}',
  letterSpacing: 'normal',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: '{colors.stone.400}',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  _hover: {
    color: '{colors.seafoam.400}',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: '{colors.seafoam.400}',
    outlineOffset: '4px',
    borderRadius: 'sm',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={logoArea} aria-label="Doug March home">
        <img src={logoSvg} alt="" className={logoImg} />
        <span className={logoText}>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}