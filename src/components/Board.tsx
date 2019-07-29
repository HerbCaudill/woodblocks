/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Letter } from 'scrabble'
import { Tile } from './Tile'

interface BoardProps {
  width: number
  height: number
  size: number
  randomSeed: string
}

export const Word = (props: BoardProps = { size = 75, randomSeed }) => {
  const styles = getStyles({ size })

  return (
    <div css={styles.board}>
      {/* {word.split('').map((letter, i) => {
        const seed = `${word}-${i}`
        return <Tile key={i} size={size} letter={letter as Letter} seed={seed} isFaceUp={true} />
      })} */}
    </div>
  )
}

const getStyles = ({ size = 100 }: Partial<BoardProps>) => {
  return {
    board: css({
      display: 'flex',
      justifyContent: 'center',
    }),
  }
}
