import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import Sidebar from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;600&display=swap"
      />
      <Sidebar />
      <Box as="main">
        {children}
      </Box>
    </>
  )
}