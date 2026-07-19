import { createFileRoute } from '@tanstack/react-router'
import { Box } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { featuredProject, selectedWork, experiments } from '../content/projects'
import { capabilities } from '../content/timeline'

export const Route = createFileRoute('/')({ component: HomePage })

const eyebrow = css({
  fontSize: 'xs',
  fontWeight: 'bold',
  letterSpacing: 'wider',
  textTransform: 'uppercase',
  color: 'text',
  paddingBottom: '2',
  marginBottom: '4',
  borderBottom: '2px solid',
  borderColor: 'border',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '3',
})

const subhead = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'md',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  margin: '6 0 3',
  paddingTop: '4',
  borderTop: '2px solid',
  borderColor: 'border',
})

const bodyText = css({
  fontSize: 'sm',
  lineHeight: 'normal',
  color: 'text',
  maxWidth: '64ch',
  marginBottom: '4',
})

const worklist = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

const worklistItem = css({
  borderBottom: '1px solid',
  borderColor: 'border',
  _first: { borderTop: '1px solid', borderColor: 'border' },
})

const worklistLink = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: '3',
  width: '100%',
  padding: '2px 4px',
  margin: '-2px -4px',
  transition: 'background .16s ease, color .16s ease',
  _hover: { bg: 'panel', color: 'knockout' },
})

const wt = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  fontSize: 'lg',
  textTransform: 'uppercase',
  letterSpacing: 'tight',
})

const wm = css({
  fontSize: '2xs',
  letterSpacing: 'wide',
  textTransform: 'uppercase',
  color: 'text',
})

function HomePage() {
  return (
    <>
      {/* BANNER */}
      <Box
        bg="bg"
        minH="34vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={{ base: '5', md: '12' }}
        py={{ base: '5', md: '8' }}
        borderBottom="2px solid"
        borderColor="border"
      >
        <Box
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          color="text"
          marginBottom="3"
          display="flex"
          gap="4"
          alignItems="center"
          flexWrap="wrap"
        >
          <span>Front Page</span>
          <span className={css({ color: 'accent' })}>★</span>
          <span>The Grind Report</span>
          <span className={css({ color: 'accent' })}>★</span>
          <span>Vol. 26 · No. 200</span>
        </Box>
        <styled_h1 />
        <Box
          as="p"
          marginTop="4"
          fontSize={{ base: 'sm', md: 'md' }}
          lineHeight="normal"
          color="text"
          maxWidth="60ch"
          fontStyle="italic"
        >
          A portfolio that tears itself down and rebuilds from scratch every dawn — because the
          work is the only thing that pays.
        </Box>
      </Box>

      {/* COLUMN BODY */}
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: '1.6fr 1fr 1fr' }}
        minH="52vh"
      >
        {/* COLUMN 1 */}
        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderColor="border"
        >
          <Box className={eyebrow}>
            <span>The Lede</span>
            <span className={css({ color: 'accent' })}>Editorial</span>
          </Box>
          <Box
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: { base: 'xl', md: '2xl' },
              lineHeight: 'tight',
              textTransform: 'uppercase',
              letterSpacing: 'tight',
              marginBottom: '4',
            })}
          >
            <span className={css({ color: 'accent', fontSize: '1.3em' })}>&ldquo;</span>
            If you do the work you get rewarded. There are no shortcuts in life.
            <span className={css({ color: 'accent', fontSize: '1.3em' })}>&rdquo;</span>
          </Box>
          <Box
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
            marginBottom="6"
          >
            — Michael Jordan
          </Box>
          <Box as="p" className={bodyText}>
            The line reads like a stencil painted over a locker-room door: flat, undeniable, and
            impossible to argue with. It is also the operating principle of this page, which
            refuses to reuse yesterday&rsquo;s build and grinds out a brand-new front section
            every single morning — new grid, new type, new ink.
          </Box>

          <Box as="h3" className={subhead}>
            The Craft — On the Record
          </Box>
          <Box as="p" fontSize="sm" lineHeight="normal" color="text">
            Every edition is assembled by hand.{' '}
            {capabilities.map((cap, i) => (
              <span key={cap}>
                <b className={css({ color: 'text', fontWeight: 'bold' })}>{cap}</b>
                {i < capabilities.length - 1 ? '; ' : '.'}
              </span>
            ))}{' '}
            No templates, no reruns, no shortcuts — one clean stroke, one clean inning at a time.
          </Box>

          <Box as="h3" className={subhead} id="work">
            Featured — Front Page Story
          </Box>
          {featuredProject && (
            <Box bg="panel" color="knockout" padding="5" marginTop="2">
              <Box
                fontSize="2xs"
                letterSpacing="widest"
                textTransform="uppercase"
                color="bg"
                fontWeight="bold"
              >
                {featuredProject.type} · {featuredProject.year}
              </Box>
              <Box
                as="h3"
                fontFamily="display"
                fontWeight="bold"
                fontSize="xl"
                lineHeight="tight"
                textTransform="uppercase"
                margin="2 0 3"
                color="knockout"
              >
                {featuredProject.title}
              </Box>
              {featuredProject.problem && (
                <Box as="p" fontSize="sm" lineHeight="normal" color="knockout" marginBottom="4">
                  {featuredProject.problem}
                </Box>
              )}
              {(featuredProject.externalUrl || featuredProject.liveUrl) && (
                <a
                  href={featuredProject.externalUrl || featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={css({
                    fontSize: 'xs',
                    fontWeight: 'bold',
                    letterSpacing: 'wide',
                    textTransform: 'uppercase',
                    color: 'bg',
                    borderBottom: '2px solid',
                    borderColor: 'bg',
                    paddingBottom: '1px',
                    transition: 'background .18s ease, color .18s ease',
                    _hover: { bg: 'bg', color: 'panel' },
                  })}
                >
                  Read the full story ↗
                </a>
              )}
            </Box>
          )}

          <Box as="h3" className={subhead}>
            Selected Work — The Section
          </Box>
          <Box as="ul" className={worklist}>
            {selectedWork.map((p) => (
              <Box as="li" key={p.slug} className={worklistItem}>
                <a href={`/work/${p.slug}`} className={worklistLink}>
                  <span className={wt}>{p.title}</span>
                  <span className={wm}>
                    {p.type} · {p.year}
                  </span>
                </a>
              </Box>
            ))}
          </Box>
        </Box>

        {/* COLUMN 2 */}
        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderLeft={{ base: 'none', md: '2px solid' }}
          borderColor="border"
        >
          <Box className={eyebrow}>
            <span>The Open — Live</span>
            <span className={css({ color: 'accent' })}>Golf</span>
          </Box>
          <Box as="p" className={bodyText}>
            Grinding it out at the 154th Open Championship. Wins get assembled one clean stroke at
            a time — and the leaders are proving it under a hard afternoon sky.
          </Box>
          <Box as="ol" listStyle="none" margin="0" padding="0" fontSize="sm">
            {[
              { pos: '1', plr: 'Sam Burns', scr: '−10', leader: true },
              { pos: '2', plr: 'Rory McIlroy', scr: '−8' },
              { pos: 'T3', plr: 'Scottie Scheffler', scr: '−7' },
              { pos: 'T3', plr: 'Xander Schauffele', scr: '−7' },
              { pos: '5', plr: 'Tommy Fleetwood', scr: '−6' },
              { pos: '6', plr: 'Viktor Hovland', scr: '−5' },
            ].map((row) => (
              <Box
                as="li"
                key={row.plr}
                display="grid"
                style={{ gridTemplateColumns: '24px 1fr auto' }}
                gap="3"
                alignItems="baseline"
                padding="2 2"
                lineHeight="snug"
                borderBottom="1px solid"
                borderColor="border"
                bg={row.leader ? 'panel' : undefined}
                color={row.leader ? 'knockout' : undefined}
              >
                <span className={css({ fontWeight: 'bold', fontSize: 'xs', color: row.leader ? 'bg' : 'text' })}>
                  {row.pos}
                </span>
                <span className={css({ fontWeight: 'bold' })}>{row.plr}</span>
                <span
                  className={css({
                    fontWeight: 'bold',
                    letterSpacing: 'tight',
                    color: row.leader ? 'bg' : 'accent',
                    fontSize: row.leader ? 'md' : 'sm',
                  })}
                >
                  {row.scr}
                </span>
              </Box>
            ))}
          </Box>
          <Box fontSize="2xs" letterSpacing="wide" textTransform="uppercase" color="text" marginTop="3">
            Final round in progress · Leaders through 12
          </Box>

          <Box as="h3" className={subhead}>
            Almanac — The Light
          </Box>
          <Box as="p" fontSize="sm" lineHeight="normal" color="text">
            Sun up <b>05:04</b>, down <b>19:28</b> — <b>14h 24m</b> of daylight to bank. Moon:
            waxing crescent, <b>30%</b> illuminated. Long days reward long work.
          </Box>
        </Box>

        {/* COLUMN 3 */}
        <Box
          padding={{ base: '5', md: '6' }}
          borderTop={{ base: '2px solid', md: 'none' }}
          borderLeft={{ base: 'none', md: '2px solid' }}
          borderColor="border"
        >
          <Box className={eyebrow}>
            <span>The Diamond</span>
            <span className={css({ color: 'accent' })}>Baseball</span>
          </Box>
          <Box
            bg="panel"
            color="knockout"
            padding="5"
            marginBottom="5"
            display="grid"
            style={{ gridTemplateColumns: '1fr auto' }}
            alignItems="center"
            gap="3"
          >
            <Box>
              <Box fontFamily="display" fontWeight="bold" fontSize="lg" textTransform="uppercase" lineHeight="1" color="accent">
                Tigers
                <Box as="small" display="block" fontSize="2xs" letterSpacing="wide" color="bg" fontWeight="normal" marginTop="1">
                  Detroit · Final
                </Box>
              </Box>
              <Box fontFamily="display" fontWeight="bold" fontSize="lg" textTransform="uppercase" lineHeight="1" marginTop="4">
                Visitors
                <Box as="small" display="block" fontSize="2xs" letterSpacing="wide" color="bg" fontWeight="normal" marginTop="1">
                  Away · Final
                </Box>
              </Box>
            </Box>
            <Box fontFamily="display" fontWeight="bold" fontSize="4xl" lineHeight="1" color="accent" textAlign="right">
              7
              <Box as="small" display="block" fontSize="lg" color="knockout" lineHeight="1" textAlign="right">
                0
              </Box>
            </Box>
          </Box>
          <Box fontSize="2xs" letterSpacing="wide" textTransform="uppercase" color="text" marginBottom="6">
            Shutout · Nine innings, none surrendered
          </Box>

          <Box as="h3" className={subhead}>
            On the Wire — Now Playing
          </Box>
          <Box as="ul" listStyle="none" margin="0 0 4" padding="0">
            {[
              { art: 'The War on Drugs', tk: 'Red Eyes' },
              { art: 'Wet Leg', tk: 'Chaise Longue' },
            ].map((w) => (
              <Box as="li" key={w.art} padding="2 0" borderBottom="1px solid" borderColor="border" fontSize="sm" lineHeight="normal">
                <span className={css({ fontWeight: 'bold', textTransform: 'uppercase' })}>{w.art}</span> —{' '}
                <span className={css({ color: 'text', fontStyle: 'italic' })}>&ldquo;{w.tk}&rdquo;</span>
              </Box>
            ))}
          </Box>

          <Box as="h3" className={subhead} id="index">
            Experiments — The Back Page
          </Box>
          <Box as="ul" className={worklist}>
            {experiments.map((p) => (
              <Box as="li" key={p.slug} className={worklistItem}>
                <a
                  href={p.externalUrl || p.liveUrl || `/work/${p.slug}`}
                  target={p.externalUrl || p.liveUrl ? '_blank' : undefined}
                  rel={p.externalUrl || p.liveUrl ? 'noopener noreferrer' : undefined}
                  className={worklistLink}
                >
                  <span className={wt}>{p.title}</span>
                  <span className={wm}>
                    {p.type} · {p.year}
                  </span>
                </a>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  )
}

// Inline banner headline component to keep responsive clamp-scale typography in one place.
function styled_h1() {
  return (
    <Box
      as="h1"
      fontFamily="display"
      fontWeight="bold"
      fontSize={{ base: '4xl', md: '2xl' }}
      lineHeight="tight"
      letterSpacing="tight"
      textTransform="uppercase"
      color="knockout"
      margin="0"
      style={{ fontSize: 'clamp(64px, 11vw, 168px)' }}
    >
      There Are No
      <br />
      Shortcuts.
    </Box>
  )
}