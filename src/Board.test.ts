import { Board } from './Board'
import { trim } from './trim'
import { pieces } from 'Piece'

const match = (a: Board, b: string) => {
  expect(a.toString()).toEqual(trim(b))
}

const emptyBoard = trim(`
  ··········
  ··········
  ··········
  ··········
  ··········
  ··········
  ··········
  ··········
  ··········
  ··········`)

const boardIsEmpty = (board: Board) => {
  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      if (board[i][j]) return false
    }
  }
  return true
}

describe('Board', () => {
  describe('constructor', () => {
    it('should be empty at first', () => {
      const b = new Board()
      expect(boardIsEmpty(b)).toBe(true)
    })

    it('should construct an empty board correctly', () => {
      const b = new Board(emptyBoard)
      expect(boardIsEmpty(b)).toBe(true)
    })

    it('should construct from a given string', () => {
      const board = new Board(`
         ■·········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········`)
      expect(boardIsEmpty(board)).toBe(false)
      expect(board[0][0]).toBe(true)
      expect(board[1][0]).toBe(false)
      expect(board[0][1]).toBe(false)
      expect(board[1][1]).toBe(false)
    })
  })

  describe('toString', () => {
    it('should render an empty board correctly ', () => {
      expect(new Board().toString()).toEqual(emptyBoard)
    })
  })

  describe('conflicts', () => {
    test('case 1', () => {
      const board = new Board(`
         ■·········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········`)
      expect(board.conflictsExist(pieces[0], [0, 0])).toBe(true)
      expect(board.conflictsExist(pieces[0], [1, 0])).toBe(false)
    })

    test('case 2', () => {
      const board = new Board(`
         ··········
         ·■········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········`)
      expect(board.conflictsExist(pieces[9], [0, 0])).toBe(false)
      expect(board.conflictsExist(pieces[9], [1, 0])).toBe(true)
    })
  })

  describe('pieceFits', () => {
    it('1x1', () => {
      const board = new Board()
      const piece = pieces[0]
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [11, 0])).toBe(false)
      expect(board.pieceFits(piece, [0, 11])).toBe(false)
    })

    it('5x1', () => {
      const board = new Board()
      const piece = pieces[4]
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [8, 0])).toBe(false)
      expect(board.pieceFits(piece, [0, 8])).toBe(true)
    })

    it('1x5', () => {
      const board = new Board()
      const piece = pieces[8]
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [8, 0])).toBe(true)
      expect(board.pieceFits(piece, [0, 8])).toBe(false)
    })
  })

  describe('addPiece', () => {
    test('case 1', () => {
      const board = new Board(emptyBoard)
      board.addPiece(pieces[0], [0, 0])
      match(
        board,
        `■·········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········`
      )
    })

    test('case 2', () => {
      const board = new Board(emptyBoard)
      board.addPiece(pieces[5], [2, 0])
      match(
        board,
        `··········
         ··········
         ■·········
         ■·········
         ··········
         ··········
         ··········
         ··········
         ··········
         ··········`
      )
    })

    test('case 2', () => {
      const board = new Board(emptyBoard)
      board.addPiece(pieces[10], [3, 3])
      match(
        board,
        `··········
         ··········
         ··········
         ···■■·····
         ····■·····
         ··········
         ··········
         ··········
         ··········
         ··········`
      )
    })
  })
})
