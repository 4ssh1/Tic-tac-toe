import { useEffect, useState } from 'react'
import './App.css'

function Square({value, squareClick, green}) {
  return (
    <button className= {`square ${green ? "green" : ""}`} onClick={squareClick} >
      {value}
    </button>
  )
}

function calculateWinner(squares) {
  const wins = [[0,1,2], [3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if(squares[a]&& squares[a]=== squares[b]&& squares[a]===squares[c]){
      return {winner:squares[a], winningCombo: wins[i]}  
    }
  }
  return {winner: null, winningCombo: []}
}

  export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [XisNext, setXisNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill("")])
  const [position, setPosition] = useState(0)
  const [winnerSquares, setWinnerSquares] = useState([])

  useEffect(()=>{
    if(winner){
      setWinnerSquares(winningCombo)
    }else{setWinnerSquares([])}
  },[squares])

  const {winner, winningCombo} = calculateWinner(squares)
  let status;
  let winnerSqr
  if (winner){
    winnerSqr = `Winner is ${winner}`
  }else {
    status = `Next Player is ${XisNext ? "X" : "O"}`
  }
  

  function click(i) { 
    if (squares[i] || winner){
      return
    } 
    const nextSquare = squares.slice()
    if (XisNext){
      nextSquare[i]= "X"
    }else{
      nextSquare[i]= "O"
    }

    const newHistory = history.slice(0, position + 1)
    setHistory([...newHistory, nextSquare])
    setPosition(newHistory.length)
    setSquares(nextSquare)
    setXisNext(!XisNext)

  }

  let data
  const draws = [...squares]
  const draw = draws.every(space=> space != "")
  if (draw && !winner){
     data = "This is a draw"
     status = " "
  }

  function undo(){
    if (position > 0){
      setSquares(history[position - 1])
      setPosition(position - 1)
      let pre = position - 1
      setXisNext(pre % 2 === 0)
    }else{
      alert("No moves to undo")
    }
  }

  function redo(){
    if (position < history.length - 1){
      setSquares(history[position + 1])
      setPosition(position + 1)
      let newMove = position + 1
      setXisNext(newMove % 2 === 0)
    }else{
      alert("Where are you going to ? :)")
    }
  }

  function reset(){
    setSquares(Array(9).fill(""))
    setXisNext(true)
    setPosition(0)
  }

  return (
    <div className='container'>
      <div>{status}</div>
      <div className="board-row">
        {
          squares.slice(0,3).map((e,i) => <Square value={e} squareClick={() => click(i)} key={i} 
          green={winnerSquares.includes(i)}/>)
        }
      </div>
      <div className="board-row">
        {
          squares.slice(3,6).map((e,i) => <Square value={e} squareClick={() => click(i+3)} key={i} green={winnerSquares.includes(i+3)}/>)
        }
        
      </div>
      <div className="board-row">
        {
          squares.slice(6,9).map((e,i) => <Square value={e} squareClick={() => click(i+6)} key={i} green={winnerSquares.includes(i+6)}/>)
        }

      </div>
      <button onClick={reset} className='reset'>RESET</button>
      <p>{winnerSqr}{data}</p>
      <button onClick={undo} style={{marginRight:"10px"}}>UNDO</button>
      <button onClick={redo}>REDO</button>
    </div>
  )
}
