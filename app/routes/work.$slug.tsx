import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { projects, selectedWork } from '../content/projects'
import { CaseRow } from '../components/CaseRow'
import { SignalLog } from '../components/SignalLog'

export const Route = createFileRoute('/work/$slug')({ component: WorkDetailPage })

function WorkDetailPage() {
  const { slug } = Route.useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className={css({ padding: { base: '48px 20px', md: '96px 5vw' } })}>
        <p className={css({ fontFamily: 'mono', color: 'textMuted' })}>Case not found.</p>
      </section>
    )
  }

  const related = selectedWork.filter((p) => p.slug !== project.slug).slice(0, 3)

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
            CASE FILE — {project.type.toUpperCase()}
          </div>

          <h1
            className={css({
              fontFamily: 'mono',
              fontWeight: 'bold',
              fontSize: 'clamp(40px, 6vw, 120px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'accent',
              margin: 0,
            })}
          >
            {project.title}
          </h1>

          {project.problem && (
            <p
              className={css({
                marginTop: '32px',
                maxWidth: '52ch',
                fontSize: 'md',
                color: 'textSecondary',
                lineHeight: 'normal',
              })}
            >
              {project.problem}
            </p>
          )}

          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener"
              className={css({
                marginTop: '32px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: 'mono',
                fontSize: 'xs',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                color: 'accent',
                border: '1px solid',
                borderColor: 'border',
                padding: '12px 20px',
                width: 'fit-content',
                transition: 'color .18s ease-out, border-color .18s ease-out',
                _hover: { color: 'accentLight', borderColor: 'accent' },
              })}
            >
              VISIT LIVE SYSTEM →
            </a>
          )}
        </div>

        <Box gridColumn={{ lg: '8 / 13' }} marginTop={{ base: '40px', lg: 0 }}>
          <SignalLog
            title="PROJECT SPEC"
            rows={[
              ...(project.role ? [{ label: 'ROLE', value: project.role }] : []),
              { label: 'YEAR', value: String(project.year) },
              ...(project.stack ? [{ label: 'STACK', value: project.stack.join(', ') }] : []),
              ...(project.outcome ? [{ label: 'OUTCOME', value: project.outcome }] : []),
            ]}
          />
        </Box>
      </section>

      {related.length > 0 && (
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
              RELATED WORK
            </h2>
            <span className={css({ fontFamily: 'mono', fontSize: 'xs', color: 'neutral.500', letterSpacing: 'wide' })}>
              {String(related.length).padStart(2, '0')} ENTRIES
            </span>
          </div>

          {related.map((p, i) => (
            <CaseRow
              key={p.slug}
              idx={String(i).padStart(2, '0')}
              title={p.title}
              problem={p.problem ?? p.description ?? ''}
              type={p.type}
              year={p.year}
              status="LIVE"
              href={p.externalUrl ?? `/work/${p.slug}`}
              external={Boolean(p.externalUrl)}
            />
          ))}
        </section>
      )}
    </>
  )
}