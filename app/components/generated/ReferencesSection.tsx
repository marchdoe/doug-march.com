import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Reference = { title: string; url: string; note?: string }

export function ReferencesSection({ references }: { references?: Reference[] }) {
  if (!references || references.length === 0) return null
  return (
    <Box px={{ base: '5', md: '7', lg: '9' }} pb={{ base: '9', lg: '9' }} maxWidth="820px">
      <p
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          mb: '3',
        })}
      >
        References
      </p>
      {references.map((ref) => (
        <Box key={ref.url} mb="3">
          <a
            href={ref.url}
            className={css({ fontSize: 'base', color: 'accent', _hover: { color: 'text' } })}
          >
            {ref.title}
          </a>
          {ref.note && <p className={css({ fontSize: 'sm', color: 'textMuted' })}>{ref.note}</p>}
        </Box>
      ))}
    </Box>
  )
}
