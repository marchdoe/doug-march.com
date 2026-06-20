import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridAutoRows: 'auto',
        gap: '2px',
        width: '100vw',
        minHeight: '100vh',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          gap: '0',
        },
      })}
    >
      {/* Hero phrase block */}
      <div
        className={css({
          gridColumn: '1 / 10',
          gridRow: '1 / 5',
          minHeight: '72vh',
          padding: '5vw 5vw 3vw 6vw',
          background: 'bg',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            gridRow: 'auto',
            minHeight: '60vh',
            padding: '48px 24px 32px',
          },
        })}
      >
        <h1
          className={css({
            fontFamily: 'display',
            fontSize: 'clamp(72px, 13.5vw, 195px)',
            lineHeight: 'tight',
            letterSpacing: '-0.03em',
            color: 'accent',
            textTransform: 'uppercase',
            '@media (max-width: 768px)': {
              fontSize: 'clamp(48px, 15vw, 96px)',
            },
          })}
        >
          <span className={css({ display: 'block' })}>THE</span>
          <span className={css({ display: 'block' })}>LONGEST</span>
          <span className={css({ display: 'block' })}>DAY.</span>
        </h1>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            marginTop: '32px',
            '@media (max-width: 768px)': {
              fontSize: '11px',
              marginTop: '24px',
            },
          })}
        >
          JUNE 20, 2026 · SUMMER SOLSTICE EVE · 04:49 → 19:34
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '14px',
            color: 'textMuted',
            marginTop: '16px',
            letterSpacing: 'wide',
            textTransform: 'uppercase',
          })}
        >
          DOUG MARCH — PRODUCT DESIGNER & DEVELOPER
        </p>
      </div>

      {/* U.S. Open leaderboard block */}
      <div
        className={css({
          gridColumn: '10 / 13',
          gridRow: '1 / 3',
          padding: '32px 28px',
          background: 'bgCard',
          borderTop: '2px solid',
          borderColor: 'borderAccent',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            gridRow: 'auto',
            padding: '24px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '16px',
          })}
        >
          U.S. OPEN — IN PROGRESS
        </p>
        <div className={css({ marginBottom: '12px' })}>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '8px 0',
              borderBottom: '1px solid',
              borderColor: 'border',
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '15px',
                fontWeight: 'bold',
                color: 'text',
              })}
            >
              WYNDHAM CLARK
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'accent',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              −7
            </span>
          </div>
        </div>
        {[
          { name: 'X. SCHAUFFELE', score: '−3' },
          { name: 'S.I. KIM', score: '−3' },
          { name: 'M. STEVENS', score: '−3' },
          { name: 'M. FITZPATRICK', score: '−3' },
        ].map((p) => (
          <div
            key={p.name}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '6px 0',
              transition: 'background 0.15s',
              _hover: { background: 'bgElevated' },
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '13px',
                color: 'textSecondary',
              })}
            >
              {p.name}
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                fontWeight: 'medium',
                color: 'textSecondary',
                fontVariantNumeric: 'tabular-nums',
              })}
            >
              {p.score}
            </span>
          </div>
        ))}
      </div>

      {/* Signal strip block */}
      <div
        className={css({
          gridColumn: '10 / 13',
          gridRow: '3 / 5',
          padding: '24px 28px',
          background: 'bgCard',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            gridRow: 'auto',
            padding: '24px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: 'textMuted',
          })}
        >
          ◑ FIRST QUARTER · 35%
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontWeight: 'bold',
            color: 'accent',
          })}
        >
          DET 4–3 WIN
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accentLight',
          })}
        >
          FATHER'S DAY TOMORROW
        </p>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            lineHeight: 'normal',
          })}
        >
          MY MORNING JACKET · WET LEG · RADIOHEAD
        </p>
      </div>

      {/* Work index row */}
      <div
        className={css({
          gridColumn: '1 / 7',
          gridRow: '5',
          padding: '36px 6vw 96px',
          background: 'bg',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            gridRow: 'auto',
            padding: '32px 24px 64px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderTop: '2px solid',
            borderColor: 'borderAccent',
            paddingTop: '16px',
          })}
        >
          INDEX
        </p>

        {/* Featured project */}
        {featuredProject && (
          <div className={css({ marginBottom: '32px' })}>
            <a
              href={featuredProject.externalUrl || `/work/${featuredProject.slug}`}
              className={css({
                fontFamily: 'display',
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 'snug',
                letterSpacing: '-0.02em',
                color: 'text',
                textDecoration: 'none',
                display: 'inline-block',
                borderBottom: '2px solid transparent',
                transition: 'border-color 0.2s',
                _hover: { borderColor: 'accent', textDecoration: 'none!' },
                _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '4px' },
              })}
            >
              {featuredProject.title}
            </a>
            <p
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
                lineHeight: 'normal',
                marginTop: '8px',
                maxWidth: '55ch',
              })}
            >
              {featuredProject.problem}
            </p>
          </div>
        )}

        {/* Selected work */}
        {selectedWork.map((project) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '12px 0',
              borderBottom: '1px solid',
              borderColor: 'border',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
              _hover: { borderColor: 'accent', textDecoration: 'none!' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '16px',
                fontWeight: 'medium',
                color: 'text',
              })}
            >
              {project.title}
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                color: 'textMuted',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
              })}
            >
              {project.type} · {project.year}
            </span>
          </a>
        ))}

        {/* Experiments */}
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginTop: '32px',
            marginBottom: '12px',
          })}
        >
          EXPERIMENTS
        </p>
        {experiments.map((exp) => (
          <a
            key={exp.slug}
            href={exp.externalUrl || `/work/${exp.slug}`}
            className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '10px 0',
              borderBottom: '1px solid',
              borderColor: 'borderSubtle',
              textDecoration: 'none',
              _hover: { borderColor: 'accent', textDecoration: 'none!' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '14px',
                color: 'textSecondary',
              })}
            >
              {exp.title}
            </span>
            <span
              className={css({
                fontFamily: 'body',
                fontSize: '11px',
                color: 'textMuted',
                letterSpacing: 'wide',
              })}
            >
              {exp.type} · {exp.year}
            </span>
          </a>
        ))}
      </div>

      {/* About + nav block */}
      <div
        className={css({
          gridColumn: '7 / 13',
          gridRow: '5',
          padding: '36px 28px 96px',
          background: 'bgCard',
          '@media (max-width: 768px)': {
            gridColumn: '1',
            gridRow: 'auto',
            padding: '32px 24px 96px',
          },
        })}
      >
        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            letterSpacing: 'widest',
            textTransform: 'uppercase',
            color: 'textMuted',
            marginBottom: '24px',
            borderTop: '2px solid',
            borderColor: 'borderAccent',
            paddingTop: '16px',
          })}
        >
          CAPABILITIES
        </p>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
          })}
        >
          {capabilities.slice(0, 8).map((cap) => (
            <span
              key={cap}
              className={css({
                fontFamily: 'body',
                fontSize: '12px',
                color: 'textSecondary',
                letterSpacing: 'wide',
                textTransform: 'uppercase',
                padding: '4px 8px',
                border: '1px solid',
                borderColor: 'border',
              })}
            >
              {cap}
            </span>
          ))}
        </div>

        <blockquote
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            fontStyle: 'italic',
            color: 'textMuted',
            lineHeight: 'normal',
            maxWidth: '50ch',
            marginBottom: '48px',
            paddingLeft: '16px',
            borderLeft: '2px solid',
            borderColor: 'border',
          })}
        >
          "Within every obstacle is an opportunity to improve our condition."
        </blockquote>

        <div
          className={css({
            display: 'flex',
            gap: '24px',
          })}
        >
          <a
            href="/"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid transparent',
              _hover: { borderColor: 'accent', textDecoration: 'none!' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Work
          </a>
          <a
            href="/about"
            className={css({
              fontFamily: 'body',
              fontSize: '11px',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'textSecondary',
              textDecoration: 'none',
              padding: '8px 0',
              borderBottom: '1px solid transparent',
              _hover: { borderColor: 'accent', textDecoration: 'none!' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            About
          </a>
        </div>

        <p
          className={css({
            fontFamily: 'body',
            fontSize: '11px',
            color: 'textMuted',
            marginTop: '32px',
          })}
        >
          <a
            href="/archive"
            className={css({
              color: 'textMuted',
              textDecoration: 'none',
              _hover: { textDecoration: 'underline' },
              _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
            })}
          >
            Archive
          </a>
        </p>
      </div>
    </div>
  )
}