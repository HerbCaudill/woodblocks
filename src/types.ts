import { Letter } from 'scrabble'
import { MouseEventHandler } from 'react'

export interface TileProps {
  letter: Letter
  size: number
  seed?: string
  isFaceUp: boolean
  onClick?: MouseEventHandler<HTMLElement>
}
