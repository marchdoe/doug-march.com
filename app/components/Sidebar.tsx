import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navWrap = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '48px',
  padding: '0',
})

const leftCluster = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const nameStyle = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'text',
  textDecoration: 'none',
  _hover: { opacity: 1 },
})

const navLinks = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLink = css({
  fontFamily: 'body',
  fontSize: '0.75rem',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  _hover: { color: 'text', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
  padding: '12px 0',
  minHeight: '44px',
  display: 'inline-flex',
  alignItems: 'center',
})

export function Sidebar() {
  return (
    <nav className={navWrap} aria-label="Main navigation">
      <div className={leftCluster}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="" className={logoStyle} />
        </a>
        <a href="/" className={nameStyle}>Doug March</a>
      </div>
      <div className={navLinks}>
        <a href="/" className={navLink}>Work</a>
        <a href="/about" className={navLink}>About</a>
      </div>
    </nav>
  )
}