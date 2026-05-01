import logoSvg from '../assets/logo.svg'
import { css } from '../../styled-system/css'
import { Flex, Box } from '../../styled-system/jsx'

export function Sidebar() {
  return (
    <header
      className={css({
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        background: '{colors.neutral.800}',
        borderBottom: '1px solid {colors.neutral.700}',
      })}
    >
      <Flex
        align="center"
        justify="space-between"
        height="48px"
        px={{ base: '16', md: '32', lg: '48' }}
        maxW="1200px"
        mx="auto"
        width="100%"
      >
        {/* Left: Logo + Name */}
        <Flex align="center" gap="12">
          <a href="/" className={css({ display: 'flex', alignItems: 'center', textDecoration: 'none' })}>
            <img
              src={logoSvg}
              alt="Doug March logo"
              className={css({ height: '24px', width: '24px' })}
            />
          </a>
          <a
            href="/"
            className={css({
              fontFamily: 'heading',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: 'widest',
              color: '{colors.neutral.50}',
              textDecoration: 'none',
              textTransform: 'uppercase',
              _hover: { color: 'white' },
              _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
            })}
          >
            Doug March
          </a>
        </Flex>

        {/* Center: Date */}
        <Box
          display={{ base: 'none', md: 'block' }}
          fontFamily="body"
          fontSize="11px"
          letterSpacing="widest"
          color="{colors.neutral.400}"
        >
          May 1, 2026 — Friday
        </Box>

        {/* Right: Score badge + Nav */}
        <Flex align="center" gap="32">
          {/* Tigers score */}
          <Flex
            align="center"
            gap="8"
            display={{ base: 'none', lg: 'flex' }}
          >
            <Box
              width="6px"
              height="6px"
              borderRadius="50%"
              background="{colors.accent.DEFAULT}"
              flexShrink={0}
            />
            <Box
              fontFamily="body"
              fontSize="11px"
              letterSpacing="widest"
              color="{colors.neutral.200}"
            >
              DET 5–2
            </Box>
          </Flex>

          {/* Nav links */}
          <Flex
            as="nav"
            gap="24"
            align="center"
          >
            <a
              href="/"
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: '{colors.neutral.200}',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                _hover: { color: '{colors.neutral.50}' },
                _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
              })}
            >
              Work
            </a>
            <a
              href="/about"
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                letterSpacing: 'wider',
                color: '{colors.neutral.200}',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                _hover: { color: '{colors.neutral.50}' },
                _focus: { outline: '2px solid {colors.accent.DEFAULT}', outlineOffset: '2px' },
              })}
            >
              About
            </a>
          </Flex>
        </Flex>
      </Flex>
    </header>
  )
}