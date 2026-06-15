import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '88vw',
  maxWidth: '1440px',
  margin: '0 auto',
  background: 'bg',
  borderBottom: '1px solid',
  borderColor: 'border',
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  fontWeight: 'semibold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'text',
  textDecoration: 'none',
  _hover: { color: 'accent' },
  _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: 'medium',
  color: 'textSecondary',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  padding: '12px 0',
  _hover: { color: 'accent' },
  _focusVisible: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <div className={css({ position: 'sticky', top: 0, zIndex: 100, background: 'bg', borderBottom: '1px solid', borderColor: 'border' })}>
      <nav className={navWrap} aria-label="Main navigation">
        <a href="/" className={logoArea} aria-label="Doug March — Home">
          <img src={logoSvg} alt="" className={logoImg} />
          <span className={nameStyle}>Doug March</span>
        </a>
        <div className={navLinks}>
          <a href="/#work" className={linkStyle}>Work</a>
          <a href="/about" className={linkStyle}>About</a>
        </div>
      </nav>
    </div>
  )
}