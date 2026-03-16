import React from 'react'
import { Box, Flex, VStack } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
]

const nameStyles = css({
  fontFamily: 'serif',
  fontSize: 'md',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  lineHeight: 'snug',
  color: 'text',
})

const roleStyles = css({
  fontFamily: 'mono',
  fontSize: '2xs',
  fontWeight: 'regular',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'text.mid',
  lineHeight: 'normal',
  marginTop: '1',
})

const navLinkStyles = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  fontWeight: 'medium',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'text.mid',
  display: 'block',
  paddingY: '2',
  paddingX: '3',
  borderRadius: '2px',
  transition: 'color 0.12s ease, background 0.12s ease',
  outline: 'none',
  _hover: {
    color: 'accent',
    bg: 'accent.glow',
  },
  _focus: {
    color: 'accent',
    bg: 'accent.glow',
    boxShadow: '0 0 0 2px token(colors.border.accent)',
  },
  _focusVisible: {
    color: 'accent',
    bg: 'accent.glow',
    boxShadow: '0 0 0 2px token(colors.border.accent)',
  },
})

const activeLinkStyles = css({
  color: 'accent',
  bg: 'accent.glow',
  fontWeight: 'bold',
})

const dividerStyles = css({
  width: '100%',
  height: '1px',
  bg: 'border',
  my: '5',
})

export function Sidebar() {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  return (
    <Box
      as="nav"
      aria-label="Site navigation"
      px="5"
      pt={{ base: '5', lg: '8' }}
      pb={{ base: '5', lg: '0' }}
      height={{ base: 'auto', lg: '100%' }}
    >
      {/* Identity block */}
      <Box mb={{ base: '0', lg: '0' }}>
        <a href="/" className={css({ display: 'block' })} aria-label="Doug March — home">
          <Box
            className={css({
              display: 'inline-block',
              borderLeftWidth: '2px',
              borderStyle: 'solid',
              borderColor: 'border.accent',
              paddingLeft: '3',
              paddingY: '1',
            })}
          >
            <Box className={nameStyles}>Doug March</Box>
            <Box className={roleStyles}>Product Designer<br />& Developer</Box>
          </Box>
        </a>
      </Box>

      <Box className={dividerStyles} />

      {/* Nav links */}
      <Flex
        as="ul"
        flexDirection={{ base: 'row', lg: 'column' }}
        gap={{ base: '1', lg: '1' }}
        flexWrap="wrap"
        style={{ listStyle: 'none', margin: 0, padding: 0 }}
      >
        {navLinks.map(({ label, href }) => {
          const isActive = currentPath === href
          return (
            <Box as="li" key={href}>
              <a
                href={href}
                className={`${navLinkStyles}${isActive ? ` ${activeLinkStyles}` : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </a>
            </Box>
          )
        })}
      </Flex>

      {/* New moon negative space — let emptiness breathe on desktop */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        mt="10"
        px="3"
      >
        <Box
          className={css({
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'border',
            opacity: '0.35',
          })}
          title="New moon — 1.2% illumination"
          aria-hidden="true"
        />
      </Box>
    </Box>
  )
}