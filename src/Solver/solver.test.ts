import { OrbType, createBoard, hamming } from './solver'
import type { Position } from './solver'

const s1: Position = [
  [OrbType.Fire, OrbType.Earth, OrbType.Earth],
  [OrbType.Earth, OrbType.Earth, OrbType.Earth],
  [OrbType.Earth, OrbType.Earth, OrbType.Earth],
]

const t1: Position = [
  [OrbType.Earth, OrbType.Fire, OrbType.Earth],
  [OrbType.Earth, OrbType.Earth, OrbType.Earth],
  [OrbType.Earth, OrbType.Earth, OrbType.Earth],
]

const s2: Position = [
  [OrbType.Fire, OrbType.Earth, OrbType.Earth, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Water],
]

const t2: Position = [
  [OrbType.Earth, OrbType.Earth, OrbType.Water, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Fire],
]

describe('hamming', () => {
  test('it hams', () => {
    const b1 = createBoard(s1)
    const b2 = createBoard(t1)
    const res = hamming(b1, b2)
    expect(res).toEqual(2)
  })
  test('it really hams', () => {
    const b1 = createBoard(s2)
    const b2 = createBoard(t2)
    const res = hamming(b1, b2)
    expect(res).toEqual(3)
  })
})
