/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { pieces } from 'models/pieces'

interface PieceProps {
  size: number
  name: keyof typeof pieces
}

export const Piece = ({ size, name }: PieceProps) => {
  const styles = getStyles({ size, name })
  const piece = pieces[name]
  return (
    <div css={styles.piece}>
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

const getStyles = ({ size = 33 }: Partial<PieceProps>) => {
  const colors = {
    off: 'transparent',
    on: 'rgba(0,0,255,10%)',
  }
  return {
    piece: css({
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
