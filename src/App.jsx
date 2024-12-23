import { useState } from 'react'
import './App.css'

function Square({value, squareClick}) {
  return (
    <button className="square" onClick={squareClick} >
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const wins = [[0,1,2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if(squares[a]&& squares[a]=== squares[b]&& squares[a]===squares[c]){
      return squares[a] 
    }
  }
  return null
   
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [XisNext, setXisNext] = useState(true)
  const nextPlayer = calculateWinner(squares)
  let status;
  let winner
  if (nextPlayer){
    status = `Winner is ${nextPlayer}`
  }else{
    winner = `Next Player is ${XisNext ? "X" : "O"}`
  }

  function click(i) { 
    if (squares[i] || calculateWinner(squares)){
      return
    } 
    const nextSquare = squares.slice()
    if (XisNext){
      nextSquare[i]= "X"
    }else{
      nextSquare[i]= "O"
    }
    setSquares(nextSquare)
    setXisNext(!XisNext)
  }
  
  return (
    <div className='container'>
      <div>{status}</div>
      <div className="board-row">
        {
          squares.slice(0,3).map((e,i) => <Square value={e} squareClick={() => click(i)} key={i} />)
        }
      </div>
      <div className="board-row">
        {
          squares.slice(3,6).map((e,i) => <Square value={e} squareClick={() => click(i+3)} key={i} />)
        }
        
      </div>
      <div className="board-row">
        {
          squares.slice(6,9).map((e,i) => <Square value={e} squareClick={() => click(i+6)} key={i} />)
        }

      </div>
      <button onClick={()=>setSquares(Array(9).fill(""))} className='reset'>RESET</button>
      <p>{winner}</p>
    </div>
  )
}
