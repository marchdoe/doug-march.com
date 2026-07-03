import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  position: 'absolute',
  top: '0',
  right: '0',
  padding: '20px 8vw',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  zIndex: '10',
})

const nameStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text.secondary',
  letterSpacing: '0.05em',
  lineHeight: '1.1',
  textTransform: 'uppercase',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
  display: 'block',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  color: 'text.muted',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'color 200ms ease',
  lineHeight: '1.1',
  padding: '10px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
    opacity: '1',
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
      <a href="/" className={css({ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', _hover: { textDecoration: 'none', opacity: '1' } })}>
        <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        <span className={nameStyle}>Doug March</span>
      </a>
      <a href="/" className={linkStyle}>Work</a>
      <a href="/about" className={linkStyle}>About</a>
    </nav>
  )
}