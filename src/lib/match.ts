import { Board } from '../models/Board'
import { trimMultiple } from './trimMultiple'

export const match = (board: Board, s: string) => {
  expect(board.toString()).toEqual(trimMultiple(s))
}
