import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import logo from '../assets/logo.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box position="fixed" inset="0" zIndex="9999" background="bg" overflow="hidden">
      <Box
        width="1200px"
        height="630px"
        margin="0 auto"
        background="radial-gradient(120% 120% at 22% 12%, {colors.brand.600} 0%, {colors.brand.800} 55%, {colors.brand.900} 100%)"
        border="1px solid"
        borderColor="border"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="10"
        position="relative"
      >
        <Box
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="accentGlow"
        >
          Daily manifesto · 23 July 2026
        </Box>

        <Box
          as="h1"
          fontFamily="display"
          fontSize="150px"
          lineHeight="tight"
          letterSpacing="tight"
          textTransform="uppercase"
          color="text"
        >
          Passion&nbsp;is
          <Box as="span" display="block" color="accentGlow">
            Energy
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="4">
          <img src={logo} alt="Doug March mark" height={64} width="auto" />
          <Box>
            <Box fontFamily="display" fontSize="lg" color="text" lineHeight="tight">
              Doug March
            </Box>
            <Box fontSize="xs" color="textMuted" letterSpacing="wide">
              Product builder · founder · designer
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}