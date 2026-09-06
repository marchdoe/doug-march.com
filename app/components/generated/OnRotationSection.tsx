import { css } from '../../../styled-system/css'

const rows = ['Wet Leg', 'My Morning Jacket']

export function OnRotationSection() {
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
        On Rotation
      </p>
      {rows.map((r) => (
        <div
          key={r}
          className={css({
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '3',
            py: '2',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          <span
            className={css({
              textStyle: '2xs',
              fontWeight: 500,
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textMuted',
            })}
          >
            Playing
          </span>
          <span className={css({ textStyle: 'md', color: 'text' })}>{r}</span>
        </div>
      ))}
    </div>
  )
}
