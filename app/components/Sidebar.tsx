import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navStripStyle = css({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  height: '48px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 6vw',
  zIndex: 100,
  mixBlendMode: 'multiply',
})

const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '24px',
  height: '24px',
})

const logotypeStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.7rem, 1vw, 0.75rem)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.parchment.600}',
  textDecoration: 'none',
  lineHeight: '1',
})

const navLinksStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontSize: 'clamp(0.7rem, 1vw, 0.75rem)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '{colors.indigo.700}',
  textDecoration: 'none',
  padding: '12px 0',
  transition: 'color 0.2s ease',
  _hover: {
    color: '{colors.indigo.900}',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid {colors.gold.400}',
    outlineOffset: '4px',
  },
})

const separatorStyle = css({
  color: '{colors.parchment.400}',
  fontSize: '0.75rem',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <nav className={navStripStyle} role="navigation" aria-label="Main navigation">
      <a href="/" className={logoAreaStyle} aria-label="Doug March — Home">
        <img src={logoSvg} alt="" className={logoStyle} />
        <span className={logotypeStyle}>Doug March</span>
      </a>
      <div className={navLinksStyle}>
        <a href="/" className={navLinkStyle}>Work</a>
        <span className={separatorStyle} aria-hidden="true">·</span>
        <a href="/about" className={navLinkStyle}>About</a>
      </div>
    </nav>
  )
}