import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box position="relative" minH="100vh" bg="bg">
      <Sidebar />
      {children}
    </Box>
  )
}