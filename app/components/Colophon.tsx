import { css } from '../../styled-system/css'

// Signal stack strings are the day's flavor content, matching the approved
// mockup's colophon exactly — not bound from content/* (there is no signal
// export), so they are written here verbatim.
export function Colophon() {
  const strong = css({ fontWeight: '600', color: 'fieldInk' })

  return (
    <footer
      className={css({
        borderTop: '1px solid',
        borderColor: 'borderStrong',
        background: 'field',
        color: 'fieldInkMuted',
        paddingX: 'clamp(24px, 6vw, 96px)',
        paddingY: 'clamp(28px, 4vh, 44px)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'clamp(24px, 6vw, 88px)',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minWidth: 0,
        overflowX: 'hidden',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1',
          fontSize: 'xs',
          lineHeight: 'loose',
          minWidth: 0,
          maxWidth: '100%',
        })}
      >
        <span
          className={css({
            fontSize: '2xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'fieldInkMuted',
            marginBottom: '1',
          })}
        >
          Doug March · dougmar.ch
        </span>
        <span>
          Build <b className={strong}>2026·09·02</b> · Labor Day <b className={strong}>in 5</b>
        </span>
        <span>
          Late summer · <b className={strong}>clear · 78°</b> ·{' '}
          <span className={css({ fontVariantNumeric: 'tabular-nums' })}>◑ 64%</span>
        </span>
        <span className={css({ fontVariantNumeric: 'tabular-nums' })}>
          SPY <b className={strong}>−0.69%</b> · Tigers <b className={strong}>2–15 L</b>
        </span>
        <span>
          on rotation · <b className={strong}>Radiohead</b> / <b className={strong}>Tobin Sprout</b>
        </span>
      </div>
      <div
        className={css({
          fontSize: '2xs',
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'fieldInkMuted',
          textAlign: { base: 'left', md: 'right' },
          lineHeight: 'loose',
        })}
      >
        Rebuilt nightly
        <br />a poster of restraint
      </div>
    </footer>
  )
}
