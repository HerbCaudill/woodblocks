/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'

interface TileProps {
  isFilled: boolean
}
export const Tile = ({ isFilled }: TileProps) => {
  const { tileSize } = useGameState()

  const colors = {
    empty: 'rgba(0,0,0,5%)',
    filled: 'rgba(0,0,255,10%)',
  }

  const styles = {
    tile: css({
      width: tileSize,
      height: tileSize,
      background: isFilled ? colors.filled : colors.empty,
      marginRight: 2,
    }),
  }

  return <div css={styles.tile} />
}
