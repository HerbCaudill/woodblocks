import { toCellArray } from '../lib/toCellArray'
import { LF } from '../lib/constants'
import { Piece } from './pieces'

// all boards are 10 x 10 for now
export const N = 10

export class Board {
  size: number
  rows: Array<Line>

  constructor(s: string = '') {
    this.size = N
    this.rows = Array(N)
      .fill(null)
      .map(_ =>
        Array(N)
          .fill(null)
          .map(_ => ({
            filled: false,
          }))
      )
    if (s.length) this.fromString(s)
  }

  fromArray = (arr: Layout) => {
    this.rows = arr
    return this
  }

  clone = () => new Board().fromArray(this.rows)

  fromString = (s: string) => this.fromArray(toCellArray(s))

  toString = () => this.rows.map(rowToText).join(LF)

  // determines whether the piece conflicts with existing pieces on the board
  noConflicts = (piece: Piece, [x, y]: Position) => {
    const conflicts = piece.rows.map((row, row_index) =>
      row.map((cell, col_index) => this.rows[row_index + y][col_index + x].filled && cell.filled)
    )
    // returns true if any element of `conflicts` is true
    return !conflicts.some(row => row.some(cell => cell))
  }

  // determines whether the piece fits entirely within the boundaries of the board
  pieceFits = (piece: Piece, [x, y]: Position) => {
    const height = piece.rows.length
    const width = Math.max(...piece.rows.map(row => row.length))
    return y + height <= N && x + width <= N
  }

  // returns true if there are no conflicts, and the piece fits within the boundaries of the board
  canAddPiece = (piece: Piece, [x, y]: Position) =>
    this.pieceFits(piece, [x, y]) && this.noConflicts(piece, [x, y])

  // tries to add piece at the given position; throws an error if it cannot be added,
  // returns the board if it can
  addPiece = (piece: Piece, [x, y]: Position, hover: boolean = false) => {
    if (!this.canAddPiece(piece, [x, y])) throw new Error('Cannot add piece here')
    piece.rows.forEach((pieceRow, row_index) =>
      pieceRow.forEach((pieceCell, col_index) => {
        const boardCell = this.rows[row_index + y][col_index + x]
        if (hover) {
          // we're just hovering the piece, not adding it to the board
          boardCell.hover = pieceCell.filled
        } else {
          boardCell.filled = pieceCell.filled || boardCell.filled
          this.clearFilled()
        }
      })
    )
    return this
  }

  clearHover = () => this.rows.forEach(row => row.forEach(cell => (cell.hover = false)))

  // layout showing where on the current board the given piece can be placed
  // (true = can be placed here, false = cannot be placed here)
  allowedPositions = (piece: Piece) =>
    this.rows.map((row, row_index) =>
      row.map((cell, col_index) => ({
        filled: !cell.filled && this.canAddPiece(piece, [col_index, row_index]),
      }))
    )

  clearFilled = () => {
    const isFilled = (arr: Line) => !arr.some(cell => cell.filled === false)

    const clearRow = (row_index: number) =>
      this.rows[row_index].forEach((_, i) => (this.rows[row_index][i].filled = false))
    const clearColumn = (col_index: number) =>
      this.rows.forEach(row => (row[col_index].filled = false))

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

    return this
  }
}

export const rowToText = (row: Line) =>
  row.map(cell => (cell.filled ? '@' : cell.hover ? 'O' : '-')).join('')

export interface Cell {
  filled: boolean
  hover?: boolean
}

export type Line = Cell[]
export type Layout = Line[]
export type Position = [number, number]
