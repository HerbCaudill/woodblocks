import { trim } from './trim'
import { LF } from './constants'

describe('trim', () => {
  it('should work on a single line', () => expect(trim('  @@@    ')).toEqual('@@@'))
  it('should work on multiple lines', () =>
    expect(
      trim(`
        abc
        def
        ghi
      `)
    ).toEqual('abc' + LF + 'def' + LF + 'ghi'))
})
