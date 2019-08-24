import { toCellArray } from '../lib/toCellArray'
import { LF } from '../lib/constants'
import { Piece } from './Piece'

import { Line, Layout, Position } from '../types'
import { sum } from 'lib/gapScore'
import * as R from 'ramda'

// all boards are 10 x 10 for now
export const N = 10

const emptyBoard = () =>
  Array(N)
    .fill(null)
    .map(_ =>
      Array(N)
        .fill(null)
        .map(_ => ({ filled: false }))
    )

export class Board {
  size: number

  constructor(s: string = '') {
    this.size = N
    this.rows = emptyBoard()
    if (s.length) this.fromString(s)
  }

  rows: Array<Line>

  get columns() {
    const column = (col_index: number) => this.rows.map(row => row[col_index])
    return this.rows.map((_, i) => column(i))
  }

  get filledCount() {
    return sum(this.rows.map(r => r.map(cell => (cell.filled ? 1 : 0))).flat())
  }

  fromArray = (arr: Layout) => {
    this.rows = arr
    return this
  }

  clone = () => new Board().fromArray(R.clone(this.rows))

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
    if (!this.canAddPiece(piece, [x, y])) {
      throw new Error(`Cannot add piece ${piece.name} at [${x}, ${y}]`)
    }
    this.clearHover()
    piece.rows.forEach((pieceRow, row_index) =>
      pieceRow.forEach((pieceCell, col_index) => {
        if (pieceCell.filled) {
          const boardCell = this.rows[row_index + y][col_index + x]
          boardCell.color = piece.color
          if (hover) boardCell.hover = true
          else boardCell.filled = true
        }
      })
    )
    this.clearFilled()
    return this
  }

  clearHover = () =>
    this.rows.forEach(row =>
      row.forEach(cell => {
        if (cell.hover) cell.color = ''
        cell.hover = false
      })
    )

  // layout showing where on the current board the given piece can be placed
  // (true = can be placed here, false = cannot be placed here)
  allowedPositionsMap = (piece: Piece) =>
    this.rows.map((row, row_index) =>
      row.map((cell, col_index) => ({
        filled: !cell.filled && this.canAddPiece(piece, [col_index, row_index]),
      }))
    )

  // array of positions where the given piece can be placed
  allowedPositions = (piece: Piece) => {
    const result = [] as [number, number][]
    this.rows.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (!cell.filled && this.canAddPiece(piece, [x, y])) result.push([x, y])
      })
    )
    return result
  }

  // find rows or columns that are completely filled, and clears them
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
    const columns = this.columns
    const filledColumns = columns.map((_, i) => i).filter(i => isFilled(columns[i]))

    // clear all filled
    filledRows.forEach(clearRow)
    filledColumns.forEach(clearColumn)

    return this
  }
}

export const rowToText = (row: Line) =>
  row.map(cell => (cell.filled ? '@' : cell.hover ? 'O' : '-')).join('')
