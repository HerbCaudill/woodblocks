/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Tile } from './Tile'

export const Gameboard = () => {
  const { tileSize, board } = useGameState()

  const styles = {
    wrapper: css({}),
    board: css({
      padding: 0,
      marginBottom: 20,
      marginTop: 20,
    }),
    row: css({
      height: tileSize,
      display: 'flex',
      marginBottom: 2,
    }),
  }

  return (
    <div>
      <div css={styles.board}>
        {board.rows.map((row, y) => (
          <div key={y} css={styles.row}>
            {row.map((cell, x) => (
              <Tile
                key={x}
                position={[x, y]}
                isFilled={cell.filled === true}
                isHover={cell.hover === true}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
