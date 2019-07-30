import { trim } from 'lib/trim';
import { LF } from 'lib/constants';
import { PieceDictionary, pieces_s } from './pieces';
export const toBooleanReducer = (result: PieceDictionary, key: string) => ({
        ...result,
        [key]: trim(pieces_s[key])
                .split(LF)
                .map(row => row.split('').map(col => (col === '-' || col === ' ' ? false : true))),
});
