import { createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '../../styled-system/jsx'
import { css } from '../../styled-system/css'
import { HeroNav } from '../components/HeroNav'
import { featuredProject, selectedWork, experiments } from '../content/projects'

export const Route = createFileRoute('/work/')({ component: WorkIndexPage })

const label = css({
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'textMuted',
  fontWeight: 'bold',
})

function WorkIndexPage() {
  return (
    <Box display="flex" flexDirection="column" gap={{ base: '8', md: '12' }} paddingY={{ base: '6', md: '8' }}>
      <Box>
        <span className={css({ ...label._important, display: 'block', marginBottom: '4' })}>01 · Work</span>
        <h1
          className={css({
            fontFamily: 'display',
            fontWeight: '900',
            textTransform: 'uppercase',
            lineHeight: 'tight',
            letterSpacing: 'tight',
            fontSize: 'clamp(40px, 6vw, 88px)',
            color: 'text',
          })}
        >
          Selected Work
        </h1>
        <Box marginTop="6">
          <HeroNav active="work" />
        </Box>
      </Box>

      {featuredProject && (
        <Box>
          <span className={label}>Featured</span>
          <Box marginTop="4">
            <h2
              className={css({
                fontFamily: 'display',
                fontWeight: '900',
                textTransform: 'uppercase',
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: 'accent',
                lineHeight: 'snug',
              })}
            >
              {featuredProject.title}
            </h2>
            {featuredProject.problem && (
              <p className={css({ fontSize: 'base', color: 'textSecondary', marginTop: '2', maxWidth: '60ch' })}>
                {featuredProject.problem}
              </p>
            )}
            {featuredProject.externalUrl && (
              <a
                href={featuredProject.externalUrl}
                className={css({
                  display: 'inline-block',
                  marginTop: '4',
                  fontSize: 'sm',
                  fontWeight: 'bold',
                  color: 'accent',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                })}
              >
                Visit site ↗
              </a>
            )}
          </Box>
        </Box>
      )}

      <Box>
        <span className={label}>Selected work</span>
        <Box display="flex" flexDirection="column" marginTop="4">
          {selectedWork.map((p, i) => (
            <Flex
              key={p.slug}
              gap="6"
              bg="cardBg"
              borderBottom={i === selectedWork.length - 1 ? 'none' : '1px solid'}
              borderColor="border"
              paddingX="4"
              paddingY="4"
              align="baseline"
              wrap="wrap"
            >
              <Box flex="1" minWidth="200px">
                <a
                  href={`/work/${p.slug}`}
                  className={css({
                    fontSize: 'md',
                    fontWeight: 'bold',
                    color: 'text',
                    _hover: { color: 'accent', textDecoration: 'underline', textDecorationColor: 'accent' },
                  })}
                >
                  {p.title}
                </a>
              </Box>
              <span className={css({ fontSize: 'sm', color: 'textSecondary', flex: '0 0 140px' })}>{p.type}</span>
              <span
                className={css({
                  fontSize: 'sm',
                  color: 'textMuted',
                  fontVariantNumeric: 'tabular-nums',
                  flex: '0 0 60px',
                })}
              >
                {p.year}
              </span>
            </Flex>
          ))}
        </Box>
      </Box>

      <Box id="experiments">
        <span className={label}>Experiments</span>
        <Box display="flex" flexDirection="column" marginTop="4">
          {experiments.map((p, i) => {
            const href = p.liveUrl || p.githubUrl || p.externalUrl || `/work/${p.slug}`
            return (
              <Flex
                key={p.slug}
                gap="6"
                bg="cardBg"
                borderBottom={i === experiments.length - 1 ? 'none' : '1px solid'}
                borderColor="border"
                paddingX="4"
                paddingY="4"
                align="baseline"
                wrap="wrap"
              >
                <Box flex="1" minWidth="200px">
                  <a
                    href={href}
                    className={css({
                      fontSize: 'md',
                      fontWeight: 'bold',
                      color: 'text',
                      _hover: { color: 'accent', textDecoration: 'underline', textDecorationColor: 'accent' },
                    })}
                  >
                    {p.title}
                  </a>
                </Box>
                <span className={css({ fontSize: 'sm', color: 'textSecondary', flex: '0 0 140px' })}>
                  {p.type}
                </span>
                <span
                  className={css({
                    fontSize: 'sm',
                    color: 'textMuted',
                    fontVariantNumeric: 'tabular-nums',
                    flex: '0 0 60px',
                  })}
                >
                  {p.year}
                </span>
              </Flex>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}