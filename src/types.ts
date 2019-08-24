import { Piece } from 'models/Piece'
import { Board } from 'models/Board'

export interface Cell {
  filled: boolean
  hover?: boolean
  color?: string
}

export type Line = Cell[]
export type Layout = Line[]
export type Position = [number, number]

export type Move = [Piece, Position]
export type Situation = { board: Board; pieces: Piece[] }
export type Strategy = ({ board, pieces }: Situation) => Move
export type StrategyBook = {
  [key: string]: Strategy
}
