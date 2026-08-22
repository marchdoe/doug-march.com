import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'

// Static "today" signal data — flavor content matching the approved mockup.
// Not sourced from content files; these are ambient/editorial signals, not
// project or bio data.
const today = 'Jul 22, 2026'

function Signal({ label, value, icon }: { label: string; value: string; icon?: boolean }) {
  return (
    <Box
      className={css({
        padding: '4 0',
        borderBottom: '1px solid',
        borderColor: 'border',
        display: 'flex',
        flexDirection: 'column',
        gap: '1',
      })}
    >
      <Box
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: '2xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          display: 'flex',
          alignItems: 'center',
          gap: '2',
        })}
      >
        {icon && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={css({ display: 'inline-block', color: 'accent' })}
          >
            <path d="M14 2a10 10 0 1 0 0 20A12 12 0 0 1 14 2Z" fill="currentColor" />
          </svg>
        )}
        {label}
      </Box>
      <Box
        className={css({
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: 'sm',
          color: 'textSecondary',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        {value}
      </Box>
    </Box>
  )
}

export function SignalMargin() {
  return (
    <Box
      as="aside"
      aria-label="Today's signals"
      className={css({
        gridColumn: { base: '1 / -1', lg: '3' },
        gridRow: { base: '3', lg: '1' },
        background: 'bgSpine',
        borderLeft: { base: 'none', lg: '1px solid' },
        borderTop: { base: '1px solid', lg: 'none' },
        borderColor: 'border',
        display: 'flex',
        flexDirection: 'column',
        padding: { base: '6', md: '6 6 5' },
        minHeight: { lg: '100vh' },
      })}
    >
      <Box
        className={css({
          fontFamily: 'body',
          fontWeight: 'bold',
          fontSize: '2xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          paddingBottom: '4',
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        {today} — Signals
      </Box>

      <Signal label="On Rotation" value="Wet Leg · Guided by Voices" />
      <Signal label="Moon" value="First Quarter · 61%" icon />
      <Signal label="Tigers · MLB" value="2–11 · Loss" />
      <Signal label="3M Open · PGA" value="Scheduled" />
      <Signal label="Almanac" value="Jul 22 · 14.3h light" />

      <Box
        className={css({
          marginTop: 'auto',
          paddingTop: '4',
          fontFamily: 'body',
          fontWeight: 'medium',
          fontSize: '2xs',
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          fontVariantNumeric: 'tabular-nums',
        })}
      >
        doug-march.com — rebuilt daily
      </Box>
    </Box>
  )
}
