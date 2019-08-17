import { LF } from './constants'
import { trimMultiple } from 'lib/trimMultiple'

export function toBooleanArray(s: string) {
  return trimMultiple(s)
    .split(LF)
    .map(row => row.split('').map(col => (col === '-' || col === ' ' ? false : true)))
}
