import React, { useEffect } from 'react'
import { OrbType } from '../Solver/solver'
import type { Position } from '../Solver/solver'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import type { Classes } from 'jss'
import { CellCoordinates } from '../App'
const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '50px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  orb: {
    height: '50px',
    width: '50px',
    border: '2px solid black',
  },
  cursor: {
    border: '2px solid white',
  },
  fire: {
    backgroundColor: 'red',
  },
  earth: {
    backgroundColor: 'green',
  },
  water: {
    backgroundColor: 'blue',
  },
  dark: {
    backgroundColor: 'purple',
  },
  light: {
    backgroundColor: 'yellow',
  },
})

function getOrbClass(
  type: OrbType,
  classes: Classes<'fire' | 'earth' | 'water' | 'dark' | 'light'>
): string {
  switch (type) {
    case OrbType.Fire:
      return classes.fire
    case OrbType.Earth:
      return classes.earth
    case OrbType.Water:
      return classes.water
    case OrbType.Dark:
      return classes.dark
    default:
      return classes.fire
  }
}

export default function Board(props: {
  position: Position
  cursorCoordinates: CellCoordinates
}) {
  const { position, cursorCoordinates } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {position.map((row: OrbType[], rowIndex: number) => {
        return (
          <div className={classes.row} key={`${rowIndex}`}>
            {row.map((orb: OrbType, colIndex: number) => {
              const orbClass = getOrbClass(orb, classes)
              const isCursor =
                rowIndex === cursorCoordinates.row &&
                colIndex === cursorCoordinates.column
              return (
                <div
                  key={`${rowIndex} ${colIndex}`}
                  className={cx(
                    classes.orb,
                    orbClass,
                    isCursor && classes.cursor
                  )}
                ></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
