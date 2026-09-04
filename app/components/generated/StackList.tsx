import { Wrap, Box } from '../../../styled-system/jsx'

export function StackList({ stack }: { stack?: string[] }) {
  if (!stack || stack.length === 0) return null
  return (
    <Wrap gap="3" py="6" borderTop="1px solid" borderColor="border">
      {stack.map((s) => (
        <Box
          key={s}
          fontFamily="display"
          fontSize="2xs"
          letterSpacing="wide"
          textTransform="uppercase"
          color="accent"
          border="1px solid"
          borderColor="borderStrong"
          px="3"
          py="2"
        >
          {s}
        </Box>
      ))}
    </Wrap>
  )
}
