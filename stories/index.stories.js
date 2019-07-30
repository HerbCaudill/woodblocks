import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { Board } from '../src/models/Board'
import { pieces } from '../src/models/pieces'
import { Gameboard } from '../src/components/Gameboard'
import { Game } from '../src/components/Game'
import { Piece } from '../src/components/Piece'

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

storiesOf('Gameboard', module)
  .add('empty', () => <Gameboard board={b0} />)
  .add('one piece', () => <Gameboard board={b1} />)
  .add('many pieces', () => <Gameboard board={b2} />)
  .add('full', () => <Gameboard board={b3} />)

for (const piece in pieces) {
  storiesOf('Piece', module).add(piece, () => <Piece size={20} name={piece} />)
}

storiesOf('Game', module)
  .add('empty', () => <Game board={b0} />)
  .add('one piece', () => <Game board={b1} />)
  .add('many pieces', () => <Game board={b2} />)
  .add('full', () => <Game board={b3} />)
