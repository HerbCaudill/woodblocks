import { LF } from './constants'
import { toBooleanArray } from 'toBooleanArray'
import { number } from 'prop-types'

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

  fromArray = (arr: Layout) => arr.map((row, i) => (this[i] = row))
  fromString = (s: string) => this.fromArray(toBooleanArray(s))
  toString = () => this.map(row => row.map(col => (col ? '■' : '·')).join('')).join(LF)

  conflictsExist = (piece: Layout, [x, y]: Location) => {
    const conflicts = piece.map((row, i) => row.map((cell, j) => this[i + x][j + y] && cell))
    // returns true if any element of `conflicts` is true
    return conflicts.some(row => row.some(cell => cell))
  }

  pieceFits = (piece: Layout, [x, y]: Location) => {
    const yFits = y + piece.length <= N
    const xFits = x + Math.max(...piece.map(row => row.length)) <= N
    return yFits && xFits
  }

  canAddPiece = (piece: Layout, [x, y]: Location) =>
    !this.conflictsExist(piece, [x, y]) && this.pieceFits(piece, [x, y])

  addPiece = (piece: Layout, [x, y]: Location) => {
    piece.forEach((row, i) =>
      row.forEach((col, j) => {
        this[i + x][j + y] = col
      })
    )
    return this
  }
}

type Layout = boolean[][]
type Location = [number, number]
