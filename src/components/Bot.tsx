/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState, useGameDispatch } from 'context'
import { Piece } from 'models/Piece'
import { Board, Position } from 'models/Board'

export const Bot = () => {
  const { board, availablePieces, random, gameOver } = useGameState()
  const dispatch = useGameDispatch()

  const styles = {
    button: css({
      fontSize: 24,
      padding: '10px 20px',
      borderRadius: 10,
      border: '1px solid #ccc',
      background: 'white',
      outline: 'none',
      cursor: 'pointer',
      ':hover': {
        background: '#ddd',
      },
      ':active': {
        background: 'blue',
        color: 'white',
      },
    }),
  }

  const play = () => {
    const situation = { board, pieces: availablePieces }
    const strategy = strategies.random
    const [piece, position] = strategy(situation)
    dispatch({ type: 'addPiece', payload: { piece, position } })
  }

  return (
    <div>
      {!gameOver && (
        <button css={styles.button} onClick={play}>
          Play
        </button>
      )}
    </div>
  )
}

const strategies = {
  random: ({ board, pieces }) => {
    // find the first piece that has at least one legal move
    const piece = pieces.find(p => board.allowedPositions(p).length > 0)
    if (piece !== undefined) {
      const allowedPositions = board.allowedPositions(piece)
      // pick one at random
      const position = allowedPositions![Math.floor(Math.random() * allowedPositions.length)]
      return [piece, position]
    } else {
      // game is over, shouldn't have gotten here
    }
  },
} as StrategyBook

type Move = [Piece, Position]
type Situation = { board: Board; pieces: Piece[] }
type Strategy = ({ board, pieces }: Situation) => Move
type StrategyBook = {
  [key: string]: Strategy
}
