import { Reducer } from 'react'
import { Action, GameState, newPieces } from './context'
import makeRandom from 'seed-random'

export const reducer: Reducer<GameState, Action> = (
  state: GameState,
  { type, payload }: Action
) => {
  switch (type) {
    case 'randomize': {
      const { randomSeed } = payload
      const random = makeRandom(randomSeed)
      return { ...state, random }
    }

    case 'addPiece': {
      const {
        piece,
        position: [x, y],
      } = payload
      const board = state.board.clone()
      board.addPiece(piece, [x, y])

      // added piece is no longer available
      const availablePieces = state.availablePieces.filter(p => p.id !== piece.id)

      // refill available pieces if they're all gone
      if (availablePieces.length === 0) availablePieces.push(...newPieces())

      // update score
      const score = state.score + piece.points

      return { ...state, board, availablePieces, score }
    }

    case 'hoverPiece': {
      const { piece, position } = payload
      if (
        state.hoverPosition === undefined ||
        (state.hoverPosition[0] !== position[0] || state.hoverPosition[1] !== position[1])
      ) {
        const board = state.board.clone()
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
