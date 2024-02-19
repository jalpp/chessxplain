import React, { useState } from 'react';
import {Chessboard} from 'react-chessboard';
import axios from 'axios'
import './App.css'; // Import your CSS file for styling
//import getGPTEval from './Gpteval';

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
  const [gpteval, setGpteval] = useState('');

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

  const handleGPT = async () => {

    const evaluationValue = await fetchEvaluation('eval', '13');
      const topLine = await fetchEvaluation('lines', '13')
      const bestmove = await fetchEvaluation('bestmove', '13')

  

      const ask = 'here is the chess game FEN' + fen + ' according to Stockfish the eval is ' + evaluationValue.data + ', the topline is ' + topLine.data + ' and the best move is ' + bestmove.data + 'What do you think about it, can you explain me the position';

      console.log(ask)
    //
    const options = {
      method: 'POST',
      url: 'https://open-ai21.p.rapidapi.com/conversationgpt',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '0620adb1fbmshb13ae4cffc3b50dp1220b8jsne557d355788a',
        'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: ask
          }
        ],
        web_access: false,
        system_prompt: '',
        temperature: 0.5,
        top_k: 10,
        top_p: 0.1,
        max_tokens: 256
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.result);
      return response.data.result;
    } catch (error) {
      console.error(error);
    }
  }

  const handleGPTClick = async () => {

    try{

      const gptanswer = await handleGPT();
      setGpteval(gptanswer);

    }catch(error){
      console.log(error)
    }

  }


  

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
    if(flipp === 'white'){
      setflip('black');
    }else{
      setflip('white');
    }
  }


  const resetBoard = () => {
    setFen(defaultFen);
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
            <button onClick={() => handleGPTClick()}> Get GPT Eval </button>
            <button onClick={() => resetBoard()}>Reset Board</button>
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
            arePiecesDraggable={false}
            allowDragOutsideBoard={false}
            arePremovesAllowed={false}
            
            
          />
        </div>
        <div>
          <p> Stockfish Eval {evaluation.data}</p>
          <p> Stockfish Top Line {topline.data}</p>
          <p> Stockfish Best Move {bestmove.data} </p>
          <p> GPT Eval {gpteval}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
