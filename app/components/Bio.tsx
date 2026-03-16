import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { identity } from '../content/about'

export function Bio() {
  return (
    <Box
      className={css({
        mb: '8',
      })}
    >
      {/* Role label */}
      <span
        className={css({
          display: 'block',
          fontFamily: 'mono',
          fontSize: '2xs',
          fontWeight: 'medium',
          letterSpacing: 'widest',
          textTransform: 'uppercase',
          color: 'accent.DEFAULT',
          mb: '3',
        })}
      >
        {identity.role}
      </span>

      {/* Name */}
      <h1
        className={css({
          fontFamily: 'serif',
          fontSize: 'xl',
          fontWeight: 'bold',
          letterSpacing: 'tight',
          lineHeight: 'tight',
          color: 'text',
          mb: '4',
        })}
      >
        {identity.name}
      </h1>

      {/* Statement */}
      <p
        className={css({
          fontFamily: 'serif',
          fontSize: 'md',
          fontWeight: 'regular',
          lineHeight: 'loose',
          color: 'text.mid',
          maxWidth: '52ch',
        })}
      >
        {identity.statement}
      </p>
    </Box>
  )
}