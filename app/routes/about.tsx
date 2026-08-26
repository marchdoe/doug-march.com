import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'
import { CaseRow } from '../components/CaseRow'
import { SignalLog } from '../components/SignalLog'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' },
          padding: { base: '32px 20px 16px', md: '64px 5vw 32px' },
        })}
      >
        <div
          className={css({
            gridColumn: { lg: '1 / 8' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          })}
        >
          <div
            className={css({
              fontFamily: 'mono',
              fontSize: 'xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textMuted',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            })}
          >
            <span className={css({ width: '8px', height: '8px', bg: 'accent', display: 'inline-block' })} />
            PERSONNEL FILE
          </div>

          <h1
            className={css({
              fontFamily: 'mono',
              fontWeight: 'bold',
              fontSize: 'clamp(40px, 5vw, 88px)',
              lineHeight: 'snug',
              letterSpacing: 'tight',
              color: 'accent',
              margin: 0,
            })}
          >
            {identity.name}
          </h1>
          <p
            className={css({
              marginTop: '16px',
              fontFamily: 'mono',
              fontSize: 'sm',
              letterSpacing: 'wide',
              color: 'textMuted',
              textTransform: 'uppercase',
            })}
          >
            {identity.role}
          </p>
          <p
            className={css({
              marginTop: '32px',
              maxWidth: '52ch',
              fontSize: 'md',
              color: 'textSecondary',
              lineHeight: 'normal',
            })}
          >
            {identity.statement}
          </p>
        </div>

        <Box gridColumn={{ lg: '8 / 13' }} marginTop={{ base: '40px', lg: 0 }}>
          <SignalLog
            title="PERSONNEL LOG"
            rows={[
              { label: 'HOLES-IN-ONE', value: String(personal.holesInOne) },
              { label: 'SPORT', value: personal.sport },
              { label: 'TEAMS', value: personal.teams.join(', ') },
              { label: 'FOCUS', value: personal.currentFocus },
            ]}
          />
        </Box>
      </section>

      <section className={css({ padding: { base: '24px 20px 48px', md: '32px 5vw 96px' } })}>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '16px',
            marginBottom: '4px',
          })}
        >
          <h2 className={css({ fontFamily: 'mono', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>
            SERVICE RECORD
          </h2>
          <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'neutral.500', letterSpacing: 'wide' })}>
            {String(timeline.length + 1).padStart(2, '0')} ENTRIES
          </span>
        </div>

        {timeline.map((entry) => (
          <CaseRow
            key={`${entry.year}-${entry.company}`}
            idx={entry.year}
            title={`${entry.role} — ${entry.company}`}
            problem={entry.description}
            type={entry.current ? 'CURRENT' : 'PAST'}
            status={entry.current ? 'CURRENT' : 'CLOSED'}
          />
        ))}

        <CaseRow
          idx={education.years}
          title={education.school}
          problem={`${education.degree} — ${education.concentration}`}
          type="EDUCATION"
          status="COMPLETE"
        />
      </section>

      <section className={css({ padding: { base: '0 20px 48px', md: '0 5vw 96px' } })}>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            borderBottom: '1px solid',
            borderColor: 'border',
            paddingBottom: '16px',
            marginBottom: '16px',
          })}
        >
          <h2 className={css({ fontFamily: 'mono', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>
            CAPABILITIES
          </h2>
        </div>

        <div className={css({ display: 'flex', flexWrap: 'wrap' })}>
          {capabilities.map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'mono',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'textMuted',
                border: '1px solid',
                borderColor: 'border',
                padding: '8px 16px',
                marginRight: '-1px',
                marginBottom: '-1px',
                transition: 'color .18s ease-out, border-color .18s ease-out',
                _hover: { color: 'accentLight', borderColor: 'accent' },
              })}
            >
              {cap}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}