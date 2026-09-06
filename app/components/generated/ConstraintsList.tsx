import { css } from '../../../styled-system/css'

export function ConstraintsList({ items }: { items: string[] }) {
  return (
    <ul
      className={css({
        mt: '3',
        pl: '0',
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '2',
      })}
    >
      {items.map((c) => (
        <li
          key={c}
          className={css({
            textStyle: 'sm',
            color: 'textMuted',
            borderLeft: '2px solid',
            borderColor: 'accentAlt',
            pl: '3',
          })}
        >
          {c}
        </li>
      ))}
    </ul>
  )
}
