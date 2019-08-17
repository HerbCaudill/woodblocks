import { pieces } from './pieces'
import { rowToText, Line } from './Board'

describe('pieces', () => {
  it('should have the right boolean values', () => {
    expect(pieces.p1x1.map(filled)).toEqual([[true]])
    expect(pieces.p2x1.map(filled)).toEqual([[true, true]])
    expect(pieces.p1x2.map(filled)).toEqual([[true], [true]])
    expect(pieces.pL2ne.map(filled)).toEqual([[true, true], [false, true]])
    expect(pieces.pL3se.map(filled)).toEqual([
      [false, false, true],
      [false, false, true],
      [true, true, true],
    ])
  })
})

const filled = (r: Line) => r.map(c => c.filled)
