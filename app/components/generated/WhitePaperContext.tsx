import { Box } from '../../../styled-system/jsx'

export function WhitePaperContext({
  context,
  constraints,
}: {
  context?: string
  constraints?: string[]
}) {
  return (
    <Box py="6" borderTop="1px solid" borderColor="border">
      {context && (
        <Box fontFamily="body" fontSize="md" lineHeight="loose" color="textMuted" mb="4">
          {context}
        </Box>
      )}
      {constraints && constraints.length > 0 && (
        <Box as="ul" display="flex" flexDirection="column" gap="2" pl="0" listStyle="none">
          {constraints.map((c) => (
            <Box
              as="li"
              key={c}
              fontFamily="display"
              fontSize="sm"
              color="textFaint"
              display="flex"
              gap="2"
            >
              <Box as="span" color="accent">
                —
              </Box>
              {c}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
