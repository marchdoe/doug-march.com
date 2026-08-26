import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box bg="bg" minHeight="100vh">
      <Sidebar />
      <Box marginLeft={{ base: 0, md: '72px' }} marginTop={{ base: '56px', md: 0 }}>
        {children}
        <Footer />
      </Box>
    </Box>
  )
}