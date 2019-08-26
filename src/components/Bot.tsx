/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import { useGameDispatch, useGameState } from 'context';
import strategy from '../strategies/minimizeGaps';
import { useState } from 'react';
import { useInterval } from './useInterval';

// const pause = () => new Promise(ok => requestAnimationFrame(ok))
// const wait = (t: number = 0) => new Promise(ok => setTimeout(ok, t))

export const Bot = () => {
  const styles = {
    button: {
      fontSize: 24,
      lineHeight: '24px',
      textAlign: 'center',
      width: 68,
      height: 48,
      borderRadius: 10,
      border: '2px solid blue',
      background: 'white',
      color: 'blue',
      margin: 5,
      outline: 'none',
      cursor: 'pointer',
      ':hover': {
        background: 'rgba(0,0,255,.1)'
      },
      ':active': {
        background: '',
      },
    } as CSSObject,
  }

  const [autoplaying, setAutoplaying] = useState(false)
  const { board, availablePieces, gameOver } = useGameState()
  const dispatch = useGameDispatch()

  if (gameOver) setAutoplaying(false)

  const play = () => {
    const situation = { board, pieces: availablePieces }
    const [piece, position] = strategy(situation)
    dispatch({ type: 'addPiece', payload: { piece, position } })
  }

  useInterval(play, autoplaying ? 1000 : null);

  const restart = () => {
    dispatch({ type: 'restart', payload: {} })
  }

  const autoplay = () => {
    setAutoplaying(!autoplaying)
  }

  return (
    <div>
      {!gameOver && (
        <div>

          <button css={{ ...styles.button, fontWeight: 900 }} onClick={restart}>
            <span role='img' aria-label='restart'>⭮</span>
          </button>
          <button css={{ ...styles.button, }} onClick={play}>
            <span role='img' aria-label='play'>▶</span>
          </button>
          <button css={{
            ...styles.button,
            letterSpacing: '-.1em',
          }} onClick={autoplay}>
            <span role='img' aria-label='autoplay'>{autoplaying ? '❚❚' : '▶▶'}</span>
          </button>
        </div>

      )}
    </div>
  )
}



