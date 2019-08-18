/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState, useGameDispatch } from 'context'

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
    // find the first piece that has at least one legal move
    const piece = availablePieces.find(p => board.allowedPositions(p).length > 0)
    if (piece !== undefined) {
      const allowedPositions = board.allowedPositions(piece)
      // pick one at random
      const position = allowedPositions![Math.floor(random() * allowedPositions.length)]
      dispatch({ type: 'addPiece', payload: { piece, position } })
    } else {
      // game is over, reducer should have caught it already
    }
  }

  return (
    !gameOver && (
      <button css={styles.button} onClick={play}>
        Play
      </button>
    )
  )
}
