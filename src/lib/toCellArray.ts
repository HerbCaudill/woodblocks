import { LF } from './constants'
import { trimMultiple } from 'lib/trimMultiple'

export const toCellArray = (s: string) =>
  trimMultiple(s)
    .split(LF)
    .map(textToRow)

export const textToRow = (row: string) =>
  row.split('').map(col => ({ filled: col === '-' ? false : true, hover: false }))
