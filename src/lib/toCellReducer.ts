import { trimMultiple } from 'lib/trimMultiple'
import { LF } from 'lib/constants'
import { PieceDictionary, pieces_s } from '../models/pieces'
import { textToRow } from './toCellArray'

export const toBooleanReducer = (result: PieceDictionary, key: string) => ({
  ...result,
  [key]: trimMultiple(pieces_s[key])
    .split(LF)
    .map(textToRow),
})
