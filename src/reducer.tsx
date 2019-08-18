import { Reducer } from 'react'
import { pieces } from 'models/pieces'
import { GameState, Action } from './context'
export const reducer: Reducer<GameState, Action> = (
  state: GameState,
  { type, payload }: Action
) => {
  console.log(type, JSON.stringify(payload))
  switch (type) {
    case 'addPiece': {
      const {
        pieceName,
        position: [x, y],
        id,
      } = payload
      const board = state.board.clone()
      board.clearHover()
      board.addPiece(pieces[pieceName], [x, y])
      const availablePieces = {
        ...state.availablePieces,
        [id]: false,
      }
      state.availablePieces[id] = false
      return { ...state, board, availablePieces }
    }
    case 'hoverPiece': {
      const { pieceName, position } = payload
      if (
        state.hoverPosition === undefined ||
        (state.hoverPosition[0] !== position[0] || state.hoverPosition[1] !== position[1])
      ) {
        console.log('new hover position')
        const board = state.board.clone()
        board.clearHover()
        board.addPiece(pieces[pieceName], position, true)
        return { ...state, board, hoverPosition: position }
      }
      return state
    }
    case 'clearHover': {
      const board = state.board.clone()
      board.clearHover()
      return { ...state, board, hoverPosition: undefined }
    }
    default: {
      return state
    }
  }
}
