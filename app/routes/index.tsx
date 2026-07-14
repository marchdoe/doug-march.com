import { createFileRoute } from '@tanstack/react-router'
import { Grid, Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/')({ component: HomePage })

function WorkRow({ title, type, year, href, external }: { title: string; type: string; year: number; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'baseline',
        gap: '3',
        paddingY: '4',
        borderBottom: '1px solid',
        borderColor: 'border',
        transition: 'padding-left .15s ease',
        _hover: { paddingLeft: '2' },
      })}
    >
      <span>
        <span
          className={css({
            display: 'block',
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: 'md',
            letterSpacing: 'normal',
            color: 'text',
          })}
        >
          {title}
        </span>
        <span
          className={css({
            display: 'block',
            fontFamily: 'body',
            fontSize: 'xs',
            color: 'textMuted',
            marginTop: '1',
          })}
        >
          {type}
        </span>
      </span>
      <span
        className={css({
          fontFamily: 'display',
          fontWeight: 'normal',
          fontSize: 'xl',
          letterSpacing: 'normal',
          color: 'textMuted',
          whiteSpace: 'nowrap',
        })}
      >
        {year}
      </span>
    </a>
  )
}

function HomePage() {
  return (
    <Grid gridTemplateColumns={{ base: '1fr', md: '1.6fr 1fr' }} minH="100vh">
      {/* LEFT: cobalt confession */}
      <Box
        position="relative"
        bg="bg"
        paddingX={{ base: '5', md: '9' }}
        paddingTop={{ base: '20', md: '20' }}
        paddingBottom={{ base: '12', md: '10' }}
        minH={{ base: 'auto', md: '100vh' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex
          alignItems="center"
          gap="3"
          marginBottom={{ base: '5', md: '8' }}
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '2xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
          })}
        >
          <Box width={{ base: '28px', md: '54px' }} height="2px" background="accent" />
          Today's read · Jul 14 2026
        </Flex>

        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '40px', md: '72px', lg: '112px' },
            lineHeight: 'tight',
            letterSpacing: 'tight',
            textTransform: 'uppercase',
            color: 'text',
            maxWidth: '14ch',
          })}
        >
          It is better to point out your{' '}
          <span className={css({ color: 'accent' })}>own mistakes</span> than have somebody else do it.
        </h1>

        <p
          className={css({
            marginTop: { base: '6', md: '8' },
            fontFamily: 'body',
            fontWeight: 'medium',
            fontSize: 'sm',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textSecondary',
          })}
        >
          — Warren Buffett
        </p>
      </Box>

      {/* RIGHT: indigo ledger */}
      <Box
        bg="panel"
        color="text"
        paddingX={{ base: '5', md: '7' }}
        paddingY={{ base: '8', md: '9' }}
        display="flex"
        flexDirection="column"
        css={{ lineHeight: 'loose' }}
      >
        <h2
          className={css({
            fontFamily: 'display',
            fontWeight: 'normal',
            fontSize: { base: '30px', md: '40px' },
            lineHeight: 'tight',
            letterSpacing: 'normal',
            textTransform: 'uppercase',
            color: 'text',
            marginBottom: '1',
          })}
        >
          Pointed Out Today
        </h2>
        <p
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            color: 'textMuted',
            marginBottom: '7',
          })}
        >
          The day's honest self-reports, in the open.
        </p>

        <Flex
          alignSelf="flex-start"
          alignItems="center"
          gap="2"
          background="surface"
          borderRadius="sm"
          paddingX="3"
          paddingY="2"
          marginBottom="8"
          className={css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: '2xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'text',
          })}
        >
          <Box width="13px" height="13px" borderRadius="full" border="1.5px solid" borderColor="textMuted" />
          New Moon · 0.2%
        </Flex>

        <Box marginBottom="10">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            The Scoreline
          </Box>

          <Flex justify="space-between" align="baseline" gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
            <Box>
              <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '1' })}>
                › MLB · Detroit
              </Box>
              <Box className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: 'sm', color: 'text' })}>
                Tigers — shut out at home
              </Box>
            </Box>
            <Box className={css({ fontFamily: 'display', fontSize: 'xl', color: 'text', whiteSpace: 'nowrap' })}>
              0–5 <span className={css({ fontFamily: 'body', fontSize: 'xs', fontWeight: 'semibold', color: 'textMuted' })}>L</span>
            </Box>
          </Flex>

          <Flex justify="space-between" align="baseline" gap="4" paddingY="4" borderBottom="1px solid" borderColor="border">
            <Box>
              <Box className={css({ fontFamily: 'body', fontWeight: 'semibold', fontSize: '2xs', letterSpacing: 'wide', textTransform: 'uppercase', color: 'textMuted', marginBottom: '1' })}>
                › Genesis Scottish Open
              </Box>
              <Box className={css({ fontFamily: 'body', fontWeight: 'medium', fontSize: 'sm', color: 'text' })}>
                Tom Kim — the one clean card
              </Box>
            </Box>
            <Box className={css({ fontFamily: 'display', fontSize: 'xl', color: 'accent', whiteSpace: 'nowrap' })}>
              −17 <span className={css({ fontFamily: 'body', fontSize: 'xs', fontWeight: 'semibold', color: 'textMuted' })}>Final</span>
            </Box>
          </Flex>

          <p
            className={css({
              fontFamily: 'body',
              fontWeight: 'medium',
              fontSize: 'xs',
              letterSpacing: 'wide',
              textTransform: 'uppercase',
              color: 'textMuted',
              paddingTop: '4',
              lineHeight: 'loose',
            })}
          >
            On: <b className={css({ color: 'textSecondary', fontWeight: 'semibold' })}>Guided by Voices</b> ·{' '}
            <b className={css({ color: 'textSecondary', fontWeight: 'semibold' })}>My Morning Jacket</b> ·{' '}
            <b className={css({ color: 'textSecondary', fontWeight: 'semibold' })}>Radiohead</b>
          </p>
        </Box>

        {featuredProject && (
          <Box marginBottom="10">
            <Box
              className={css({
                fontFamily: 'body',
                fontWeight: 'bold',
                fontSize: '2xs',
                letterSpacing: 'wider',
                textTransform: 'uppercase',
                color: 'sky.300',
                paddingBottom: '3',
                borderBottom: '1px solid',
                borderColor: 'border',
                marginBottom: '2',
              })}
            >
              Featured
            </Box>
            <p className={css({ fontFamily: 'body', fontSize: '2xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'sky.300', marginBottom: '2' })}>
              {featuredProject.type} · {featuredProject.year}
            </p>
            <h3
              className={css({
                fontFamily: 'display',
                fontWeight: 'normal',
                fontSize: { base: '34px', md: '46px' },
                lineHeight: 'tight',
                letterSpacing: 'normal',
                textTransform: 'uppercase',
                color: 'text',
                margin: '1 0',
              })}
            >
              {featuredProject.title}
            </h3>
            {featuredProject.problem && (
              <p className={css({ fontFamily: 'body', fontSize: 'sm', lineHeight: 'loose', color: 'textSecondary', maxWidth: '42ch', marginBottom: '4' })}>
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
                  minHeight: '44px',
                  fontFamily: 'body',
                  fontWeight: 'semibold',
                  fontSize: 'xs',
                  letterSpacing: 'wide',
                  textTransform: 'uppercase',
                  color: 'accent',
                  borderBottom: '1px solid',
                  borderColor: 'accent',
                  paddingBottom: '1',
                  _hover: { color: 'sky.300', borderColor: 'sky.300' },
                })}
              >
                Visit the live site →
              </a>
            )}
          </Box>
        )}

        <Box marginBottom="10">
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            Selected Work
          </Box>
          {selectedWork.map((p) => (
            <WorkRow key={p.slug} title={p.title} type={p.type} year={p.year} href={`/work/${p.slug}`} />
          ))}
        </Box>

        <Box>
          <Box
            className={css({
              fontFamily: 'body',
              fontWeight: 'bold',
              fontSize: '2xs',
              letterSpacing: 'wider',
              textTransform: 'uppercase',
              color: 'sky.300',
              paddingBottom: '3',
              borderBottom: '1px solid',
              borderColor: 'border',
              marginBottom: '2',
            })}
          >
            Experiments
          </Box>
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
        </Box>
      </Box>
    </Grid>
  )
}