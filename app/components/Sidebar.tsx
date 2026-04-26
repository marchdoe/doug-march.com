import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 3xl',
  zIndex: '10',
  '@media (max-width: 767px)': {
    padding: '0 md',
  },
})

const leftGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'sm',
})

const logoStyle = css({
  width: '24px',
  height: '24px',
  opacity: 0.5,
})

const nameStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textNav',
  textDecoration: 'none',
  _hover: { color: 'textSecondary' },
  '@media (max-width: 480px)': {
    display: 'none',
  },
})

const rightGroup = css({
  display: 'flex',
  alignItems: 'center',
  gap: 'lg',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'normal',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'textNav',
  textDecoration: 'none',
  padding: 'xs sm',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  transition: 'color 180ms ease',
  _hover: { color: 'textSecondary' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
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