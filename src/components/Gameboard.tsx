/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Tile } from './Tile'
import { useDrop } from 'react-dnd'

export const Gameboard = () => {
  const { boardSize, tileSize, board } = useGameState()

  const addPiece = () => {}

  // const [{ isOver, canDrop }, drop] = useDrop({
  const [, drop] = useDrop({
    accept: 'piece',
    canDrop: () => true,
    drop: () => addPiece(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

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
    <div ref={drop} css={styles.board}>
      {board.rows.map((row, i) => (
        <div key={i} css={styles.row}>
          {row.map((cell, j) => (
            <Tile key={j} isFilled={cell} />
          ))}
        </div>
      ))}
    </div>
  )
}
