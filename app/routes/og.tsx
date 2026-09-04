import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { BrandLockup } from '../components/BrandLockup'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box position="fixed" inset="0" zIndex="9999" bg="bg">
      <Box
        w="1200px"
        h="630px"
        mx="auto"
        my="0"
        bg="field"
        color="fieldInk"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        px="72px"
        py="64px"
        position="relative"
      >
        <Box color="fieldInk">
          <BrandLockup variant="mark-only-md" mode="single-color" color="bg" />
        </Box>
        <Box
          fontFamily="display"
          fontWeight="700"
          fontSize="hero"
          lineHeight="tight"
          letterSpacing="tight"
          color="fieldInk"
        >
          Where did
          <br />
          the work go?
        </Box>
        <Box
          fontFamily="display"
          fontSize="sm"
          letterSpacing="wide"
          textTransform="uppercase"
          color="fieldInkMuted"
        >
          dougmar.ch · AI · 2026 · running nightly
        </Box>
      </Box>
    </Box>
  )
}
