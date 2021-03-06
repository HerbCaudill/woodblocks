﻿/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Cell } from 'types'
import { Piece as PieceModel } from 'models/Piece'
import { useDrag } from 'react-dnd'

interface PieceProps {
  piece: PieceModel
}

export interface DraggablePiece {
  type: string
  piece: PieceModel
}

export const Piece = ({ piece }: PieceProps) => {
  const { tileSize, gameOver } = useGameState()

  const [{ isDragging }, drag] = useDrag({
    canDrag: !gameOver,
    item: { type: 'piece', piece },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  })

  const pieceTileSize = tileSize * 0.6

  const styles = {
    piece: css({
      cursor: 'pointer',
      padding: 2,
      margin: 'auto',
      opacity: isDragging ? 0 : 1,
    }),
    row: css({
      height: pieceTileSize,
      display: 'flex',
      marginBottom: 2,
    }),
    tile: (cell: Cell) =>
      css({
        width: pieceTileSize,
        height: pieceTileSize,
        background: cell.filled ? piece.color : 'transparent',
        marginRight: 2,
      }),
  }

  return (
    <div css={styles.piece} ref={drag}>
      {piece.rows.map((row, i) => (
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
