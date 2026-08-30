import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { SectionLabel, Row } from '../components/Ledger'
import { projects } from '../content/projects'

export const Route = createFileRoute('/work/$slug')({ component: WorkPage })

function WorkPage() {
  const { slug } = Route.useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) {
    return (
      <div className={css({ padding: '6 0' })}>
        <h1 className={css({ fontFamily: 'display', fontSize: '2xl', color: 'text' })}>Project not found</h1>
        <a href="/" className={css({ color: 'accent', fontWeight: 'semibold' })}>
          ← back to index
        </a>
      </div>
    )
  }

  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      <SectionLabel label="Case study" count={project.depth === 'full' ? 'full depth' : 'lightweight'} />

      <div className={css({ display: 'grid', gap: '5', padding: '5 0', borderBottom: '1px solid', borderColor: 'border' })}>
        {project.problem && (
          <div>
            <h3 className={sectionTitle}>Problem</h3>
            <p className={sectionBody}>{project.problem}</p>
          </div>
        )}
        {project.approach && (
          <div>
            <h3 className={sectionTitle}>Approach</h3>
            <p className={sectionBody}>{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div>
            <h3 className={sectionTitle}>Outcome</h3>
            <p className={sectionBody}>{project.outcome}</p>
          </div>
        )}
      </div>

      {project.stack && project.stack.length > 0 && (
        <div className={css({ padding: '4 0', borderBottom: '1px solid', borderColor: 'border' })}>
          <h3 className={sectionTitle}>Stack</h3>
          <div className={css({ display: 'flex', flexWrap: 'wrap', gap: '2', marginTop: '2' })}>
            {project.stack.map((s) => (
              <span
                key={s}
                className={css({
                  fontSize: '2xs',
                  fontWeight: 'semibold',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'sand.300',
                  border: '1px solid',
                  borderColor: 'border',
                  padding: '1 2',
                })}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener"
          className={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            marginTop: '5',
            fontWeight: 'bold',
            fontSize: 'sm',
            color: 'fieldInk',
            bg: 'accent',
            padding: '3 4',
            _hover: { bg: 'gold.300' },
          })}
        >
          Visit live <span>→</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener"
          className={css({ display: 'block', marginTop: '3', color: 'sand.300', fontWeight: 'semibold', _hover: { color: 'accent' } })}
        >
          View source →
        </a>
      )}

      {project.context && (
        <div className={css({ marginTop: '7' })}>
          <h3 className={sectionTitle}>Context</h3>
          <p className={sectionBody}>{project.context}</p>
        </div>
      )}

      {project.constraints && project.constraints.length > 0 && (
        <div className={css({ marginTop: '6' })}>
          <h3 className={sectionTitle}>Constraints</h3>
          <ul className={css({ marginTop: '2', paddingLeft: '4', display: 'grid', gap: '1' })}>
            {project.constraints.map((c, i) => (
              <li key={i} className={sectionBody}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.process && project.process.length > 0 && (
        <div className={css({ marginTop: '6' })}>
          <h3 className={sectionTitle}>Process</h3>
          <ol className={css({ marginTop: '3', display: 'grid', gap: '4', listStyle: 'none', padding: '0' })}>
            {project.process.map((step, i) => (
              <li
                key={i}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr',
                  gap: '3',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  paddingBottom: '3',
                })}
              >
                <span className={css({ color: 'accent', fontWeight: 'bold', fontSize: 'sm' })}>{i + 1}</span>
                <div>
                  <div className={css({ fontWeight: 'semibold', color: 'text', fontSize: 'sm' })}>{step.phase}</div>
                  <div className={css({ color: 'sand.300', fontSize: 'sm', marginTop: '1' })}>{step.does}</div>
                  <div className={css({ color: 'sand.400', fontSize: 'xs', marginTop: '1', fontStyle: 'italic' })}>
                    → {step.produces}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {project.decisions && project.decisions.length > 0 && (
        <div className={css({ marginTop: '6' })}>
          <h3 className={sectionTitle}>Decisions</h3>
          <div className={css({ marginTop: '3', display: 'grid', gap: '4' })}>
            {project.decisions.map((d, i) => (
              <div key={i} className={css({ borderLeft: '2px solid', borderColor: 'accent', paddingLeft: '3' })}>
                <div className={css({ fontWeight: 'semibold', color: 'text', fontSize: 'sm' })}>{d.decision}</div>
                <div className={css({ color: 'sand.300', fontSize: 'sm', marginTop: '1' })}>{d.why}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.references && project.references.length > 0 && (
        <div className={css({ marginTop: '6' })}>
          <h3 className={sectionTitle}>References</h3>
          <div className={css({ marginTop: '3', display: 'grid', gap: '3' })}>
            {project.references.map((r, i) => (
              <div key={i}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener"
                  className={css({ color: 'accent', fontWeight: 'semibold', fontSize: 'sm', _hover: { color: 'gold.300' } })}
                >
                  {r.title}
                </a>
                {r.note && <div className={css({ color: 'sand.400', fontSize: 'xs', marginTop: '1' })}>{r.note}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <SectionLabel label="More work" count="prev / next" />
      <Row main={prev.title} value="← prev" />
      <a href={`/work/${prev.slug}`} className={css({ display: 'none' })} aria-hidden="true" />
      {[
        { p: prev, dir: '← prev' },
        { p: next, dir: 'next →' },
      ].map(({ p, dir }) => (
        <a
          key={dir}
          href={`/work/${p.slug}`}
          className={css({
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            padding: '4 0',
            borderBottom: '1px solid',
            borderColor: 'border',
            _hover: { color: 'accent' },
          })}
        >
          <span className={css({ fontFamily: 'display', fontWeight: 'bold', textTransform: 'uppercase', color: 'text' })}>
            {p.title}
          </span>
          <span className={css({ color: 'sand.400', fontSize: 'xs', letterSpacing: 'wide', textTransform: 'uppercase' })}>
            {dir}
          </span>
        </a>
      ))}
    </>
  )
}

const sectionTitle = css({
  fontFamily: 'body',
  fontWeight: 'bold',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'accent',
})

const sectionBody = css({
  color: 'sand.300',
  fontSize: 'base',
  lineHeight: 'loose',
  marginTop: '2',
  maxWidth: '65ch',
})