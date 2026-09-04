import { Box } from '../../../styled-system/jsx'
import type { TimelineEntry } from '../../content/timeline'

export function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <Box>
      {entries.map((entry, i) => (
        <Box
          key={`${entry.company}-${i}`}
          display="grid"
          gridTemplateColumns={{ base: '1fr', md: '120px 1fr' }}
          gap="3"
          py="5"
          borderTop="1px solid"
          borderColor="border"
        >
          <Box fontFamily="display" fontSize="sm" color="textFaint" flexShrink="0" minW="120px">
            {entry.year}
          </Box>
          <Box display="flex" flexDirection="column" gap="2">
            <Box
              fontFamily="display"
              fontWeight="700"
              fontSize="lg"
              color="text"
              letterSpacing="tight"
            >
              {entry.role}{' '}
              <Box as="span" color="textMuted">
                · {entry.company}
              </Box>
            </Box>
            <Box fontFamily="body" fontSize="sm" lineHeight="loose" color="textMuted">
              {entry.description}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
