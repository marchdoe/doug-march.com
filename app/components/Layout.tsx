import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Box } from '../../styled-system/jsx'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box background="bg" minHeight="100vh">
      <Sidebar />
      {children}
    </Box>
  )
}