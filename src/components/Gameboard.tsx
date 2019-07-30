/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Board } from 'models/Board'

interface GameboardProps {
  size: number
  board: Board
}

export const Gameboard = ({ size, board }: GameboardProps) => {
  const styles = getStyles({ size, board })
  return (
    <div css={styles.board}>
      {board.rows.map((row, i) => (
        <div key={i} css={styles.row}>
          {row.map((cell, j) => (
            <div key={j} css={styles.tile(cell)}>
              &nbsp;
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const getStyles = ({ size = 33 }: Partial<GameboardProps>) => {
  const colors = {
    off: 'rgba(0,0,0,5%)',
    on: 'rgba(0,0,255,10%)',
  }
  return {
    board: css({
      padding: 2,
    }),
    row: css({
      height: size,
      display: 'flex',
      marginBottom: 2,
    }),
    tile: (cell: boolean) =>
      css({
        width: size,
        height: size,
        background: cell ? colors.on : colors.off,
        marginRight: 2,
      }),
  }
}
