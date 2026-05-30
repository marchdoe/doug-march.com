import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 6vw',
  height: '56px',
  borderBottom: '1px solid',
  borderColor: 'border',
  position: 'sticky',
  top: '0',
  background: 'bg',
  zIndex: 10,
})

const leftStyle = css({
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
  fontSize: '14px',
  fontWeight: 'normal',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textSecondary',
  textDecoration: 'none',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
  },
})

const linksStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const linkStyle = css({
  fontFamily: 'body',
  fontSize: '14px',
  fontWeight: 'normal',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'textMuted',
  textDecoration: 'none',
  padding: '12px 0',
  _hover: {
    color: 'accent',
    textDecoration: 'underline',
  },
  _focus: {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '2px',
  },
})

export function Sidebar() {
  return (
    <nav className={navStyle} aria-label="Main navigation">
      <div className={leftStyle}>
        <a href="/" aria-label="Home">
          <img src={logoSvg} alt="" className={logoStyle} />
        </a>
        <a href="/" className={nameStyle}>Doug March</a>
      </div>
      <div className={linksStyle}>
        <a href="/" className={linkStyle}>Work</a>
        <a href="/about" className={linkStyle}>About</a>
      </div>
    </nav>
  )
}