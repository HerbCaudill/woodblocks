import { Board } from 'models/Board'
import { Piece, randomPiece } from 'models/Piece'
import React from 'react'
import makeRandom from 'seed-random'
import { reducer } from './reducer'
import uuid from 'cuid'

export type GameState = {
  random: () => number
  boardSize: number
  tileSize: number
  board: Board
  score: number
  availablePieces: Piece[]
  gameOver: boolean
}

export type Dispatch = (action: Action) => void

export interface StateProviderProps {
  board?: Board
  children: React.ReactNode
}

const newPiece = (id: string | number, random?: () => number) => {
  const piece = randomPiece(random)
  piece.id = id.toString()
  return piece
}

export const newPieces = (random?: () => number) => [1, 2, 3].map(() => newPiece(uuid(), random))

export const defaultGameState: GameState = {
  random: makeRandom(''),
  boardSize: 10,
  tileSize: 50,
  board: new Board(),
  score: 0,
  availablePieces: newPieces(),
  gameOver: false,
}

export const GameStateContext = React.createContext<GameState | undefined>(undefined)
export const GameDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export interface Action {
  type: string
  payload: any
}

export const GameStateProvider = ({ board = new Board(), children }: StateProviderProps) => {
  const initialState = { ...defaultGameState, board: board }
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>{children}</GameDispatchContext.Provider>
    </GameStateContext.Provider>
  )
}

export const useGameState = () => {
  const context = React.useContext(GameStateContext)
  if (context === undefined) throw new Error('useGameState must be used within a GameStateProvider')
  return context
}

export const useGameDispatch = () => {
  const context = React.useContext(GameDispatchContext)
  if (context === undefined)
    throw new Error('useGameDispatch must be used within a GameStateProvider')
  return context
}
