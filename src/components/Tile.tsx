/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { useDrop } from 'react-dnd'
import { pieces } from 'models/pieces'
import { Layout, Location } from 'models/Board'

interface TileProps {
  isFilled: boolean
  location: Location
}

export const Tile = ({ isFilled, location }: TileProps) => {
  const { tileSize, board } = useGameState()

  const addPiece = () => {}

  const canAddPiece = (name: string) => {
    const piece = pieces[name] as Layout
    return board.canAddPiece(piece, location) as boolean
  }

  const [{ isOver, canDrop, item, offset }, drop] = useDrop({
    accept: 'piece',
    drop: addPiece,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.getItem() && canAddPiece(monitor.getItem().name),
      item: monitor.getItem(),
      offset: monitor.getClientOffset(),
    }),
  })

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

  return (
    <div ref={drop} css={styles.tile}>
      {isOver && <pre>{JSON.stringify({ canDrop, location, isOver, item, offset })}</pre>}
    </div>
  )
}
