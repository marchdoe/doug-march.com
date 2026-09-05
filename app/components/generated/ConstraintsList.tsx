import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function ConstraintsList({ constraints }: { constraints?: string[] }) {
  if (!constraints || constraints.length === 0) return null
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
        Constraints
      </p>
      <Box
        as="ul"
        display="flex"
        flexDirection="column"
        gap="2"
        className={css({ listStyle: 'none', padding: 0 })}
      >
        {constraints.map((c) => (
          <li key={c} className={css({ fontSize: 'base', color: 'text' })}>
            — {c}
          </li>
        ))}
      </Box>
    </Box>
  )
}
