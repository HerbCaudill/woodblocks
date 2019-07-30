import { Board } from './Board'
import { boardIsEmpty } from './boardIsEmpty'
import { emptyBoard } from './constants'
import { match } from './match'
import { p1x1, p1x2, p1x5, p5x1, pL2ne, pL2nw, pL3ne } from './pieces'
import { trim } from './trim'

describe('Board', () => {
  describe('constructor', () => {
    it('should be empty at first', () => {
      const board = new Board()
      expect(boardIsEmpty(board)).toBe(true)
    })

    describe('fromString', () => {
      it('should construct from a given string', () => {
        const board = new Board(`
          x---------
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
        expect(board.rows[0][0]).toBe(true)
        expect(board.rows[1][0]).toBe(false)
        expect(board.rows[0][1]).toBe(false)
        expect(board.rows[1][1]).toBe(false)
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
    it('should render an empty board correctly ', () => {
      expect(new Board().toString()).toEqual(emptyBoard)
    })
  })

  describe('conflicts', () => {
    test('case 1', () => {
      const board = new Board(`
         x---------
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
         -x--------
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
        x---------
        xxxx------
        xxxx------
        xxxx-x----
        -xxx-xxx--
        -----xxx--
        -----x----
        -xxxxxxxxx
        -xxxxxxxxx
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
        `x---------
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
         x---------
         x---------
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
         ---xx-----
         ----x-----
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
         ---xxx----
         ---xxx----
         ----xx----
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
        x---------
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
        -xxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        `
      )
    })

    it('case 2', () => {
      const piece = p5x1
      const board = new Board(`
        x---------
        xxxx------
        xxxx------
        xxxx-x----
        -xxx-xxx--
        -----xxx--
        -----x----
        -xxxxxxxxx
        -xxxxxxxxx
        ----------`)
      const allowed = board.allowedLocations(piece)
      const allowedMap = new Board().fromArray(allowed).toString()
      expect(allowedMap).toEqual(
        trim(`
        -xxxxx----
        ----xx----
        ----xx----
        ----------
        ----------
        x---------
        x---------
        ----------
        ----------
        xxxxxx----
        `)
      )
    })

    it('case 3', () => {
      const piece = pL3ne
      const board = new Board(`
        x-----x---
        xxxx-xxx--
        xxxx------
        xxxx-x----
        -xxx-xxx--
        -----xxx--
        -----x----
        -xxxxxxxxx
        -xxxxxxxxx
        ----------
        `)
      const allowed = board.allowedLocations(piece)
      const allowedMap = new Board().fromArray(allowed).toString()
      expect(allowedMap).toEqual(
        trim(`
        --x----x--
        ----------
        ------xx--
        ------xx--
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
        ------x---
        xxxxxxxxxx
        ---xxx----
        ----------
        ----------
        ----------
        xxxxxxx---
        ----------
        ----------
        ----------
      `).clearFilled(),
        `
        ------x---
        ----------
        ---xxx----
        ----------
        ----------
        ----------
        xxxxxxx---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears multiple rows', () => {
      match(
        new Board(`
        ------x---
        xxxxxxxxxx
        xxxxxxxxxx
        xxxxxxxxxx
        ----------
        ----------
        xxxxxxx---
        xxxxx-xxxx
        ----------
        ----------
      `).clearFilled(),
        `
        ------x---
        ----------
        ----------
        ----------
        ----------
        ----------
        xxxxxxx---
        xxxxx-xxxx
        ----------
        ----------
      `
      )
    })

    it('clears a column', () => {
      match(
        new Board(`
        ------xx--
        -------x--
        ---xxx-x--
        -------x--
        -------x--
        -------x--
        xxxxxxxx--
        -------x--
        -------x--
        -------x--
      `).clearFilled(),
        `
        ------x---
        ----------
        ---xxx----
        ----------
        ----------
        ----------
        xxxxxxx---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears multiple columns', () => {
      match(
        new Board(`
        ------xxxx
        -------x-x
        ---xxx-x-x
        -------x-x
        -------x-x
        -------x-x
        xxxxxxxx-x
        -------x-x
        -------x-x
        -------x-x
      `).clearFilled(),
        `
        ------x-x-
        ----------
        ---xxx----
        ----------
        ----------
        ----------
        xxxxxxx---
        ----------
        ----------
        ----------
      `
      )
    })

    it('clears a row and a column', () => {
      match(
        new Board(`
        -------x--
        -------x--
        ---xxx-x--
        -------x--
        -------x--
        -------x--
        xxxxxxxxxx
        -------x--
        -------x--
        -------x--
      `).clearFilled(),
        `
        ----------
        ----------
        ---xxx----
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
        ------xx--
        ------xx--
        ---xxxxx--
        ------xx--
        ------xx--
        xxxxxxxxxx
        xxxxxxxxxx
        ------xx--
        ------xx--
        ------xx--
      `).clearFilled(),
        `
        ----------
        ----------
        ---xxx----
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
