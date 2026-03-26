import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&family=Work+Sans:wght@300;400;500&display=swap');`}</style>
      <Box minH="100vh" background="bg" color="text" fontFamily="body">
        <Sidebar />
        {children}
      </Box>
    </>
  )
}