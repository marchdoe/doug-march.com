import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '64px',
  padding: '0 6vw',
  borderBottom: '1px solid',
  borderColor: 'border',
  background: 'bg',
  position: 'relative',
  zIndex: 10,
})

const logoAreaClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
})

const logoClass = css({
  width: '28px',
  height: '28px',
})

const nameClass = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '400',
  letterSpacing: '0.1em',
  color: 'textMuted',
  textTransform: 'uppercase',
})

const linksClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
})

const linkClass = css({
  fontFamily: 'body',
  fontSize: '13px',
  fontWeight: '400',
  letterSpacing: '0.1em',
  color: 'textDim',
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color 150ms ease',
  padding: '10px 0',
  _hover: {
    color: 'text',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'accent',
    outlineOffset: '4px',
  },
})

export function Sidebar() {
  return (
    <nav className={navClass} aria-label="Main navigation">
      <div className={logoAreaClass}>
        <img src={logoSvg} alt="Doug March logo" className={logoClass} />
        <span className={nameClass}>Doug March</span>
      </div>
      <div className={linksClass}>
        <a href="/" className={linkClass}>Work</a>
        <a href="/about" className={linkClass}>About</a>
      </div>
    </nav>
  )
}