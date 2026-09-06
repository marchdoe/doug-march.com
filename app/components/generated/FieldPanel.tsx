import { css } from '../../../styled-system/css'

type FootItem = { label: string; value: string }

export function FieldPanel({
  eyebrow,
  marquee,
  shout,
  standfirst,
  footItems,
}: {
  eyebrow: string
  marquee: string
  shout?: string
  standfirst?: string
  footItems?: FootItem[]
}) {
  return (
    <section
      className={css({
        gridArea: 'field',
        gridRow: { base: 'auto', lg: '1 / -1' },
        bg: 'field',
        color: 'fieldInk',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { base: '7', lg: '14' },
        py: { base: '10', lg: '14' },
        minH: { base: '62vh', lg: '100vh' },
        borderBottom: { base: '2px solid', lg: 'none' },
        borderRight: { base: 'none', lg: '2px solid' },
        borderColor: 'fieldBorder',
      })}
    >
      <p
        className={css({
          textStyle: 'xs',
          fontWeight: 500,
          letterSpacing: 'wide',
          textTransform: 'uppercase',
          color: 'fieldInkMuted',
          mb: { base: '5', lg: '8' },
        })}
      >
        {eyebrow}
      </p>
      <h1
        className={css({
          fontFamily: 'display',
          fontWeight: 400,
          textStyle: 'hero',
          color: 'fieldInk',
          ml: '-0.02em',
        })}
      >
        {marquee}
      </h1>
      {shout && (
        <p
          className={css({
            fontFamily: 'display',
            fontWeight: 400,
            textStyle: '4xl',
            color: 'fieldInk',
            mt: '2',
          })}
        >
          {shout}
        </p>
      )}
      {standfirst && (
        <p
          className={css({
            textStyle: 'lg',
            color: 'fieldInkMuted',
            maxW: '26ch',
            mt: { base: '6', lg: '8' },
          })}
        >
          {standfirst}
        </p>
      )}
      {footItems && (
        <div
          className={css({
            mt: { base: '7', lg: '9' },
            pt: '4',
            borderTop: '1px solid',
            borderColor: 'fieldBorder',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3',
            textStyle: 'xs',
            fontWeight: 500,
            letterSpacing: 'wide',
            textTransform: 'uppercase',
            color: 'fieldInkMuted',
          })}
        >
          {footItems.map((f) => (
            <span key={f.label}>
              {f.label} · {f.value}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}
