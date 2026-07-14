import { css } from '../../styled-system/css'

export function WorkRow({
  href,
  external,
  title,
  type,
  year,
}: {
  href: string
  external?: boolean
  title: string
  type: string
  year: number | string
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener' : undefined}
      className={css({
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'baseline',
        gap: '3',
        padding: '3 0',
        borderBottom: '1px solid',
        borderColor: 'border',
        transition: 'padding-left .15s ease',
        _hover: {
          paddingLeft: '2',
          '& .work-name': { color: 'accent' },
        },
      })}
    >
      <span>
        <span
          className={`work-name ${css({
            fontFamily: 'body',
            fontWeight: 'semibold',
            fontSize: 'md',
            letterSpacing: 'normal',
            color: 'text',
            transition: 'color .15s ease',
            display: 'block',
          })}`}
        >
          {title}
        </span>
        <span
          className={css({
            fontFamily: 'body',
            fontSize: 'xs',
            color: 'textMuted',
            display: 'block',
            marginTop: '1',
          })}
        >
          {type}
        </span>
      </span>
      <span
        className={css({
          fontFamily: 'display',
          fontWeight: 'normal',
          fontSize: 'xl',
          letterSpacing: 'normal',
          color: 'textMuted',
          whiteSpace: 'nowrap',
        })}
      >
        {year}
      </span>
    </a>
  )
}