import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* HERO */}
      <Box
        as="section"
        className={css({
          minHeight: { base: 'auto', md: '42vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingY: { base: '8', md: '10' },
          borderBottom: '1px solid',
          borderColor: 'border',
        })}
      >
        <p
          className={css({
            fontSize: { base: 'sm', md: 'md' },
            fontVariantCaps: 'all-small-caps',
            textTransform: 'lowercase',
            letterSpacing: 'wider',
            color: 'accent',
            marginBottom: '4',
            fontWeight: 'medium',
          })}
        >
          a shell colon does nothing
          <span className={css({ color: 'accentBright' })}>.</span>
        </p>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '5xl', md: '8xl', lg: '9xl' },
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
          })}
        >
          Use it
          <br />
          <span className={css({ color: 'accent', textShadow: '0 0 24px {colors.emerald.400/50}' })}>
            Anyway
          </span>
        </h1>
        <Flex
          gap="6"
          wrap="wrap"
          className={css({
            marginTop: '6',
            fontSize: '2xs',
            color: 'textMuted',
            letterSpacing: 'wide',
          })}
        >
          <span><span className={css({ color: 'pine.400' })}>src:</span> hacker news · 209 points</span>
          <span><span className={css({ color: 'pine.400' })}>this site:</span> demolished &amp; rebuilt nightly</span>
          <span><span className={css({ color: 'pine.400' })}>exit status:</span> 0</span>
        </Flex>
      </Box>

      {/* INDEX BODY */}
      <Box
        as="main"
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1.4fr 1fr 0.9fr' },
          paddingY: '8',
        })}
      >
        {/* WORK */}
        <Box
          as="section"
          id="work"
          className={css({
            paddingX: { base: 0, md: '8' },
            paddingTop: { base: '6', md: 0 },
            borderTop: { base: '1px solid', md: 'none' },
            borderColor: 'border',
          })}
        >
          <ColHead title="Selected Work" count={`${String(selectedWork.length).padStart(2, '0')} dirs`} />

          {featuredProject && (
            <Box
              className={css({
                paddingY: '4',
                borderBottom: '1px solid',
                borderColor: 'border',
                marginBottom: '2',
              })}
            >
              <p
                className={css({
                  fontSize: '2xs',
                  letterSpacing: 'wider',
                  textTransform: 'uppercase',
                  color: 'accent',
                  marginBottom: '2',
                  fontWeight: 'semibold',
                })}
              >
                ▸ featured — this machine
              </p>
              <h3
                className={css({
                  fontFamily: 'display',
                  fontSize: { base: '3xl', md: '5xl' },
                  lineHeight: 'snug',
                  letterSpacing: 'normal',
                  color: 'text',
                  marginBottom: '3',
                })}
              >
                {featuredProject.title}
              </h3>
              <p
                className={css({
                  fontSize: 'sm',
                  lineHeight: 'loose',
                  color: 'textSecondary',
                  maxWidth: '60ch',
                  marginBottom: '3',
                })}
              >
                {featuredProject.problem}
              </p>
              {featuredProject.externalUrl && (
                <a
                  href={featuredProject.externalUrl}
                  target="_blank"
                  rel="noopener"
                  className={css({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2',
                    fontSize: 'xs',
                    letterSpacing: 'normal',
                    color: 'accent',
                    minHeight: '44px',
                    _hover: { color: 'accentBright' },
                  })}
                >
                  run {featuredProject.title} <span>→</span>
                </a>
              )}
            </Box>
          )}

          <Box>
            {selectedWork.map((proj, i) => (
              <a
                key={proj.slug}
                href={`/work/${proj.slug}`}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '26px 1fr auto',
                  alignItems: 'baseline',
                  gap: '3',
                  paddingY: '3',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { background: 'rgba(41,206,127,0.03)' },
                })}
              >
                <span className={css({ fontSize: '2xs', color: 'pine.400', letterSpacing: 'wide' })}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={css({ fontSize: 'md', color: 'text', letterSpacing: 'normal' })}>
                  {proj.title}
                </span>
                <span
                  className={css({
                    textAlign: 'right',
                    fontSize: '2xs',
                    letterSpacing: 'wide',
                    color: 'textMuted',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {proj.type}
                  <span className={css({ color: 'pine.400', marginLeft: '2' })}>{proj.year}</span>
                </span>
              </a>
            ))}
          </Box>
        </Box>

        {/* EXPERIMENTS + COLOPHON */}
        <Box
          as="section"
          id="experiments"
          className={css({
            paddingX: { base: 0, md: '8' },
            paddingTop: { base: '6', md: 0 },
            marginTop: { base: '6', md: 0 },
            borderTop: '1px solid',
            borderLeft: { base: 'none', md: '1px solid' },
            borderColor: 'border',
          })}
        >
          <ColHead title="Experiments" count={`${String(experiments.length).padStart(2, '0')} dirs`} />
          <Box>
            {experiments.map((proj, i) => (
              <a
                key={proj.slug}
                href={proj.externalUrl ?? `/work/${proj.slug}`}
                target={proj.externalUrl ? '_blank' : undefined}
                rel={proj.externalUrl ? 'noopener' : undefined}
                className={css({
                  display: 'grid',
                  gridTemplateColumns: '26px 1fr auto',
                  alignItems: 'baseline',
                  gap: '3',
                  paddingY: '3',
                  borderBottom: '1px solid',
                  borderColor: 'border',
                  _hover: { background: 'rgba(41,206,127,0.03)' },
                })}
              >
                <span className={css({ fontSize: '2xs', color: 'pine.400', letterSpacing: 'wide' })}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={css({ fontSize: 'md', color: 'text', letterSpacing: 'normal' })}>
                  {proj.title}
                  {proj.externalUrl && (
                    <span className={css({ color: 'pine.400', fontSize: '2xs', marginLeft: '2' })}>↗</span>
                  )}
                </span>
                <span
                  className={css({
                    textAlign: 'right',
                    fontSize: '2xs',
                    letterSpacing: 'wide',
                    color: 'textMuted',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  })}
                >
                  {proj.type}
                  <span className={css({ color: 'pine.400', marginLeft: '2' })}>{proj.year}</span>
                </span>
              </a>
            ))}
          </Box>

          <Box marginTop="8">
            <ColHead title="Colophon" count="chassis" />
            <Box className={css({ fontSize: 'xs', color: 'textMuted', letterSpacing: 'normal' })}>
              <p className={css({ paddingY: '1' })}>display <span className={css({ color: 'accent' })}>::</span> Bebas Neue</p>
              <p className={css({ paddingY: '1' })}>body <span className={css({ color: 'accent' })}>::</span> IBM Plex Sans</p>
              <p className={css({ paddingY: '1' })}>hue <span className={css({ color: 'accent' })}>::</span> 150° phosphor emerald</p>
              <p className={css({ paddingY: '1' })}>radius <span className={css({ color: 'accent' })}>::</span> 0 — hard corners only</p>
            </Box>
          </Box>
        </Box>

        {/* SIGNAL LOG */}
        <Box
          as="aside"
          id="signal"
          className={css({
            paddingX: { base: 0, md: '8' },
            paddingTop: { base: '6', md: 0 },
            marginTop: { base: '6', md: 0 },
            borderTop: '1px solid',
            borderLeft: { base: 'none', md: '1px solid' },
            borderColor: 'border',
          })}
        >
          <ColHead title="Signal Log" count="live" />
          <Box>
            <LogGroup label="golf · 3M open">
              <LogLine name="Jackson Koivun" value="−20" lit />
              <LogLine name="Grillo / Kohles" value="−17" />
            </LogGroup>
            <LogGroup label="mlb · detroit">
              <LogLine name="Tigers L" value="2–3" dim />
            </LogGroup>
            <LogGroup label="sky">
              <LogLine name="Moon" value="waxing gibbous · 94%" />
            </LogGroup>
            <LogGroup label="now playing">
              <LogLine name="Wet Leg" value="↻" />
              <LogLine name="The War on Drugs" value="↻" />
            </LogGroup>
            <LogGroup label="source" last>
              <p className={css({ fontSize: 'xs', color: 'textMuted', letterSpacing: 'normal' })}>
                hn <span className={css({ color: 'accent' })}>·</span> 209{' '}
                <span className={css({ color: 'accent' })}>·</span> use it anyway
              </p>
            </LogGroup>
          </Box>
        </Box>
      </Box>
    </>
  )
}

function ColHead({ title, count }: { title: string; count: string }) {
  return (
    <Flex
      align="baseline"
      justify="space-between"
      className={css({
        paddingBottom: '3',
        marginBottom: '2',
        borderBottom: '1px solid',
        borderColor: 'pine.600',
      })}
    >
      <h2
        className={css({
          fontFamily: 'display',
          fontSize: 'xl',
          lineHeight: 'snug',
          letterSpacing: 'wide',
          color: 'text',
        })}
      >
        {title}
      </h2>
      <span
        className={css({
          fontSize: '2xs',
          letterSpacing: 'wider',
          color: 'pine.400',
          textTransform: 'uppercase',
        })}
      >
        {count}
      </span>
    </Flex>
  )
}

function LogGroup({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <Box
      className={css({
        paddingY: '3',
        borderBottom: last ? 'none' : '1px solid',
        borderColor: 'border',
      })}
    >
      <p className={css({ fontSize: '2xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'pine.400', marginBottom: '2' })}>
        {label}
      </p>
      {children}
    </Box>
  )
}

function LogLine({ name, value, lit, dim }: { name: string; value: string; lit?: boolean; dim?: boolean }) {
  return (
    <Flex
      align="baseline"
      justify="space-between"
      gap="3"
      className={css({
        fontSize: 'sm',
        lineHeight: 'normal',
        paddingY: '1',
        color: dim ? 'pine.400' : 'textSecondary',
      })}
    >
      <span className={css({ color: lit ? 'text' : undefined })}>{name}</span>
      <span
        className={css({
          whiteSpace: 'nowrap',
          color: dim ? 'pine.400' : lit ? 'accent' : 'textMuted',
          fontWeight: lit ? 'medium' : 'normal',
        })}
      >
        {value}
      </span>
    </Flex>
  )
}