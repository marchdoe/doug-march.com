import logoSvg from '../assets/logo.svg'
import { Box, Flex, VStack, styled } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export function Sidebar() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      width={{ base: '100%', md: '38%' }}
      maxWidth={{ md: '480px' }}
      minWidth={{ md: '340px' }}
      background="bg-secondary"
      display="flex"
      flexDirection="column"
      padding={{ base: '32px 24px 24px', md: '48px 40px 40px 48px' }}
      zIndex="10"
      overflow="hidden"
    >
      {/* Identity */}
      <Flex align="center" gap="12px" marginBottom={{ base: '24px', md: '32px' }}>
        <img
          src={logoSvg}
          alt="Doug March logo"
          className={css({ width: '32px', height: '32px' })}
        />
        <Box>
          <Box
            fontSize="16px"
            fontWeight="semibold"
            fontFamily="heading"
            color="text"
            lineHeight="snug"
          >
            Doug March
          </Box>
          <Box
            fontSize="12px"
            fontWeight="medium"
            fontFamily="body"
            color="text-muted"
            letterSpacing="wide"
          >
            Product Designer &amp; Developer
          </Box>
        </Box>
      </Flex>

      {/* Golf Leaderboard — Primary Signal */}
      <Box flex="1" display={{ base: 'none', md: 'flex' }} flexDirection="column" justifyContent="center">
        <Box
          fontSize="9px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text-muted"
          marginBottom="4px"
        >
          Cadillac Championship
        </Box>
        <Box
          fontSize="9px"
          fontFamily="heading"
          fontWeight="medium"
          letterSpacing="widest"
          textTransform="uppercase"
          color="stone.400"
          marginBottom="24px"
        >
          Leaderboard &nbsp;·&nbsp; Live
        </Box>

        {/* Cameron Young — Row 1 */}
        <Flex align="flex-end" gap="16px" marginBottom="8px">
          <Box
            fontSize="21px"
            fontFamily="heading"
            fontWeight="bold"
            color="accent"
            lineHeight="tight"
            minWidth="28px"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            1
          </Box>
          <Box flex="1">
            <Box
              fontSize="clamp(20px, 2.2vw, 28px)"
              fontFamily="heading"
              fontWeight="semibold"
              color="text"
              letterSpacing="tight"
              lineHeight="snug"
            >
              Cameron Young
            </Box>
          </Box>
          <Box
            fontSize="clamp(36px, 4vw, 50px)"
            fontFamily="heading"
            fontWeight="bold"
            color="accent"
            letterSpacing="tight"
            lineHeight="tight"
          >
            −13
          </Box>
        </Flex>

        {/* 2nd place */}
        <Flex
          align="baseline"
          gap="16px"
          paddingY="8px"
          opacity="0.75"
          _hover={{ opacity: 1 }}
          transition="opacity 0.12s ease"
        >
          <Box
            fontSize="14px"
            fontFamily="heading"
            fontWeight="medium"
            color="text-muted"
            minWidth="28px"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            2
          </Box>
          <Box flex="1" fontSize="16px" fontFamily="heading" color="text-secondary" letterSpacing="normal">
            Scottie Scheffler
          </Box>
          <Box fontSize="21px" fontFamily="heading" fontWeight="semibold" color="text">
            −11
          </Box>
        </Flex>

        {/* 3rd place */}
        <Flex
          align="baseline"
          gap="16px"
          paddingY="8px"
          opacity="0.75"
          _hover={{ opacity: 1 }}
          transition="opacity 0.12s ease"
        >
          <Box
            fontSize="14px"
            fontFamily="heading"
            fontWeight="medium"
            color="text-muted"
            minWidth="28px"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            3
          </Box>
          <Box flex="1" fontSize="16px" fontFamily="heading" color="text-muted" letterSpacing="normal">
            Collin Morikawa
          </Box>
          <Box fontSize="21px" fontFamily="heading" fontWeight="semibold" color="text-secondary">
            −9
          </Box>
        </Flex>

        <Box height="1px" background="border-muted" marginTop="24px" marginBottom="24px" />

        {/* Sports Scores Strip */}
        <Flex
          gap="12px"
          align="center"
          fontSize="10px"
          fontFamily="heading"
          letterSpacing="wide"
          fontWeight="medium"
        >
          <Flex gap="6px" align="center" color="text-secondary">
            <span>DET 93</span>
            <span style={{ opacity: 0.5 }}>—</span>
            <span>IND 79</span>
            <Box
              fontSize="9px"
              fontWeight="medium"
              color="sage"
              letterSpacing="wider"
              marginLeft="4px"
            >
              W
            </Box>
          </Flex>
          <Box color="border-muted">·</Box>
          <Flex gap="6px" color="stone.400">
            <span>DET 4</span>
            <span style={{ opacity: 0.5 }}>—</span>
            <span>MIL 5</span>
          </Flex>
        </Flex>
      </Box>

      {/* Navigation */}
      <VStack
        gap="0"
        align="flex-start"
        marginTop={{ base: '0', md: '48px' }}
      >
        <a
          href="/"
          className={css({
            display: 'block',
            paddingY: '8px',
            fontSize: '10px',
            fontFamily: 'heading',
            fontWeight: 'medium',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'accent',
            textDecoration: 'none',
            minHeight: '44px',
            lineHeight: '28px',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            display: 'block',
            paddingY: '8px',
            fontSize: '10px',
            fontFamily: 'heading',
            fontWeight: 'medium',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'text-muted',
            textDecoration: 'none',
            minHeight: '44px',
            lineHeight: '28px',
            _hover: { color: 'accent' },
            _focus: { outline: '2px solid {colors.accent}', outlineOffset: '2px' },
          })}
        >
          About
        </a>
      </VStack>
    </Box>
  )
}