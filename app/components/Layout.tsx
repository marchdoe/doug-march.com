import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box minHeight="100vh">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Work+Sans:ital,wght@0,300;0,400;0,700;1,300&display=swap');`}</style>
      <Sidebar />
      <Box as="main">{children}</Box>
    </Box>
  )
}