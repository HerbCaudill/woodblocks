import { toBooleanArray } from './toBooleanArray'

export const pieces = [
  `x`,
  `xx`,
  `xxx`,
  `xxxx`,
  `xxxxx`,

  `x
   x`,

  `x
   x
   x`,

  `x
   x
   x
   x`,

  `x
   x
   x
   x
   x`,

  `xx
   x-`,

  `xx
   -x`,

  `-x
   xx`,

  `x-
   xx`,

  `xxx
   x--
   x--`,

  `xxx
   --x
   --x`,

  `--x
   --x
   xxx`,

  `x--
   x--
   xxx`,

  `xx
   xx`,

  `xxx
   xxx
   xxx`,
].map(toBooleanArray)

export const p1x1 = pieces[0]
export const p2x1 = pieces[1]
export const p3x1 = pieces[2]
export const p4x1 = pieces[3]
export const p5x1 = pieces[4]

export const p1x2 = pieces[5]
export const p1x3 = pieces[6]
export const p1x4 = pieces[7]
export const p1x5 = pieces[8]

export const pL2nw = pieces[9]
export const pL2ne = pieces[10]
export const pL2se = pieces[11]
export const pL2sw = pieces[12]

export const pL3nw = pieces[13]
export const pL3ne = pieces[14]
export const pL3se = pieces[15]
export const pL3sw = pieces[16]

export const p2x2 = pieces[17]
export const p3x3 = pieces[18]
