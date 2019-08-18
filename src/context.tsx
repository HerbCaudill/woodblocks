import { Board, Position } from 'models/Board'
import React from 'react'
import { reducer } from './reducer'

export type GameState = {
  boardSize: number
  tileSize: number
  board: Board
  score: number
  hoverPosition: Position | undefined
  availablePieces: { [key: number]: boolean }
}

export type Dispatch = (action: Action) => void

export interface StateProviderProps {
  board?: Board
  children: React.ReactNode
}

export const defaultGameState: GameState = {
  boardSize: 10,
  tileSize: 50,
  board: new Board(),
  score: 0,
  hoverPosition: undefined,
  availablePieces: { 1: true, 2: true, 3: true },
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
