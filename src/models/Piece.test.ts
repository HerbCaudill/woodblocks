import { pieces } from './Piece'
import { rowToText, Line } from './Board'

describe('pieces', () => {
  it('should have the right boolean values', () => {
    expect(pieces.p1x1.rows.map(filled)).toEqual([[true]])
    expect(pieces.p2x1.rows.map(filled)).toEqual([[true, true]])
    expect(pieces.p1x2.rows.map(filled)).toEqual([[true], [true]])
    expect(pieces.pL2ne.rows.map(filled)).toEqual([[true, true], [false, true]])
    expect(pieces.pL3se.rows.map(filled)).toEqual([
      [false, false, true],
      [false, false, true],
      [true, true, true],
    ])
  })
})

const filled = (r: Line) => r.map(c => c.filled)
