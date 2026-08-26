import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { CaseRow } from '../components/CaseRow'
import { SignalLog } from '../components/SignalLog'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const workEntries = [featuredProject, ...selectedWork].filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  )

  return (
    <>
      <section
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', lg: 'repeat(12, 1fr)' },
          padding: { base: '32px 20px 16px', md: '64px 5vw 32px' },
          position: 'relative',
        })}
      >
        <div
          className={css({
            gridColumn: { lg: '1 / 8' },
            minHeight: { lg: '62vh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
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
            INCIDENT REPORT — LIVE SYSTEM
          </div>

          <h1
            className={css({
              fontFamily: 'mono',
              fontWeight: 'bold',
              fontSize: 'clamp(56px, 9vw, 176px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'accent',
              textShadow: '0 0 48px token(colors.accentGlow)',
              margin: 0,
            })}
          >
            How Complex
            <br />
            Systems Fail
          </h1>

          <p
            className={css({
              marginTop: '32px',
              maxWidth: '46ch',
              fontSize: 'md',
              color: 'textSecondary',
              lineHeight: 'normal',
            })}
          >
            <strong className={css({ color: 'text', fontWeight: 'bold' })}>Doug March</strong> — product
            engineer. This site rebuilds itself nightly from a signal pipeline: a complex system, by
            definition, that could fail in every way the finding below describes.
          </p>

          <div
            className={css({
              marginTop: '40px',
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              fontFamily: 'mono',
              fontSize: 'xs',
              color: 'neutral.500',
              letterSpacing: 'wide',
            })}
          >
            <span>REF: HN-201PT</span>
            <span>STATUS: NOMINAL</span>
            <span>BUILD: 2026.08.23</span>
          </div>
        </div>

        <Box gridColumn={{ lg: '8 / 13' }} marginTop={{ base: '40px', lg: 0 }}>
          <SignalLog
            title="SIGNAL LOG"
            rows={[
              { label: 'TELEMETRY', value: 'BMW Champ. −17 (3-shot margin)' },
              { label: 'RESULT', value: 'Lions 17–13', tick: 'nominal' },
              { label: 'RESULT', value: 'Tigers 7–11', tick: 'failure' },
              { label: 'MARKET', value: 'SPY +0.41%' },
              { label: 'LUNAR', value: 'Waxing gibbous · 87.5%' },
              { label: 'AMBIENT', value: '80.8°F · sunny · Aldie, VA' },
              { label: 'AQI', value: '1 · good' },
            ]}
            marginalia={{ label: 'MARGINALIA', text: '"count to one hundred" — T. Jefferson' }}
            relatedReads={[
              { label: 'What I Wish Someone Told Me About Staff Eng', href: '/about' },
              { label: 'AGENT.md — writing instructions for agents', href: '/about' },
            ]}
          />
        </Box>
      </section>

      <section id="work" className={css({ padding: { base: '24px 20px 48px', md: '32px 5vw 96px' } })}>
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
            CASE LOG — SELECTED WORK
          </h2>
          <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'neutral.500', letterSpacing: 'wide' })}>
            {String(workEntries.length).padStart(2, '0')} ENTRIES
          </span>
        </div>

        {workEntries.map((project, i) => (
          <CaseRow
            key={project.slug}
            idx={String(i).padStart(2, '0')}
            title={project.title}
            problem={project.problem ?? project.description ?? ''}
            type={project.type}
            year={project.year}
            status={project === featuredProject ? 'RESOLVED' : 'LIVE'}
            href={project.externalUrl ?? `/work/${project.slug}`}
            external={Boolean(project.externalUrl)}
            tall={project === featuredProject}
          />
        ))}
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
            marginBottom: '4px',
          })}
        >
          <h2 className={css({ fontFamily: 'mono', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>
            EXPERIMENTS
          </h2>
          <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'neutral.500', letterSpacing: 'wide' })}>
            {String(experiments.length).padStart(2, '0')} ENTRIES
          </span>
        </div>

        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
            gap: '1px',
            bg: 'border',
            border: '1px solid',
            borderColor: 'border',
            marginTop: '4px',
          })}
        >
          {experiments.map((exp) => (
            <a
              key={exp.slug}
              href={exp.externalUrl ?? `/work/${exp.slug}`}
              target={exp.externalUrl ? '_blank' : undefined}
              rel={exp.externalUrl ? 'noopener' : undefined}
              className={css({
                bg: 'bgSubtle',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'background .18s ease-out',
                _hover: { bg: 'bgSidebar' },
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: '2xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'accentDark',
                })}
              >
                Experiment
              </span>
              <span className={css({ fontSize: 'md', fontWeight: 'bold', color: 'text' })}>{exp.title}</span>
              <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'textMuted', marginTop: 'auto' })}>
                {exp.year}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}