import type { ReactNode } from 'react'
import { Box, Flex } from '../../styled-system/jsx'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <Flex align="center" gap="3" style={{ marginBottom: '16px' }}>
      <Box
        as="span"
        fontSize="xs"
        fontFamily="body"
        fontWeight="700"
        color="accent"
        letterSpacing="widest"
        style={{ textTransform: 'uppercase', whiteSpace: 'nowrap' }}
      >
        {children}
      </Box>
      <Box flex="1" background="border" style={{ height: '1px' }} />
    </Flex>
  )
}