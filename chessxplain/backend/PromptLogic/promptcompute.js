
import fetchEvaluation from "../fish/Stockfish.js";
import determinegamemode from "./determineGameType.js";

import searchOpenings from "./queryOpenings.js";
import searchTopGame from "./queryTopGames.js";

const  promptAiBasedOnSF = async (fen) => {

    const startpos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    const evaluationValue = await fetchEvaluation('eval', '13', fen);
    const topLine = await fetchEvaluation('lines', '13', fen)
    const bestmove = await fetchEvaluation('bestmove', '13', fen)
    let ask = '';

    let whoisWinning = '';

    if(evaluationValue.data.includes('-')){
      whoisWinning = `black has advantage and possibly be winning`;
    }else{
      whoisWinning = `white has advantage and possibly be winning`;
    }

    const opening = await searchOpenings(fen);
    const top = await searchTopGame(fen);
    const gameType = await determinegamemode(fen)
    let gameinfo = '';

    if(opening != null){
       if(top != null){
           gameinfo = `The game follows the opening of ${opening} there is Top game in the Lichess database between ${top}`;
       }else{
        gameinfo = `There is no GM game in the database`
       }
    }else{
      if(top != null){
        gameinfo = `There is top game in Lichess database: ${top}`
      }else{
        gameinfo = `There is no top GM game for this position!`
      }
    }
  
    if(fen !== startpos){  
    ask = `here is the chess game FEN: ${fen} according to Stockfish the eval is ${evaluationValue.data} ${whoisWinning}, the topline is ${topLine.data} and the best move is ${bestmove.data} the game is in ${gameType} phase, some background about this position: ${gameinfo} What do you think about it, can you explain me current position and Stockfishs topline, how would the game change?, provide plans for both side, provide info about position in master games.`;
    }else{
      ask = `This is the starting position of chess according to Stockfish the eval is ${evaluationValue.data} ${whoisWinning}, the topline is ${topLine.data} and the best move is ${bestmove.data} the game is in ${gameType} phase, some background about this position: ${gameinfo} What do you think about it, can you explain me current position and Stockfishs topline, how would the game change?, provide plans for both side, provide info about position in master games.`;
    } 

   return ask;

}


export default promptAiBasedOnSF;