import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box minH="100dvh" bg="bg" color="text" fontFamily="body" letterSpacing="normal" overflowX="hidden">
      <Box maxW="1680px" mx="auto" px={{ base: '5', md: '8' }} py={{ base: '5', md: '8' }}>
        <Sidebar />
        {children}
        <Box
          mt={{ base: '6', md: '8' }}
          bg="surfaceQuiet"
          border="1px solid"
          borderColor="border"
          borderRadius="md"
          p={{ base: '5', md: '6' }}
          display="flex"
          flexDirection="column"
          gap="1"
        >
          <Box fontSize="xs" color="textMuted" lineHeight="loose" fontVariantNumeric="tabular-nums">
            <Box as="strong" color="accent" fontWeight="bold">
              Rebuilt 2026-07-23
            </Box>{' '}
            — this site regenerates its own design every dawn.
          </Box>
          <Box fontSize="xs" color="textMuted" lineHeight="loose">
            Doug March · Detroit · low-salience feeds (GitHub, HN, golf) quiet today.
          </Box>
        </Box>
      </Box>
    </Box>
  )
}