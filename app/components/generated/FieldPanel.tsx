import type { ReactNode } from 'react'
import { Box } from '../../../styled-system/jsx'

export function FieldPanel({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <Box
      as="aside"
      bg="field"
      color="fieldInk"
      px={{ base: '5', md: '6' }}
      py={{ base: '10', md: '9' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap="9"
      borderTop={{ base: '1px solid', md: 'none' }}
      borderLeft={{ base: 'none', md: '1px solid' }}
      borderColor="fieldBorder"
      minW="0"
    >
      <Box
        fontFamily="display"
        fontSize="2xs"
        letterSpacing="wide"
        textTransform="uppercase"
        color="fieldInkMuted"
        mb="3"
      >
        {tag}
      </Box>
      {children}
    </Box>
  )
}
