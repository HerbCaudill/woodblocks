import { LF } from 'lib/constants'
import { textToRow } from 'lib/toCellArray'
import { trim } from 'lib/trim'
import { Cell } from 'models/Board'
import makeRandom from 'seed-random'

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

export type PieceName = keyof typeof shapes

export const randomPieceName = (randomSeed: string): PieceName => {
  const random = makeRandom(randomSeed)
  const keys = Object.keys(pieces)
  const name = keys[Math.floor(random() * keys.length)]
  return name
}

export const randomPiece = (randomSeed: string) => new Piece(randomPieceName(randomSeed))

export class Piece {
  rows: Cell[][]
  id?: string
  name: PieceName

  constructor(name: PieceName) {
    this.rows = trim(shapes[name])
      .split(LF)
      .map(textToRow)
    this.name = name
  }
}

export const pieces = Object.keys(shapes).reduce(
  (result: PieceDictionary, name: string) => ({
    ...result,
    [name]: new Piece(name),
  }),
  {} as PieceDictionary
)
