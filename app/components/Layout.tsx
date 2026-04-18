import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '../../styled-system/jsx'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box minHeight="100vh" background="bg">
      <Sidebar />
      <Box>
        {children}
      </Box>
    </Box>
  )
}