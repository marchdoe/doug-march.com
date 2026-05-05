import logoSvg from '../assets/logo.svg'
import { Box, Flex, VStack, styled } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <Box
      position="sticky"
      top="0"
      height="100vh"
      overflowY="auto"
      background="bg-secondary"
      borderRight="1px solid"
      borderColor="border"
      display="flex"
      flexDirection="column"
      px="10"
      py="14"
      className={css({
        '@media (max-width: 767px)': {
          position: 'relative',
          height: 'auto',
          borderRight: 'none',
          borderBottom: '1px solid',
          borderColor: 'border',
          px: '6',
          py: '8',
        },
      })}
    >
      {/* Identity */}
      <Box mb="6">
        <a href="/" className={css({ display: 'inline-block', marginBottom: '16px' })}>
          <img src={logoSvg} alt="Doug March logo" width="36" height="36" />
        </a>
        <Box
          fontSize="clamp(32px, 4vw, 50px)"
          fontWeight="bold"
          fontFamily="heading"
          lineHeight="tight"
          letterSpacing="tight"
          color="text"
        >
          Doug March
        </Box>
        <Box
          fontSize="sm"
          fontFamily="body"
          color="text-secondary"
          mt="2"
          lineHeight="normal"
        >
          Product Designer &amp; Developer
        </Box>
      </Box>

      {/* Language Tags */}
      <Flex gap="2" mb="6" flexWrap="wrap">
        {['TS', 'PY', 'RS', 'JS'].map((lang) => (
          <Box
            key={lang}
            fontSize="2xs"
            fontFamily="body"
            fontWeight="semibold"
            letterSpacing="widest"
            px="2"
            py="1"
            background="bg"
            border="1px solid"
            borderColor="border-strong"
            borderRadius="sm"
            color="text-secondary"
          >
            {lang}
          </Box>
        ))}
      </Flex>

      {/* Nav */}
      <VStack gap="4" align="flex-start" mb="8">
        <a
          href="/"
          className={css({
            fontSize: 'sm',
            fontFamily: 'body',
            color: 'text-secondary',
            textDecoration: 'none',
            padding: '4px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Home
        </a>
        <a
          href="/about"
          className={css({
            fontSize: 'sm',
            fontFamily: 'body',
            color: 'text-secondary',
            textDecoration: 'none',
            padding: '4px 0',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </VStack>

      {/* Golf Leaderboard */}
      <Box mb="8">
        <Box
          fontSize="2xs"
          fontFamily="heading"
          fontWeight="semibold"
          letterSpacing="wider"
          color="text-disabled"
          textTransform="uppercase"
          mb="3"
        >
          PGA Championship
        </Box>
        <Flex justify="space-between" align="baseline" mb="4">
          <Box fontSize="sm" fontFamily="heading" fontWeight="semibold" color="text">
            Cameron Young
          </Box>
          <Box fontSize="sm" fontFamily="heading" fontWeight="semibold" color="accent">
            −19
          </Box>
        </Flex>
        <Box height="1px" background="border" mb="3" />
        <Flex justify="space-between" align="baseline" mb="1">
          <Box fontSize="xs" fontFamily="body" color="text-muted">Scottie Scheffler</Box>
          <Box fontSize="xs" fontFamily="body" color="text-muted">−13</Box>
        </Flex>
        <Flex justify="space-between" align="baseline">
          <Box fontSize="xs" fontFamily="body" color="text-muted">Collin Morikawa</Box>
          <Box fontSize="xs" fontFamily="body" color="text-muted">−12</Box>
        </Flex>
      </Box>

      {/* Spacer pushes Tigers score to bottom */}
      <Box mt="auto" />

      {/* Tigers Score */}
      <Box
        fontSize="xs"
        fontFamily="body"
        color="text-disabled"
        letterSpacing="wide"
        textAlign="right"
      >
        DET 4 · BOS 5 — May 4
      </Box>
    </Box>
  )
}