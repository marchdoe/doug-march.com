import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <header
      className={css({
        width: '100%',
        height: { base: 'auto', md: '64px' },
        borderBottom: '1px solid',
        borderColor: 'border',
        bg: 'bg',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: { base: 'column', md: 'row' },
        alignItems: { base: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        px: { base: 'md', md: '2xl' },
        py: { base: 'sm', md: '0' },
        gap: { base: 'xs', md: '0' },
      })}
    >
      <Flex align="center" gap="sm" flexShrink={0}>
        <a href="/" aria-label="Home" className={css({ display: 'flex', alignItems: 'center' })}>
          <img
            src={logoSvg}
            alt="Doug March logo"
            className={css({ width: '28px', height: '28px' })}
          />
        </a>
        <Box>
          <Box
            fontSize="12px"
            letterSpacing="widest"
            color="text-secondary"
            fontFamily="body"
            fontWeight="medium"
            lineHeight="tight"
          >
            DOUG MARCH
          </Box>
          <Box
            fontSize="9px"
            letterSpacing="widest"
            color="text-muted"
            fontFamily="body"
            lineHeight="snug"
          >
            DESIGNER · DEVELOPER
          </Box>
        </Box>
      </Flex>

      <Flex
        as="nav"
        gap="lg"
        align="center"
        className={css({
          '& a': {
            fontSize: '12px',
            letterSpacing: 'wider',
            color: 'text-secondary',
            fontFamily: 'body',
            textDecoration: 'none',
            padding: 'sm',
            minHeight: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            _hover: {
              textDecoration: 'underline',
              textDecorationColor: 'accent',
              textUnderlineOffset: '4px',
              color: 'accent-light',
            },
            _focus: {
              outline: '1.5px solid',
              outlineColor: 'accent',
              outlineOffset: '3px',
            },
          },
        })}
      >
        <a href="/">Work</a>
        <a href="/about">About</a>
      </Flex>

      <Box
        display={{ base: 'none', lg: 'flex' }}
        alignItems="center"
        gap="lg"
        flexShrink={0}
      >
        <Box fontSize="9px" letterSpacing="widest" color="text-muted" fontFamily="body">
          ◉ FULL MOON · 96.5%
        </Box>
        <Box fontSize="9px" letterSpacing="widest" color="text-muted" fontFamily="body">
          APR 29 2026
        </Box>
      </Box>
    </header>
  )
}