import { trimMultiple } from './trimMultiple'
import { LF } from './constants'

describe('trimMultiple', () => {
  it('should work on a single line', () => expect(trimMultiple('  @@@    ')).toEqual('@@@'))
  it('should work on multiple lines', () =>
    expect(
      trimMultiple(`
        abc
        def
        ghi
      `)
    ).toEqual('abc' + LF + 'def' + LF + 'ghi'))
})
