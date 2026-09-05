import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

export function CapabilitiesChips({ capabilities }: { capabilities: string[] }) {
  return (
    <Box px={{ base: '5', md: '7', lg: '9' }} pb={{ base: '9', lg: '9' }}>
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
        Capabilities
      </h2>
      <Box display="flex" flexWrap="wrap" gap="3">
        {capabilities.map((cap) => (
          <span
            key={cap}
            className={css({
              fontSize: 'xs',
              fontVariantCaps: 'small-caps',
              letterSpacing: 'wide',
              color: 'textMuted',
              border: '1px solid',
              borderColor: 'border',
              px: '3',
              py: '2',
            })}
          >
            {cap}
          </span>
        ))}
      </Box>
    </Box>
  )
}
