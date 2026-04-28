import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor="bg"
    >
      <Sidebar />
      <Box flex="1">
        {children}
      </Box>
    </Box>
  )
}