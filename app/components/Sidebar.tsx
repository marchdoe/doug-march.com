import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '48px',
        padding: '0 5vw',
        borderBottom: '1px solid',
        borderColor: 'border',
        position: 'relative',
        zIndex: 10,
      })}
      aria-label="Main navigation"
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        })}
      >
        <a
          href="/"
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            minHeight: '44px',
            minWidth: '44px',
          })}
          aria-label="Doug March home"
        >
          <img
            src={logoSvg}
            alt=""
            className={css({ width: '20px', height: '20px' })}
          />
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '12px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.15em',
              color: 'accent',
              fontWeight: 'medium',
            })}
          >
            doug-march
          </span>
        </a>
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginLeft: '8px',
          })}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.12em',
              color: 'textMuted',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              _hover: { color: 'accentLight' },
              transition: 'color 200ms ease',
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontVariant: 'all-small-caps',
              letterSpacing: '0.12em',
              color: 'textMuted',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 4px',
              _hover: { color: 'accentLight' },
              transition: 'color 200ms ease',
            })}
          >
            About
          </a>
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'mono',
          fontSize: '11px',
          color: 'textMuted',
        })}
      >
        <span
          className={css({
            display: { base: 'none', md: 'inline' },
          })}
        >
          2026·06·18
        </span>
        <span>🌒</span>
        <span
          className={css({
            display: { base: 'none', sm: 'inline' },
          })}
        >
          16.8%
        </span>
      </div>
    </nav>
  )
}