import { Strategy } from '../types'

const random: Strategy = ({ board, pieces }) => {
  // find the first piece that has at least one legal move
  const piece = pieces.find(p => board.allowedPositions(p).length > 0)
  if (piece === undefined) throw new Error('Game over')

  const allowedPositions = board.allowedPositions(piece)
  // pick one at random
  const position = allowedPositions![Math.floor(Math.random() * allowedPositions.length)]
  return [piece, position]
}

export default random
