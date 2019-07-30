import { pieces } from './pieces'

describe('pieces', () => {
  describe('constructor', () => {
    it('should ', () => {
      expect(pieces[0]).toEqual([[true]])
      expect(pieces[1]).toEqual([[true, true]])
      expect(pieces[5]).toEqual([[true], [true]])
      expect(pieces[10]).toEqual([[true, true], [false, true]])
      expect(pieces[15]).toEqual([[false, false, true], [false, false, true], [true, true, true]])
    })
  })
})
