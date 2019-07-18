import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Tile } from '../src/components/Tile'
import { Word } from '../src/components/Word'

storiesOf('Tile', module)
  .add('Small', () => (
    <div>
      <Tile letter="A" size={75} seed="SA" />
      <Tile letter="J" size={75} seed="SJ" />
      <Tile letter="Q" size={75} seed="SQ" />
      <Tile letter="Q" size={75} seed="SQ" isFaceUp={false} />
    </div>
  ))
  .add('Medium', () => (
    <div>
      <Tile letter="A" size={150} seed="MA" />
      <Tile letter="J" size={150} seed="MJ" />
      <Tile letter="Q" size={150} seed="MQ" />
      <Tile letter="Q" size={150} seed="MQ" isFaceUp={false} />
    </div>
  ))
  .add('Large', () => (
    <div>
      <Tile letter="A" size={300} seed="LA" />
      <Tile letter="J" size={300} seed="LJ" />
      <Tile letter="Q" size={300} seed="LQ" />
      <Tile letter="Q" size={300} seed="LQ" isFaceUp={false} />
    </div>
  ))

storiesOf('Word', module).add('Scrabble Attacks', () => (
  <div>
    <Word word="SCRABBLE" size={50} />
    <Word word="ATTACKS" size={75} />
  </div>
))
