import { trim } from './trim'
import { LF } from './constants'

export const board = (s: string = '') => new Board(s)

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

  toString = () => {
    return this.map(row => row.map(col => (col ? '■' : '·')).join('')).join(LF)
  }

  fromString = (s: string) => {
    trim(s)
      .split(LF)
      .forEach((row, i) => (this[i] = row.split('').map(v => (v === '·' ? false : true))))
    return this
  }
}
