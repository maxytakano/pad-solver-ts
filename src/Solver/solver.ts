import { MinPriorityQueue } from '@datastructures-js/priority-queue'

export type Maybe<T> = T | null | undefined

export enum OrbType {
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
export type Position = OrbType[][]
export type Board = ArrayBuffer

// Creates bitboard representation of board state, represented by a
// BigUint64Array ArrayBuffer
export function createBoard(position: Position): Maybe<Board> {
  const height = position.length
  const width = position[0].length
  const size = height * width
  if (size > BIT_BOARD_SIZE) {
    console.error('Position size greater than supported bitboard size')
    return null
  }
  const board = new ArrayBuffer(BOARD_BUFFER_SIZE)
  const view = new BigUint64Array(board)
  // for each cell of the board
  for (let i = 0; i < size; i++) {
    // shift a 1 mask i spaces
    const mask = 1n << BigInt(i)
    const row = Math.floor(i / width)
    const col = i % width
    // get the orb type from the position
    const orbType = position[row][col]
    // apply mask to array buffer portion for orb type
    view[orbType] |= mask
  }
  return board
}

type Move = {
  board: Board
  previous: Maybe<Move>
  moves: number
}

// count 1 bits on a given bigint n
function countSetBits(n: bigint): number {
  let count = 0n
  while (n !== 0n) {
    count += n & 1n
    n >>= 1n
  }
  return Number(count)
}

export function hamming(b1: Board, b2: Board): number {
  debugger
  const b1View = new BigUint64Array(b1)
  const b2View = new BigUint64Array(b2)
  let distance = 0
  for (let i = 0; i < b1View.length; i++) {
    const xor = b1View[i] ^ b2View[i]
    distance += countSetBits(xor)
  }

  // two bits will be flipped for an incorrectly placed orb
  // eg. fire 01 ^ fire 10 = fire 11
  // so we need to divide the final distance by 2
  return distance / 2
}

export function solvePosition(
  start: Position,
  target: Position
): Maybe<Position> {
  // create bitboard representation
  const startBoard = createBoard(start)
  const targetBoard = createBoard(target)
  if (startBoard == null || targetBoard == null) return null
  const frontier = new MinPriorityQueue<Move>({
    compare: (m1, m2) => {
      const moveComponent = m1.moves - m2.moves
      const hammingComponent =
        hamming(m1.board, targetBoard) - hamming(m2.board, targetBoard)
      return moveComponent + hammingComponent
    },
  })
  const explored = new Set<Board>()
  frontier.enqueue({
    board: startBoard,
    previous: null,
    moves: 0,
  })

  while (!frontier.isEmpty()) {
    const bestMove = frontier.dequeue()
    // explored.add(bestMove)
  }

  return null
}

export function testRunner(start: Position, target: Position) {
  const result = solvePosition(start, target)
  console.log('test', result)
}
