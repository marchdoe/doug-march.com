import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function WhitePaperReferences({
  references,
}: {
  references?: { title: string; url: string; note?: string }[]
}) {
  if (!references || references.length === 0) return null
  return (
    <Box
      py="6"
      borderTop="1px solid"
      borderColor="border"
      display="flex"
      flexDirection="column"
      gap="3"
    >
      {references.map((r) => (
        <Box key={r.url}>
          <a
            href={r.url}
            target="_blank"
            rel="noopener"
            className={css({ fontFamily: 'display', fontSize: 'sm', color: 'accent' })}
          >
            {r.title} ↗
          </a>
          {r.note && (
            <Box as="span" fontFamily="body" fontSize="sm" color="textFaint" ml="2">
              {r.note}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
