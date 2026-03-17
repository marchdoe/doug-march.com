import type { ReactNode } from 'react'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box className="dark" minHeight="100vh" background="bg">

      {/* ── MASTHEAD ──────────────────────────────────────────────
          Pinned top bar. 56px tall. 2px emerald accent at crown —
          the St. Patrick's Day acknowledgment. No shamrocks.
          Left: name in Fraunces + role in Outfit.
          Right: 4 nav links, uppercase, widest tracking.
      ─────────────────────────────────────────────────────────── */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="50"
        height="56px"
        background="bgSidebar"
        borderTopWidth="2px"
        borderTopStyle="solid"
        borderTopColor="accent"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="borderCard"
      >
        <Flex
          maxWidth="1100px"
          marginInline="auto"
          paddingInline="5"
          height="100%"
          align="center"
          justify="space-between"
        >
          {/* Identity */}
          <a href="/" className={css({ textDecoration: 'none' })}>
            <Flex align="baseline" gap="2">
              <Box
                as="span"
                fontFamily="heading"
                fontSize="base"
                fontWeight="regular"
                color="text"
                letterSpacing="tight"
              >
                Doug March
              </Box>
              <Box
                as="span"
                fontFamily="body"
                fontSize="xs"
                fontWeight="light"
                color="textSecondary"
                letterSpacing="wider"
                textTransform="uppercase"
                display={{ base: 'none', sm: 'inline' }}
              >
                Designer &amp; Developer
              </Box>
            </Flex>
          </a>

          {/* Nav links */}
          <Flex as="nav" gap="5" align="center">
            {([
              { label: 'Work',   href: '/' },
              { label: 'About',  href: '/about' },
              { label: 'GitHub', href: 'https://github.com/dougmarch' },
              { label: 'Email',  href: 'mailto:doug@doug-march.com' },
            ] as const).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={css({
                  fontFamily: 'body',
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  letterSpacing: 'widest',
                  textTransform: 'uppercase',
                  color: 'textSecondary',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  _hover: { color: 'accent' },
                })}
              >
                {label}
              </a>
            ))}
          </Flex>
        </Flex>
      </Box>

      {/* ── FROST LINE ────────────────────────────────────────────
          1px separator below masthead. rgba(28,155,104,0.24).
          A shamrock under ice. The holiday's one moment of
          visible identity. Does not announce itself.
      ─────────────────────────────────────────────────────────── */}
      <Box height="1px" background="borderFrost" />

      {/* ── PAGE BODY ─────────────────────────────────────────────
          Magazine structure: 8-col main + 4-col sidebar.
          Max width 1100px, centered, 24px gutters.
          Sidebar is sticky below the 57px masthead+frostline.
          On mobile: single column, sidebar stacks below main.
      ─────────────────────────────────────────────────────────── */}
      <Box
        maxWidth="1100px"
        marginInline="auto"
        paddingInline="5"
        paddingTop="8"
        paddingBottom="12"
      >
        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: 'minmax(0, 695px) 357px' }}
          gap="6"
          alignItems="start"
        >
          {/* Main content column — hero, work, essays, quote */}
          <Box as="main">
            {children}
          </Box>

          {/* Sidebar column — signals, scores, culture, listening */}
          <Box
            position={{ base: 'static', lg: 'sticky' }}
            top="57px"
            maxHeight={{ base: 'none', lg: 'calc(100vh - 57px)' }}
            overflowY={{ base: 'visible', lg: 'auto' }}
          >
            <Sidebar />
          </Box>
        </Box>
      </Box>

    </Box>
  )
}