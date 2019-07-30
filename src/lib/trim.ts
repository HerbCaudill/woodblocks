import { LF } from './constants'

export const trim = (s: string) =>
  s
    .trim()
    .split(LF)
    .map(s => s.trim())
    .join(LF)
