import { Layout } from 'Board'
import { trim } from 'lib/trim'
import { LF } from 'lib/constants'

const pieces_s = {
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

type PieceDictionary = {
  [key: string]: Layout
}

const empty = {} as PieceDictionary

export const pieces = Object.keys(pieces_s).reduce(toBooleanReducer, empty)

function toBooleanReducer(result: PieceDictionary, key: string) {
  return { ...result, [key]: toBooleanArray(pieces_s[key]) }
}

function toBooleanArray(s: string) {
  return trim(s)
    .split(LF)
    .map(row => row.split('').map(col => (col === '-' || col === ' ' ? false : true)))
}
