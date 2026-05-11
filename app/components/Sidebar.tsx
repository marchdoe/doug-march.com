import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '100',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '52px',
  padding: '0 6vw',
  background: 'transparent',
  '@media (prefers-reduced-motion: reduce)': {
    '& a': { transition: 'none' },
  },
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const wordmark = css({
  fontFamily: 'body',
  fontWeight: '500',
  fontSize: '14px',
  color: '{colors.neutral.300}',
  letterSpacing: '0.02em',
  textDecoration: 'none',
  _hover: { color: 'accent' },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: '400',
  fontSize: '13px',
  color: '{colors.neutral.400}',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '10px 4px',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent' },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={logoArea} style={{ textDecoration: 'none' }}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={wordmark}>doug march</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}