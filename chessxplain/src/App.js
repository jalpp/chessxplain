import React, { useState } from 'react';
import {Chessboard} from 'react-chessboard';
import './App.css';
import fetchEvaluation from './fish/Stockfish.js';
import handleConvo from './Ai/GPTConvo.js';
import handleLama from './Ai/LAMAAi.js';
import handleGPT from './Ai/GPTAi.js';
import handleGPTGame from './Ai/GPTAiGame.js';
import Chess from "chess.js";
import Button from '@mui/material/Button';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SetMealIcon from '@mui/icons-material/SetMeal';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ButtonGroup from '@mui/material/ButtonGroup';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
//import CircularProgress from '@mui/material/CircularProgress';


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
  const [getevalama, setEvalama] = useState('');
  const [getconvo, setConvo] = useState('');
  const [lichessgame, setLichessgame] = useState('');
  const [game, setGame] = useState(new Chess());

  const makeAMove = (move) => {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  const onDrop = (sourceSquare, targetSquare) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setFen(game.fen());
    return true;
  }

  const handleFenChange = (event) => {
    setFen(event.target.value);
    const newgame = new Chess(event.target.value);
    setGame(newgame);
    setLichessgame('');
  };

  const handleGameChange = (event) => {
    setLichessgame(event.target.value);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeBoardColor = (color, dark) => {
    setBoardColor(color);
    setDarkColor(dark);
  };

  const handleGPTClick = async () => {
    setGpteval('Please wait this can take up to 2 mins...');
    try{
      
      const gptanswer = await handleGPT(fen);
      setGpteval(gptanswer);

    }catch(error){
      setGpteval('Request timed out! Please try again after some mins!')
    }

  }

  const handleGPTGameClick = async () => {
    setLichessgame('Please wait this can take up to 2 mins...');
    try{
      
      const gptanswer = await handleGPTGame(lichessgame);
      setLichessgame(gptanswer);

    }catch(error){
      setLichessgame('Request timed out! Please ensure FEN is valid or try after some mins!')
    }

  }


  const handleLAMAClick = async () => {
    setEvalama('Please wait this can take up to 2 mins...');
    try{

      const getlamanswer = await handleLama(fen);
      setEvalama(getlamanswer);
    }catch(error){
      setEvalama('Request timed out! Please ensure FEN is valid or try after some mins!')
    }
  }

  
  const handleConvoClick = async () => {
   
    setConvo('Please wait this can take up to 2 mins...');
    try{

      const getbardans = await handleConvo(fen);
      setConvo(getbardans);
    }catch(error){
      setConvo('Request timed out! Please ensure FEN is valid or try after some mins!')
    }
  }



  



  const changeFlip = (flipp) => {
    if(flipp === 'white'){
      setflip('black');
    }else{
      setflip('white');
    }
  }


  const resetBoard = () => {
    setFen(defaultFen);
    setGpteval('');
    game.reset();
    setBestmove('');
    setEvaluation('');
    setTopline('');
    setEvalama('');
    setLichessgame('');
  }


  const handleClick = async () => {
   
   
    try {
      const evaluationValue = await fetchEvaluation('eval', '13', fen);
      const topLine = await fetchEvaluation('lines', '13', fen)
      const bestmove = await fetchEvaluation('bestmove', '13', fen)
      setEvaluation(evaluationValue);
      setTopline(topLine);
      setBestmove(bestmove)

    } catch (error) {
      console.error('Error handling evaluation:', error);
      setEvaluation('Error! Please try again later');
      setTopline('Error! Please try again later');
      setBestmove('Error! Please try again later')

    }
  };


  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <h1>ChessXplain.AI</h1>
        <p>Authors: @jalpp GPL-3.0 license </p>
        <div className="icon-container">
          <a href="https://github.com/jalpp/chessxplain" rel="noreferrer"  target="_blank"><i className="fab fa-github fa-2x"></i></a>
          <a href="https://discord.gg/tpvgxn5eZC" rel="noreferrer"  target="_blank"><i className="fab fa-discord fa-2x"></i></a>
        </div>
        <p> Explore AI model's chess evaluation based on given FEN and your Lichess game. </p>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              value={fen}
              onChange={handleFenChange}
              placeholder="Enter FEN String..."
            /> 
            <Button variant="outlined" onClick={toggleDarkMode} startIcon={<RotateLeftIcon/>}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
          </div>
          <div className="search-container">
          <input
              type="text"
              onChange={handleGameChange}
              placeholder="Enter Lichess game URL"
            /> 
          </div>
          <div className="buttons-container">
            <ButtonGroup variant="outlined" aria-label="Action button group">
            <Button variant='outlined' size="medium" onClick={handleClick} startIcon={<SetMealIcon/>}>Stockfish</Button>
            <Button variant='outlined' size="medium" onClick={() => handleGPTGameClick} startIcon={<GamepadIcon/>}>Game Eval</Button>
            <Button variant='outlined' size="medium" onClick={() => handleGPTClick} startIcon={<SmartToyIcon/>}>GPT 3.5 Fen Eval</Button>
            <Button variant='outlined' size="medium" onClick={() => handleLAMAClick} startIcon={<SmartToyIcon/>}>Bard Fen Eval </Button>
            <Button variant='outlined' size="medium" onClick={() => handleConvoClick} startIcon={<SmartToyIcon/>}>GPT Convo Fen Eval </Button>
            </ButtonGroup>
           <ButtonGroup variant='outlined' aria-label='Settings button group'>
             <Button size="medium" onClick={() => changeBoardColor('#C4A484', '#7c3f00')} startIcon={<ColorLensIcon/>} >Brown Board</Button>
            <Button size="medium" onClick={() => changeBoardColor('#ADD8E6', '#0000d9')} startIcon={<ColorLensIcon/>}>Blue Board</Button>
            <Button size="medium" onClick={() => changeBoardColor('#edeed1', '#779952')} startIcon={<ColorLensIcon/>}>Green Board</Button>
            <Button size="medium" onClick={() => resetBoard()} startIcon={<RestartAltIcon/>}>Reset Board</Button>
            <Button size="medium" onClick={() => changeFlip(flip)} startIcon={<FlipCameraAndroidIcon/>}>Flip Board</Button> 
           </ButtonGroup>
          </div>
        </div>
        <div className="chessboard-container">
          <Chessboard
            position={game.fen()}
            boardOrientation={flip}
            boardColor={boardColor}
            customDarkSquareStyle={{ backgroundColor: darkColor }}
            customLightSquareStyle={{ backgroundColor: boardColor }}
            arePiecesDraggable={true}
            allowDragOutsideBoard={false}
            arePremovesAllowed={false}
            onPieceDrop={onDrop}
            
            
          />
        </div>
        <div>
          <p> Stockfish Eval: </p>
          <p>{evaluation.data}</p>
          <hr></hr>
          <p> Stockfish Top Line: </p>
          <p>{topline.data}</p>
          <hr></hr>
          <p> Stockfish Best Move: </p>
          <p>{bestmove.data}</p>
          <hr></hr>
          <p> GPT 3.5 FEN Eval: </p>
          <p>{gpteval}</p>
          <hr></hr>
          <p>GPT 3.5 Game Eval: </p>
          <p> Game to be analyzed... {lichessgame}</p>
          <hr></hr>
          <p> Bard Ai FEN Eval: </p>
          <p> {getevalama}</p>
          <hr></hr>
          <p> GPT 3.5 CONVO-b FEN Eval</p>
          <p> {getconvo}</p>
          <hr></hr>
          
        </div>
      </div>
    </div>
  );
}

export default App;
