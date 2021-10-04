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
// bitboard representation of board state
type Board = ArrayBuffer

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

function createBoard(position: Position): Maybe<Board> {
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

export function solvePosition(
  start: Position,
  target: Position
): Maybe<Position> {
  // create bitboard representation
  const bb = createBoard(start)

  return null
}

export function testRunner() {
  const result = solvePosition(testPosition, testTarget)
  console.log('test', result)
}
