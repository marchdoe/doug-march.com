import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <Box
      className={css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: 100,
        padding: '32px 64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 767px)': {
          padding: '20px 24px',
        },
      })}
    >
      <a href="/" aria-label="Home" className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        minHeight: '44px',
        minWidth: '44px',
      })}>
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({
            width: '28px',
            height: '28px',
            '@media (max-width: 767px)': {
              width: '24px',
              height: '24px',
            },
          })}
        />
        <Box
          className={css({
            fontFamily: 'mono',
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'text-muted',
            '@media (max-width: 767px)': {
              display: 'none',
            },
          })}
        >
          Doug March
        </Box>
      </a>
      <Flex
        gap="32px"
        align="center"
        className={css({
          '@media (max-width: 767px)': {
            gap: '20px',
          },
        })}
      >
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            textDecoration: 'none',
            padding: '8px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 180ms ease',
            _hover: { color: 'text-secondary' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'text-muted',
            textDecoration: 'none',
            padding: '8px 4px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 180ms ease',
            _hover: { color: 'text-secondary' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </Flex>
    </Box>
  )
}