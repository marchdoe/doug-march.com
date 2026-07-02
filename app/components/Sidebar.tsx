import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const mastheadStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '14px 0',
  borderBottom: '1px solid',
  borderColor: 'border',
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

const nameStyle = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'clamp(1rem, 2vw, 1.4rem)',
  color: 'text',
  letterSpacing: '-0.02em',
  lineHeight: '1',
  textDecoration: 'none !important',
})

const navStyle = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '24px',
  flexWrap: 'wrap',
})

const navLinkStyle = css({
  fontFamily: 'body',
  fontSize: '12px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  transition: 'color 120ms ease',
  padding: '4px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

const countdownStyle = css({
  fontFamily: 'body',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'accent',
  whiteSpace: 'nowrap',
})

export function Sidebar() {
  return (
    <header className={mastheadStyle}>
      <div className={logoAreaStyle}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="Doug March logo" className={logoStyle} />
        </a>
        <a href="/" className={nameStyle}>
          DOUG MARCH
        </a>
      </div>
      <nav className={navStyle}>
        <a href="/" className={navLinkStyle}>Work</a>
        <a href="/about" className={navLinkStyle}>About</a>
        <span className={countdownStyle}>T–2: Independence Day</span>
      </nav>
    </header>
  )
}