import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      minHeight="100vh"
      style={{ backgroundColor: '#FAF6F3' }}
    >
      <Sidebar />
      <Box flex="1">
        {children}
      </Box>
    </Box>
  )
}