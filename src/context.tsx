import { Board } from 'models/Board'
import React, { Reducer } from 'react'
import { pieces } from 'models/pieces'

export type GameState = {
  boardSize: number
  tileSize: number
  board: Board
  score: number
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
}

export const GameStateContext = React.createContext<GameState | undefined>(undefined)

export const GameDispatchContext = React.createContext<Dispatch | undefined>(undefined)

export interface Action {
  type: string
  payload: any
}

export const stateReducer: Reducer<GameState, Action> = (
  state: GameState,
  { type, payload }: Action
) => {
  console.log(type, JSON.stringify(payload))
  switch (type) {
    case 'hoverPiece': {
      const {
        pieceName,
        location: [x, y],
      } = payload
      const board = state.board.clone()
      board.clearHover()
      board.addPiece(pieces[pieceName], [x, y], true)
      return { ...state, board }
    }

    case 'addPiece': {
      const {
        pieceName,
        location: [x, y],
      } = payload
      const board = state.board.clone()
      board.clearHover()
      board.addPiece(pieces[pieceName], [x, y])
      return { ...state, board }
    }

    case 'clearHover': {
      const board = state.board.clone()
      board.clearHover()
      return { ...state, board }
    }

    case 'clearRow': {
      return state
    }

    default: {
      return state
    }
  }
}

export const GameStateProvider = ({ board = new Board(), children }: StateProviderProps) => {
  const initialState = { ...defaultGameState, board: board }
  const [state, dispatch] = React.useReducer(stateReducer, initialState)
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
