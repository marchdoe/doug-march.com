import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function ContextProse({ context }: { context?: string }) {
  if (!context) return null
  return (
    <Box px={{ base: '5', md: '7', lg: '9' }} pb={{ base: '7', lg: '7' }} maxWidth="820px">
      <p
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          mb: '3',
        })}
      >
        Context
      </p>
      <p
        className={css({ fontSize: 'base', lineHeight: 'loose', color: 'text', maxWidth: '64ch' })}
      >
        {context}
      </p>
    </Box>
  )
}
