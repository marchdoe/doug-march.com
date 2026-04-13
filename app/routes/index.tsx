import { createFileRoute } from '@tanstack/react-router'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const sectionLabelText = css({
  fontFamily: 'body',
  fontWeight: '400',
  color: 'text.muted',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
})

const monoMuted = css({
  fontFamily: 'mono',
  color: 'text.muted',
  letterSpacing: 'wider',
})

const workRow = css({
  display: 'grid',
  alignItems: 'center',
  textDecoration: 'none',
  borderBottom: '1px solid',
  borderColor: 'border',
  transition: 'background 150ms ease',
  _hover: {
    background: 'bg.secondary',
    textDecoration: 'none',
  },
  '&:hover .row-arrow': {
    transform: 'translateX(4px)',
    color: '#2B8880',
  },
})

const rowArrow = css({
  color: 'text.muted',
  transition: 'transform 150ms ease, color 150ms ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
})

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0' }}>
      <span className={sectionLabelText} style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: '1', height: '1px', background: '#C8D1C2' }} />
    </div>
  )
}

const COL = '48px 1fr 72px 160px 24px'

function TableHeaders({ cols }: { cols: string[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: COL,
        paddingTop: '16px',
        paddingBottom: '8px',
        borderBottom: '1px solid #C8D1C2',
      }}
    >
      {cols.map((h, i) => (
        <span key={i} className={sectionLabelText} style={{ fontSize: '9px' }}>
          {h}
        </span>
      ))}
    </div>
  )
}

function HomePage() {
  const allWork = [
    ...(featuredProject ? [featuredProject] : []),
    ...selectedWork,
  ]
  const featuredOffset = featuredProject ? 1 : 0

  return (
    <div>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

        {/* HERO */}
        <section style={{ paddingTop: '96px', paddingBottom: '64px' }}>
          <h1
            className={css({
              fontFamily: 'heading',
              fontWeight: '800',
              fontSize: '2xl',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
            })}
            style={{ margin: 0 }}
          >
            DOUG
            <br />
            MARCH
          </h1>

          <div style={{ height: '1px', background: '#C8D1C2', margin: '32px 0 24px' }} />

          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              color: 'text.secondary',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              margin: '0',
            })}
            style={{ fontSize: '14px' }}
          >
            Product Designer &amp; Developer &nbsp;×&nbsp; 2026
          </p>
        </section>

        {/* EPIGRAPH */}
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto 96px',
            paddingBottom: '48px',
            borderBottom: '1px solid #C8D1C2',
            textAlign: 'center',
          }}
        >
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              fontStyle: 'italic',
              color: 'text.secondary',
              lineHeight: 'loose',
              margin: '0 0 16px',
            })}
            style={{ fontSize: '16px' }}
          >
            "A wise man will be master of his mind; a fool will be its slave."
          </p>
          <p
            className={css({
              fontFamily: 'body',
              fontWeight: '400',
              color: 'text.muted',
              letterSpacing: 'wider',
              margin: '0',
            })}
            style={{ fontSize: '11px' }}
          >
            — Publilius Syrus
          </p>
        </div>

        {/* SELECTED WORK */}
        <section style={{ paddingBottom: '80px' }}>
          <SectionLabel label="Selected Work" />
          <TableHeaders cols={['#', 'Project', 'Year', 'Type', '']} />

          {allWork.map((project, i) => {
            const isFeatured = project.featured === true
            const displayIdx = isFeatured
              ? '★'
              : String(i - featuredOffset + 1).padStart(2, '0')

            return (
              <a
                key={project.slug}
                href={`/work/${project.slug}`}
                className={workRow}
                style={{ gridTemplateColumns: COL, height: '48px', paddingRight: '4px' }}
              >
                <span className={monoMuted} style={{ fontSize: '11px' }}>
                  {displayIdx}
                </span>

                <span
                  className={css({
                    fontFamily: 'body',
                    fontWeight: '500',
                    color: 'text',
                    fontSize: 'sm',
                    display: 'flex',
                    alignItems: 'center',
                  })}
                  style={{ gap: '10px' }}
                >
                  {project.title}
                  {isFeatured && (
                    <span
                      className={css({
                        fontFamily: 'mono',
                        color: 'accent',
                        letterSpacing: 'widest',
                        textTransform: 'uppercase',
                      })}
                      style={{ fontSize: '8px' }}
                    >
                      Featured
                    </span>
                  )}
                </span>

                <span className={monoMuted} style={{ fontSize: '11px' }}>
                  {project.year}
                </span>

                <span
                  className={css({ fontFamily: 'body', color: 'text.secondary' })}
                  style={{ fontSize: '13px' }}
                >
                  {project.type}
                </span>

                <span className={`row-arrow ${rowArrow}`} style={{ fontSize: '14px' }}>
                  →
                </span>
              </a>
            )
          })}
        </section>

        {/* EXPERIMENTS */}
        <section style={{ paddingBottom: '96px' }}>
          <SectionLabel label="Experiments" />
          <TableHeaders cols={['#', 'Project', 'Year', 'Notes', '']} />

          {experiments.map((exp, i) => (
            <a
              key={exp.slug}
              href={`/work/${exp.slug}`}
              className={workRow}
              style={{ gridTemplateColumns: COL, height: '48px', paddingRight: '4px' }}
            >
              <span className={monoMuted} style={{ fontSize: '11px' }}>
                E{i + 1}
              </span>

              <span
                className={css({ fontFamily: 'body', fontWeight: '500', color: 'text', fontSize: 'sm' })}
              >
                {exp.title}
              </span>

              <span className={monoMuted} style={{ fontSize: '11px' }}>
                {exp.year}
              </span>

              <span
                className={css({
                  fontFamily: 'body',
                  color: 'text.secondary',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                })}
                style={{ fontSize: '13px' }}
              >
                {exp.description
                  ? exp.description.length > 42
                    ? exp.description.substring(0, 42) + '…'
                    : exp.description
                  : exp.type}
              </span>

              <span className={`row-arrow ${rowArrow}`} style={{ fontSize: '14px' }}>
                →
              </span>
            </a>
          ))}
        </section>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid #C8D1C2',
          background: '#E4E9DF',
          paddingTop: '28px',
          paddingBottom: '28px',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            className={css({ fontFamily: 'mono', color: 'text.muted', letterSpacing: 'wider' })}
            style={{ fontSize: '11px' }}
          >
            DET &nbsp; PIS 133–121 W &nbsp;·&nbsp; TIG 8–2 W
          </span>

          <span
            className={css({ fontFamily: 'body', fontWeight: '300', color: 'text.muted' })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            doug-march.com &nbsp;©&nbsp; 2026
          </span>

          <a
            href="/archive"
            className={css({
              fontFamily: 'body',
              fontWeight: '300',
              color: 'text.muted',
              textDecoration: 'none',
              transition: 'color 200ms ease',
              _hover: { color: 'text.secondary', textDecoration: 'none' },
            })}
            style={{ fontSize: '11px', letterSpacing: '0.05em' }}
          >
            Archive
          </a>
        </div>
      </footer>
    </div>
  )
}