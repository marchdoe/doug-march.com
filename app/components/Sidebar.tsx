import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <nav
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '56px',
        borderBottom: '1px solid',
        borderColor: 'borderOnDark',
        width: '100%',
      })}
    >
      <Flex alignItems="center" gap="3">
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '24px', height: '24px' })}
        />
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            color: 'textMutedOnDark',
            textTransform: 'uppercase',
            textDecoration: 'none',
            _hover: { color: 'textOnDark' },
          })}
        >
          Doug March
        </a>
      </Flex>
      <Flex gap="8" alignItems="center">
        <a
          href="/"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontWeight: 'normal',
            letterSpacing: 'wider',
            color: 'textMutedOnDark',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '2',
            _hover: { color: 'textOnDark', textDecoration: 'none' },
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
            fontWeight: 'normal',
            letterSpacing: 'wider',
            color: 'textMutedOnDark',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '2',
            _hover: { color: 'textOnDark', textDecoration: 'none' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </Flex>
    </nav>
  )
}