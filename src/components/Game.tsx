/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Gameboard } from './Gameboard'
import { Piece } from './Piece'

interface GameProps {
  randomSeed?: string
}

export const Game = ({ randomSeed = '' }: GameProps) => {
  const { boardSize, tileSize, availablePieces } = useGameState()

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
        {Object.keys(availablePieces).map(d => (
          <Piece key={d} piece={availablePieces[d]} />
        ))}
      </div>
    </div>
  )
}
