import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'

export const Route = createFileRoute('/')({ component: HomePage })

const golfRows = [
  { name: 'Scheffler', score: '−4', leader: true },
  { name: 'Detry', score: '−3' },
  { name: 'MacIntyre', score: '−3' },
  { name: 'Im', score: '−3' },
  { name: 'Smalley', score: '−3' },
]

const phraseLine = css({
  fontFamily: 'display',
  textTransform: 'uppercase',
  fontSize: 'clamp(48px, 12vw, 190px)',
  lineHeight: 'tight',
  letterSpacing: 'tight',
  display: 'block',
})

const win = css({ color: 'accent' })

function HomePage() {
  return (
    <>
      <Flex
        justify="space-between"
        align="flex-start"
        gap="6"
        wrap="wrap"
        padding={{ base: '4 4 0', md: '4 6vw 0' }}
      >
        <Box className={css({ fontSize: 'xs', letterSpacing: 'wider', textTransform: 'uppercase', color: 'textMuted', fontWeight: 'medium' })}>
          ☾ Waxing Crescent · 6%
        </Box>

        <Box
          as="aside"
          aria-label="The Open — live leaderboard"
          width={{ base: '100%', md: '260px' }}
          bg="bgCard"
          border="1px solid"
          borderColor="border"
          borderRadius="sm"
          padding="3 4"
        >
          <Flex
            justify="space-between"
            align="center"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
            color="textSecondary"
            fontWeight="bold"
            marginBottom="3"
            borderBottom="1px solid"
            borderColor="border"
            paddingBottom="2"
          >
            <span>The Open</span>
            <span className={css({ color: 'accent', display: 'inline-flex', alignItems: 'center', gap: '1' })}>
              <span className={css({ width: '6px', height: '6px', borderRadius: 'full', background: 'accent', display: 'inline-block' })} />
              Live
            </span>
          </Flex>
          {golfRows.map((row) => (
            <Flex
              key={row.name}
              justify="space-between"
              align="baseline"
              fontSize="sm"
              lineHeight="loose"
              color={row.leader ? 'accent' : 'text'}
              fontWeight={row.leader ? 'bold' : 'normal'}
            >
              <span>{row.name}</span>
              <span>{row.score}</span>
            </Flex>
          ))}
        </Box>
      </Flex>

      <Box
        as="section"
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="72vh"
        padding={{ base: '6 4', md: 'clamp(24px,5vw,56px) 6vw 24px' }}
      >
        <h1 className={css({ color: 'text', display: 'flex', flexDirection: 'column' })}>
          <span className={phraseLine}>We <span className={win}>Win</span></span>
          <span className={phraseLine}>By Helping</span>
          <span className={phraseLine}>Each Other</span>
          <span className={`${phraseLine} ${win}`}>Win</span>
        </h1>
        <p className={css({ marginTop: '5', fontSize: 'base', letterSpacing: 'widest', textTransform: 'uppercase', color: 'accent', fontWeight: 'bold' })}>
          — Jack Butcher
        </p>
        <p className={css({ marginTop: '3', fontStyle: 'italic', fontSize: 'md', lineHeight: 'normal', color: 'textSecondary', maxWidth: '62ch' })}>
          sponsoring <b className={css({ color: 'text', fontStyle: 'italic', fontWeight: 'medium' })}>opencut</b> ·{' '}
          <b className={css({ color: 'text', fontStyle: 'italic', fontWeight: 'medium' })}>mattpocock</b> ·{' '}
          <b className={css({ color: 'text', fontStyle: 'italic', fontWeight: 'medium' })}>airi</b> — we win by helping each other win
        </p>
      </Box>
    </>
  )
}