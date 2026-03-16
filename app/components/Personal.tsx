import { css } from '../../styled-system/css'
import { Box } from '../../styled-system/jsx'
import { personal, type Personal as PersonalType } from '../content/about'
import { SectionHead } from './SectionHead'

export function Personal() {
  const teams = Array.isArray(personal.teams) ? personal.teams : [personal.teams]

  return (
    <Box
      className={css({
        mb: '8',
      })}
    >
      <SectionHead label="Outside the Work" />

      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', sm: '1fr 1fr' },
          gap: '0',
        })}
      >
        {/* Holes in One */}
        <div
          className={css({
            py: '4',
            px: '4',
            borderBottom: '1px solid',
            borderBottomColor: 'border.DEFAULT',
            borderRight: { sm: '1px solid' },
            borderRightColor: { sm: 'border.DEFAULT' },
            borderTop: '1px solid',
            borderTopColor: 'border.DEFAULT',
          })}
        >
          <span
            className={css({
              display: 'block',
              fontFamily: 'mono',
              fontSize: '2xs',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text.dim',
              mb: '2',
            })}
          >
            Holes in One
          </span>
          <span
            className={css({
              fontFamily: 'serif',
              fontSize: 'lg',
              fontWeight: 'bold',
              letterSpacing: 'tight',
              lineHeight: 'tight',
              color: 'signal.win',
            })}
          >
            {personal.holesInOne}
          </span>
        </div>

        {/* Sport */}
        <div
          className={css({
            py: '4',
            px: '4',
            borderBottom: '1px solid',
            borderBottomColor: 'border.DEFAULT',
            borderTop: '1px solid',
            borderTopColor: 'border.DEFAULT',
          })}
        >
          <span
            className={css({
              display: 'block',
              fontFamily: 'mono',
              fontSize: '2xs',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text.dim',
              mb: '2',
            })}
          >
            Sport
          </span>
          <span
            className={css({
              fontFamily: 'serif',
              fontSize: 'base',
              fontWeight: 'medium',
              lineHeight: 'snug',
              color: 'text',
            })}
          >
            {personal.sport}
          </span>
        </div>

        {/* Teams */}
        <div
          className={css({
            py: '4',
            px: '4',
            borderBottom: '1px solid',
            borderBottomColor: 'border.DEFAULT',
            borderRight: { sm: '1px solid' },
            borderRightColor: { sm: 'border.DEFAULT' },
          })}
        >
          <span
            className={css({
              display: 'block',
              fontFamily: 'mono',
              fontSize: '2xs',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text.dim',
              mb: '2',
            })}
          >
            Teams
          </span>
          <div
            className={css({
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2',
            })}
          >
            {teams.map((team: string) => (
              <span
                key={team}
                className={css({
                  fontFamily: 'serif',
                  fontSize: 'sm',
                  fontWeight: 'medium',
                  color: 'text',
                  bg: 'bg.card',
                  border: '1px solid',
                  borderColor: 'border.DEFAULT',
                  px: '2',
                  py: '1',
                  lineHeight: 'snug',
                })}
              >
                {team}
              </span>
            ))}
          </div>
        </div>

        {/* Current Focus */}
        <div
          className={css({
            py: '4',
            px: '4',
            borderBottom: '1px solid',
            borderBottomColor: 'border.DEFAULT',
          })}
        >
          <span
            className={css({
              display: 'block',
              fontFamily: 'mono',
              fontSize: '2xs',
              fontWeight: 'medium',
              letterSpacing: 'widest',
              textTransform: 'uppercase',
              color: 'text.dim',
              mb: '2',
            })}
          >
            Current Focus
          </span>
          <span
            className={css({
              fontFamily: 'serif',
              fontSize: 'sm',
              fontWeight: 'regular',
              lineHeight: 'normal',
              color: 'text.mid',
            })}
          >
            {personal.currentFocus}
          </span>
        </div>
      </div>
    </Box>
  )
}