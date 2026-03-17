import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box
      background="bg"
      color="text"
      fontFamily="body"
      minHeight="100vh"
    >
      <Sidebar />
      <Box>
        {children}
      </Box>
    </Box>
  )
}