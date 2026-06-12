import { createFileRoute } from '@tanstack/react-router'
import { css } from '../../styled-system/css'
import { Sidebar } from '../components/Sidebar'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      {/* Hero Zone — 88vh poster */}
      <div
        className={css({
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: { base: '100px 6vw 80px', md: '40px 6vw' },
        })}
      >
        <Sidebar />

        {/* Hero phrase */}
        <div
          className={css({
            maxWidth: '100%',
            width: '100%',
          })}
        >
          <h1
            className={css({
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: 'clamp(36px, 4.8vw, 72px)',
              lineHeight: 'tight',
              letterSpacing: 'tight',
              color: 'text',
              textWrap: 'balance',
              maxWidth: '16em',
            })}
          >
            The soul without imagination is what an observatory would be without a telescope.
          </h1>
          <p
            className={css({
              fontFamily: 'body',
              fontSize: '14px',
              lineHeight: 'normal',
              color: 'accent',
              textAlign: 'right',
              maxWidth: '16em',
              marginTop: '20px',
            })}
          >
            — Henry Ward Beecher
          </p>
        </div>

        {/* Bottom-left: lunar */}
        <span
          className={css({
            position: 'absolute',
            bottom: '40px',
            left: '6vw',
            fontFamily: 'body',
            fontSize: '12px',
            color: '{colors.stone.500}',
            display: { base: 'none', md: 'block' },
          })}
        >
          ◑ 4.6% — dark sky tonight
        </span>

        {/* Bottom-right: Tigers score */}
        <span
          className={css({
            position: 'absolute',
            bottom: '40px',
            right: '6vw',
            fontFamily: 'body',
            fontSize: '11px',
            fontWeight: 'bold',
            letterSpacing: 'wider',
            textTransform: 'uppercase',
            color: 'accent',
            background: '{colors.stone.200}',
            padding: '4px 10px',
            borderRadius: 'sm',
          })}
        >
          Tigers 11–0
        </span>
      </div>

      {/* Signal band */}
      <div
        className={css({
          borderTop: '1px solid',
          borderColor: 'border',
          padding: '24px 6vw',
          display: { base: 'block', md: 'flex' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '13px',
            color: '{colors.stone.600}',
            display: 'block',
            marginBottom: { base: '8px', md: '0' },
          })}
        >
          RBC Canadian Open · Cole · Koepka · Burns · Anderson · Theegala · −6 (5-way tie)
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            fontStyle: 'italic',
            color: '{colors.stone.500}',
            display: 'block',
            marginBottom: { base: '8px', md: '0' },
          })}
        >
          "Demonstrate human effort" — 825 pts
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: '{colors.stone.400}',
            display: 'block',
          })}
        >
          My Morning Jacket · Guided by Voices · The War on Drugs
        </span>
      </div>

      {/* Footer */}
      <div
        className={css({
          borderTop: '1px solid',
          borderColor: 'border-subtle',
          padding: '24px 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}
      >
        <span
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: '{colors.stone.500}',
          })}
        >
          Doug March · Product Designer & Developer
        </span>
        <a
          href="/archive"
          className={css({
            fontFamily: 'body',
            fontSize: '12px',
            color: '{colors.stone.500}',
            textDecoration: 'none',
            padding: '10px 0',
            _hover: { color: 'accent', textDecoration: 'underline' },
            _focus: { outline: '2px solid', outlineColor: 'accent', outlineOffset: '2px' },
          })}
        >
          Archive
        </a>
      </div>
    </>
  )
}