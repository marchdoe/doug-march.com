export type Identity = {
  name: string
  role: string
  statement: string
}

export type Personal = {
  holesInOne: number
  sport: string
  teams: string[]
  currentFocus: string
}

export const identity: Identity = {
  name: 'Doug March',
  role: 'Product Designer & Developer',
  statement:
    "I work at the intersection of design and engineering — not as a generalist, but as someone who has gone deep in both. I've spent my career closing the gap between what gets designed and what gets built: making sure designs are technically feasible before a line of code is written, and that what ships actually looks like what was designed.",
}

export const personal: Personal = {
  holesInOne: 4,
  sport: 'golf',
  teams: ['Lions', 'Tigers', 'Pistons', 'Red Wings'],
  currentFocus: 'Using AI as a force multiplier in product work',
}
