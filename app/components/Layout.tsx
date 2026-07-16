import type { ReactNode } from 'react'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { Sidebar } from './Sidebar'
import logoMono from '../assets/logo-mono.svg'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      display="grid"
      gridTemplateRows="auto 1fr auto"
      minHeight="100vh"
      bg="bg"
      color="text"
      fontFamily="body"
    >
      <Box as="header" padding={{ base: '6 4 0', md: '8 6vw 0' }}>
        <a href="/" aria-label="Doug March — home">
          <img
            src={logoMono}
            alt="Doug March"
            className={css({ height: '30px', width: 'auto', color: 'accent' })}
          />
        </a>
      </Box>
      <Box as="main" display="flex" flexDirection="column">
        {children}
      </Box>
      <Sidebar />
    </Box>
  )
}