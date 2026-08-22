import { css } from '../../styled-system/css'

// Static shell chrome — appears identically on every page per Interior Notes.
// --strip (#22143d) has no exact token match; nearest semantic token is `bg`
// (violet.900 #1a1030) — substituted here per translation rules.
export function FooterStrip() {
  return (
    <footer
      className={css({
        bg: 'bg',
        borderTop: '1px solid',
        borderColor: 'border',
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: '1.1fr auto 1fr' },
        alignItems: { md: 'center' },
        gap: { base: '6', md: '8' },
        padding: { base: '6', md: '6 16', lg: '6 24' },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5',
          lineHeight: 'snug',
        })}
      >
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
          })}
        >
          Scottish Open · In Progress
        </span>
        <span
          className={css({
            fontFamily: 'display',
            fontSize: 'xl',
            letterSpacing: 'wide',
            color: 'text',
          })}
        >
          Tom Kim <span className={css({ color: 'accentGlow' })}>−14</span>
        </span>
        <span className={css({ fontSize: 'xs', color: 'textSecondary' })}>
          Min Woo Lee −13 · Fitzpatrick −13 · McIlroy −12
        </span>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: { base: 'flex-start', md: 'center' },
          justifyContent: 'center',
        })}
      >
        <span
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: 'full',
            padding: '2 4',
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'accentGlow',
            whiteSpace: 'nowrap',
          })}
        >
          <span className={css({ color: 'accent', fontSize: 'sm' })}>◐</span> New Moon · 2% Lit ·
          Day 28
        </span>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5',
          textAlign: { base: 'left', md: 'right' },
          alignItems: { base: 'flex-start', md: 'flex-end' },
        })}
      >
        <span
          className={css({
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'textMuted',
          })}
        >
          On Repeat
        </span>
        <span className={css({ fontSize: 'xs', color: 'textSecondary' })}>
          Guided by Voices{' '}
          <em className={css({ fontStyle: 'italic', color: 'text' })}>· Tobin Sprout</em>
        </span>
      </div>
    </footer>
  )
}
