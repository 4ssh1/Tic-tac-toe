import { useState } from 'react'
import './App.css'

function Square({value, squareClick}) {
  return (
    <button className="square" onClick={squareClick}>
      {value}
    </button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill("a"))
  function Click() { 
    console.log("me")
  }
  
  return (
    <>
      <div className="board-row">
        {squares.slice(0, 3).map((e, i) => <Square key={i} value={e} squareClick={Click}/>)}
      </div>
      <div className="board-row">
        {squares.slice(3,6).map((e, i)=> <Square key={i} value= {e} squareClick={Click} />)}
      </div>
      <div className="board-row">
      {squares.slice(6,9).map((e, i)=> <Square key={i} value= {e} squareClick={Click} />)}
      </div>
    </>
  )
}
