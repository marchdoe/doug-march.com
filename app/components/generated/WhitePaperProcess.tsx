import { Box } from '../../../styled-system/jsx'

export function WhitePaperProcess({
  process,
}: {
  process?: { phase: string; does: string; produces: string }[]
}) {
  if (!process || process.length === 0) return null
  return (
    <Box
      py="6"
      borderTop="1px solid"
      borderColor="border"
      display="flex"
      flexDirection="column"
      gap="5"
    >
      {process.map((step, i) => (
        <Box
          key={step.phase}
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '160px 1fr' }}
          gap="3"
        >
          <Box fontFamily="display" fontSize="sm" color="textFaint">
            {String(i + 1).padStart(2, '0')} — {step.phase}
          </Box>
          <Box fontFamily="body" fontSize="sm" color="textMuted" lineHeight="loose">
            {step.does}{' '}
            <Box as="span" color="accent">
              {' '}
              → {step.produces}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
