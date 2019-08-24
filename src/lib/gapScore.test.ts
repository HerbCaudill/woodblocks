import { gaps, lineGapScore, gapScore } from './gapScore'
import { textToRow } from './toCellArray'

import { cases } from './cases'
import { Board } from 'models/Board'

describe('gaps', () => {
  const testCase = (input: string, expected: number[]) => () =>
    expect(gaps(textToRow(input))).toEqual(expected)
  let i = 1
  test(`${i++}`, testCase('@@@@@@@@@-', [1]))
  test(`${i++}`, testCase('@@@@@@@-@-', [1, 1]))
  test(`${i++}`, testCase('@@@@@@@@--', [2]))
  test(`${i++}`, testCase('@@@--@@@--', [2, 2]))
  test(`${i++}`, testCase('@@@--@@@@@', [2]))
  test(`${i++}`, testCase('-@@--@@@@@', [1, 2]))
  test(`${i++}`, testCase('-@-@-@-@-@', [1, 1, 1, 1, 1]))
  test(`${i++}`, testCase('----------', [5, 5])) // gaps larger than 5 count as 2 gaps
  test(`${i++}`, testCase('------@@@@', [5, 1]))
  test(`${i++}`, testCase('@-------@@', [5, 2]))
})

describe('lineGapScore', () => {
  const testCase = (input: string, expected: number) => () =>
    expect(lineGapScore(textToRow(input))).toEqual(expected)
  let i = 1
  test(`${i++}`, testCase('@@@@@@@@@-', 11))
  test(`${i++}`, testCase('@@@@@@@-@-', 22))
  test(`${i++}`, testCase('@@@@@@@@--', 12))
  test(`${i++}`, testCase('@@@--@@@--', 24))
  test(`${i++}`, testCase('@@@--@@@@@', 12))
  test(`${i++}`, testCase('-@@--@@@@@', 23))
  test(`${i++}`, testCase('-@-@-@-@-@', 55))
  test(`${i++}`, testCase('----------', 30))
  test(`${i++}`, testCase('------@@@@', 26))
  test(`${i++}`, testCase('@-------@@', 27))
})

const isBetter = (a: Board, b: Board) => {
  if (a.filledCount < b.filledCount) return true
  return gapScore(a) < gapScore(b)
}

describe('gapScore', () => {
  for (let caseName in cases) {
    const [better, worse] = cases[caseName]
    test(caseName, () => expect(isBetter(better, worse)).toBe(true))
  }
})
