import { css } from '../../../styled-system/css'

const rows = [
  { k: 'Weather', v: 'Sunny · 71.8°F' },
  { k: 'Moon', v: 'Waning crescent · 21%' },
  { k: 'Market', v: 'SPY 770.19 ▾0.39%' },
  { k: 'Air Quality', v: 'Good' },
  { k: 'Labor Day', v: 'Sep 7' },
]

export function BoxScoreSection() {
  return (
    <div className={css({ mt: { base: '7', lg: '9' } })}>
      <p
        className={css({
          textStyle: 'xs',
          fontWeight: 700,
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          color: 'textMuted',
          mb: '3',
        })}
      >
        Box Score
      </p>
      <div
        className={css({
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '4',
          py: '4',
          borderTop: '2px solid',
          borderBottom: '1px solid',
          borderTopColor: 'borderStrong',
          borderBottomColor: 'border',
        })}
      >
        <span
          className={css({
            fontFamily: 'display',
            textStyle: '2xl',
            color: 'text',
          })}
        >
          DET 6 · OPP <span className={css({ color: 'accentAlt' })}>0</span>
        </span>
        <span
          className={css({
            textStyle: '2xs',
            fontWeight: 500,
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textFaint',
          })}
        >
          Final
        </span>
      </div>
      <div className={css({ display: 'flex', flexDirection: 'column' })}>
        {rows.map((r) => (
          <div
            key={r.k}
            className={css({
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '3',
              py: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              fontVariantNumeric: 'tabular-nums',
            })}
          >
            <span
              className={css({
                textStyle: '2xs',
                fontWeight: 500,
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textMuted',
                whiteSpace: 'nowrap',
              })}
            >
              {r.k}
            </span>
            <span className={css({ textStyle: 'md', color: 'text', textAlign: 'right' })}>
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
