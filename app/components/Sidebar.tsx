import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw 0 5vw',
  borderBottom: '1px solid',
  borderColor: 'border',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  background: 'rgba(12, 11, 30, 0.88)',
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '22px',
  height: '22px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '14px',
  color: 'text',
  letterSpacing: '0.01em',
})

const rightGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'normal',
  color: 'textMuted',
  textDecoration: 'none',
  opacity: 0.65,
  transition: 'opacity 0.15s ease, color 0.15s ease',
  _hover: {
    opacity: 1,
    color: 'accentLight',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    opacity: 1,
  },
  '&[aria-current="page"]': {
    opacity: 1,
    color: 'text',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <span className={nameStyle}>Doug March</span>
      </div>
      <div className={rightGroup}>
        <a href="/" className={navLink}>Home</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}