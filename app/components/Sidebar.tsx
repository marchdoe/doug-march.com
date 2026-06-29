import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '48px',
  paddingBottom: '5',
  borderBottom: '1px solid',
  borderColor: 'borderSubtle',
  marginBottom: '5',
})

const wordmark = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  textDecoration: 'none',
  color: 'accent',
  fontFamily: 'body',
  fontSize: '0.875rem',
  fontWeight: 'semibold',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const logoImg = css({
  width: '24px',
  height: '24px',
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '2',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'color 0.12s ease',
  _hover: { color: 'accentLight' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" className={wordmark}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span>Doug March</span>
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}