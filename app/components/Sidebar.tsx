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
      background="bgPanelLeft"
      borderRight="1px solid"
      borderColor="border"
      display="flex"
      flexDirection="column"
      padding="64px 48px 48px 56px"
      className={css({
        '@media (max-width: 767px)': {
          position: 'relative',
          height: 'auto',
          borderRight: 'none',
          borderBottom: '1px solid',
          borderColor: 'border',
          padding: '32px 24px',
        },
      })}
    >
      {/* Moon indicator */}
      <Box
        position="absolute"
        top="56px"
        right="48px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="4px"
        className={css({
          '@media (max-width: 767px)': {
            top: '24px',
            right: '24px',
          },
        })}
      >
        <Box
          width="20px"
          height="20px"
          borderRadius="full"
          background="text"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0"
            right="0"
            width="5.5%"
            height="100%"
            background="bgPanelLeft"
            borderRadius="0"
          />
        </Box>
        <Box fontSize="9px" fontFamily="body" color="textMuted" letterSpacing="wider">
          94.5%
        </Box>
      </Box>

      {/* Logo + Identity */}
      <Flex alignItems="center" gap="md" marginBottom="2xl">
        <img src={logoSvg} alt="Doug March logo" width="36" height="36" />
        <Box>
          <Box
            fontSize="2xl"
            fontFamily="heading"
            fontWeight="bold"
            color="text"
            lineHeight="tight"
            letterSpacing="tight"
            className={css({
              '@media (max-width: 767px)': {
                fontSize: 'xl',
              },
            })}
          >
            Doug March
          </Box>
          <Box fontSize="sm" fontFamily="heading" fontWeight="medium" color="textMuted" letterSpacing="wider" textTransform="uppercase">
            Product Designer & Developer
          </Box>
        </Box>
      </Flex>

      {/* Nav */}
      <VStack gap="sm" alignItems="flex-start" marginBottom="2xl">
        <a href="/" className={css({
          textDecoration: 'none',
          fontSize: 'sm',
          fontFamily: 'heading',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          color: 'textMuted',
          padding: '4px 0',
          borderBottom: '1px solid transparent',
          transition: 'color 0.2s, border-color 0.2s',
          _hover: { color: 'accent', borderBottomColor: 'accent' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
          display: 'inline-block',
          minHeight: '44px',
          lineHeight: '36px',
        })}>
          HOME
        </a>
        <a href="/about" className={css({
          textDecoration: 'none',
          fontSize: 'sm',
          fontFamily: 'heading',
          fontWeight: 'medium',
          letterSpacing: 'wider',
          color: 'textMuted',
          padding: '4px 0',
          borderBottom: '1px solid transparent',
          transition: 'color 0.2s, border-color 0.2s',
          _hover: { color: 'accent', borderBottomColor: 'accent' },
          _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px', borderRadius: 'xs' },
          display: 'inline-block',
          minHeight: '44px',
          lineHeight: '36px',
        })}>
          ABOUT
        </a>
      </VStack>

      {/* Divider */}
      <Box width="100%" height="1px" background="border" marginBottom="2xl" />

      {/* Dickens Quote */}
      <Box
        borderLeft="2px solid"
        borderColor="secondary"
        paddingLeft="lg"
        marginBottom="2xl"
      >
        <Box
          fontSize="15px"
          fontFamily="body"
          fontWeight="light"
          fontStyle="italic"
          lineHeight="loose"
          color="textMuted"
          marginBottom="sm"
        >
          Every traveler has a home of his own, and he learns to appreciate it the more from his wandering.
        </Box>
        <Box fontSize="xs" fontFamily="body" fontWeight="normal" color="textMuted" letterSpacing="wide">
          — Charles Dickens
        </Box>
      </Box>

      {/* Tigers Score */}
      <Box marginBottom="2xl">
        <Box fontSize="sm" fontFamily="heading" fontWeight="medium" letterSpacing="widest" color="textMuted" marginBottom="sm" textTransform="uppercase">
          Tonight
        </Box>
        <Box
          display="inline-flex"
          alignItems="center"
          background="secondary"
          color="textOnDark"
          borderRadius="lg"
          padding="4px 12px"
          fontSize="11px"
          fontFamily="heading"
          fontWeight="semibold"
          letterSpacing="wide"
        >
          DET 5 – 1
        </Box>
      </Box>

      {/* Cadillac Championship */}
      <Box flex="1">
        <Box fontSize="9px" fontFamily="heading" letterSpacing="widest" color="textMuted" marginBottom="md" textTransform="uppercase">
          CADILLAC
        </Box>
        <VStack gap="xs" alignItems="flex-start">
          <Flex gap="sm" alignItems="baseline" width="100%">
            <Box fontSize="13px" fontFamily="body" color="textSecondary" flex="1">Cameron Young</Box>
            <Box fontSize="13px" fontFamily="body" color="accent" fontWeight="medium">-15</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline" width="100%">
            <Box fontSize="xs" fontFamily="body" color="textMuted" flex="1">Scottie Scheffler</Box>
            <Box fontSize="xs" fontFamily="body" color="textMuted">-12</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline" width="100%">
            <Box fontSize="xs" fontFamily="body" color="textMuted" flex="1">Xander Schauffele</Box>
            <Box fontSize="xs" fontFamily="body" color="textMuted">-11</Box>
          </Flex>
          <Flex gap="sm" alignItems="baseline" width="100%">
            <Box fontSize="xs" fontFamily="body" color="textMuted" flex="1">Rory McIlroy</Box>
            <Box fontSize="xs" fontFamily="body" color="textMuted">-10</Box>
          </Flex>
        </VStack>
      </Box>
    </Box>
  )
}