/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useGameState } from 'context'
import { Tile } from './Tile'

export const Gameboard = () => {
  const { tileSize, board, gameOver } = useGameState()

  const styles = {
    wrapper: css({}),
    board: css({
      padding: 0,
      marginBottom: 20,
      marginTop: 20,
    }),
    row: css({
      height: tileSize,
      display: 'flex',
      marginBottom: 2,
    }),
    gameOver: css({
      display: gameOver ? 'block' : 'none',
      background: 'red',
      borderRadius: 24,
      fontSize: 30,
      padding: '10px 40px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontFamily: 'sans-serif',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }),
  }

  console.log('render gameboard')
  return (
    <div css={{ position: 'relative' }}>
      <div css={styles.gameOver}>Game Over</div>
      <div css={styles.board}>
        {board.rows.map((row, y) => (
          <div key={y} css={styles.row}>
            {row.map((cell, x) => (
              <Tile
                key={x}
                position={[x, y]}
                isFilled={cell.filled === true}
                isHover={cell.hover === true}
                color={cell.color}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
