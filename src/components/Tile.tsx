/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDrop } from 'react-dnd'

interface TileProps {
  on: boolean
  size: number
}
export const Tile = ({ on, size }: TileProps) => {
  const addPiece = () => {}

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'piece',
    canDrop: () => true,
    drop: () => addPiece(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })

  const styles = getStyles({ on, size })
  return <div ref={drop} css={styles.tile(on)} />
}

const getStyles = ({ on, size }: TileProps) => {
  const colors = {
    off: 'rgba(0,0,0,5%)',
    on: 'rgba(0,0,255,10%)',
  }
  return {
    tile: (cell: boolean) =>
      css({
        width: size,
        height: size,
        background: on ? colors.on : colors.off,
        marginRight: 2,
      }),
  }
}
