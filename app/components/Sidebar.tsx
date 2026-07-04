import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderBottom: '1px solid',
  borderColor: 'border',
  background: 'bgSubtle',
  borderRadius: 'md',
  gap: '8px',
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
})

const logoImg = css({
  width: '24px',
  height: '24px',
})

const siteName = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: '0.9375rem',
  color: 'text',
  lineHeight: '1',
  textDecoration: 'none',
})

const navLinks = css({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'semibold',
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'textSecondary',
  textDecoration: 'none',
  position: 'relative',
  padding: '4px 0',
  transition: 'color 200ms ease',
  _hover: {
    color: 'accentLight',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '0%',
    height: '2px',
    background: 'accent',
    transition: 'width 200ms ease',
  },
  '&:hover::after': {
    width: '100%',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
    borderRadius: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Site navigation">
      <div className={logoArea}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        </a>
        <a href="/" className={siteName}>Doug March</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}