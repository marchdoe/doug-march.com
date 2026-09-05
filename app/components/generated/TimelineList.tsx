import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Entry = { year: string; role: string; company: string; description: string; current?: boolean }

export function TimelineList({ entries }: { entries: Entry[] }) {
  return (
    <Box as="section" px={{ base: '5', md: '7', lg: '9' }} py={{ base: '9', lg: '9' }}>
      <h2
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          borderBottom: '1px solid',
          borderColor: 'border',
          pb: '2',
          mb: '4',
        })}
      >
        Timeline
      </h2>
      {entries.map((entry) => (
        <Box
          key={`${entry.year}-${entry.company}`}
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          gap={{ base: '2', md: '6' }}
          borderBottom="1px solid"
          borderColor="border"
          py="4"
        >
          <Box
            flexShrink={0}
            minWidth={{ base: 'auto', md: '120px' }}
            fontSize="xs"
            color="textMuted"
            className={css({ fontVariantNumeric: 'tabular-nums' })}
          >
            {entry.year}
          </Box>
          <Box flexShrink={0} minWidth={{ base: 'auto', md: '220px' }}>
            <span className={css({ fontSize: 'md', fontWeight: '600', color: 'text' })}>
              {entry.role}
            </span>
            <span className={css({ display: 'block', fontSize: 'sm', color: 'textMuted' })}>
              {entry.company}
            </span>
          </Box>
          <Box fontSize="base" lineHeight="loose" color="text" maxWidth="64ch">
            {entry.description}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
