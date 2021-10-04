import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { testRunner } from './Solver/solver'

function App() {
  useEffect(() => {
    testRunner()
  }, [])
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  )
}

export default App
