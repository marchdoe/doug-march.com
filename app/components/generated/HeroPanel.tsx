import type { ReactNode } from 'react'
import { Box } from '../../../styled-system/jsx'

export function HeroPanel({
  eyebrow,
  heading,
  standfirst,
}: {
  eyebrow: string
  heading: ReactNode
  standfirst: ReactNode
}) {
  return (
    <Box
      bg="bg"
      px={{ base: '5', md: '6' }}
      py={{ base: '10', md: '9' }}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="7"
      minW="0"
    >
      <Box
        fontFamily="display"
        fontSize="2xs"
        letterSpacing="widest"
        textTransform="uppercase"
        color="textFaint"
      >
        {eyebrow}
      </Box>
      <Box
        as="h1"
        fontFamily="display"
        fontWeight="700"
        textStyle="hero"
        letterSpacing="tight"
        color="text"
      >
        {heading}
      </Box>
      <Box
        fontFamily="body"
        fontSize={{ base: 'sm', md: 'md' }}
        lineHeight="loose"
        color="textMuted"
        maxW="54ch"
      >
        {standfirst}
      </Box>
    </Box>
  )
}
