/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState, useGameDispatch } from 'context'
import { Gameboard } from './Gameboard'
import { Piece } from './Piece'
import { useEffect } from 'react'

interface GameProps {
  randomSeed?: string
}

export const Game = ({ randomSeed = '' }: GameProps) => {
  const { boardSize, tileSize, availablePieces } = useGameState()
  const dispatch = useGameDispatch()

  useEffect(() => {
    dispatch({ type: 'randomize', payload: { randomSeed } })
  }, [dispatch, randomSeed])

  const styles = {
    game: css({}),
    pieces: css({
      padding: '1em',
      width: tileSize * boardSize,
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
    }),
  }

  return (
    <div css={styles.game}>
      <Gameboard />
      <div css={styles.pieces}>
        {availablePieces.map(d => (
          <Piece key={d.id} piece={d} />
        ))}
      </div>
    </div>
  )
}
