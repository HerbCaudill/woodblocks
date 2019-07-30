/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Board } from 'models/Board'
import { Tile } from './Tile'

interface GameboardProps {
  size: number
  board: Board
}

const emptyBoard = new Board()

export const Gameboard = ({ size = 50, board = emptyBoard }: GameboardProps) => {
  const styles = getStyles({ size, board })

  return (
    <div css={styles.board}>
      {board.rows.map((row, i) => (
        <div key={i} css={styles.row}>
          {row.map((cell, j) => (
            <Tile key={j} on={cell} size={size} />
          ))}
        </div>
      ))}
    </div>
  )
}

const getStyles = ({ size = 33 }: Partial<GameboardProps>) => {
  return {
    board: css({
      padding: 2,
    }),
    row: css({
      height: size,
      display: 'flex',
      marginBottom: 2,
    }),
  }
}
