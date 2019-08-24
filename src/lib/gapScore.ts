import { Board } from 'models/Board'
import { Line } from 'types'

export const sum = (arr: number[]) => arr.reduce((prev, current) => prev + current, 0)

export const gaps = (line: Line): number[] => {
  const result = [] as number[]
  let gap = 0

  for (let cell of line) {
    if (!cell.filled) gap++
    if ((cell.filled && gap) || gap === 5) {
      result.push(gap)
      gap = 0
    }
  }
  if (gap) result.push(gap)
  return result
}

export const lineGapScore = (line: Line): number => {
  const g = gaps(line)
  return g.length * 10 + sum(g)
}

export const gapScore = (b: Board) => {
  const rowScore = sum(b.rows.map(lineGapScore))
  const colScore = sum(b.columns.map(lineGapScore))
  return rowScore + colScore
}
