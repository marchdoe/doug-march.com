import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 4vw',
  borderBottom: '1px solid',
  borderColor: 'borderAccent',
  width: '100%',
  flexWrap: 'wrap',
  gap: '8px',
})

const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoStyle = css({
  width: '28px',
  height: '28px',
})

const siteNameStyle = css({
  fontFamily: 'display',
  fontSize: '20px',
  color: 'accent',
  letterSpacing: 'tight',
  lineHeight: 'snug',
  textDecoration: 'none',
  _hover: { opacity: 1 },
})

const datelineStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  color: 'textMuted',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  display: { base: 'none', md: 'block' },
  textAlign: 'center',
  flex: '1',
})

const navAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
})

const moonStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  letterSpacing: 'wide',
  display: { base: 'none', md: 'inline' },
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontSize: '13px',
  color: 'textSecondary',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '12px 4px',
  transition: 'color 0.15s ease',
  _hover: { color: 'accent', opacity: 1 },
  _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
})

export function Sidebar() {
  return (
    <header className={mastheadStyle}>
      <div className={logoAreaStyle}>
        <a href="/" className={css({ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', _hover: { opacity: 1 } })}>
          <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
          <span className={siteNameStyle}>doug-march.com</span>
        </a>
      </div>
      <span className={datelineStyle}>
        Sunday — May 31, 2026 — Last Day of Spring's Final Month
      </span>
      <nav className={navAreaStyle} aria-label="Main navigation">
        <span className={moonStyle}>◉ Full Moon 99.4%</span>
        <a href="/" className={navLinkStyle}>Work</a>
        <a href="/about" className={navLinkStyle}>About</a>
      </nav>
    </header>
  )
}