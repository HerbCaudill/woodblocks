/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameDispatch, useGameState } from 'context'
import { Location } from 'models/Board'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggablePiece } from './Piece'

interface TileProps {
  isFilled: boolean
  isHover: boolean
  location: Location
}

export const Tile = ({ isFilled, isHover, location }: TileProps) => {
  const { tileSize, board } = useGameState()
  const dispatch = useGameDispatch()
  const [hoverLocation, setHoverLocation] = useState<Location>()

  const [, drop] = useDrop({
    accept: 'piece',

    drop: (item: DraggablePiece) =>
      dispatch({ type: 'addPiece', payload: { pieceName: item.name, location } }),

    hover: (item: DraggablePiece, monitor) => {
      if (!hoverLocation || location[0] !== hoverLocation[0] || location[1] !== hoverLocation[1]) {
        console.log('new location')
        setHoverLocation(location)
        if (monitor.canDrop())
          dispatch({ type: 'hoverPiece', payload: { pieceName: item.name, location } })
        else dispatch({ type: 'clearHover', payload: {} })
      }
    },

    canDrop: (item: DraggablePiece) => board.canAddPiece(item.piece, location) as boolean,
  })

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
      transition: 'background .2s',
    }),
  }

  return <div ref={drop} css={styles.tile} />
}
