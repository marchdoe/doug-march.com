import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '24',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const nameLink = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  color: 'text',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
  _hover: { textDecoration: 'none', color: 'accent' },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24',
})

const navLink = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '0.875rem',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'accent', textDecoration: 'none' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'sm' },
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={css({ display: 'flex', alignItems: 'center', gap: '12' })}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        </a>
        <a href="/" className={nameLink}>doug march</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}