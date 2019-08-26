/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import debounce from 'awesome-debounce-promise';
import { useGameDispatch, useGameState } from 'context';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { Position } from 'types';
import useConstant from 'use-constant';
import { DraggablePiece } from './Piece';


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

  const debouncedOnHover = useConstant(() => debounce(onHover, 100))

  const [, drop] = useDrop({
    accept: 'piece',
    drop: onDrop,
    hover: debouncedOnHover,
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
      transition: 'background .1s, opacity .1s',
    }),
  }

  return gameOver ? (
    <div css={styles.tile} />
  ) : (
      <div
        ref={drop}
        css={styles.tile}
      // onDragLeave={debounce(clearHover, 110)}
      />
    )
}
