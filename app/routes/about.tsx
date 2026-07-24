import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Fold, FoldGrid, RailTitle } from '../components/FoldGrid'
import { Gloss } from '../components/Gloss'
import { identity, personal } from '../content/about'
import { timeline, capabilities, education } from '../content/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <>
      <section
        className={css({
          paddingTop: { base: '6', md: '8' },
          paddingBottom: { base: '7', md: '9' },
        })}
      >
        <div
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            fontWeight: 'semibold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginBottom: '5',
          })}
        >
          {identity.role}
        </div>
        <h1
          className={css({
            fontFamily: 'heading',
            fontWeight: 'medium',
            fontSize: { base: '40px', md: '72px' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            marginBottom: '7',
            maxWidth: '16ch',
          })}
        >
          {identity.name}
        </h1>
        <p
          className={css({
            fontFamily: 'heading',
            fontSize: { base: '19px', md: '24px' },
            lineHeight: 'snug',
            color: 'paper.800',
            maxWidth: '68ch',
          })}
        >
          {identity.statement}
        </p>
      </section>

      <Fold id="timeline">
        <FoldGrid
          main={
            <div>
              <h2
                className={css({
                  fontFamily: 'heading',
                  fontWeight: 'medium',
                  fontSize: { base: '28px', md: '44px' },
                  lineHeight: 'snug',
                  letterSpacing: 'tight',
                  color: 'text',
                  marginBottom: '8',
                })}
              >
                Timeline
              </h2>
              <div className={css({ borderTop: '1px solid', borderColor: 'border' })}>
                {timeline.map((entry, i) => (
                  <div
                    key={i}
                    className={css({
                      display: 'flex',
                      gap: { base: '3', md: '6' },
                      paddingY: '6',
                      borderBottom: '1px solid',
                      borderColor: 'border',
                      alignItems: 'baseline',
                    })}
                  >
                    <span
                      className={css({
                        flex: 'none',
                        width: '120px',
                        fontFamily: 'body',
                        fontSize: '2xs',
                        fontWeight: 'semibold',
                        letterSpacing: 'wide',
                        textTransform: 'uppercase',
                        color: 'textMuted',
                        fontVariantNumeric: 'tabular-nums',
                      })}
                    >
                      {entry.year}
                    </span>
                    <div>
                      <div
                        className={css({
                          fontFamily: 'heading',
                          fontWeight: 'medium',
                          fontSize: 'lg',
                          letterSpacing: 'tight',
                          color: 'text',
                          marginBottom: '2',
                        })}
                      >
                        {entry.role} <span className={css({ color: 'textMuted' })}>— {entry.company}</span>
                      </div>
                      <p
                        className={css({
                          fontFamily: 'body',
                          fontSize: 'sm',
                          lineHeight: 'normal',
                          color: 'paper.700',
                          maxWidth: '60ch',
                        })}
                      >
                        {entry.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          rail={
            <>
              <RailTitle>Capabilities</RailTitle>
              <div
                className={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '2',
                  fontFamily: 'body',
                  fontSize: '2xs',
                  fontWeight: 'semibold',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'paper.700',
                  marginBottom: '6',
                })}
              >
                {capabilities.map((cap, i) => (
                  <span key={cap}>
                    {cap}
                    {i < capabilities.length - 1 && <span className={css({ color: 'paper.400' })}> · </span>}
                  </span>
                ))}
              </div>
              <Gloss label="Education">
                {education.school} — {education.degree}, {education.concentration} ({education.years})
              </Gloss>
            </>
          }
        />
      </Fold>

      <Fold id="personal">
        <FoldGrid
          main={
            <p
              className={css({
                fontFamily: 'heading',
                fontSize: 'md',
                lineHeight: 'normal',
                color: 'paper.800',
                maxWidth: '64ch',
              })}
            >
              Currently focused on {personal.currentFocus}.
            </p>
          }
          rail={
            <>
              <RailTitle>In the margin</RailTitle>
              <Gloss label="Holes in one">{personal.holesInOne}</Gloss>
              <Gloss label={personal.sport}>{personal.teams.join(' / ')}</Gloss>
              <Gloss label="Current focus" note>
                {personal.currentFocus}
              </Gloss>
            </>
          }
        />
      </Fold>
    </>
  )
}