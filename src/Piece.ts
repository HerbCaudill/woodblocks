import { toBooleanArray } from './toBooleanArray'

export const pieces = [
  `■`,
  `■■`,
  `■■■`,
  `■■■■`,
  `■■■■■`,

  `■
   ■`,

  `■
   ■
   ■`,

  `■
   ■
   ■
   ■`,

  `■
   ■
   ■
   ■
   ■`,

  `■■
   ■`,

  `■■
   ·■`,

  `■
   ■■`,

  `·■
   ■■`,

  `■■■
   ■
   ■`,

  `■■■
   ··■
   ··■`,

  `··■
   ··■
   ■■■`,

  `■
   ■
   ■■■`,

  `■■
   ■■`,

  `■■■
   ■■■
   ■■■`,
].map(toBooleanArray)
