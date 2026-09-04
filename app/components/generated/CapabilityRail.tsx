import { Wrap, Box } from '../../../styled-system/jsx'

export function CapabilityRail({ capabilities }: { capabilities: string[] }) {
  return (
    <Wrap gap="3" mb="8">
      {capabilities.map((c) => (
        <Box
          key={c}
          fontFamily="display"
          fontSize="2xs"
          letterSpacing="wide"
          textTransform="uppercase"
          color="textMuted"
          border="1px solid"
          borderColor="border"
          px="3"
          py="2"
        >
          {c}
        </Box>
      ))}
    </Wrap>
  )
}
