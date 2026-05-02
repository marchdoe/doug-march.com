import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box
        marginLeft={{ base: '0', md: '38%' }}
        width={{ base: '100%', md: '62%' }}
        minHeight="100vh"
        paddingTop={{ base: '280px', md: '0' }}
      >
        {children}
      </Box>
    </Box>
  )
}