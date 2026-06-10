import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6',
  paddingTop: 'clamp(16px, 2vw, 32px)',
  paddingBottom: '4',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
  marginRight: '2',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.15s ease',
  padding: '12px 0',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <a href="/" aria-label="Home">
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
      </a>
      <a href="/" className={navLink}>Work</a>
      <a href="/about" className={navLink}>About</a>
      <a href="/about#timeline" className={navLink}>Timeline</a>
      <a href="/archive" className={navLink}>Archive</a>
    </nav>
  )
}