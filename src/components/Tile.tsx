/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameDispatch, useGameState } from 'context'
import { Position } from 'types'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import { DraggablePiece } from './Piece'
import { debounce } from 'lib/debounce'

interface TileProps {
  isFilled: boolean
  isHover: boolean
  color?: string
  position: Position
}

export const Tile = ({ isFilled, isHover, color, position }: TileProps) => {
  const { tileSize, board, gameOver } = useGameState()
  const dispatch = useGameDispatch()

  const onDrop = (item: DraggablePiece) => {
    dispatch({ type: 'addPiece', payload: { piece: item.piece, position } })
  }

  const onHover = (item: DraggablePiece, monitor: DropTargetMonitor) => {
    if (monitor.canDrop() && !isHover)
      dispatch({ type: 'hoverPiece', payload: { piece: item.piece, position } })
  }

  const [, drop] = useDrop({
    accept: 'piece',

    drop: onDrop,

    hover: debounce(onHover, 1000),

    canDrop: (item: DraggablePiece) => board.canAddPiece(item.piece, position),
  })

  const clearHover = () => dispatch({ type: 'clearHover', payload: {} })

  const styles = {
    tile: css({
      width: tileSize,
      height: tileSize,
      background: isFilled || isHover ? color : 'rgba(0,0,0,5%)',
      opacity: isHover ? 0.5 : 1,
      marginRight: 2,
    }),
  }

  return gameOver ? (
    <div css={styles.tile} />
  ) : (
    <div ref={drop} css={styles.tile} onDragLeave={clearHover} />
  )
}
