/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState, useGameDispatch } from 'context'

export const Bot = () => {
  const { board, availablePieces, random } = useGameState()
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
    const piece = availablePieces[0]
    const allowedPositions = board.allowedPositions(piece)
    const position = allowedPositions[Math.floor(random() * allowedPositions.length)]
    dispatch({ type: 'addPiece', payload: { piece, position } })
  }

  return (
    <button css={styles.button} onClick={play}>
      Play
    </button>
  )
}
