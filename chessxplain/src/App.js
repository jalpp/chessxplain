import React, { useState } from 'react';
import {Chessboard} from 'react-chessboard';
import axios from 'axios'
import {Chess} from 'chess.js'
import './App.css'; // Import your CSS file for styling

function App() {
  const defaultFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const [fen, setFen] = useState(defaultFen);
  const [darkMode, setDarkMode] = useState(true);
  const [boardColor, setBoardColor] = useState('#edeed1');
  const [darkColor, setDarkColor] = useState('#779952')
  const [evaluation, setEvaluation] = useState('');
  const [topline, setTopline] = useState('');
  const [bestmove, setBestmove] = useState('');
  const [flip, setflip] = useState('white');

  const handleFenChange = (event) => {
    setFen(event.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeBoardColor = (color, dark) => {
    setBoardColor(color);
    setDarkColor(dark);
  };

 

  const fetchEvaluation = async (mode, depth) => {
    try {
      const response = await axios.get(
        `https://stockfish.online/api/stockfish.php?fen=${encodeURIComponent(
          fen
        )}&depth=${depth}&mode=${mode}`
      );
       return response.data;
    } catch (error) {
      console.error('Error fetching evaluation:', error);
    }
  };

  const changeFlip = (flipp) => {
    if(flipp == 'white'){
      setflip('black');
    }else{
      setflip('white');
    }
  }

  const resetBoard = () => {
    setFen(defaultFen);
    window.location.reload();
  }


  const handleClick = async () => {
    try {
      const evaluationValue = await fetchEvaluation('eval', '13');
      const topLine = await fetchEvaluation('lines', '13')
      const bestmove = await fetchEvaluation('bestmove', '13')
      setEvaluation(evaluationValue);
      setTopline(topLine);
      setBestmove(bestmove)

    } catch (error) {
      console.error('Error handling evaluation:', error);
    }
  };

  const handleMove = (from, to) => {
    // Create a new chess.js instance with the current FEN
    const Chess = require('chess.js');
    const chess = new Chess(fen);

    // Validate the move
    const move = chess.move({ from: from, to: to, promotion: 'q' });

    // If the move is valid, update the FEN
    if (move !== null) {
      setFen(chess.fen());
    }
  };



  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <h1>ChessXplain</h1>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              value={fen}
              onChange={handleFenChange}
              placeholder="Enter FEN String..."
            />
            <button onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <div className="buttons-container">
            <button onClick={() => changeBoardColor('#C4A484', '#7c3f00')}>Brown Board</button>
            <button onClick={() => changeBoardColor('#ADD8E6', '#0000d9')}>Blue Board</button>
            <button onClick={() => changeBoardColor('#edeed1', '#779952')}>Green Board</button>
            <button onClick={handleClick}>Get Evaluation</button> {/* Button to trigger evaluation */}
            <button onClick={resetBoard}>Reset Board</button>
            <button onClick={() => changeFlip(flip)}>Flip Board</button>
            

          </div>
        </div>
        <div className="chessboard-container">
          <Chessboard
            position={fen}
            boardOrientation={flip}
            boardColor={boardColor}
            customDarkSquareStyle={{ backgroundColor: darkColor }}
            customLightSquareStyle={{ backgroundColor: boardColor }}
            
        
            
          />
        </div>
        <div>
          <p> Stockfish Eval {evaluation.data}</p>
          <p> Stockfish Top Line {topline.data}</p>
          <p> Stockfish Best Move {bestmove.data} </p>
        </div>
      </div>
    </div>
  );
}

export default App;
