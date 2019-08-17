import { Layout } from 'models/Board'
import makeRandom from 'seed-random'
import { toBooleanReducer } from '../lib/toCellReducer'

export type PieceDictionary = {
  [key: string]: Layout
}

export const pieces_s = {
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

export const pieces = Object.keys(pieces_s).reduce(toBooleanReducer, {} as PieceDictionary)

export const randomPiece = (randomSeed: string) => {
  const random = makeRandom(randomSeed)
  const keys = Object.keys(pieces)
  return keys[Math.floor(random() * keys.length)]
}
