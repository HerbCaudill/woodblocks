/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Board } from 'models/Board'
import { randomPiece } from 'models/pieces'
import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Gameboard } from './Gameboard'
import { Piece } from './Piece'

interface GameProps {
  board: Board
  size: number
  randomSeed: string
}

const emptyBoard = new Board()

export const Game = ({
  size = 50,
  board: initialBoard = emptyBoard,
  randomSeed = '',
}: GameProps) => {
  const [board] = useState(initialBoard)

  const styles = getStyles({ size })
  const pieceSize = size / 2

  return (
    <DndProvider backend={HTML5Backend}>
      <div css={styles.game}>
        <Gameboard board={board} size={size} />
        <div css={styles.pieces}>
          <Piece size={pieceSize} name={randomPiece(`${randomSeed}-1`)} />
          <Piece size={pieceSize} name={randomPiece(`${randomSeed}-2`)} />
          <Piece size={pieceSize} name={randomPiece(`${randomSeed}-3`)} />
        </div>
      </div>
    </DndProvider>
  )
}

const getStyles = ({ size = 50 }: Partial<GameProps>) => {
  return {
    game: css({}),
    pieces: css({
      padding: '1em',
      width: size * 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignContent: 'center',
    }),
  }
}
