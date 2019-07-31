import { Board } from 'models/Board'
import React from 'react'

export type GameState = {
  boardSize: number
  tileSize: number
  board: Board
  score: number
}

export type Action = { type: 'addPiece' } | { type: 'clearRow' }

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
}

export const GameStateContext = React.createContext<GameState | undefined>(undefined)

export const GameDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export function stateReducer(state: GameState, action: Action) {
  switch (action.type) {
    case 'addPiece': {
      return state
    }

    case 'clearRow': {
      return state
    }
  }
}

export const GameStateProvider = ({ board = new Board(), children }: StateProviderProps) => {
  const [state, dispatch] = React.useReducer(stateReducer, { ...defaultGameState, board: board })
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
