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
  background: 'bg',
  borderBottom: '1px solid',
  borderColor: 'border',
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
  },
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

const siteNameStyle = css({
  fontFamily: 'display',
  fontSize: '18px',
  fontWeight: 'bold',
  letterSpacing: '0.05em',
  color: 'text',
  textDecoration: 'none',
  lineHeight: '1',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  padding: '12px 0',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: { color: 'accent' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={leftGroup}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <a href="/" className={siteNameStyle}>DOUG MARCH</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}