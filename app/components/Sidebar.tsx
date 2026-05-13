import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '6',
  borderBottom: '1px solid',
  borderColor: 'border',
  marginBottom: '7',
})

const logoArea = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
})

const logoImg = css({
  width: '28px',
  height: '28px',
})

const siteName = css({
  fontFamily: 'body',
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'text',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
})

const navLinks = css({
  display: 'flex',
  gap: '6',
  alignItems: 'center',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'opacity 150ms ease',
  padding: '2',
  _hover: {
    opacity: 1,
    color: 'text',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Site navigation">
      <div className={logoArea}>
        <img src={logoSvg} alt="Doug March logo" className={logoImg} />
        <span className={siteName}>Doug March</span>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}