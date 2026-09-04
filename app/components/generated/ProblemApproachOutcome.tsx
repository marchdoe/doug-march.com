import { Box, Stack } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Props = {
  problem?: string
  approach?: string
  outcome?: string
}

const rows: { label: string; key: keyof Props }[] = [
  { label: 'Problem', key: 'problem' },
  { label: 'Approach', key: 'approach' },
  { label: 'Outcome', key: 'outcome' },
]

export function ProblemApproachOutcome({ problem, approach, outcome }: Props) {
  const values: Props = { problem, approach, outcome }

  return (
    <Stack gap="6">
      {rows.map(({ label, key }) => {
        const value = values[key]
        if (!value) return null
        return (
          <Box key={key} borderTop="1px solid" borderColor="border" paddingTop="4">
            <Box
              className={css({
                textStyle: 'xs',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                color: 'textFaint',
                marginBottom: '2',
              })}
            >
              {label}
            </Box>
            <Box
              className={css({
                textStyle: 'base',
                fontFamily: 'body',
                color: 'text',
                maxWidth: '68ch',
              })}
            >
              {value}
            </Box>
          </Box>
        )
      })}
    </Stack>
  )
}
