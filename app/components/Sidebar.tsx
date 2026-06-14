import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6vw',
        background: 'rgba(13, 21, 9, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'border',
        zIndex: 100,
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          _hover: { textDecoration: 'none' },
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '28px', height: '28px' })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '14px',
            color: 'accent',
            letterSpacing: '0.02em',
          })}
        >
          DM
        </span>
      </a>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        })}
      >
        {[
          { label: 'WORK', href: '/#work' },
          { label: 'ABOUT', href: '/about' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              color: 'textSecondary',
              letterSpacing: '0.14em',
              textDecoration: 'none',
              padding: '12px 0',
              transition: 'color 120ms ease-out',
              _hover: {
                color: 'text',
                textDecoration: 'none',
              },
              _focus: {
                outline: '2px solid',
                outlineColor: 'accent',
                outlineOffset: '4px',
              },
            })}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}