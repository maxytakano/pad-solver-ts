import React, { useEffect } from 'react'
import './App.css'
import { testRunner, testPosition, testTarget } from './Solver/solver'
import Board from './Components/Board'

function App() {
  useEffect(() => {
    testRunner()
  }, [])
  return (
    <div className="App">
      <Board position={testPosition}></Board>
      <Board position={testTarget}></Board>
    </div>
  )
}

export default App
