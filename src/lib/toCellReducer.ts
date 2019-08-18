import { trim } from 'lib/trim'
import { LF } from 'lib/constants'
import { PieceDictionary, pieces_s } from '../models/pieces'
import { textToRow } from './toCellArray'

export const toCellReducer = (result: PieceDictionary, key: string) => ({
  ...result,
  [key]: trim(pieces_s[key])
    .split(LF)
    .map(textToRow),
})
