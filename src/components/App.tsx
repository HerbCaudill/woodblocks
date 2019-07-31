import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { GameStateProvider } from '../context'
import { Game } from './Game'
import { Board } from 'models/Board'

interface ProvidersProps {
  board?: Board
  children: React.ReactNode
}

export function Providers({ children, board }: ProvidersProps) {
  return (
    <GameStateProvider board={board}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </GameStateProvider>
  )
}

export function App() {
  return (
    <Providers>
      <Game randomSeed={'abc'} />
    </Providers>
  )
}
