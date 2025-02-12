import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";
import { use } from "react";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  //Declaring a Winner
  useEffect(() => {
    // "Your code here";
    const newWinner = calculateWinner(squares)
    setWinner(newWinner);
  }, [squares]);  

  useEffect(()=>{
    setSquares(history[currentMove]);
    setXIsNext(currentMove % 2 !== 0);
  },[history, currentMove])  
  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {

    const newSquares = [...squares];
    // is any winner? || is it unvalid squares?
    if (winner || newSquares[i]){
      return;
    }
    // if no, assign value for square
    newSquares[i] = xIsNext? "X" : "O";
    const newHistory = [...history.slice(0,currentMove+1), newSquares];
    setHistory(newHistory);
    setCurrentMove(currentMove + 1);
        // setSquares(Array(9).fill(null));
    // setXIsNext(true);
  };

  const jump = (move) => {
    //setSquares(newSquares);
    //setXIsNext(!xIsNext);
    setCurrentMove(move);
  }
  //Restart game
  const handlRestart = () => {
    // "Your code here";
    // setSquares(Array(9).fill(null));
    // setXIsNext(true);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
        <History history={history} jump={jump} />
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
