import { Box } from '../../styled-system/jsx'
import { SectionHead } from './SectionHead'
import { identity } from '../content/about'

export function Bio() {
  return (
    <Box>
      <SectionHead label="About" />
      <Box
        fontFamily="heading"
        fontWeight="bold"
        fontSize="lg"
        lineHeight="snug"
        letterSpacing="tight"
        color="text"
        marginBottom="4"
      >
        {identity.name}
      </Box>
      <Box
        fontSize="2xs"
        fontFamily="body"
        fontWeight="semibold"
        letterSpacing="widest"
        textTransform="uppercase"
        color="accent"
        marginBottom="4"
      >
        {identity.role}
      </Box>
      <Box
        fontSize="base"
        fontFamily="body"
        fontWeight="regular"
        lineHeight="normal"
        color="textSecondary"
        maxWidth="520px"
      >
        {identity.statement}
      </Box>
    </Box>
  )
}