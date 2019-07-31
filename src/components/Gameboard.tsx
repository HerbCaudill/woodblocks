/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Tile } from './Tile'

export const Gameboard = () => {
  const { boardSize, tileSize, board } = useGameState()

  const styles = {
    board: css({
      padding: '1em',
      background: 'rgba(0,0,0,2%)',
      width: tileSize * boardSize,
    }),
    row: css({
      height: tileSize,
      display: 'flex',
      marginBottom: 2,
    }),
  }

  return (
    <div css={styles.board}>
      {board.rows.map((row, y) => (
        <div key={y} css={styles.row}>
          {row.map((cell, x) => (
            <Tile key={x} location={[x, y]} isFilled={cell} />
          ))}
        </div>
      ))}
      {/* <pre>{JSON.stringify(collectedProps)}</pre> */}
    </div>
  )
}
