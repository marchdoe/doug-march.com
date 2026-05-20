import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  position: 'relative',
  zIndex: 10,
})

const logoStyle = css({
  width: '28px',
  height: '28px',
  display: 'block',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '{colors.cream.100}',
  textDecoration: 'none',
  lineHeight: 'snug',
  padding: '10px 2px',
  display: 'inline-block',
  transition: 'color 150ms ease',
  _hover: {
    color: '{colors.lime.400}',
    textDecoration: 'none',
  },
  _focus: {
    outline: '2px solid {colors.lime.400}',
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
})

const sep = css({
  color: '{colors.neutral.500}',
  fontSize: '13px',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" aria-label="Home">
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
      </a>
      <span className={sep}>·</span>
      <a href="/" className={navLink}>Work</a>
      <span className={sep}>·</span>
      <a href="/about" className={navLink}>About</a>
    </nav>
  )
}