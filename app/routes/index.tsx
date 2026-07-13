import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Grid } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* FOLD 1 — HERO */}
      <section
        className={css({
          padding: { base: '12 6', md: '16 7vw' },
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          paddingTop: { base: '16', md: '24' },
        })}
      >
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            fontWeight: 'bold',
            marginBottom: { base: '5', md: '10' },
          })}
        >
          Doug March · design &amp; product · 2026-07-13
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'bold',
            textTransform: 'lowercase',
            fontSize: 'clamp(56px, 10vw, 148px)',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            color: 'text',
            margin: 0,
            maxWidth: { base: '100%', md: '82%' },
          })}
        >
          <span className={css({ display: 'block' })}>we can</span>
          <span className={css({ display: 'block' })}>
            <span className={css({ color: 'accent' })}>lose</span> our
          </span>
          <span className={css({ display: 'block' })}>way</span>
        </h1>
        <span
          className={css({
            marginTop: { base: '8', md: '16' },
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2',
            fontSize: 'xs',
            letterSpacing: 'wide',
            color: 'accent',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            width: 'fit-content',
          })}
        >
          <span
            aria-hidden="true"
            className={css({
              width: '16px',
              height: '16px',
              borderRadius: 'full',
              background:
                'radial-gradient(circle at 68% 40%, {colors.cyan.400} 0.4%, {colors.cyan.800} 6%)',
              border: '1px solid',
              borderColor: 'accent',
              boxShadow: '0 0 0 4px rgba(11,135,148,0.12)',
            })}
          />
          new moon · 0.4% lit · no light to steer by
        </span>
        <div
          className={css({
            position: 'absolute',
            bottom: { base: '6', md: '12' },
            right: '7vw',
            fontSize: '2xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            fontWeight: 'bold',
            display: { base: 'none', md: 'flex' },
            gap: '2',
            alignItems: 'center',
          })}
        >
          scroll ↓
        </div>
      </section>

      {/* FOLD 2 — QUOTE */}
      <section
        className={css({
          bg: 'cyan.200',
          minHeight: '80vh',
          padding: { base: '12 6', md: '16 7vw' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'cyan.800',
            fontWeight: 'bold',
            marginBottom: { base: '6', md: '10' },
          })}
        >
          the whole of it
        </p>
        <blockquote
          className={css({
            fontFamily: 'display',
            fontWeight: 'semibold',
            fontSize: 'clamp(26px, 4.4vw, 54px)',
            lineHeight: 'snug',
            color: 'text',
            maxWidth: '22ch',
            margin: 0,
          })}
        >
          No matter how smart we may think we are, no matter how committed we are to our truth,{' '}
          <span className={css({ color: 'accent' })}>we can lose our way.</span>
        </blockquote>
        <p
          className={css({
            marginTop: { base: '7', md: '12' },
            fontSize: 'sm',
            fontWeight: 'bold',
            letterSpacing: 'wide',
            color: 'cyan.800',
          })}
        >
          — Kamal Ravikant
        </p>
      </section>

      {/* FOLD 3 — EVIDENCE */}
      <section
        className={css({
          bg: 'spineBg',
          color: 'textOnSpine',
          padding: { base: '12 6', md: '16 7vw' },
        })}
      >
        <Box maxWidth="44ch" marginBottom={{ base: '8', md: '14' }}>
          <h2
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              textTransform: 'lowercase',
              fontSize: 'clamp(30px, 4.6vw, 56px)',
              lineHeight: 'snug',
              letterSpacing: 'tight',
              color: 'textOnSpine',
            })}
          >
            the certain, and the lost
          </h2>
          <p className={css({ color: 'cyan.200', fontSize: 'sm', marginTop: '4', maxWidth: '52ch' })}>
            Today's evidence that conviction is no map. Some walked in with a plan and still ended
            up in the fog — one didn't.
          </p>
        </Box>
        <Grid gridTemplateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap="4">
          <article
            className={css({
              gridColumn: { base: 'auto', md: 'span 2' },
              bg: 'cardBg',
              color: 'text',
              borderRadius: 'md',
              padding: '6',
              boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3',
              minHeight: '210px',
            })}
          >
            <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'textMuted', fontWeight: 'bold' })}>
              MLB · Detroit Tigers
            </span>
            <div className={css({ fontFamily: 'display', fontWeight: 'bold', letterSpacing: 'tight', fontSize: 'clamp(56px, 9vw, 104px)', lineHeight: '0.86', color: 'text' })}>
              0<span className={css({ color: 'accent' })}>–</span>5
            </div>
            <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold', marginTop: 'auto' })}>
              detroit, shut out despite the plan
            </span>
          </article>
          <article
            className={css({
              bg: 'cardBg',
              color: 'text',
              borderRadius: 'md',
              padding: '6',
              boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3',
              minHeight: '210px',
            })}
          >
            <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'textMuted', fontWeight: 'bold' })}>
              Golf · Scottish Open
            </span>
            <div className={css({ fontFamily: 'display', fontWeight: 'bold', letterSpacing: 'tight', fontSize: 'clamp(56px, 9vw, 104px)', lineHeight: '0.86', color: 'text' })}>
              −17
            </div>
            <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold', marginTop: 'auto' })}>
              tom kim — someone who didn't
            </span>
          </article>
          <article
            className={css({
              bg: 'cardBg',
              color: 'text',
              borderRadius: 'md',
              padding: '6',
              boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
              display: 'flex',
              flexDirection: 'column',
              gap: '3',
              minHeight: '210px',
            })}
          >
            <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'textMuted', fontWeight: 'bold' })}>
              Hacker News · artifact
            </span>
            <h3 className={css({ fontFamily: 'display', fontWeight: 'bold', fontSize: 'lg', letterSpacing: 'tight', color: 'text' })}>
              GhostLock
            </h3>
            <p className={css({ fontSize: 'sm', color: 'textSecondary', margin: 0 })}>
              15 years unseen — code that ran, unread, in the dark. A way lost and only now found.
            </p>
            <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold', marginTop: 'auto' })}>
              the long quiet drift
            </span>
          </article>
        </Grid>
      </section>

      {/* FOLD 4 — WORK */}
      <section id="work" className={css({ bg: 'bg', padding: { base: '12 6', md: '16 7vw' } })}>
        {featuredProject && (
          <article
            className={css({
              bg: 'cardBg',
              borderRadius: 'md',
              boxShadow: '0 20px 60px -24px rgba(16,107,118,0.28)',
              padding: { base: '6', md: '12' },
              marginBottom: { base: '8', md: '14' },
              display: 'grid',
              gap: '5',
            })}
          >
            <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'widest', color: 'accent', fontWeight: 'bold' })}>
              Featured
            </span>
            <h2
              className={css({
                fontFamily: 'display',
                fontWeight: 'bold',
                textTransform: 'lowercase',
                fontSize: 'clamp(38px, 6vw, 76px)',
                lineHeight: '0.94',
                letterSpacing: 'tight',
                color: 'text',
              })}
            >
              {featuredProject.title}
            </h2>
            <p className={css({ fontSize: 'md', color: 'textSecondary', maxWidth: '56ch', lineHeight: 'loose' })}>
              {featuredProject.problem}
            </p>
            <span className={css({ fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold' })}>
              {featuredProject.type} · {featuredProject.year}
            </span>
            {featuredProject.externalUrl && (
              <a
                href={featuredProject.externalUrl}
                target="_blank"
                rel="noopener"
                className={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2',
                  width: 'fit-content',
                  bg: 'accent',
                  color: 'cyan.50',
                  paddingX: '6',
                  paddingY: '3',
                  borderRadius: 'md',
                  minHeight: '44px',
                  fontWeight: 'bold',
                  fontSize: 'sm',
                  transition: 'background .2s ease, transform .2s ease',
                  _hover: { bg: 'spineBg', transform: 'translateY(-2px)' },
                })}
              >
                Visit the project ↗
              </a>
            )}
          </article>
        )}

        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '5',
            paddingBottom: '3',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Selected work
        </p>
        <div className={css({ display: 'grid', marginBottom: { base: '10', md: '16' } })}>
          {selectedWork.map((project) => (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'baseline',
                gap: '4',
                padding: '5 1',
                borderBottom: '1px solid',
                borderColor: 'border',
                transition: 'padding-left .25s ease',
                _hover: { paddingLeft: '3' },
              })}
            >
              <span
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'bold',
                  fontSize: 'clamp(22px, 3vw, 34px)',
                  letterSpacing: 'tight',
                  color: 'text',
                  _groupHover: {},
                })}
              >
                {project.title}
              </span>
              <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold' })}>
                {project.type}
              </span>
              <span className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'sm', color: 'textSecondary' })}>
                {project.year}
              </span>
            </a>
          ))}
        </div>

        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'widest',
            color: 'textMuted',
            fontWeight: 'bold',
            margin: 0,
            marginBottom: '5',
            paddingBottom: '3',
            borderBottom: '1px solid',
            borderColor: 'border',
          })}
        >
          Experiments
        </p>
        <div className={css({ display: 'grid', marginBottom: { base: '10', md: '16' } })}>
          {experiments.map((project) => (
            <a
              key={project.slug}
              href={project.externalUrl ?? `/work/${project.slug}`}
              target={project.externalUrl ? '_blank' : undefined}
              rel={project.externalUrl ? 'noopener' : undefined}
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                alignItems: 'baseline',
                gap: '4',
                padding: '5 1',
                borderBottom: '1px solid',
                borderColor: 'border',
                transition: 'padding-left .25s ease',
                _hover: { paddingLeft: '3' },
              })}
            >
              <span
                className={css({
                  fontFamily: 'display',
                  fontWeight: 'bold',
                  fontSize: 'clamp(22px, 3vw, 34px)',
                  letterSpacing: 'tight',
                  color: 'text',
                })}
              >
                {project.title}
              </span>
              <span className={css({ fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wide', color: 'textMuted', fontWeight: 'bold' })}>
                {project.type}
              </span>
              <span className={css({ fontFamily: 'display', fontWeight: 'semibold', fontSize: 'sm', color: 'textSecondary' })}>
                {project.year}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}