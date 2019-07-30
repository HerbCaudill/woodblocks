import { Board } from './Board'
import { trim } from './trim'

export const match = (board: Board, s: string) => {
  expect(board.toString()).toEqual(trim(s))
}
