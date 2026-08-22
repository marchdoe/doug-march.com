import type { ReactNode } from 'react'
import { Flex, Box } from '../../styled-system/jsx'

export function SectionLabel({
  children,
  count,
  marginTop = '32px',
  topRule = true,
}: {
  children: ReactNode
  count?: string
  marginTop?: string
  topRule?: boolean
}) {
  return (
    <Flex
      align="baseline"
      justify="space-between"
      borderTop={topRule ? '1px solid' : '0'}
      borderColor="divider"
      paddingTop={topRule ? '20px' : '0'}
      marginTop={marginTop}
      marginBottom="12px"
      gap="12px"
    >
      <Box
        fontFamily="body"
        fontSize="12px"
        fontWeight="medium"
        letterSpacing="widest"
        textTransform="uppercase"
        color="textRightMuted"
        lineHeight="tight"
      >
        {children}
      </Box>
      {count && (
        <Box
          fontFamily="body"
          fontSize="12px"
          fontWeight="normal"
          letterSpacing="widest"
          color="textRightMuted"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {count}
        </Box>
      )}
    </Flex>
  )
}
