import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        paddingLeft: '6vw',
        paddingRight: '6vw',
        width: '100%',
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
          color: 'textSubtle',
          _hover: { color: 'accent' },
          transition: 'color 150ms ease',
        })}
      >
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({
            width: '28px',
            height: '28px',
          })}
        />
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 'normal',
          })}
        >
          Doug March
        </span>
      </a>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            transition: 'color 150ms ease',
            padding: '12px 0',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'textSubtle',
            textDecoration: 'none',
            _hover: { color: 'accent' },
            transition: 'color 150ms ease',
            padding: '12px 0',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '4px',
            },
          })}
        >
          About
        </a>
      </div>
    </nav>
  )
}