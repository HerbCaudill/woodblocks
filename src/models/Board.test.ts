import { Board } from './Board'
import { boardIsEmpty } from '../lib/boardIsEmpty'
import { emptyBoard } from '../lib/constants'
import { match } from '../lib/match'
import { trimMultiple } from '../lib/trimMultiple'
import { pieces } from './pieces'

const { p1x1, p1x2, p1x5, p5x1, pL2ne, pL2nw, pL3ne } = pieces

describe('Board', () => {
  describe('constructor', () => {
    it('should be empty at first', () => {
      const board = new Board()
      expect(boardIsEmpty(board)).toBe(true)
    })

    describe('fromString', () => {
      it('should construct from a given string', () => {
        const board = new Board(`
          @---------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------`)
        expect(boardIsEmpty(board)).toBe(false)
        expect(board.rows[0][0].filled).toBe(true)
        expect(board.rows[1][0].filled).toBe(false)
        expect(board.rows[0][1].filled).toBe(false)
        expect(board.rows[1][1].filled).toBe(false)
      })
    })

    it('should construct an empty board from a string', () => {
      const board = new Board(`
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------
          ----------`)
      expect(boardIsEmpty(board)).toBe(true)
    })
  })

  describe('toString', () => {
    it('empty board', () => {
      expect(new Board().toString()).toEqual(emptyBoard)
    })

    it('one cell', () => {
      const str = trimMultiple(`
         @---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`)
      expect(new Board(str).toString()).toEqual(str)
    })

    it('multiple cells', () => {
      const str = trimMultiple(`
         @---------
         ----------
         ----@@@---
         ------@---
         ------@---
         -----@@---
         ----------
         --------@-
         --------@-
         --------@-`)
      expect(new Board(str).toString()).toEqual(str)
    })
  })

  describe('conflicts', () => {
    test('case 1', () => {
      const board = new Board(`
         @---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`)
      expect(board.noConflicts(p1x1, [0, 0])).toBe(false)
      expect(board.noConflicts(p1x1, [1, 0])).toBe(true)
    })

    test('case 2', () => {
      const board = new Board(`
         -@--------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`)
      expect(board.noConflicts(pL2nw, [0, 0])).toBe(false)
      expect(board.noConflicts(pL2nw, [1, 0])).toBe(false)
      expect(board.noConflicts(pL2nw, [2, 0])).toBe(true)
      expect(board.noConflicts(pL2nw, [0, 1])).toBe(true)
    })
  })

  describe('pieceFits', () => {
    it('1x1', () => {
      const board = new Board()
      const piece = p1x1
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [11, 0])).toBe(false)
      expect(board.pieceFits(piece, [0, 11])).toBe(false)
    })

    it('5x1', () => {
      const board = new Board()
      const piece = p5x1
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [8, 0])).toBe(false)
      expect(board.pieceFits(piece, [0, 8])).toBe(true)
    })

    it('1x5', () => {
      const board = new Board()
      const piece = p1x5
      expect(board.pieceFits(piece, [0, 0])).toBe(true)
      expect(board.pieceFits(piece, [8, 0])).toBe(true)
      expect(board.pieceFits(piece, [0, 8])).toBe(false)
    })
  })

  describe('canAddPiece', () => {
    const board = new Board(`
        @---------
        @@@@------
        @@@@------
        @@@@-@----
        -@@@-@@@--
        -----@@@--
        -----@----
        -@@@@@@@@@
        -@@@@@@@@@
        ----------`)

    it('5x1', () => {
      const piece = p5x1
      expect(board.canAddPiece(piece, [0, 0])).toBe(false)
      expect(board.canAddPiece(piece, [1, 0])).toBe(true)
      expect(board.canAddPiece(piece, [1, 2])).toBe(false)
      expect(board.canAddPiece(piece, [0, 6])).toBe(true)
      expect(board.canAddPiece(piece, [6, 0])).toBe(false)
    })

    it('pL3ne', () => {
      const piece = pL3ne
      expect(board.canAddPiece(piece, [0, 0])).toBe(false)
      expect(board.canAddPiece(piece, [2, 0])).toBe(true)
      expect(board.canAddPiece(piece, [3, 0])).toBe(true)
      expect(board.canAddPiece(piece, [1, 2])).toBe(false)
      expect(board.canAddPiece(piece, [5, 1])).toBe(true)
      expect(board.canAddPiece(piece, [9, 2])).toBe(false)
    })
  })

  describe('addPiece', () => {
    test('case 1', () => {
      const board = new Board()

      match(
        board.addPiece(p1x1, [0, 0]),
        `@---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`
      )
    })

    test('case 2', () => {
      const board = new Board().addPiece(p1x2, [0, 2])
      match(
        board,
        `----------
         ----------
         @---------
         @---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`
      )
    })

    test('case 3', () => {
      const board = new Board()
      board.addPiece(pL2ne, [3, 4])
      match(
        board,
        `----------
         ----------
         ----------
         ----------
         ---@@-----
         ----@-----
         ----------
         ----------
         ----------
         ----------`
      )
      board.addPiece(pL3ne, [3, 3])
      match(
        board,
        `----------
         ----------
         ----------
         ---@@@----
         ---@@@----
         ----@@----
         ----------
         ----------
         ----------
         ----------`
      )
    })
  })

  describe('addPiece (hover)', () => {
    const hover = true

    test('case 1', () => {
      const board = new Board()

      match(
        board.addPiece(p1x1, [0, 0], hover),
        `O---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`
      )
    })

    test('case 2', () => {
      const board = new Board().addPiece(p1x2, [0, 2], hover)
      match(
        board,
        `----------
         ----------
         O---------
         O---------
         ----------
         ----------
         ----------
         ----------
         ----------
         ----------`
      )
    })

    test('case 3', () => {
      const board = new Board()
      board.addPiece(pL2ne, [3, 4], hover)
      match(
        board,
        `----------
         ----------
         ----------
         ----------
         ---OO-----
         ----O-----
         ----------
         ----------
         ----------
         ----------`
      )
    })
  })

  describe('allowedLocations', () => {
    it('case 1', () => {
      const piece = p1x1
      const board = new Board(`
        @---------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------`)
      const allowed = board.allowedLocations(piece)
      match(
        new Board().fromArray(allowed),
        `
        -@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        `
      )
    })

    it('case 2', () => {
      const piece = p5x1
      const board = new Board(`
        @---------
        @@@@------
        @@@@------
        @@@@-@----
        -@@@-@@@--
        -----@@@--
        -----@----
        -@@@@@@@@@
        -@@@@@@@@@
        ----------`)
      const allowed = board.allowedLocations(piece)
      const allowedMap = new Board().fromArray(allowed).toString()
      expect(allowedMap).toEqual(
        trimMultiple(`
        -@@@@@----
        ----@@----
        ----@@----
        ----------
        ----------
        @---------
        @---------
        ----------
        ----------
        @@@@@@----
        `)
      )
    })

    it('case 3', () => {
      const piece = pL3ne
      const board = new Board(`
        @-----@---
        @@@@-@@@--
        @@@@------
        @@@@-@----
        -@@@-@@@--
        -----@@@--
        -----@----
        -@@@@@@@@@
        -@@@@@@@@@
        ----------
        `)
      const allowed = board.allowedLocations(piece)
      const allowedMap = new Board().fromArray(allowed).toString()
      expect(allowedMap).toEqual(
        trimMultiple(`
        --@----@--
        ----------
        ------@@--
        ------@@--
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        `)
      )
    })
  })

  describe('clearFilledLines', () => {
    it('clears a row', () => {
      match(
        new Board(`
        ------@---
        @@@@@@@@@@
        ---@@@----
        ----------
        ----------
        ----------
        @@@@@@@---
        ----------
        ----------
        ----------
      `).clearFilled(),
        `
        ------@---
        ----------
        ---@@@----
        ----------
        ----------
        ----------
        @@@@@@@---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears multiple rows', () => {
      match(
        new Board(`
        ------@---
        @@@@@@@@@@
        @@@@@@@@@@
        @@@@@@@@@@
        ----------
        ----------
        @@@@@@@---
        @@@@@-@@@@
        ----------
        ----------
      `).clearFilled(),
        `
        ------@---
        ----------
        ----------
        ----------
        ----------
        ----------
        @@@@@@@---
        @@@@@-@@@@
        ----------
        ----------
      `
      )
    })

    it('clears a column', () => {
      match(
        new Board(`
        ------@@--
        -------@--
        ---@@@-@--
        -------@--
        -------@--
        -------@--
        @@@@@@@@--
        -------@--
        -------@--
        -------@--
      `).clearFilled(),
        `
        ------@---
        ----------
        ---@@@----
        ----------
        ----------
        ----------
        @@@@@@@---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears multiple columns', () => {
      match(
        new Board(`
        ------@@@@
        -------@-@
        ---@@@-@-@
        -------@-@
        -------@-@
        -------@-@
        @@@@@@@@-@
        -------@-@
        -------@-@
        -------@-@
      `).clearFilled(),
        `
        ------@-@-
        ----------
        ---@@@----
        ----------
        ----------
        ----------
        @@@@@@@---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears a row and a column', () => {
      match(
        new Board(`
        -------@--
        -------@--
        ---@@@-@--
        -------@--
        -------@--
        -------@--
        @@@@@@@@@@
        -------@--
        -------@--
        -------@--
      `).clearFilled(),
        `
        ----------
        ----------
        ---@@@----
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears multiple rows and columns', () => {
      match(
        new Board(`
        ------@@--
        ------@@--
        ---@@@@@--
        ------@@--
        ------@@--
        @@@@@@@@@@
        @@@@@@@@@@
        ------@@--
        ------@@--
        ------@@--
      `).clearFilled(),
        `
        ----------
        ----------
        ---@@@----
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
        ----------
      `
      )
    })
  })
})
