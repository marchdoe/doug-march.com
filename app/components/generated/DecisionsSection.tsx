import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Decision = { decision: string; why: string }

export function DecisionsSection({ decisions }: { decisions?: Decision[] }) {
  if (!decisions || decisions.length === 0) return null
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
        Decisions
      </p>
      {decisions.map((d) => (
        <Box key={d.decision} mb="4">
          <p className={css({ fontSize: 'base', fontWeight: '600', color: 'text' })}>
            {d.decision}
          </p>
          <p className={css({ fontSize: 'sm', color: 'textMuted' })}>{d.why}</p>
        </Box>
      ))}
    </Box>
  )
}
