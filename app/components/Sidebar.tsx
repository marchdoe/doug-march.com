import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '64px',
  background: 'bg',
  borderBottom: '1px solid',
  borderColor: 'border',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  zIndex: 100,
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
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

const logotype = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '15px',
  color: 'text',
  letterSpacing: 'normal',
  textDecoration: 'none',
  lineHeight: '1',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'normal',
  color: 'textMuted',
  letterSpacing: 'wide',
  textDecoration: 'none',
  padding: '10px 4px',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 150ms ease',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    textDecorationColor: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: 'sm',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <a href="/" className={logoArea} aria-label="Doug March home">
        <img src={logoSvg} alt="" className={logoImg} />
        <span className={logotype}>doug march</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>work</a>
        <a href="/about" className={navLink}>about</a>
      </div>
    </nav>
  )
}