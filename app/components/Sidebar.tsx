import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '100',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 36, 114, 0.10)',
        background: 'rgba(12, 6, 16, 0.85)',
        backdropFilter: 'blur(8px)',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'accent',
          _focus: {
            outline: '2px solid',
            outlineColor: 'accent',
            outlineOffset: '4px',
          },
        })}
        aria-label="Doug March — Home"
      >
        <img
          src={logoSvg}
          alt=""
          className={css({
            width: '28px',
            height: '28px',
          })}
        />
        <span
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: '14px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
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
          { label: 'Work', href: '/' },
          { label: 'About', href: '/about' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              fontWeight: 'normal',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
              textDecoration: 'none',
              padding: '12px 0',
              transition: 'color 0.2s ease',
              _hover: { color: 'accent' },
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