import { LF } from 'lib/constants'
import { textToRow } from 'lib/toCellArray'
import { trim } from 'lib/trim'
import { Cell } from 'types'
import { desaturate } from 'polished'
export type PieceDictionary = {
  [key: string]: Piece
}

export const shapes = {
  p1x1: `@`,
  p2x1: `@@`,
  p3x1: `@@@`,
  p4x1: `@@@@`,
  p5x1: `@@@@@`,

  p1x2: `@
         @`,

  p1x3: `@
         @
         @`,

  p1x4: `@
         @
         @
         @`,

  p1x5: `@
         @
         @
         @
         @`,

  pL2nw: `@@
          @-`,

  pL2ne: `@@
          -@`,

  pL2se: `-@
          @@`,

  pL2sw: `@-
          @@`,

  pL3nw: `@@@
          @--
          @--`,

  pL3ne: `@@@
          --@
          --@`,

  pL3se: `--@
          --@
          @@@`,

  pL3sw: `@--
          @--
          @@@`,

  p2x2: `@@
         @@`,

  p3x3: `@@@
         @@@
         @@@`,
} as { [key: string]: string }

const colors = [
  '#f44336',
  '#f47f36',
  '#f4bb36',
  '#f1f436',
  '#b5f436',
  '#79f436',
  '#3df436',
  '#36f46b',
  '#36f4a7',
  '#36f4e3',
  '#36c9f4',
  '#368df4',
  '#3651f4',
  '#5736f4',
  '#9336f4',
  '#cf36f4',
  '#f436dd',
  '#f436a1',
  '#f43665',
].map(c => desaturate(0.5, c))

export class Piece {
  rows: Cell[][]
  id?: string
  name: string
  color: string

  constructor(name: string, color: string = 'red') {
    this.rows = trim(shapes[name])
      .split(LF)
      .map(textToRow)
    this.name = name
    this.color = color
  }

  get points() {
    return this.rows.flat().filter(cell => cell.filled).length
  }
}

export const pieces = Object.keys(shapes).reduce(
  (result: PieceDictionary, name: string, i: number) => ({
    ...result,
    [name]: new Piece(name, colors[i]),
  }),
  {} as PieceDictionary
)

export const randomPiece = (random: () => number = Math.random) => {
  const randomIndex = Math.floor(random() * Object.keys(pieces).length)
  const pieceName = Object.keys(pieces)[randomIndex]
  return pieces[pieceName]
}
