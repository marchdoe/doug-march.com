import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

const navLink = css({
  fontFamily: 'body',
  fontWeight: '400',
  color: 'text.muted',
  textDecoration: 'none',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  transition: 'color 200ms ease',
  _hover: {
    color: 'accent',
    textDecoration: 'none',
  },
})

export function Sidebar() {
  return (
    <header
      className={css({
        position: 'sticky',
        top: '0',
        zIndex: '100',
        width: '100%',
        background: 'bg.nav',
        borderBottom: '1px solid',
        borderColor: 'border',
      })}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 48px',
          height: '48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        {/* Left: Logo + Name */}
        <a
          href="/"
          className={css({
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            _hover: { textDecoration: 'none' },
          })}
          style={{ gap: '10px' }}
        >
          <img src={logoSvg} alt="" style={{ height: '20px', width: 'auto' }} />
          <span
            className={css({
              fontFamily: 'heading',
              fontWeight: '700',
              color: 'text',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
            })}
            style={{ fontSize: '13px' }}
          >
            Doug March
          </span>
        </a>

        {/* Center: Masters badge */}
        <span
          className={css({
            fontFamily: 'mono',
            color: 'link',
            letterSpacing: 'wider',
            display: 'flex',
            alignItems: 'center',
          })}
          style={{
            fontSize: '11px',
            padding: '0 12px',
            height: '28px',
            borderLeft: '1px solid #C8D1C2',
            borderRight: '1px solid #C8D1C2',
          }}
        >
          McIlroy &nbsp;−12 &nbsp;✓
        </span>

        {/* Right: Nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '32px',
          }}
        >
          <a href="/" className={navLink} style={{ fontSize: '12px' }}>
            Home
          </a>
          <a href="/about" className={navLink} style={{ fontSize: '12px' }}>
            About
          </a>
        </div>
      </div>
    </header>
  )
}