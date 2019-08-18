import { LF } from './constants'
import { trim } from 'lib/trim'

export const toCellArray = (s: string) =>
  trim(s)
    .split(LF)
    .map(textToRow)

export const textToRow = (row: string) =>
  row.split('').map(col => ({ filled: col === '-' ? false : true, hover: false }))
