import { Board } from '../models/Board'

export const boardIsEmpty = (board: Board) => {
  for (let i = 0; i < board.size; i++) {
    for (let j = 0; j < board.size; j++) {
      if (board.rows[i][j]) return false
    }
  }
  return true
}
