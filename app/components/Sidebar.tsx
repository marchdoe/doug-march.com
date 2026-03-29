import { css } from '../../styled-system/css'

const navLink = css({
  textDecoration: 'none',
  fontSize: 'xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  fontFamily: 'body',
  fontWeight: '400',
  textTransform: 'uppercase',
  transition: 'color 200ms ease',
  _hover: {
    color: 'text-primary',
    textDecoration: 'none',
  },
})

const dot = css({
  fontFamily: 'body',
  fontSize: 'xs',
  color: 'text-muted',
  letterSpacing: 'widest',
  userSelect: 'none',
})

export function Sidebar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '40px',
        left: '48px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <a href="/" className={navLink}>work</a>
      <span className={dot}>·</span>
      <a href="/about" className={navLink}>about</a>
      <span className={dot}>·</span>
      <a href="mailto:doug@doug-march.com" className={navLink}>contact</a>
    </div>
  )
}