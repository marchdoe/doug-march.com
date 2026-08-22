import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

// Today's baseline signal strip — golf, box score, moon phase, music, almanac.
// Static decorative content, consistent with the approved mockup.
export function SignalStrip() {
  return (
    <Box
      as="footer"
      aria-label="Today's signals"
      bg="bgDeep"
      borderTop="1px solid"
      borderColor="border"
      className={css({
        paddingX: { base: '6', md: '12', lg: '24' },
        paddingY: '4',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '2',
        fontFamily: 'body',
        fontSize: { base: '2xs', md: 'xs' },
        fontWeight: 'medium',
        letterSpacing: 'wider',
        textTransform: 'uppercase',
        color: 'textSecondary',
        position: 'relative',
        zIndex: '1',
      })}
    >
      <span className={css({ whiteSpace: 'nowrap' })}>
        3M&nbsp;OPEN&nbsp;· KOIVUN&nbsp;
        <span className={css({ color: 'accent' })}>−25</span>
        &nbsp;· SCHEFFLER −22
      </span>
      <span className={css({ color: 'border', paddingX: '1' })}>/</span>
      <span className={css({ whiteSpace: 'nowrap' })}>
        TIGERS <span className={css({ color: 'textMuted' })}>4–5</span>
      </span>
      <span className={css({ color: 'border', paddingX: '1' })}>/</span>
      <span className={css({ whiteSpace: 'nowrap' })}>
        <span
          className={css({
            color: 'accentGlow',
            fontSize: '2xs',
          })}
        >
          ●
        </span>{' '}
        FULL&nbsp;· 98%
      </span>
      <span className={css({ color: 'border', paddingX: '1' })}>/</span>
      <span className={css({ whiteSpace: 'nowrap', letterSpacing: 'widest' })}>
        GUIDED BY VOICES / WET LEG
      </span>
      <span className={css({ color: 'border', paddingX: '1' })}>/</span>
      <span className={css({ whiteSpace: 'nowrap' })}>
        <span className={css({ color: 'textMuted' })}>DAYLIGHT</span> 05:11 → 19:22
      </span>
    </Box>
  )
}
