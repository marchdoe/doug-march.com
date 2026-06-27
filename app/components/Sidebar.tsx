import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <nav
      className={css({
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <div
        className={css({
          height: '40px',
          padding: '0 6vw',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          borderTop: '1px solid',
          borderColor: 'border',
          background: 'bgStrip',
          overflow: 'hidden',
          flexShrink: 0,
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '13px',
            color: 'accent',
            letterSpacing: 'wider',
            whiteSpace: 'nowrap',
          })}
        >
          TIGERS 8–0
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: '11px',
            color: 'accentLight',
            letterSpacing: 'wider',
            whiteSpace: 'nowrap',
          })}
        >
          SCHEFFLER −16
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: '11px',
            color: 'textSecondary',
            letterSpacing: 'wider',
            whiteSpace: 'nowrap',
          })}
        >
          ◉ FULL MOON
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: '11px',
            color: 'textMuted',
            letterSpacing: 'wider',
            whiteSpace: 'nowrap',
            display: { base: 'none', md: 'inline' },
          })}
        >
          T−7 INDEPENDENCE
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontWeight: 'normal',
            fontSize: '10px',
            color: 'textMuted',
            letterSpacing: 'wide',
            whiteSpace: 'nowrap',
            marginLeft: 'auto',
            display: { base: 'none', lg: 'inline' },
          })}
        >
          WET LEG · GBV · TOBIN SPROUT
        </span>
      </div>

      <div
        className={css({
          height: '48px',
          padding: '0 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'border',
          background: 'bgStrip',
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
              textDecoration: 'none!',
              minHeight: '44px',
              minWidth: '44px',
            })}
          >
            <img
              src={logoSvg}
              alt="Doug March logo"
              className={css({ width: '20px', height: '20px' })}
            />
            <span
              className={css({
                fontFamily: 'body',
                fontWeight: 'medium',
                fontSize: '13px',
                color: 'textMuted',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
              })}
            >
              Doug March
            </span>
          </a>
        </Flex>

        <Flex align="center" gap="4">
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontWeight: 'normal',
              fontSize: '13px',
              color: 'textMuted',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              textDecoration: 'none',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              _hover: { color: 'accentLight', textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontWeight: 'normal',
              fontSize: '13px',
              color: 'textMuted',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              textDecoration: 'none',
              minHeight: '44px',
              minWidth: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              _hover: { color: 'accentLight', textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            About
          </a>
        </Flex>
      </div>
    </nav>
  )
}