import { LF, emptyBoard } from './constants'
import { toBooleanArray } from 'toBooleanArray'
import { number } from 'prop-types'
import { range } from 'range'

// all boards are 10 x 10 for now
const N = 10

export class Board {
  size: number
  rows: Array<Line>

  constructor(s: string = '') {
    this.size = N
    this.rows = Array(N)
      .fill(null)
      .map(_ => Array(N).fill(false))
    if (s.length) this.fromString(s)
  }

  fromArray = (arr: Layout) => ((this.rows = arr), this)

  fromString = (s: string) => this.fromArray(toBooleanArray(s))

  toString = () => this.rows.map(row => row.map(cell => (cell ? 'x' : '-')).join('')).join(LF)

  // determines whether the piece doesn't conflict with existing pieces on the board
  noConflicts = (piece: Layout, [x, y]: Location) => {
    const conflicts = piece.map((row, row_index) =>
      row.map((cell, col_index) => this.rows[row_index + y][col_index + x] && cell)
    )
    // returns true if any element of `conflicts` is true
    return !conflicts.some(row => row.some(cell => cell))
  }

  // determines whether the piece fits entirely within the boundaries of the board
  pieceFits = (piece: Layout, [x, y]: Location) => {
    const rowCount = piece.length
    const colCount = Math.max(...piece.map(row => row.length))
    return y + rowCount <= N && x + colCount <= N
  }

  // returns true if there are no conflicts, and the piece fits within the boundaries of the board
  canAddPiece = (piece: Layout, [x, y]: Location) =>
    this.pieceFits(piece, [x, y]) && this.noConflicts(piece, [x, y])

  // tries to add piece at the given location; returns false if it cannot be added,
  // returns the board if it can
  addPiece = (piece: Layout, [x, y]: Location) => {
    if (!this.canAddPiece(piece, [x, y])) throw new Error('Cannot add piece here')
    piece.forEach((row, row_index) =>
      row.forEach((cell, col_index) => {
        const current = this.rows[row_index + y][col_index + x]
        this.rows[row_index + y][col_index + x] = cell || current
      })
    )
    return this
  }

  // layout showing where on the current board the given piece can be placed
  // (true = can be placed here, false = cannot be placed here)
  allowedLocations = (piece: Layout) =>
    this.rows.map((row, row_index) =>
      row.map((cell, col_index) => !cell && this.canAddPiece(piece, [col_index, row_index]))
    )

  clearFilled = () => {
    const isFilled = (arr: Line) => !arr.some(cell => cell === false)

    const clearRow = (row_index: number) =>
      this.rows[row_index].forEach((_, i) => (this.rows[row_index][i] = false))
    const clearColumn = (col_index: number) => this.rows.forEach(row => (row[col_index] = false))

    // find filled rows
    const filledRows = this.rows
      .map((_, row_index) => row_index)
      .filter(row_index => isFilled(this.rows[row_index]))

    // find filled columns
    const column = (col_index: number) => this.rows.map(row => row[col_index])
    const columns = this.rows.map((_, i) => column(i))
    const filledColumns = columns.map((_, i) => i).filter(i => isFilled(columns[i]))

    // clear all filled
    filledRows.forEach(clearRow)
    filledColumns.forEach(clearColumn)

    // console.log(this.toString())
    return this
  }
}

type Line = boolean[]
type Layout = Line[]
type Location = [number, number]
