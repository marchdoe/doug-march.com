import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'
import { CaptionBand } from './CaptionBand'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      bg="bg"
      color="text"
      minHeight="100dvh"
      display="grid"
      gridTemplateRows="1fr auto"
      fontFamily="body"
    >
      <Box
        display="flex"
        flexDirection="column"
        paddingX="6vw"
        paddingTop={{ base: '8', md: '10' }}
        paddingBottom={{ base: '6', md: '8' }}
      >
        <Sidebar />
        <Box flex="1" display="flex" flexDirection="column">
          {children}
        </Box>
      </Box>
      <CaptionBand />
    </Box>
  )
}