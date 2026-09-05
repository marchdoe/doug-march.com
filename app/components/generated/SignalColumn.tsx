import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type SignalItem = { label: string; value: string; muted?: boolean }

export function SignalColumn({ items, align }: { items: SignalItem[]; align: 'left' | 'right' }) {
  return (
    <Box
      gridArea={{ lg: align === 'left' ? 'lf' : 'rf' }}
      display="flex"
      flexDirection="column"
      gap="6"
      justifyContent={{ lg: 'space-between' }}
      textAlign={{ base: 'left', lg: align }}
    >
      {items.map((item) => (
        <Box key={item.label} borderTop="1px solid" borderColor="border" pt="2">
          <div
            className={css({
              fontSize: '2xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'textFaint',
              mb: '1',
            })}
          >
            {item.label}
          </div>
          <div
            className={css({
              fontSize: 'sm',
              color: item.muted ? 'textMuted' : 'text',
            })}
          >
            {item.value}
          </div>
        </Box>
      ))}
    </Box>
  )
}
