import { Box } from '../../styled-system/jsx'

interface SectionHeadProps {
  label: string
}

export function SectionHead({ label }: SectionHeadProps) {
  return (
    <Box marginBottom="4">
      <Box
        fontSize="2xs"
        fontFamily="body"
        fontWeight="semibold"
        letterSpacing="widest"
        textTransform="uppercase"
        color="textMuted"
        marginBottom="2"
      >
        {label}
      </Box>
      <Box height="1px" background="borderMuted" />
    </Box>
  )
}