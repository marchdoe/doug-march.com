import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      minH="100vh"
      maxW="100vw"
      overflowX="hidden"
      bg="bg"
      color="text"
      fontFamily="body"
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" minWidth="0">
        {children}
      </Box>
      <Sidebar />
    </Box>
  )
}
