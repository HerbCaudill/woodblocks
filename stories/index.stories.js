import { storiesOf } from '@storybook/react'
import React from 'react'
import { Game } from '../src/components/Game'
import { Gameboard } from '../src/components/Gameboard'
import { Piece } from '../src/components/Piece'
import { Board } from '../src/models/Board'
import { pieces } from '../src/models/Piece'
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

const pieceStories = storiesOf('Piece', module).addDecorator(fn => <Providers>{fn()}</Providers>)

for (const piece in pieces) {
  pieceStories.add(piece, () => <Piece piece={pieces[piece]} />)
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
