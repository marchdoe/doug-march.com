import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { SectionLabel, Row } from '../components/Ledger'
import { identity } from '../content/about'
import { timeline } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <div className={css({ marginBottom: '3' })}>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: { base: '3xl', md: 'clamp(2.5rem,5vw,4.5rem)' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
          })}
        >
          {identity.statement}
        </h1>
      </div>

      <SectionLabel label="Timeline" count={`${timeline.length} entries`} />
      <div>
        {timeline.map((t, i) => (
          <div
            key={i}
            className={css({
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '1 5',
              padding: '4 0',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <span
              className={css({
                fontVariantNumeric: 'tabular-nums',
                fontWeight: 'bold',
                fontSize: 'sm',
                color: 'accent',
                gridColumn: '1',
                gridRow: '1 / -1',
                minWidth: '120px',
              })}
            >
              {t.year}
            </span>
            <span
              className={css({
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'text',
                gridColumn: '2',
              })}
            >
              {t.role} · {t.company}
            </span>
            <span className={css({ fontSize: 'sm', color: 'textMuted', gridColumn: '2' })}>
              {t.description}
            </span>
          </div>
        ))}
      </div>

      <Row label="Contact" main={identity.name} value={identity.role} muted />
    </>
  )
}
