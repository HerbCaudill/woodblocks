import { LF } from './constants'
import { toBooleanArray } from 'toBooleanArray'

// all boards are 10 x 10 for now
const N = 10

export class Board extends Array<boolean[]> {
  size: number

  constructor(s: string = '') {
    super(N)
    this.size = N
    if (s.length) {
      this.fromString(s)
    } else {
      this.fill(new Array(10).fill(false))
    }
  }

  fromArray = (arr: boolean[][]) => arr.map((row, i) => (this[i] = row))
  fromString = (s: string) => this.fromArray(toBooleanArray(s))
  toString = () => this.map(row => row.map(col => (col ? '■' : '·')).join('')).join(LF)
}
