import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { SectionLabel, Row, WorkRow, Featured } from '../components/Ledger'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const totalCount = selectedWork.length + experiments.length + (featuredProject ? 1 : 0)

  return (
    <>
      <div className={css({ marginBottom: { base: '2', md: '3' } })}>
        <h2
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            fontSize: { base: '2xl', md: 'clamp(1.5rem,3vw,2.5rem)' },
            lineHeight: 'snug',
            letterSpacing: 'tight',
            textTransform: 'lowercase',
            color: 'accent',
          })}
        >
          the other kind
          <br />
          has no time.
        </h2>
        <p
          className={css({
            marginTop: '5',
            maxWidth: '60ch',
            color: 'textMuted',
            fontSize: 'base',
            lineHeight: 'loose',
            borderLeft: '2px solid',
            borderColor: 'border',
            paddingLeft: '4',
          })}
        >
          &ldquo;If you want work well done, select a busy man; the other kind has no time.&rdquo;
        </p>
        <p
          className={css({
            marginTop: '2',
            fontWeight: 'semibold',
            fontSize: 'xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textFaint',
            paddingLeft: '4',
          })}
        >
          — Elbert Hubbard
        </p>
      </div>

      <SectionLabel label="Today's ledger" count="the work got done" />
      <Row label="Detroit Tigers" main="vs. Cleveland Guardians" value="W 2–1" />

      <div className={css({ padding: '4 0', borderBottom: '1px solid', borderColor: 'border' })}>
        <div
          className={css({
            fontSize: '2xs',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'textFaint',
            marginBottom: '3',
          })}
        >
          TOUR Championship · East Lake
        </div>
        {[
          ['Viktor Hovland', '−15', true],
          ['Ryan Gerard', '−14', false],
          ['Adam Scott', '−12', false],
          ['Ludvig Åberg', '−12', false],
          ['Scottie Scheffler', '−12', false],
        ].map(([who, sc, lead]) => (
          <div
            key={who as string}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '1 0',
            })}
          >
            <span
              className={css({
                fontSize: 'sm',
                color: 'text',
                fontWeight: lead ? 'semibold' : 'normal',
              })}
            >
              {who}
            </span>
            <span
              className={css({
                fontWeight: 'bold',
                fontSize: 'md',
                color: lead ? 'accent' : 'textMuted',
              })}
            >
              {sc}
            </span>
          </div>
        ))}
      </div>

      <Row label="Markets" main="SPY · S&P 500 ETF" value="−0.23%" muted />
      <Row label="On rotation" main="My Morning Jacket · Guided by Voices" value="♪" muted />

      <SectionLabel label="The work" count={`${totalCount} shipped & underway`} />

      {featuredProject && (
        <Featured>
          <span
            className={css({
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'accent',
            })}
          >
            Featured · {featuredProject.year}
          </span>
          <h3
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: { base: 'xl', md: 'clamp(1.5rem,3vw,2rem)' },
              letterSpacing: 'tight',
              color: 'text',
              margin: '3 0 3',
              textTransform: 'uppercase',
            })}
          >
            {featuredProject.title}
          </h3>
          {featuredProject.problem && (
            <p
              className={css({
                color: 'textMuted',
                fontSize: 'base',
                lineHeight: 'loose',
                maxWidth: '52ch',
              })}
            >
              {featuredProject.problem}
            </p>
          )}
          {featuredProject.externalUrl && (
            <a
              href={featuredProject.externalUrl}
              target="_blank"
              rel="noopener"
              className={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2',
                marginTop: '4',
                fontWeight: 'bold',
                fontSize: 'sm',
                color: 'fieldInk',
                bg: 'accent',
                padding: '3 4',
                _hover: { bg: 'accentAlt' },
              })}
            >
              Visit the live build <span>→</span>
            </a>
          )}
        </Featured>
      )}

      <div>
        {selectedWork.map((p) => (
          <WorkRow
            key={p.slug}
            title={p.title}
            type={p.type}
            year={p.year}
            href={`/work/${p.slug}`}
          />
        ))}
      </div>

      <SectionLabel label="Experiments" count="the idle hours, spent anyway" />
      <div>
        {experiments.map((p) => (
          <WorkRow
            key={p.slug}
            title={p.title}
            type={p.type}
            year={p.year}
            href={p.externalUrl ?? `/work/${p.slug}`}
            external={Boolean(p.externalUrl)}
          />
        ))}
      </div>
    </>
  )
}
