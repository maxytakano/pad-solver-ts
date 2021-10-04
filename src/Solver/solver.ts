import { MinPriorityQueue } from '@datastructures-js/priority-queue'

type Maybe<T> = T | null | undefined

enum OrbType {
  Fire = 0,
  Earth = 1,
  Water = 2,
  Dark = 3,
  // Light = 4,
  // Heart = 5,
  // Poison = 6,
  // Jammer = 7,
}

// bitboard size in bits
const BIT_BOARD_SIZE = 64
const BYTE_SIZE = 8
// div by 2 for ts enum trickery
const ORB_TYPES = Object.keys(OrbType).length / 2
const BOARD_BUFFER_SIZE = (ORB_TYPES * BIT_BOARD_SIZE) / BYTE_SIZE

// 2d array representation of board state
type Position = OrbType[][]

const testPosition: Position = [
  [OrbType.Fire, OrbType.Earth, OrbType.Earth, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Water],
]

const testTarget: Position = [
  [OrbType.Earth, OrbType.Earth, OrbType.Water, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Fire],
]

// Creates bitboard representation of board state, represented by a
// BigUint64Array ArrayBuffer
function createBoard(position: Position): Maybe<ArrayBuffer> {
  const height = position.length
  const width = position[0].length
  const size = height * width
  if (size > BIT_BOARD_SIZE) {
    console.error('Position size greater than supported bitboard size')
    return null
  }
  const board = new ArrayBuffer(BOARD_BUFFER_SIZE)
  const view = new BigUint64Array(board)
  for (let i = 0; i < size; i++) {
    const mask = 1n << BigInt(i)
    const row = Math.floor(i / width)
    const col = i % width
    const orbType = position[row][col]

    view[orbType] |= mask
  }
  return board
}

type Move = {
  board: ArrayBuffer
  previous: Maybe<Move>
  moves: number
}

export function solvePosition(
  start: Position,
  target: Position
): Maybe<Position> {
  // create bitboard representation
  const startBitboard = createBoard(start)
  if (startBitboard == null) return null
  const frontier = new MinPriorityQueue<Move>({
    compare: (m1, m2) => {
      const moveComponent = m1.moves - m2.moves
      // const hammingComponent =
    },
  })
  const explored = new Set<ArrayBuffer>()
  frontier.enqueue({
    board: startBitboard,
    previous: null,
    moves: 0,
  })

  while (!frontier.isEmpty()) {
    const bestMove = frontier.dequeue()
    // explored.add(bestMove)
  }

  return null
}

export function testRunner() {
  const result = solvePosition(testPosition, testTarget)
  console.log('test', result)
}
