import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { timeline, type TimelineEntry } from '../content/timeline'
import { SectionHead } from './SectionHead'

export function Timeline() {
  return (
    <Box
      className={css({
        mb: '8',
      })}
    >
      <SectionHead label="Timeline" />

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        })}
      >
        {timeline.map((entry: TimelineEntry, i: number) => (
          <div
            key={`${entry.year}-${entry.company}-${i}`}
            className={css({
              display: 'grid',
              gridTemplateColumns: '3.5rem 1fr',
              gap: '4',
              py: '4',
              borderBottom: '1px solid',
              borderBottomColor: 'border.DEFAULT',
              _first: {
                borderTop: '1px solid',
                borderTopColor: 'border.DEFAULT',
              },
            })}
          >
            {/* Year column */}
            <div
              className={css({
                pt: '1',
              })}
            >
              <span
                className={css({
                  fontFamily: 'mono',
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  color: 'accent.DEFAULT',
                  display: 'block',
                  letterSpacing: 'tight',
                })}
              >
                {entry.year}
              </span>
            </div>

            {/* Content column */}
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '1',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '2',
                  flexWrap: 'wrap',
                })}
              >
                <span
                  className={css({
                    fontFamily: 'serif',
                    fontSize: 'base',
                    fontWeight: 'bold',
                    lineHeight: 'snug',
                    color: 'text',
                  })}
                >
                  {entry.role}
                </span>
                <span
                  className={css({
                    fontFamily: 'mono',
                    fontSize: 'xs',
                    fontWeight: 'regular',
                    color: 'text.mid',
                    letterSpacing: 'normal',
                  })}
                >
                  {entry.company}
                </span>
              </div>

              <p
                className={css({
                  fontFamily: 'serif',
                  fontSize: 'sm',
                  fontWeight: 'regular',
                  lineHeight: 'normal',
                  color: 'text.mid',
                })}
              >
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Box>
  )
}