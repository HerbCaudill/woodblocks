import { Board } from 'models/Board'
import { Piece } from 'models/Piece'
import { Reducer } from 'react'
import makeRandom from 'seed-random'
import { Action, GameState, newPieces } from './context'

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

      // is game over?
      const gameOver = isGameOver(board, availablePieces)

      return { ...state, board, availablePieces, score, gameOver }
    }

    case 'hoverPiece': {
      const { piece, position } = payload
      const board = state.board.clone()
      board.addPiece(piece, position, true)
      return { ...state, board }
    }

    case 'clearHover': {
      const board = state.board.clone()
      board.clearHover()
      return { ...state, board }
    }

    default: {
      return state
    }
  }
}

const isGameOver = (board: Board, pieces: Piece[]) => {
  const possibleMoves = pieces.map(piece => board.allowedPositions(piece).length)
  return sum(possibleMoves) === 0
}

const sum = (arr: number[]) => arr.reduce((total, n) => total + n, 0)
