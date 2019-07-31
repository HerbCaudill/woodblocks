/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { randomPiece } from 'models/pieces'
import { Gameboard } from './Gameboard'
import { Piece } from './Piece'

interface GameProps {
  randomSeed?: string
}

export const Game = ({ randomSeed = '' }: GameProps) => {
  const { boardSize, tileSize } = useGameState()

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
        <Piece name={randomPiece(`${randomSeed}-1`)} />
        <Piece name={randomPiece(`${randomSeed}-2`)} />
        <Piece name={randomPiece(`${randomSeed}-3`)} />
      </div>
    </div>
  )
}
