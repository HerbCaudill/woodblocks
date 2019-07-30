/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Board } from 'models/Board'
import { Gameboard } from './Gameboard'

interface GameProps {
  board: Board
}

export const Game = ({ board }: GameProps) => {
  const styles = getStyles()
  return (
    <div css={styles.game}>
      <Gameboard board={board} size={50} />
    </div>
  )
}

const getStyles = () => {
  return {
    game: css({
      padding: 2,
    }),
  }
}
