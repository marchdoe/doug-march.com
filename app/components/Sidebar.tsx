import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import logoSvg from '../assets/logo.svg'

export function Sidebar() {
  return (
    <Box
      position="sticky"
      top="0"
      zIndex={100}
      width="100%"
      height="56px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={css({
        backgroundColor: 'rgba(242, 243, 238, 0.96)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        '@media (prefers-reduced-motion: reduce)': {
          backdropFilter: 'none',
        },
      })}
    >
      <Flex
        width="100%"
        maxWidth="1040px"
        px="32"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap="12">
          <a href="/" aria-label="Home" className={css({ display: 'flex', alignItems: 'center' })}>
            <img src={logoSvg} alt="" width="28" height="28" />
          </a>
          <a
            href="/"
            className={css({
              fontSize: '0.75rem',
              fontFamily: 'body',
              fontWeight: 'medium',
              letterSpacing: '0.08em',
              color: '{colors.neutral.700}',
              textDecoration: 'none',
              _hover: { color: '{colors.celadon.default}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            DOUG MARCH
          </a>
        </Flex>
        <Flex gap="24" alignItems="center">
          <a
            href="/"
            className={css({
              fontSize: '0.75rem',
              fontFamily: 'body',
              fontWeight: 'medium',
              letterSpacing: '0.08em',
              color: '{colors.neutral.500}',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: '{colors.celadon.default}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            WORK
          </a>
          <a
            href="/about"
            className={css({
              fontSize: '0.75rem',
              fontFamily: 'body',
              fontWeight: 'medium',
              letterSpacing: '0.08em',
              color: '{colors.neutral.500}',
              textDecoration: 'none',
              padding: '8px 4px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              _hover: { color: '{colors.celadon.default}' },
              _focus: { outline: '2px solid {colors.celadon.default}', outlineOffset: '2px', borderRadius: 'xs' },
            })}
          >
            ABOUT
          </a>
        </Flex>
      </Flex>
    </Box>
  )
}