import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

const logoLinkStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textDecoration: 'none',
  color: 'text',
})

const logoImgStyle = css({
  width: '28px',
  height: '28px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.02em',
  color: 'text',
  textTransform: 'lowercase',
})

const navLinksStyle = css({
  display: 'flex',
  gap: '24px',
  alignItems: 'center',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '11px',
  letterSpacing: '0.10em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '8px 0',
  minHeight: '44px',
  display: 'flex',
  alignItems: 'center',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrapperStyle} aria-label="Main navigation">
      <a href="/" className={logoLinkStyle}>
        <img src={logoSvg} alt="Doug March logo" className={logoImgStyle} />
        <span className={nameStyle}>doug march</span>
      </a>
      <div className={navLinksStyle}>
        <a href="/" className={navLinkStyle}>Work</a>
        <a href="/about" className={navLinkStyle}>About</a>
      </div>
    </nav>
  )
}