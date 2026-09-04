import { Box } from '../../../styled-system/jsx'

export function WhitePaperDecisions({
  decisions,
}: {
  decisions?: { decision: string; why: string }[]
}) {
  if (!decisions || decisions.length === 0) return null
  return (
    <Box
      py="6"
      borderTop="1px solid"
      borderColor="border"
      display="flex"
      flexDirection="column"
      gap="5"
    >
      {decisions.map((d) => (
        <Box key={d.decision}>
          <Box fontFamily="display" fontWeight="700" fontSize="sm" color="text">
            {d.decision}
          </Box>
          <Box fontFamily="body" fontSize="sm" color="textMuted" lineHeight="loose">
            {d.why}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
