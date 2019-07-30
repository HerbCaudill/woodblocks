/** @jsx jsx */
import { css, jsx } from '@emotion/core'

interface GameboardProps {
  size: number
}

const N = 10
export const Gameboard = (props: GameboardProps) => {
  const styles = getStyles(props)
  return (
    <div css={styles.board}>
      {/* {word.split('').map((letter, i) => {
        const seed = `${word}-${i}`
        return <Tile key={i} size={size} letter={letter as Letter} seed={seed} isFaceUp={true} />
      })} */}
    </div>
  )
}

const getStyles = ({ size = 50 }: Partial<GameboardProps>) => {
  return {
    board: css({
      width: N * size,
      height: N * size,
      display: 'flex',
      background: 'yellow',
      justifyContent: 'center',
    }),
  }
}
