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
import SetMealIcon from '@mui/icons-material/SetMeal';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import GamepadIcon from '@mui/icons-material/Gamepad';
import ButtonGroup from '@mui/material/ButtonGroup';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import Typography from '@mui/material/Typography';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { Container } from '@mui/material';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import StarsIcon from '@mui/icons-material/Stars';
import LoadingComponent from './ui/load.js';

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
  const [loadgame, setLoadGame] = useState(false);
  const [loadgptclick, setLoadgptclick] = useState(false);
  const [loadlamaclick, setLoadlamaclick] = useState(false);
  const [loadconvoclick, setLoadconvoclick] = useState(false);

  const makeAMove = (move) => {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  const onDrop = async (sourceSquare, targetSquare) => {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    setFen(game.fen());
    console.log(game.ascii())
    await handleClick();
    //setTimeout(makeEngineMove, 200);
    console.log(game.ascii())
    await handleGPTClick();

    return true;
  }


  // const makeEngineMove = async () => {
  //   if(game.turn() === 'b'){
  //   const moveb = await fetchEvaluation('bestmove','13',game.fen());
  //   const asm = moveb.data;
  //   const fromm = asm.split(' ')[1].substring(0,2);
  //   const toom = asm.split(' ')[1].substring(2,4);
  //   const makeMove = makeAMove({from: fromm, to: toom, promotion: "q",});
  //   }else if(game.turn() === 'w'){
  //     const moveb = await fetchEvaluation('bestmove','13',game.fen());
  //   const asm = moveb.data;
  //   const fromm = asm.split(' ')[3].substring(0,2);
  //   const toom = asm.split(' ')[3].substring(2,4);
  //   const makeMove = makeAMove({from: fromm, to: toom, promotion: "q",});
  //   }
  // }


  // const makeArrow = async() => {
    
  //   let arrows = [];
  //   let tuplein = [];

  //   if(fen.includes('b')){
  //   const moveg = await fetchEvaluation('bestmove', '13', fen);
  //   const actualMove = moveg.data;

  //   tuplein.push(actualMove.split(' ')[1].substring(0,2));
  //   tuplein.push(actualMove.split(' ')[1].substring(2,4));
  //   console.log(tuple)
    
  //   setTuple(arrows[tuplein])
    
  //   }else{
  //   const moveg = await fetchEvaluation('bestmove', '13', fen);
  //   const actualMove = moveg.data;
  //   tuplein.push(actualMove.split(' ')[3].substring(0,2));
  //   tuplein.push(actualMove.split(' ')[3].substring(2,4));
  //   console.log(tuple)
  //   setTuple(arrows[tuplein])
    
  //   }
  // }

  const handleFenChange = async (event) => {
    game.load(event.target.value)
    setFen(game.fen());
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
    setLoadgptclick(true)
    setGpteval('Thinking..');
    try{
      
      const gptanswer = await handleGPT(game.fen());
      setGpteval(gptanswer);
      setLoadgptclick(false);

    }catch(error){
      setGpteval('Request timed out! Please try again after some mins!')
    }

  }

  const handleGPTGameClick = async () => {
    setLichessgame('Understanding the game...');
    setLoadGame(true)
    try{
      
      const gptanswer = await handleGPTGame(lichessgame);
      setLichessgame(gptanswer);
      setLoadGame(false);

    }catch(error){
      setLichessgame('Request timed out! Please ensure FEN is valid or try after some mins!')
    }

  }


  const handleLAMAClick = async () => {
    setEvalama('Thinking...');
    setLoadlamaclick(true)
    try{

      const getlamanswer = await handleLama(game.fen());
      setEvalama(getlamanswer);
      setLoadlamaclick(false)
    }catch(error){
      setEvalama('Request timed out! Please ensure FEN is valid or try after some mins!')
    }
  }

  
  const handleConvoClick = async () => {
   
    setConvo('Thinking...');
    setLoadconvoclick(true)
    try{

      const getbardans = await handleConvo(game.fen());
      setConvo(getbardans);
      setLoadconvoclick(false)
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
      const evaluationValue = await fetchEvaluation('eval', '13', game.fen());
      const topLine = await fetchEvaluation('lines', '13', game.fen())
      const bestmove = await fetchEvaluation('bestmove', '13', game.fen())

  
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
      
      
        <div className="icon-container">
        <Typography variant="h4" component="h2">
          ChessXplain.AI 
        </Typography>
          <a href="https://github.com/jalpp/chessxplain" rel="noreferrer"  target="_blank"><i className="fab fa-github fa-2x"></i></a>
          <a href="https://discord.gg/tpvgxn5eZC" rel="noreferrer"  target="_blank"><i className="fab fa-discord fa-2x"></i></a>
        </div>
       <Typography variant='body1' component='body1'>
        Explore AI models' chess evaluations based on given FEN and Lichess game.
       </Typography>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              value={fen}
              onChange={() => handleFenChange}
              placeholder="Enter FEN String..."
            /> 
            <Button variant="outlined" onClick={toggleDarkMode} startIcon={<BedtimeIcon/>}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
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
            <Button variant='outlined' size="small" onClick={handleClick} startIcon={<SetMealIcon/>}>Calculate Eval</Button>
            <Button variant='outlined' size="small" onClick={() => handleGPTGameClick()} startIcon={<GamepadIcon/>}>Submit Game</Button>
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="Action button group">
            <Button variant='outlined' size="small" onClick={() => handleGPTClick()} startIcon={<SmartToyIcon/>}>Ask GPT 3.5 </Button>
            <Button variant='outlined' size="small" onClick={() => handleLAMAClick()} startIcon={<SmartToyIcon/>}>Ask Bard </Button>
            <Button variant='outlined' size="small" onClick={() => handleConvoClick()} startIcon={<SmartToyIcon/>}>Ask GPT Convo </Button>
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="Action button group">
            <Button size="small" onClick={() => changeBoardColor('#C4A484', '#7c3f00')} startIcon={<ColorLensIcon/>} >Set Brown</Button>
            <Button size="small" onClick={() => changeBoardColor('#8797af', '#56667a')} startIcon={<ColorLensIcon/>}>Set Grey </Button>
            <Button size="small" onClick={() => changeBoardColor('#a6bdde', '#1763d1')} startIcon={<ColorLensIcon/>}>Set Blue </Button>
            <Button size="small" onClick={() => changeBoardColor('#edeed1', '#779952')} startIcon={<ColorLensIcon/>}>Set Green</Button>
            </ButtonGroup>
            <ButtonGroup variant='outlined' aria-label='Settings button group'>
            <Button size="small" onClick={() => resetBoard()} startIcon={<RestartAltIcon/>}>Reset</Button>
            <Button size="small" onClick={() => changeFlip()} startIcon={<FlipCameraAndroidIcon/>}>Flip </Button> 
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
            areArrowsAllowed={true}
           

            
            
            
          />
        </div>
        <div>
        <Container>
        <Typography variant="h6" component="h6" >
          Stockfish Evaluation:
        </Typography>
        <SetMealIcon/>
        </Container>
        <Typography variant='body1' component="body1">
          {evaluation.data}
        </Typography>
          <hr></hr>
          <Container>
          <Typography variant='h6' component='h6'>
           Stockfish Top Line: 
          </Typography>
          <AltRouteIcon/>
          </Container>
          <Typography variant='body1' component='body1'>
            {topline.data}
          </Typography>
          <hr></hr>
          <Container>
          <Typography variant='h6' component='h6'>
           Stockfish Bestmove: 
          </Typography>
          <StarsIcon/>
          </Container>
          <Typography variant='body1' component='body1'>
            {bestmove.data}
          </Typography>
          <hr></hr>
          <Container>
          <Typography variant='h6' component='h6'>
           GPT Game Evaluation:
          </Typography>
          <GamepadIcon/>
         
          </Container>
          
          <Typography variant='body1' component='body1'>
            {lichessgame}
          </Typography>
          <LoadingComponent loading={loadgame}></LoadingComponent>
          <Container>
          <Typography variant='h6' component='h6'>
           Live GPT Evaluation:
          </Typography>
          <SmartToyIcon/>
          </Container>
          
          <Typography variant='body1' component='body1'>
            {gpteval}
          </Typography>
          <LoadingComponent loading={loadgptclick}></LoadingComponent>
          <Container>
          <Typography variant='h6' component='h6'>
           Bard Evaluation:
          </Typography>
          <SmartToyIcon/>
          </Container>
          <Typography variant='body1' component='body1'>
            {getevalama}
          </Typography>
          <LoadingComponent loading={loadlamaclick}></LoadingComponent>
          <Container>
          <Typography variant='h6' component='h6'>
           GPT Convo Evaluation:
          </Typography>
          <SmartToyIcon/>
          </Container>
          <Typography variant='body1' component='body1'>
            {getconvo}
          </Typography>
          <LoadingComponent loading={loadconvoclick}></LoadingComponent>
          
        </div>
      </div>
    </div>
  );
}

export default App;
