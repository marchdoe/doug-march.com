import { css } from '../../styled-system/css'
import { Box, Flex } from '../../styled-system/jsx'
import logoMono from '../assets/logo-mono.svg'
import { featuredProject } from '../content/projects'

const workHref = featuredProject ? `/work/${featuredProject.slug}` : '/'

export function Sidebar() {
  return (
    <Box
      as="nav"
      aria-label="Primary"
      className={css({
        gridColumn: '1',
        gridRow: { base: '1', lg: '1' },
        background: 'bgSpine',
        borderRight: '1px solid',
        borderColor: 'border',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { base: '4 0', md: '6 0' },
        minHeight: '100vh',
      })}
    >
      <a
        href="/"
        aria-label="Doug March — home"
        className={css({
          display: 'block',
          lineHeight: '0',
          color: 'textMuted',
          transition: 'color .25s ease',
          _hover: { color: 'accent' },
        })}
      >
        <span
          className={css({
            display: 'block',
            width: '44px',
            height: '37px',
            backgroundColor: 'currentcolor',
            WebkitMaskImage: `url(${logoMono})`,
            maskImage: `url(${logoMono})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          })}
        />
      </a>

      <Flex
        direction="column"
        gap="8"
        className={css({
          marginTop: 'auto',
          marginBottom: '2',
        })}
      >
        <a
          href={workHref}
          className={css({
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            padding: '2 3',
            transition: 'color .25s ease, letter-spacing .25s ease',
            _hover: { color: 'accent', letterSpacing: 'widest' },
          })}
        >
          Work
        </a>
        <a
          href="/about"
          className={css({
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            padding: '2 3',
            transition: 'color .25s ease, letter-spacing .25s ease',
            _hover: { color: 'accent', letterSpacing: 'widest' },
          })}
        >
          About
        </a>
        <a
          href="/"
          className={css({
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'body',
            fontWeight: 'bold',
            fontSize: 'xs',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'textMuted',
            padding: '2 3',
            transition: 'color .25s ease, letter-spacing .25s ease',
            _hover: { color: 'accent', letterSpacing: 'widest' },
          })}
        >
          Index
        </a>
      </Flex>
    </Box>
  )
}