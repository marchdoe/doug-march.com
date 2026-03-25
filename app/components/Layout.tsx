import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Outfit:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <Box minHeight="100vh" background="bg" fontFamily="body">
        <Sidebar />
        {children}
      </Box>
    </>
  )
}