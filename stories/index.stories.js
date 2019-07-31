import { storiesOf } from '@storybook/react'
import React from 'react'
import { Game } from '../src/components/Game'
import { Gameboard } from '../src/components/Gameboard'
import { Piece } from '../src/components/Piece'
import { Board } from '../src/models/Board'
import { pieces } from '../src/models/pieces'
import { Providers } from '../src/components/App'

const b0 = new Board()

const b1 = new Board(`
  @---------
  ----------
  ----------
  ----------
  ----------
  ----------
  ----------
  ----------
  ----------
  ----------
`)

const b2 = new Board(`
  @---------
  @@@@------
  @@@@------
  @@@@-@----
  -@@@-@@@--
  -----@@@--
  -----@----
  -@@@@@@@@@
  -@@@@@@@@@
  ----------
  `)

const b3 = new Board(`
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  @@@@@@@@@@
  `)

// storiesOf('Gameboard', module)
//   .add('empty', () => <Gameboard board={b0} />)
//   .add('one piece', () => <Gameboard board={b1} />)
//   .add('many pieces', () => <Gameboard board={b2} />)
//   .add('full', () => <Gameboard board={b3} />)

const pieceStories = storiesOf('Piece', module).addDecorator(fn => <Providers>{fn()}</Providers>)

for (const piece in pieces) {
  pieceStories.add(piece, () => <Piece name={piece} />)
}

storiesOf('Game', module)
  .add('empty', () => (
    <Providers board={b0}>
      <Game randomSeed="1" />
    </Providers>
  ))
  .add('one piece', () => (
    <Providers board={b1}>
      <Game randomSeed="2" />
    </Providers>
  ))
  .add('many pieces', () => (
    <Providers board={b2}>
      <Game randomSeed="3" />
    </Providers>
  ))
  .add('full', () => (
    <Providers board={b3}>
      <Game randomSeed="4" />
    </Providers>
  ))
