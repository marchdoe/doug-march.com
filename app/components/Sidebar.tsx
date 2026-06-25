import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <nav
      className={css({
        width: '100%',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 4vw',
        position: 'relative',
        zIndex: 10,
        flexShrink: 0,
      })}
    >
      <Flex align="center" gap="3">
        <a
          href="/"
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'textMuted',
            _hover: { color: 'accent' },
            transition: 'color 0.12s ease',
          })}
        >
          <img
            src={logoSvg}
            alt="Doug March logo"
            className={css({
              width: '20px',
              height: '20px',
              opacity: 0.6,
            })}
          />
          <span
            className={css({
              fontFamily: 'body',
              fontSize: '13px',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'textMuted',
            })}
          >
            D.M.
          </span>
        </a>
      </Flex>

      <Flex align="center" gap="4">
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 4px',
            _hover: { color: 'accent' },
            transition: 'color 0.12s ease',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
          })}
        >
          Work
        </a>
        <span className={css({ color: 'border', fontSize: '13px', userSelect: 'none' })}>·</span>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            textDecoration: 'none',
            padding: '12px 4px',
            _hover: { color: 'accent' },
            transition: 'color 0.12s ease',
            _focus: {
              outline: '2px solid',
              outlineColor: 'accent',
              outlineOffset: '2px',
            },
          })}
        >
          About
        </a>
      </Flex>
    </nav>
  )
}