import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type ProcessStep = { phase: string; does: string; produces: string }

export function ProcessSection({ process }: { process?: ProcessStep[] }) {
  if (!process || process.length === 0) return null
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
        Process
      </p>
      <Box
        as="ol"
        display="flex"
        flexDirection="column"
        gap="4"
        className={css({ listStyle: 'none', padding: 0 })}
      >
        {process.map((step, i) => (
          <li
            key={step.phase}
            className={css({ display: 'flex', flexWrap: 'wrap', gap: '3', alignItems: 'baseline' })}
          >
            <span className={css({ fontSize: 'xs', color: 'textFaint', minWidth: '24px' })}>
              {i + 1}
            </span>
            <span
              className={css({
                fontSize: 'sm',
                fontWeight: '600',
                color: 'text',
                minWidth: '140px',
              })}
            >
              {step.phase}
            </span>
            <span className={css({ fontSize: 'base', color: 'text' })}>
              {step.does} →{' '}
              <em className={css({ color: 'textMuted', fontStyle: 'normal' })}>{step.produces}</em>
            </span>
          </li>
        ))}
      </Box>
    </Box>
  )
}
