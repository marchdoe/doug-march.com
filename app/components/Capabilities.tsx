import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { capabilities } from '../content/timeline'
import { SectionHead } from './SectionHead'

export function Capabilities() {
  return (
    <Box
      className={css({
        mb: '8',
      })}
    >
      <SectionHead label="Capabilities" />

      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2',
        })}
      >
        {capabilities.map((capability: string) => (
          <span
            key={capability}
            className={css({
              fontFamily: 'mono',
              fontSize: 'xs',
              fontWeight: 'regular',
              letterSpacing: 'wide',
              color: 'text.mid',
              bg: 'bg.card',
              border: '1px solid',
              borderColor: 'border.DEFAULT',
              px: '3',
              py: '1',
              lineHeight: 'snug',
              transition: 'border-color 0.12s ease, color 0.12s ease',
              _hover: {
                borderColor: 'border.accent',
                color: 'text',
              },
            })}
          >
            {capability}
          </span>
        ))}
      </div>
    </Box>
  )
}