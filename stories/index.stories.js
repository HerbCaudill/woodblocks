import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Board } from '../src/components/Board'

storiesOf('Board', module).add('Board', () => <Board />)
