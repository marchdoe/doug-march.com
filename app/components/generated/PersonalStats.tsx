import { css } from '../../../styled-system/css'

type Personal = { holesInOne: number; sport: string; teams: string[]; currentFocus: string }

export function PersonalStats({ personal }: { personal: Personal }) {
  const rows = [
    { k: 'Holes-in-one', v: String(personal.holesInOne) },
    { k: 'Sport', v: personal.sport },
    { k: 'Teams', v: personal.teams.join(', ') },
    { k: 'Focus', v: personal.currentFocus },
  ]
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
        Stat Line
      </p>
      {rows.map((r) => (
        <div
          key={r.k}
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
            {r.k}
          </span>
          <span className={css({ textStyle: 'md', color: 'text', textAlign: 'right' })}>{r.v}</span>
        </div>
      ))}
    </div>
  )
}
