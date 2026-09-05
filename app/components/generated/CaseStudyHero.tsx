import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Meta = {
  title: string
  type: string
  year: number
  role?: string
  timeline?: string
  status?: string
  problem?: string
}

export function CaseStudyHero({ project }: { project: Meta }) {
  const metaParts = [
    project.type,
    String(project.year),
    project.role,
    project.timeline,
    project.status,
  ].filter(Boolean)

  return (
    <Box
      position="relative"
      minH={{ base: '340px', lg: '46vh' }}
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pt={{ base: '160px', lg: '200px' }}
      pb={{ base: '9', lg: '9' }}
      px={{ base: '5', md: '7', lg: '9' }}
      className={css({
        background:
          'radial-gradient(circle at 50% 45%, token(colors.field) 0%, token(colors.accent) 30%, token(colors.accentAlt) 60%, token(colors.bg) 100%)',
      })}
    >
      <Box position="relative" zIndex={1} textAlign="center" maxWidth="820px">
        <p
          className={css({
            fontSize: 'xs',
            textTransform: 'uppercase',
            letterSpacing: 'wide',
            color: 'fieldInkMuted',
            mb: '3',
          })}
        >
          {metaParts.join(' · ')}
        </p>
        <h1
          className={css({
            fontSize: { base: '3xl', lg: '5xl' },
            fontWeight: '600',
            color: 'fieldInk',
            mb: '4',
          })}
        >
          {project.title}
        </h1>
        {project.problem && (
          <p
            className={css({
              fontSize: { base: 'md', lg: 'lg' },
              color: 'fieldInkMuted',
              maxWidth: '62ch',
              mx: 'auto',
            })}
          >
            {project.problem}
          </p>
        )}
      </Box>
    </Box>
  )
}
