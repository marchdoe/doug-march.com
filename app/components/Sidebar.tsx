import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 7.5vw',
  background: 'rgba(6, 14, 9, 0.92)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  height: '28px',
  width: '28px',
})

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 700,
  fontSize: '18px',
  color: 'text',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  lineHeight: '1',
})

const rightGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '12px 4px',
  transition: 'color 150ms ease',
  _hover: {
    color: 'text',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <a href="/" className={nameStyle}>Doug March</a>
      </div>
      <div className={rightGroup}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}