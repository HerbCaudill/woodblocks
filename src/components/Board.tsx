/** @jsx jsx */
import { css, jsx } from '@emotion/core'

interface BoardProps {
  size: number
}

const Board = (props: BoardProps) => {
  const N = 10
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

const getStyles = ({ size = 50 }: Partial<BoardProps>) => {
  return {
    board: css({
      display: 'flex',
      justifyContent: 'center',
    }),
  }
}
