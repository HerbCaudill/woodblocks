import { trim } from 'lib/trim'
import { LF } from 'lib/constants'
import { PieceDictionary, shapes } from '../models/pieces'
import { textToRow } from './toCellArray'

export const toCellReducer = (result: PieceDictionary, key: string) => ({
  ...result,
  [key]: trim(shapes[key])
    .split(LF)
    .map(textToRow),
})
