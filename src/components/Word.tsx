/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Letter } from 'scrabble'
import { Tile } from './Tile'

interface WordProps {
  size: number
  word: string
}

export const Word = ({ size = 100, word }: WordProps) => {
  const styles = getStyles({ size })

  return (
    <div css={styles.word}>
      {word.split('').map((letter, i) => {
        const seed = `${word}-${i}`
        return <Tile key={i} size={size} letter={letter as Letter} seed={seed} isFaceUp={true} />
      })}
    </div>
  )
}

const getStyles = ({ size = 100 }: Partial<WordProps>) => {
  // const rnd = random(randomSeed)
  return {
    word: css({
      display: 'flex',
      justifyContent: 'center',
    }),
  }
}
