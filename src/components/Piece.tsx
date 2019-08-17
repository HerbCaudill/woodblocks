/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { pieces } from 'models/pieces'
import { useDrag } from 'react-dnd'
import { useGameState } from 'context'

interface PieceProps {
  name: keyof typeof pieces
}

export const Piece = ({ name }: PieceProps) => {
  const { tileSize } = useGameState()

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'piece',
      name,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const pieceTileSize = tileSize / 2

  const colors = {
    off: 'transparent',
    on: 'rgba(0,0,255,50%)',
  }

  const styles = {
    piece: css({
      cursor: 'pointer',
      padding: 2,
      margin: 'auto',
      opacity: isDragging ? 0.5 : 1,
    }),
    row: css({
      height: pieceTileSize,
      display: 'flex',
      marginBottom: 2,
    }),
    tile: (cell: boolean) =>
      css({
        width: pieceTileSize,
        height: pieceTileSize,
        background: cell ? colors.on : colors.off,
        marginRight: 2,
      }),
  }
  const piece = pieces[name]

  return (
    <div css={styles.piece} ref={drag}>
      {piece.map((row, i) => (
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
