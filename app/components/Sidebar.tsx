import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadStyle = css({
  width: '100%',
  height: '56px',
  padding: '0 6vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '2px solid token(colors.chartreuse.400)',
  background: 'bg',
  position: 'relative',
  zIndex: 10,
})

const logoAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoImgStyle = css({
  height: '28px',
  width: 'auto',
})

const siteNameStyle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: '13px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'text',
})

const datelineStyle = css({
  fontFamily: 'mono',
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'textMuted',
  display: { base: 'none', md: 'block' },
})

const navAreaStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontWeight: 'medium',
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  padding: '12px 0',
  _hover: {
    color: 'accent',
  },
  _focus: {
    outline: '2px solid token(colors.chartreuse.400)',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase()

  return (
    <header className={mastheadStyle}>
      <div className={logoAreaStyle}>
        <img src={logoSvg} alt="Doug March logo" className={logoImgStyle} />
        <span className={siteNameStyle}>Doug March</span>
        <span className={datelineStyle}>{dateStr}</span>
      </div>
      <nav className={navAreaStyle}>
        <a href="/" className={navLinkStyle}>Work</a>
        <a href="/about" className={navLinkStyle}>About</a>
      </nav>
    </header>
  )
}