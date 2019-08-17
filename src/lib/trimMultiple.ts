const LF = `
`

export const trimMultiple = (s: string) =>
  s
    .trim()
    .split(LF)
    .map(s => s.trim())
    .join(LF)
