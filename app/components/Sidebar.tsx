import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 8vw 0',
        width: '100vw',
        maxWidth: 'none',
        position: 'relative',
        zIndex: 10,
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: '{colors.ink.400}',
          _hover: { color: '{colors.ink.50}' },
          transition: 'color 200ms ease',
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({
            width: '28px',
            height: '28px',
            opacity: 0.6,
          })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: '400',
            letterSpacing: '0.05em',
            textTransform: 'lowercase',
          })}
        >
          doug march
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
          { label: 'work', href: '/' },
          { label: 'about', href: '/about' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              fontWeight: '400',
              letterSpacing: '0.05em',
              textTransform: 'lowercase',
              color: '{colors.ink.500}',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: '{colors.ink.50}' },
              padding: '10px 0',
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