import { Reducer } from 'react'
import { Action, GameState } from './context'
export const reducer: Reducer<GameState, Action> = (
  state: GameState,
  { type, payload }: Action
) => {
  switch (type) {
    case 'addPiece': {
      const {
        piece,
        position: [x, y],
      } = payload
      const board = state.board.clone()
      board.clearHover()
      board.addPiece(piece, [x, y])
      const availablePieces = { ...state.availablePieces }
      delete availablePieces[piece.id]
      console.log(availablePieces)
      return { ...state, board, availablePieces }
    }

    case 'hoverPiece': {
      const { piece, position } = payload
      if (
        state.hoverPosition === undefined ||
        (state.hoverPosition[0] !== position[0] || state.hoverPosition[1] !== position[1])
      ) {
        const board = state.board.clone()
        board.clearHover()
        board.addPiece(piece, position, true)
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
