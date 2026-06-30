import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 6vw',
        zIndex: '10',
      })}
    >
      <a
        href="/"
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
          color: 'textInverse',
          _focus: {
            outline: '2px solid {colors.forest.900}',
            outlineOffset: '4px',
            borderRadius: 'sm',
          },
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({
            width: '32px',
            height: '32px',
          })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '0.9375rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          })}
        >
          Doug March
        </span>
      </a>
      <div
        className={css({
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            fontWeight: 'medium',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textInverse',
            opacity: '0.8',
            textDecoration: 'none',
            padding: '8px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.2s ease',
            _hover: {
              opacity: '1',
              textDecoration: 'none',
            },
            _focus: {
              outline: '2px solid {colors.forest.900}',
              outlineOffset: '4px',
              borderRadius: 'sm',
            },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '0.8125rem',
            fontWeight: 'medium',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'textInverse',
            opacity: '0.8',
            textDecoration: 'none',
            padding: '8px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.2s ease',
            _hover: {
              opacity: '1',
              textDecoration: 'none',
            },
            _focus: {
              outline: '2px solid {colors.forest.900}',
              outlineOffset: '4px',
              borderRadius: 'sm',
            },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}