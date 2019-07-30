import { pieces } from './pieces'

describe('pieces', () => {
  it('should have the right boolean values', () => {
    expect(pieces.p1x1).toEqual([[true]])
    expect(pieces.p2x1).toEqual([[true, true]])
    expect(pieces.p1x2).toEqual([[true], [true]])
    expect(pieces.pL2ne).toEqual([[true, true], [false, true]])
    expect(pieces.pL3se).toEqual([[false, false, true], [false, false, true], [true, true, true]])
  })
})
