/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState, useGameDispatch } from 'context'
import { Gameboard } from './Gameboard'
import { Piece } from './Piece'
import { useEffect } from 'react'
import { Bot } from './Bot'

interface GameProps {
  randomSeed?: string
}

export const Game = ({ randomSeed = '' }: GameProps) => {
  const { score, boardSize, tileSize, availablePieces } = useGameState()
  const dispatch = useGameDispatch()

  useEffect(() => {
    dispatch({ type: 'randomize', payload: { randomSeed } })
  }, [dispatch, randomSeed])

  const styles = {
    game: css({
      display: 'flex',
      padding: 20,
    }),
    score: css({
      fontSize: 36,
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      marginBottom: 20,
      flexGrow: 8,
    }),
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
      <div
        css={{
          flex: 0,
          background: 'rgba(0,0,0,.03)',
          padding: 20,
        }}
      >
        <div css={{ display: 'flex' }}>
          <div css={styles.score}>{score}</div>
          <div>
            <Bot />
          </div>
        </div>
        <Gameboard />
        <div css={styles.pieces}>
          {availablePieces.map(d => (
            <Piece key={d.id} piece={d} />
          ))}
        </div>
      </div>
    </div>
  )
}
