import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '12',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const navLinks = css({
  display: 'flex',
  gap: '6',
  alignItems: 'center',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'medium',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '2',
  transition: 'color 0.2s ease',
  _hover: {
    color: 'text',
  },
  _focusVisible: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} role="navigation" aria-label="Main navigation">
      <a href="/" className={css({ display: 'flex', alignItems: 'center', gap: '2', textDecoration: 'none' })}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
      </a>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}