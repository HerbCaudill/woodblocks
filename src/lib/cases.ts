import { trim } from './trim'
import { LF } from './constants'
import { Board } from 'models/Board'

/**
 * Each entry in this array consists of two boards that could result from different choices given the
 * situation. The board on the left always results from the better move.
 */

const caseDefinitions = {
  "don't create a vertical gap": ` 

       @@@@@@@---        @@@@@@@---
       ----@@@---        ----------
       ----------        ----@@@---
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       `,

  "don't create a horizontal gap": ` 

       @@@@@@@---        @@@@--@@@-
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       `,

  'complete a line': ` 

       @@@-------        @@@-------
       ----------        ----------
       ----------        ----------
       ----------        @@@@@@@---
       ----------        ----@@@---
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       ----------        ----------
       `,

  'complete two lines rather than one': ` 

       ----------        -@--------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       @---------        --@@------
       `,
} as { [caseName: string]: string }

// converts a case definition expressed as a string
// into two boards
const getCase = (s: string): [Board, Board] => {
  s = trim(s)
  const arr1: string[] = []
  const arr2: string[] = []
  s.split(LF).forEach(row => {
    const [left, right] = row.split(/\s+/)
    arr1.push(left)
    arr2.push(right)
  })
  const better = new Board(arr1.join(LF))
  const worse = new Board(arr2.join(LF))
  return [better, worse]
}

const getCases = () => {
  const cases = {} as { [name: string]: [Board, Board] }
  for (let caseName in caseDefinitions) {
    const definition: string = caseDefinitions[caseName]
    cases[caseName] = getCase(definition)
  }
  return cases
}

export const cases = getCases()
