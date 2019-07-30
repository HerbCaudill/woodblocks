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
  toString = () => this.map(row => row.map(cell => (cell ? '■' : '·')).join('')).join(LF)

  // determines whether the piece doesn't conflict with existing pieces on the board
  noConflicts = (piece: Layout, [x, y]: Location) => {
    const conflicts = piece.map((row, i) => row.map((cell, j) => this[i + x][j + y] && cell))
    // returns true if any element of `conflicts` is true
    return !conflicts.some(row => row.some(cell => cell))
  }

  // determines whether the piece fits entirely within the boundaries of the board
  pieceFits = (piece: Layout, [x, y]: Location) => {
    const yFits = y + piece.length <= N
    const xFits = x + Math.max(...piece.map(row => row.length)) <= N
    return yFits && xFits
  }

  // returns true if there are no conflicts, and the piece fits within the boundaries of the board
  canAddPiece = (piece: Layout, [x, y]: Location) =>
    this.noConflicts(piece, [x, y]) && this.pieceFits(piece, [x, y])

  // tries to add piece at the given location; returns false if it cannot be added,
  // returns the board if it can
  addPiece = (piece: Layout, [x, y]: Location) => {
    if (!this.canAddPiece(piece, [x, y])) return false
    piece.forEach((row, i) =>
      row.forEach((cell, j) => {
        this[i + x][j + y] = cell
      })
    )
    return this
  }

  // layout showing where on the current board the given piece *cannot* be placed
  // (false = can be placed here, true = cannot be placed here)
  forbiddenLocations = (piece: Layout) => {
    const result = this.slice() // clone array
    this.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (!cell) cell = this.canAddPiece(piece, [i, j])
      })
    )
    return result
  }
}

type Layout = boolean[][]
type Location = [number, number]
