/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameDispatch, useGameState } from 'context'
import { Position } from 'models/Board'
import { useDrop } from 'react-dnd'
import { DraggablePiece } from './Piece'

interface TileProps {
  isFilled: boolean
  isHover: boolean
  position: Position
}

export const Tile = ({ isFilled, isHover, position }: TileProps) => {
  const { tileSize, board } = useGameState()
  const dispatch = useGameDispatch()

  const [, drop] = useDrop({
    accept: 'piece',

    drop: (item: DraggablePiece) => {
      dispatch({ type: 'addPiece', payload: { piece: item.piece, position } })
    },

    hover: (item: DraggablePiece, monitor) => {
      if (monitor.canDrop())
        dispatch({ type: 'hoverPiece', payload: { piece: item.piece, position } })
    },

    canDrop: (item: DraggablePiece) => board.canAddPiece(item.piece, position),
  })

  const clearHover = () => dispatch({ type: 'clearHover', payload: {} })

  const colors = {
    empty: 'rgba(0,0,0,5%)',
    filled: 'rgba(0,0,255,40%)',
    hover: 'rgba(0,0,255,20%)',
  }

  const styles = {
    tile: css({
      width: tileSize,
      height: tileSize,
      background: isFilled ? colors.filled : isHover ? colors.hover : colors.empty,
      marginRight: 2,
      transition: 'background .5s',
    }),
  }

  return <div ref={drop} css={styles.tile} onDragLeave={clearHover} />
}
