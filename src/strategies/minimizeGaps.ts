import { Strategy, Position } from '../types'
import { gapScore } from 'lib/gapScore'

interface PositionScore {
  position: Position
  score: number
  filledCount: number
}
const minimizeGaps: Strategy = ({ board, pieces }) => {
  // find the first piece that has at least one legal move
  const piece = pieces.find(p => board.allowedPositions(p).length > 0)
  if (piece === undefined) throw new Error('Game over')

  const allowedPositions = board.allowedPositions(piece)

  const scorePosition = (position: Position) => {
    const nextBoard = board.clone()
    nextBoard.addPiece(piece, position)
    const score = gapScore(nextBoard)
    const filledCount = nextBoard.filledCount
    return { position, score, filledCount } as PositionScore
  }

  const positionCompare = (a: PositionScore, b: PositionScore) => {
    if (a.filledCount < b.filledCount) return -1
    else if (a.score < b.score) return -1
    else return Math.random() - 0.5
  }

  const rankedScores = allowedPositions.map(scorePosition).sort(positionCompare)

  return [piece, rankedScores[0].position]
}

export default minimizeGaps
