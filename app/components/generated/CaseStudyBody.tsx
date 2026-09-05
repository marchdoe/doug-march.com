import { Box } from '../../../styled-system/jsx'
import { css } from '../../../styled-system/css'

type Body = {
  problem?: string
  approach?: string
  outcome?: string
  stack?: string[]
  liveUrl?: string
}

function Block({ label, text }: { label: string; text?: string }) {
  if (!text) return null
  return (
    <Box mt="9">
      <p
        className={css({
          fontSize: 'xs',
          textTransform: 'uppercase',
          letterSpacing: 'wide',
          color: 'textFaint',
          mb: '3',
        })}
      >
        {label}
      </p>
      <p
        className={css({ fontSize: 'base', lineHeight: 'loose', color: 'text', maxWidth: '64ch' })}
      >
        {text}
      </p>
    </Box>
  )
}

export function CaseStudyBody({ body }: { body: Body }) {
  return (
    <Box px={{ base: '5', md: '7', lg: '9' }} py={{ base: '9', lg: '9' }} maxWidth="820px">
      <Block label="Problem" text={body.problem} />
      <Block label="Approach" text={body.approach} />
      <Block label="Outcome" text={body.outcome} />
      {body.stack && body.stack.length > 0 && (
        <Box mt="9">
          <p
            className={css({
              fontSize: 'xs',
              textTransform: 'uppercase',
              letterSpacing: 'wide',
              color: 'textFaint',
              mb: '3',
            })}
          >
            Stack
          </p>
          <Box display="flex" flexWrap="wrap" gap="2">
            {body.stack.map((tech) => (
              <span
                key={tech}
                className={css({
                  fontSize: 'xs',
                  color: 'textMuted',
                  border: '1px solid',
                  borderColor: 'border',
                  px: '2',
                  py: '1',
                })}
              >
                {tech}
              </span>
            ))}
          </Box>
        </Box>
      )}
      {body.liveUrl && (
        <Box mt="7">
          <a
            href={body.liveUrl}
            className={css({
              fontSize: 'sm',
              color: 'accent',
              borderBottom: '1px solid',
              borderColor: 'accent',
              pb: '1',
            })}
          >
            View live →
          </a>
        </Box>
      )}
    </Box>
  )
}
