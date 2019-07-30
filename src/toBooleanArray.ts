﻿import { LF } from './constants';
import { trim } from 'trim';
export function toBooleanArray(s: string) {
  return trim(s)
    .split(LF)
    .map(row => row.split('').map(col => (col === '·' || col === ' ' ? false : true)));
}