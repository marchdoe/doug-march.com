import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navStyles = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '60px',
  padding: '0 6vw',
  position: 'relative',
  zIndex: 10,
})

const logoLinkStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  textDecoration: 'none',
  color: 'textMuted',
  _hover: { color: 'text' },
  transition: 'color 0.15s ease',
})

const logoImgStyles = css({
  width: '28px',
  height: '28px',
})

const siteNameStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  fontFamily: 'body',
})

const navLinksStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const navLinkStyles = css({
  fontSize: '0.875rem',
  fontWeight: '500',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  padding: '10px 0',
  _hover: { color: 'text' },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
})

export function Sidebar() {
  return (
    <nav className={navStyles} aria-label="Main navigation">
      <a href="/" className={logoLinkStyles}>
        <img src={logoSvg} alt="Doug March logo" className={logoImgStyles} />
        <span className={siteNameStyles}>Doug March</span>
      </a>
      <div className={navLinksStyles}>
        <a href="/" className={navLinkStyles}>Work</a>
        <a href="/about" className={navLinkStyles}>About</a>
      </div>
    </nav>
  )
}