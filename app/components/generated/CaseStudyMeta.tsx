import { Box, Wrap } from '../../../styled-system/jsx'

export function CaseStudyMeta({ rows }: { rows: { label: string; value?: string }[] }) {
  const present = rows.filter((r) => Boolean(r.value))
  return (
    <Wrap gap="6" py="6" borderTop="1px solid" borderColor="border">
      {present.map((r) => (
        <Box key={r.label} fontFamily="display" fontSize="2xs">
          <Box as="span" color="textFaint" letterSpacing="wide" textTransform="uppercase">
            {r.label}
          </Box>
          <Box as="span" color="text" ml="2">
            {r.value}
          </Box>
        </Box>
      ))}
    </Wrap>
  )
}
