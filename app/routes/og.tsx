import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import logoMono from '../assets/logo-mono.svg'

export const Route = createFileRoute('/og')({ component: OgCard })

function OgCard() {
  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={9999}
      bg="bg"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="1200px"
        height="630px"
        bg="bg"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding="16"
        overflow="hidden"
      >
        <Box
          fontSize="sm"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text"
          marginBottom="6"
          display="flex"
          gap="4"
          alignItems="center"
        >
          <span>Front Page</span>
          <span>★</span>
          <span>The Grind Report</span>
        </Box>
        <Box
          as="h1"
          fontFamily="display"
          fontWeight="bold"
          textTransform="uppercase"
          color="knockout"
          margin="0"
          lineHeight="tight"
          letterSpacing="tight"
          fontSize="9xl"
          style={{ fontSize: '128px' }}
        >
          There Are No
          <br />
          Shortcuts.
        </Box>

        <Box position="absolute" bottom="16" right="16" display="flex" alignItems="center" gap="3">
          <img src={logoMono} alt="" style={{ height: 48, width: 'auto' }} />
          <Box
            fontFamily="display"
            fontWeight="bold"
            fontSize="xl"
            letterSpacing="wide"
            textTransform="uppercase"
            color="text"
          >
            Doug March
          </Box>
        </Box>
      </Box>
    </Box>
  )
}