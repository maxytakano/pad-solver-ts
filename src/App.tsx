import React, { useEffect, useCallback, useState } from 'react'
import { testRunner, OrbType, Position } from './Solver/solver'
// import type { Maybe } from './Solver/solver'
import Board from './Components/Board'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    backgroundColor: 'gray',
    height: '100vh',
    width: '100vh',
  },
})

const GAME_MODE = true

export type CellCoordinates = {
  row: number
  column: number
}

const startPosition: Position = [
  [OrbType.Fire, OrbType.Earth, OrbType.Earth, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Water],
]

const targetPosition: Position = [
  [OrbType.Earth, OrbType.Earth, OrbType.Water, OrbType.Water],
  [OrbType.Earth, OrbType.Fire, OrbType.Fire, OrbType.Water],
  [OrbType.Dark, OrbType.Dark, OrbType.Dark, OrbType.Water],
  [OrbType.Fire, OrbType.Fire, OrbType.Fire, OrbType.Fire],
]

function App() {
  useEffect(() => {
    testRunner(startPosition, targetPosition)
  }, [])

  const [cursorCoordinates, setCursorCoordinates] = useState<CellCoordinates>({
    row: 0,
    column: 0,
  })
  const [gamePosition, setGamePosition] = useState<Position>(startPosition)

  const swapCells = useCallback(
    (p1: CellCoordinates, p2: CellCoordinates) => {
      // TODO: clean up this swap
      const { row: row1, column: col1 } = p1
      const { row: row2, column: col2 } = p2
      const orb1 = gamePosition[row1][col1]
      const orb2 = gamePosition[row2][col2]
      const temp = gamePosition
      temp[row1][col1] = orb2
      temp[row2][col2] = orb1
      setGamePosition(temp)
    },
    [gamePosition]
  )

  const canMove = useCallback(
    (c: CellCoordinates): boolean => {
      const { row, column } = c
      const height = gamePosition.length
      const width = gamePosition[0].length
      if (row < 0 || row >= height) return false
      if (column < 0 || column >= width) return false
      return true
    },
    [gamePosition]
  )

  const tryMove = useCallback(
    (current: CellCoordinates, next: CellCoordinates) => {
      if (!canMove(next)) return
      swapCells(current, next)
      setCursorCoordinates(next)
    },
    [canMove, swapCells]
  )

  const downHandler = useCallback(
    ({ key }) => {
      const { row, column } = cursorCoordinates
      switch (key) {
        case 'w':
        case 'ArrowUp':
          tryMove({ row, column }, { row: row - 1, column })
          return
        case 's':
        case 'ArrowDown':
          tryMove({ row, column }, { row: row + 1, column })
          return
        case 'a':
        case 'ArrowLeft':
          tryMove({ row, column }, { row, column: column - 1 })
          return
        case 'd':
        case 'ArrowRight':
          tryMove({ row, column }, { row, column: column + 1 })
          return
      }
    },
    [cursorCoordinates, tryMove]
  )

  useEffect(() => {
    if (!GAME_MODE) return
    window.addEventListener('keydown', downHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Board
        position={gamePosition}
        cursorCoordinates={cursorCoordinates}
      ></Board>
      {/* <Board position={testTarget}></Board> */}
    </div>
  )
}

export default App
