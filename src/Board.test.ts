import { Board } from './Board'
import { trim } from './trim'

const EMPTY_BOARD = trim(`
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

describe('Board', () => {
  const boardIsEmpty = (board: Board) => {
    for (let i = 0; i < board.size; i++) {
      for (let j = 0; j < board.size; j++) {
        if (board[i][j]) return false
      }
    }
    return true
  }

  it('should be empty at first', () => {
    const b = new Board()
    expect(boardIsEmpty(b)).toBe(true)
  })

  describe('toString', () => {
    it('should render an empty board correctly ', () => {
      expect(new Board(10).toString()).toEqual(EMPTY_BOARD)
    })
  })

  it('should construct an empty board correctly', () => {
    const b = new Board(EMPTY_BOARD)
    expect(boardIsEmpty(b)).toBe(true)
  })
})
