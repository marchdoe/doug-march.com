import type { ReactNode } from 'react'
import { Box, Flex } from '../../styled-system/jsx'
import { Sidebar } from './Sidebar'
import { identity } from '../content/about'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Box minH="100dvh" display="grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Sidebar />
      <Box bg="bg" color="text">
        {children}
      </Box>
      <Flex
        as="footer"
        bg="panel"
        color="knockout"
        px={{ base: '5', md: '12' }}
        py="3"
        justify="space-between"
        align="center"
        gap="4"
        wrap="wrap"
        fontSize="2xs"
        letterSpacing="wider"
        textTransform="uppercase"
        borderTop="4px solid"
        borderColor="border"
      >
        <span>
          {identity.name} · {identity.role}
        </span>
        <span>
          Moon <b>30%</b> waxing · Sun <b>05:04–19:28</b> · <b>14.4h</b>
        </span>
        <span>Rebuilt from scratch · Edition <b>200</b> · No shortcuts</span>
      </Flex>
    </Box>
  )
}